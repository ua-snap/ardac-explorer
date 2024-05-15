<script lang="ts" setup>
const placesStore = usePlacesStore()
const dataStore = useDataStore()

const { $Plotly, $_ } = useNuxtApp()
import type { Data } from 'plotly.js-dist-min'

const apiData = computed<Record<string, any>>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)
const selectedCommunity = computed<CommunityValue>(
  () => placesStore.selectedCommunity
)

console.log(selectedCommunity)

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
  let redPoint = (maxHistoricalValue - minValue) / range
  let whitePoint = redPoint / 2

  let plotData = [
    {
      x: $_.range(1901, 2100),
      y: Object.values(scenarioLabels).reverse(),
      z: dataByScenario,
      type: 'heatmap',
      colorscale: [
        [0, 'rgb(3,67,223)'],
        [whitePoint, 'rgb(255,255,255)'],
        [redPoint, 'rgb(255,0,0)'],
        [1, 'rgb(64,0,64)'],
      ],
      showscale: false,
      hovertemplate:
        'Year: %{x}<br>Scenario: %{y}<br>Mean Annual Temperature: %{z}°C',
      xhoverformat: '.0f',
      hoverlabel: {
        namelength: 0,
      },
    } satisfies Data,
  ]

  let titleText =
    'Climate stripes for ' + latLng.value?.lat + ', ' + latLng.value?.lng
  if (selectedCommunity.value && selectedCommunity.value.name) {
    titleText =
      'Climate stripes for ' +
      selectedCommunity.value.name +
      ', ' +
      selectedCommunity.value.region
  }

  $Plotly.newPlot(
    'chart',
    plotData,
    {
      title: {
        text: titleText,
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
        side: 'right',
      },
      shapes: [
        {
          type: 'line',
          x0: 2006,
          y0: -0.1,
          x1: 2006,
          y1: 1.1,
          yref: 'paper',
          line: {
            color: '#333333',
            width: 3,
          },
        },
      ],
      annotations: [
        {
          x: 1952,
          y: 1.1,
          xref: 'x',
          yref: 'paper',
          text: 'Modeled Baseline',
          showarrow: false,
          font: {
            size: 16,
          },
        },
        {
          x: 2052,
          y: 1.1,
          xref: 'x',
          yref: 'paper',
          text: 'Projected',
          showarrow: false,
          font: {
            size: 16,
          },
        },
      ],
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
