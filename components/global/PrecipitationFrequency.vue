<script lang="ts" setup>
import type { Data } from 'plotly.js-dist-min'

const { $Plotly } = useNuxtApp()
const store = useStore()
const dataStore = useDataStore()

const apiData = computed<any[]>(() => dataStore.apiData)
const dataError = computed<boolean>(() => dataStore.dataError)
const latLng = computed<LatLng>(() => store.latLng)
const errorMsg = ref('')

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
    let chartData = dataStore.apiData['100']['24h']
    models.forEach(model => {
      let pf: number[] = []
      let pf_upper: number[] = []
      let pf_lower: number[] = []

      // Offset the chart markers/bars slightly so they don't overlap.
      // Omit the first tick mark because it's just the placeholder for the
      // 0 x-axis position, where the y-axis line is drawn.
      let offsetTicks = ticks.slice(1).map(tick => tick + offsets[model])
      eras.forEach(era => {
        pf.push(chartData[model][era]['pf'])
        pf_upper.push(chartData[model][era]['pf_upper'])
        pf_lower.push(chartData[model][era]['pf_lower'])
      })

      traces.push({
        x: offsetTicks,
        y: pf,
        error_y: {
          type: 'data',
          symmetric: false,
          array: pf_upper,
          arrayminus: pf_lower,
        },
        mode: 'markers',
        type: 'scatter',
        name: model,
        marker: {
          symbol: Array(ticks.length).fill(symbols[model]),
          size: 8,
        },
      })
    })

    $Plotly.newPlot(
      'chart',
      traces,
      {
        title: {
          text:
            'Precipitation frequency for ' +
            store.latLng.lat +
            ',' +
            store.latLng.lng +
            '<br />' +
            'Duration: 24 hours, Annual exceedance probability: 1%',
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

watch(apiData, async () => {
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
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Precipitation Frequency</h3>
      <LatLngSelector
        label="Get chart for lat/lon point:"
        :errorMsg="errorMsg"
      />
      <div id="chart"></div>
    </div>
  </section>
</template>

<style scoped></style>
