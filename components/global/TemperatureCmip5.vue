<script lang="ts" setup>
import type { Data } from 'plotly.js-dist-min'
const { $Plotly, $_ } = useNuxtApp()

const placesStore = usePlacesStore()
const mapStore = useMapStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const apiData = computed<Record<string, any>>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const modelInput = defineModel('model', { default: 'NCAR-CCSM4' })
const scenarioInput = defineModel('scenario', { default: 'rcp85' })
const monthInput = defineModel('month', { default: 'July' })

const layers: MapLayer[] = [
  {
    id: 'tas_cmip5_historical_era',
    title: '1980–2009, CRU TS',
    subtext: 'Month: July',
    source: 'rasdaman',
    wmsLayerName: 'tas_2km_historical',
    style: 'ardac_tas_cmip5_historical_era',
    legend: 'tas',
  },
  {
    id: 'tas_cmip5_midcentury_era',
    title: '2040–2069, NCAR CCSM4, RCP 8.5',
    subtext: 'Month: July',
    source: 'rasdaman',
    wmsLayerName: 'tas_2km_projected',
    style: 'ardac_tas_cmip5_midcentury_era',
    legend: 'tas',
  },
  {
    id: 'tas_cmip5_latecentury_era',
    title: '2070–2099, NCAR CCSM4, RCP 8.5',
    subtext: 'Month: July',
    source: 'rasdaman',
    wmsLayerName: 'tas_2km_projected',
    style: 'ardac_tas_cmip5_latecentury_era',
    legend: 'tas',
  },
]

const legend: Record<string, LegendItem[]> = {
  tas: [
    { color: '#FDD0A2', label: '&lt;5°C' },
    { color: '#FDAE6B', label: '&ge;5°C, &lt;10°C' },
    { color: '#FD8D3C', label: '&ge;10°C, &lt;15°C' },
    { color: '#E6550D', label: '&ge;15°C, &lt;20°C' },
    { color: '#A63603', label: '&ge;20°C' },
  ],
}

const mapId = 'pr'
mapStore.setLegendItems(mapId, legend)

const models = ['NCAR-CCSM4', 'GFDL-CM3', '5ModelAvg']

const scenarioLabels: Record<string, string> = {
  rcp45: 'RCP 4.5',
  rcp85: 'RCP 8.5',
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

let chartData: any

const getPlotValues = (params: any) => {
  let years = $_.range(params.minYear, params.maxYear + 1)

  // Pad projected decades with nulls to align properly on chart.
  let xTickPaddingLength: number = (params.minYear - 1901) / 10
  let xTickPadding = $_.fill(Array(xTickPaddingLength), null)

  let allValues: Record<string, number[]> = {}

  // Group yearly values into decade buckets to make it easier to calculate
  // min/mean/max for each decade.
  let tasTypes = ['tasmin', 'tasmean', 'tasmax']
  let decadeBuckets: Record<string, Record<string, number[]>> = {}

  tasTypes.forEach((tasType: string) => {
    let firstKey = params.scenario == 'historical' ? 'historical' : 'projected'
    allValues[tasType] = []
    decadeBuckets[tasType] = {}
    years.forEach((year: number) => {
      allValues[tasType].push(
        chartData[firstKey][params.model][params.scenario][params.month][year][
          tasType
        ]
      )
    })
    for (let i = 0; i < allValues[tasType].length; i += 10) {
      let yearRange = years[i] + '-' + years[i + 9]
      decadeBuckets[tasType][yearRange] = []
      for (let j = 0; j < 10; j++) {
        let value = allValues[tasType][i + j]
        if (typeof value === 'string') {
          value = parseFloat(value)
        }
        decadeBuckets[tasType][yearRange].push(value)
      }
    }
  })

  // The same decade keys apply to all three tas types (min, mean, max).
  let decades = Object.keys(decadeBuckets['tasmean'])

  let means: number[] = []
  let maxes: number[] = []
  let mins: number[] = []
  let maxOffsets: number[] = []
  let minOffsets: number[] = []

  decades.forEach(decade => {
    let mean = Math.round($_.mean(decadeBuckets['tasmean'][decade]))
    let min = $_.min(decadeBuckets['tasmin'][decade])
    let max = $_.max(decadeBuckets['tasmax'][decade])

    // Calculate max/min as offsets from mean for error bars.
    let maxOffset = max - mean
    let minOffset = mean - min

    means.push(mean)
    mins.push(min)
    maxes.push(max)
    maxOffsets.push(maxOffset)
    minOffsets.push(minOffset)
  })

  decades = xTickPadding.concat(decades)
  means = xTickPadding.concat(means)
  maxes = xTickPadding.concat(maxes)
  mins = xTickPadding.concat(mins)
  maxOffsets = xTickPadding.concat(maxOffsets)
  minOffsets = xTickPadding.concat(minOffsets)

  return {
    decades,
    means,
    maxes,
    mins,
    maxOffsets,
    minOffsets,
  }
}

const buildChart = () => {
  if (apiData.value) {
    let traces: Data[] = []
    let allDecades: string[] = []
    chartData = dataStore.apiData

    for (let i = 1901; i <= 2100; i += 10) {
      allDecades.push(i + '-' + (i + 9))
    }

    let traceParams = [
      {
        model: 'CRU-TS',
        scenario: 'historical',
        month: monthInput.value,
        minYear: 1901,
        maxYear: 2010,
      },
      {
        model: modelInput.value,
        scenario: scenarioInput.value,
        month: monthInput.value,
        minYear: 2011,
        maxYear: 2100,
      },
    ]
    traceParams.forEach(params => {
      let plotValues = getPlotValues(params)
      let symbol = params.scenario === 'historical' ? 'circle' : 'square'

      traces.push({
        x: allDecades,
        y: plotValues.means,
        error_y: {
          type: 'data',
          symmetric: false,
          array: plotValues.maxOffsets,
          arrayminus: plotValues.minOffsets,
        },
        mode: 'markers',
        type: 'scatter',
        name: params.model,
        marker: {
          symbol: symbol,
          size: 8,
        },
        hovertemplate:
          'max: %{customdata[0]}<br />' +
          'mean: %{y:}<br />' +
          'min: %{customdata[1]}',
        customdata: $_.zip(plotValues.maxes, plotValues.mins),
      })
    })

    $Plotly.newPlot(
      'chart',
      traces,
      {
        title: {
          text:
            'Temperature for ' +
            placesStore.latLng?.lat +
            ', ' +
            placesStore.latLng?.lng +
            '<br />Model: ' +
            modelInput.value +
            ', Scenario: ' +
            scenarioLabels[scenarioInput.value] +
            ', Month: ' +
            monthInput.value,
          font: {
            size: 24,
          },
        },
        yaxis: {
          title: {
            text: 'Temperature (°C)',
            font: {
              size: 18,
            },
          },
        },
      },
      {
        responsive: true, // changes the height / width dynamically for charts
        displayModeBar: true, // always show the camera icon
        displaylogo: false,
        modeBarButtonsToRemove: [
          'zoom2d',
          'pan2d',
          'select2d',
          'lasso2d',
          'zoomIn2d',
          'zoomOut2d',
          'autoScale2d',
          'resetScale2d',
        ],
      }
    )
  }
}

watch([apiData, modelInput, scenarioInput, monthInput], async () => {
  buildChart()
})

watch(latLng, async () => {
  $Plotly.purge('chart')
  dataStore.fetchData('temperatureCmip5')
})

onUnmounted(() => {
  dataStore.apiData = null
})
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Temperature, CMIP5</h3>
      <p class="mb-6">
        The map below shows the mean temperature for the month of July across
        three different 30-year eras. The historical era (1980&ndash;2009) uses
        historical modeled data provided by the CRU TS model. The mid-century
        (2040&ndash;2069) and late-century (2070&ndash;2099) eras use modeled
        projections from the NCAR CCSM4 model under the RCP 8.5 emissions
        scenario.
      </p>

      <MapBlock :mapId="mapId" class="mb-6">
        <template v-slot:layers>
          <MapLayer :mapId="mapId" :layer="layers[0]" default>
            <template v-slot:title>{{ layers[0].title }}</template>
            <template v-slot:subtext>{{ layers[0].subtext }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[1]">
            <template v-slot:title>{{ layers[1].title }}</template>
            <template v-slot:subtext>{{ layers[1].subtext }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[2]">
            <template v-slot:title>{{ layers[2].title }}</template>
            <template v-slot:subtext>{{ layers[2].subtext }}</template>
          </MapLayer>
        </template>
      </MapBlock>

      <p>
        Enter lat/lon coordinates below to see a chart of temperature for a
        point location. This chart displays min/mean/max temperature for
        historical decades using the CRU TS model and projected decades using
        the selected model, scenario, and month.
      </p>

      <Gimme />
      <div v-if="latLng && apiData">
        <div class="parameter">
          <label for="season" class="label">Model:</label>
          <div class="select mb-5 mr-3">
            <select id="season" v-model="modelInput">
              <option v-for="model in models" :value="model">
                {{ model }}
              </option>
            </select>
          </div>
        </div>
        <div class="parameter mb-5 mr-3">
          <label for="scenario" class="label">Scenario:</label>
          <div class="select">
            <select id="scenario" v-model="scenarioInput">
              <option
                v-for="scenario in Object.keys(scenarioLabels)"
                :value="scenario"
              >
                {{ scenarioLabels[scenario] }}
              </option>
            </select>
          </div>
        </div>
        <div class="parameter mb-5">
          <label for="month" class="label">Month:</label>
          <div class="select">
            <select id="month" v-model="monthInput">
              <option v-for="month in months" :value="month">
                {{ month }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div id="chart"></div>

      <div v-if="latLng && apiData" class="my-6">
        <h4 class="title is-4">
          Download temperature data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <ul>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/tas2km/point/' +
                latLng.lat +
                '/' +
                latLng.lng +
                '?format=csv'
              "
              >Download as CSV</a
            >
          </li>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/tas2km/point/' +
                latLng.lat +
                '/' +
                latLng.lng
              "
              >Download as JSON</a
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.parameter {
  display: inline-block;
  select {
    background-color: $white-lighter;
  }
}
</style>
