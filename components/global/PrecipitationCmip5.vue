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

const layers: MapLayer[] = [
  {
    id: 'pr_cmip5_historical_era',
    title: '1980–2009, CRU TS',
    source: 'rasdaman',
    wmsLayerName: 'annual_precip_totals_mm',
    style: 'ardac_pr_cmip5_historical_era',
    legend: 'pr',
  },
  {
    id: 'pr_cmip5_midcentury_era',
    title: '2040–2069, NCAR CCSM4, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'annual_precip_totals_mm',
    style: 'ardac_pr_cmip5_midcentury_era',
    legend: 'pr',
  },
  {
    id: 'pr_cmip5_latecentury_era',
    title: '2070–2099, NCAR CCSM4, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'annual_precip_totals_mm',
    style: 'ardac_pr_cmip5_latecentury_era',
    legend: 'pr',
  },
]

const legend: Record<string, LegendItem[]> = {
  pr: [
    { color: '#8C510A', label: '&ge;0㎜, &gt;250㎜' },
    { color: '#D8B365', label: '&ge;250㎜, &lt;500㎜' },
    { color: '#F6E8C3', label: '&ge;500㎜, &lt;1000㎜' },
    { color: '#C7EAE5', label: '&ge;1000㎜, &lt;2000㎜' },
    { color: '#5AB4AC', label: '&ge;2000㎜, &lt;4000㎜' },
    { color: '#01665E', label: '&ge;4000㎜' },
  ],
}

const mapId = 'pr'
mapStore.setLegendItems(mapId, legend)

const models = [
  'NCAR-CCSM4',
  'MRI-CGCM3',
  'GFDL-CM3',
  'GISS-E2-R',
  'IPSL-CM5A-LR',
]

const scenarioLabels: Record<string, string> = {
  rcp45: 'RCP 4.5',
  rcp60: 'RCP 6.0',
  rcp85: 'RCP 8.5',
}

let chartData: any

const getPlotValues = (params: any) => {
  let years = $_.range(params.minYear, params.maxYear + 1)

  // Pad projected decades with nulls to align properly on chart.
  let xTickPaddingLength: number = (params.minYear - 1901) / 10
  let xTickPadding = $_.fill(Array(xTickPaddingLength), null)

  let prValues: number[] = []

  years.forEach((year: number) => {
    prValues.push(chartData[params.model][params.scenario][year]['pr'])
  })

  // Group yearly values into decade buckets to make it easier to calculate
  // min/mean/max for each decade.
  let decadeBuckets: Record<string, number[]> = {}
  for (let i = 0; i < prValues.length; i += 10) {
    let yearRange = years[i] + '-' + years[i + 9]
    decadeBuckets[yearRange] = []
    for (let j = 0; j < 10; j++) {
      decadeBuckets[yearRange].push(prValues[i + j])
    }
  }

  let decades = Object.keys(decadeBuckets)

  let means: number[] = []
  let maxes: number[] = []
  let mins: number[] = []
  let maxOffsets: number[] = []
  let minOffsets: number[] = []

  decades.forEach(decade => {
    let mean = Math.round($_.mean(decadeBuckets[decade]))
    let min = $_.min(decadeBuckets[decade])
    let max = $_.max(decadeBuckets[decade])

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
        minYear: 1901,
        maxYear: 2010,
      },
      {
        model: modelInput.value,
        scenario: scenarioInput.value,
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
            'Annual precipitation for ' +
            placesStore.latLng?.lat +
            ', ' +
            placesStore.latLng?.lng +
            '<br />Model: ' +
            modelInput.value +
            ', Scenario: ' +
            scenarioLabels[scenarioInput.value],
          font: {
            size: 24,
          },
        },
        yaxis: {
          title: {
            text: 'Precipitation (㎜)',
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

watch([apiData, modelInput, scenarioInput], async () => {
  buildChart()
})

watch(latLng, async () => {
  $Plotly.purge('chart')
  dataStore.fetchData('precipitationCmip5')
})

onUnmounted(() => {
  dataStore.apiData = null
})
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Precipitation, CMIP5</h3>
      <p class="mb-6">
        The map below shows mean annual precipitation totals across three
        different 30-year eras. The historical era (1980&ndash;2009) uses
        historical modeled data provided by the CRU TS model. The mid-century
        (2040&ndash;2069) and late-century (2070&ndash;2099) eras use modeled
        projections from the NCAR CCSM4 model under the RCP 8.5 emissions
        scenario.
      </p>

      <MapBlock :mapId="mapId" class="mb-6">
        <template v-slot:layers>
          <MapLayer :mapId="mapId" :layer="layers[0]" default>
            <template v-slot:title>{{ layers[0].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[1]">
            <template v-slot:title>{{ layers[1].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[2]">
            <template v-slot:title>{{ layers[2].title }}</template>
          </MapLayer>
        </template>
      </MapBlock>

      <p>
        Enter lat/lon coordinates below to see a chart of precipitation for a
        point location. This chart displays min/mean/max annual precipitation
        totals for historical decades using the CRU TS model and projected
        decades using the selected model and scenario from five available CMIP5
        models and three possible emissions scenarios.
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
        <div class="parameter mb-5">
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
      </div>
      <div id="chart"></div>

      <div v-if="latLng && apiData" class="my-6">
        <h4 class="title is-4">
          Download precipitation data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <ul>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/precipitation/' +
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
                '/precipitation/' +
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
