<script lang="ts" setup>
const placesStore = usePlacesStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

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
  // Package the data into a 2D array (months x days) for the heatmap chart.
  // 0 = sea ice absent
  // 1 = sea ice present
  // 2 = no data
  // 3 = grid padding for invalid dates
  let dataByScenario: number[][] = []

  Object.keys(scenarioLabels).forEach(scenario => {
    let scenarioData: number[] = []
    historicalYears.forEach((year: any) => {
      scenarioData.push(apiData.value['CRU-TS']['historical'][year]['tas'])
    })
    projectedYears.forEach((year: any) => {
      scenarioData.push(apiData.value['NCAR-CCSM4'][scenario][year]['tas'])
    })
    dataByScenario.push(scenarioData)
  })

  // Reverse these arrays so they are ordered correctly on chart.
  dataByScenario = dataByScenario.reverse()

  let plotData = [
    {
      x: $_.range(1901, 2100),
      y: Object.values(scenarioLabels).reverse(),
      z: dataByScenario,
      type: 'heatmap',
      // colorscale: [
      //   [0.0, 'rgb(255,255,255)'],
      //   [0.33, 'rgb(0,0,255)'],
      //   [0.66, 'rgb(180,180,180)'],
      //   [1.0, 'rgb(96,96,96)'],
      // ],
      showscale: false,
      // xgap: 2,
      // ygap: 2,
      // zmin: 0,
      // zmax: 3,
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
