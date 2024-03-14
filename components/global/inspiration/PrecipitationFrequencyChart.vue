<script lang="ts" setup>
import type { Data } from 'plotly.js-dist-min'

const { $Plotly, $_ } = useNuxtApp()
const store = useStore()
const dataStore = useDataStore()
const placesStore = usePlacesStore()

const durationInput = defineModel('duration', { default: '24h' })
const returnIntervalInput = defineModel('frequency', { default: '100' })

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
            placesStore.latLng?.lat +
            ', ' +
            placesStore.latLng?.lng +
            '<br />' +
            'Duration: ' +
            durationInput.value +
            ', Return interval:' +
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
      <h3 class="title is-3">Precipitation frequency</h3>
      <LatLngSelector
        label="Get chart for lat/lon point:"
        :errorMsg="errorMsg"
      />
      <div v-if="apiData">
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
