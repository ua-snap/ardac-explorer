<script lang="ts" setup>
const placesStore = usePlacesStore()
const dataStore = useDataStore()

const { $Plotly, $_ } = useNuxtApp()
import type { Data } from 'plotly.js-dist-min'

const apiData = computed<Record<string, any>>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const scenarioLabels = {
  rcp45: 'RCP 4.5',
  rcp60: 'RCP 6.0',
  rcp85: 'RCP 8.5',
}

let historicalYears = $_.range(1901, 2006)
let projectedYears = $_.range(2007, 2100)

const buildChart = () => {
  let dataByScenario: number[][] = []
  let allValues: number[] = []
  let maxHistoricalValue: number = 0
  Object.keys(scenarioLabels).forEach(scenario => {
    let scenarioData: number[] = []
    historicalYears.forEach((year: any) => {
      let temperature = apiData.value['CRU-TS']['historical'][year]['tas']
      scenarioData.push(temperature)
      allValues.push(temperature)
      maxHistoricalValue = $_.max(scenarioData)
    })
    projectedYears.forEach((year: any) => {
      let temperature = apiData.value['NCAR-CCSM4'][scenario][year]['tas']
      scenarioData.push(temperature)
      allValues.push(temperature)
    })
    dataByScenario.push(scenarioData)
  })

  // Reverse array so it is ordered correctly on chart.
  dataByScenario = dataByScenario.reverse()

  let minValue = $_.min(allValues)
  let maxValue = $_.max(allValues)
  let range = maxValue - minValue
  let whitePoint = (maxHistoricalValue - minValue) / range

  let plotData = [
    {
      x: $_.range(1901, 2100),
      y: Object.values(scenarioLabels).reverse(),
      z: dataByScenario,
      type: 'heatmap',
      colorscale: [
        [0, 'rgb(3,67,223)'],
        [whitePoint / 2, 'rgb(255,255,255)'],
        [whitePoint, 'rgb(255,0,0)'],
        [1, 'rgb(64,0,64)'],
      ],
      showscale: false,
    } satisfies Data,
  ]

  $Plotly.newPlot(
    'chart',
    plotData,
    {
      title: {
        text:
          'Climate stripes for ' + latLng.value?.lat + ', ' + latLng.value?.lng,
        font: {
          size: 24,
        },
      },
      xaxis: {
        title: {
          text: 'Year',
          font: {
            size: 18,
          },
        },
        showgrid: false,
      },
      yaxis: {
        showgrid: false,
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

watch(latLng, async () => {
  $Plotly.purge('chart')
  dataStore.apiData = null
  dataStore.fetchData('meanAnnualTemperature')
})

watch([apiData], async () => {
  if (apiData.value) {
    buildChart()
  }
})

onUnmounted(() => {
  dataStore.apiData = null
})
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Climate Stripes!</h3>
      <Gimme label="Get chart and data for lat/lon point:" />
      <div id="chart"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
