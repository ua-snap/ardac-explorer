<script lang="ts" setup>
import type { Data } from 'plotly.js-dist-min'

const { $Plotly, $_ } = useNuxtApp()
const placesStore = usePlacesStore()
const mapStore = useMapStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const durationInput = defineModel('duration', { default: '24h' })
const returnIntervalInput = defineModel('returnInterval', { default: '100' })

const apiData = computed<any[]>(() => dataStore.apiData)
const dataError = computed<boolean>(() => dataStore.dataError)
const latLng = computed<LatLngValue>(() => placesStore.latLng)
const errorMsg = ref('')

const returnIntervals = [2, 5, 10, 25, 50, 100, 200, 500, 1000]
const durationLabels: Record<string, string> = {
  '60m': '60 minutes',
  '2h': '2 hours',
  '3h': '3 hours',
  '6h': '6 hours',
  '12h': '12 hours',
  '24h': '24 hours',
  '2d': '2 days',
  '3d': '3 days',
  '4d': '4 days',
  '7d': '7 days',
  '10d': '10 days',
  '20d': '20 days',
  '30d': '30 days',
  '45d': '45 days',
  '60d': '60 days',
}

const buildChart = () => {
  if (apiData.value) {
    let models = ['GFDL-CM3', 'NCAR-CCSM4']
    let eras = ['2020-2049', '2050-2079', '2080-2099']

    let traces: Data[] = []
    let offsets: Record<string, number> = {
      'GFDL-CM3': -0.05,
      'NCAR-CCSM4': 0.05,
    }
    let symbols: Record<string, string> = {
      'GFDL-CM3': 'circle',
      'NCAR-CCSM4': 'square',
    }
    let ticks = [0, 1, 2, 3]
    let chartData =
      dataStore.apiData[returnIntervalInput.value][durationInput.value]
    models.forEach(model => {
      let pfs: number[] = []
      let pfUppers: number[] = []
      let pfLowers: number[] = []
      let pfUpperOffsets: number[] = []
      let pfLowersOffsets: number[] = []

      // Offset the chart markers/bars slightly so they don't overlap.
      // Omit the first tick mark because it's just the placeholder for the
      // 0 x-axis position, where the y-axis line is drawn.
      let offsetTicks = ticks.slice(1).map(tick => tick + offsets[model])
      eras.forEach(era => {
        let eraData = chartData[model][era]
        let pf = eraData['pf']
        let pfUpper = eraData['pf_upper']
        let pfLower = eraData['pf_lower']

        pfs.push(pf)
        pfUppers.push(pfUpper)
        pfLowers.push(pfLower)

        // Calculate upper/lower as offsets from pf for error bars.
        pfUpperOffsets.push(pfUpper - pf)
        pfLowersOffsets.push(pf - pfLower)
      })

      traces.push({
        x: offsetTicks,
        y: pfs,
        error_y: {
          type: 'data',
          symmetric: false,
          array: pfUpperOffsets,
          arrayminus: pfLowersOffsets,
        },
        mode: 'markers',
        type: 'scatter',
        name: model,
        marker: {
          symbol: Array(ticks.length).fill(symbols[model]),
          size: 8,
        },
        hovertemplate:
          'max: %{customdata[0]}<br />' +
          'mean: %{y:}<br />' +
          'min: %{customdata[1]}',
        customdata: $_.zip(pfUppers, pfLowers),
      })
    })

    $Plotly.newPlot(
      'chart',
      traces,
      {
        title: {
          text:
            'Precipitation frequency for ' +
            latLng.value?.lat +
            ', ' +
            latLng.value?.lng +
            '<br />' +
            'Duration: ' +
            durationInput.value +
            ', Return interval: ' +
            returnIntervalInput.value,
          font: {
            size: 24,
          },
        },
        xaxis: {
          tickvals: ticks,
          ticktext: ['', ...eras],
          dtick: 1,
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

const layers: MapLayer[] = [
  {
    id: 'pf_historical_era',
    title:
      '2020–2049, NCAR CCSM4, RCP 8.5, Duration: 24 Hours, Return Interval: 100',
    source: 'rasdaman',
    wmsLayerName: 'dot_precip',
    style: 'ardac_pf',
    legend: 'pf',
    rasdamanConfiguration: {
      dim_model: 1,
      dim_duration: 3,
      dim_era: 0,
      dim_interval: 100,
    },
  },
  {
    id: 'pf_midcentury_era',
    title:
      '2050–2079, NCAR CCSM4, RCP 8.5, Duration: 24 Hours, Return Interval: 100',
    source: 'rasdaman',
    wmsLayerName: 'dot_precip',
    style: 'ardac_pf',
    legend: 'pf',
    rasdamanConfiguration: {
      dim_model: 1,
      dim_duration: 3,
      dim_era: 1,
      dim_interval: 100,
    },
  },
  {
    id: 'pf_latecentury_era',
    title:
      '2080–2099, NCAR CCSM4, RCP 8.5, Duration: 24 Hours, Return Interval: 100',
    source: 'rasdaman',
    wmsLayerName: 'dot_precip',
    style: 'ardac_pf',
    legend: 'pf',
    rasdamanConfiguration: {
      dim_model: 1,
      dim_duration: 3,
      dim_era: 2,
      dim_interval: 100,
    },
  },
]

const legend: Record<string, LegendItem[]> = {
  pf: [
    { color: '#edf8fb', label: '&ge;0㎜, &lt;40㎜' },
    { color: '#b2e2e2', label: '&ge;40㎜, &lt;80㎜' },
    { color: '#66c2a4', label: '&ge;80㎜, &lt;120㎜' },
    { color: '#2ca25f', label: '&ge;120㎜, &lt;160㎜' },
    { color: '#006d2c', label: '&ge;160㎜' },
  ],
}

const mapId = 'pf'
mapStore.setLegendItems(mapId, legend)

watch([apiData, durationInput, returnIntervalInput], async () => {
  buildChart()
})

watch(latLng, async () => {
  errorMsg.value = ''
  $Plotly.purge('chart')
  dataStore.fetchData('precipitationFrequency')
})

watch(dataError, async () => {
  if (dataError.value === true) {
    errorMsg.value =
      'There was an error fetching data for this location. Please try another location.'
  }
})

onUnmounted(() => {
  dataStore.apiData = null
})
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Precipitation Frequency</h3>
      <p class="mb-6">
        Precipitation frequency is the expected maximum precipitation in
        millimeters for the provided duration and return interval. The map below
        shows the mean projected precipitation frequency for three eras using a
        24-hour duration and a return interval of 100. These projections are
        from the NCAR CCSM4 model under the RCP 8.5 emissions scenario.
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
        Enter lat/lon coordinates below to see a chart of precipitation
        frequency for a point location. This chart displays mean precipitation
        frequency, along with the upper and lower bounds of the 95% confidence
        interval, for three eras. Projections were derived from the GFDL-CM3 and
        NCAR-CCSM4 models under the RCP 8.5 emissions scenario for the selected
        duration and return interval.
      </p>

      <p>
        After entering lat/lon coordinates, links will be provided where you can
        download the data that is used to populate the chart.
      </p>

      <Gimme />

      <div v-if="latLng && apiData">
        <div class="chart-input">
          <label for="duration" class="label">Duration:</label>
          <div class="select mb-5 mr-3">
            <select id="duration" v-model="durationInput">
              <option
                v-for="duration in Object.keys(durationLabels)"
                :value="duration"
              >
                {{ durationLabels[duration] }}
              </option>
            </select>
          </div>
        </div>
        <div class="chart-input">
          <label for="return-interval" class="label">Return interval:</label>
          <div class="select">
            <select id="return-interval" v-model="returnIntervalInput">
              <option v-for="interval in returnIntervals" :value="interval">
                {{ interval }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div id="chart"></div>
      <div v-if="latLng" class="my-6">
        <h4 class="title is-4">
          Download precipitation frequency data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <ul>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/precipitation/frequency/point/' +
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
                '/precipitation/frequency/point/' +
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
.chart-input {
  display: inline-block;
  select {
    background-color: $white-lighter;
  }
}
</style>
