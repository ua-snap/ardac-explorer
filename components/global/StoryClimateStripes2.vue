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

const modelInput = defineModel('model', { default: 'EC-Earth3-Veg' })

const models: string[] = [
  'CESM2',
  'CNRM-CM6-1-HR',
  'EC-Earth3-Veg',
  'GFDL-ESM4',
  'HadGEM3-GC31-LL',
  'HadGEM3-GC31-MM',
  'KACE-1-0-G',
  'MIROC6',
  'MPI-ESM1-2-HR',
  'MRI-ESM2-0',
  'NorESM2-MM',
  'TaiESM1',
]

const scenarioLabels: Record<string, string> = {
  ssp126: 'SSP1-2.6',
  ssp245: 'SSP2-4.5',
  ssp370: 'SSP3-7.0',
  ssp585: 'SSP5-8.5',
}

let startYear = 1900
let endYear = 2100

let historicalYears = $_.range(startYear, 2024 + 1)
let projectedYears = $_.range(2025, endYear + 1)

const buildChart = () => {
  if (apiData.value) {
    let dataByScenario: number[][] = []
    let allValues: number[] = []
    let maxHistoricalValue: number = 0

    // Get available scenarios for the selected model.
    let availableScenarios = Object.keys(apiData.value[modelInput.value])
    availableScenarios.forEach(scenario => {
      let scenarioData: number[] = []
      historicalYears.forEach((year: any) => {
        let temperature =
          apiData.value['Berkeley-Earth']['historical'][year][
            'temperature_anomaly'
          ]
        scenarioData.push(temperature)
        allValues.push(temperature)
        maxHistoricalValue = $_.max(scenarioData)
      })
      projectedYears.forEach((year: any) => {
        let temperature =
          apiData.value[modelInput.value][scenario][year]['temperature_anomaly']
        scenarioData.push(temperature)
        allValues.push(temperature)
      })
      dataByScenario.push(scenarioData)
    })

    let minValue = $_.min(allValues)
    let maxValue = $_.max(allValues)
    let range = maxValue - minValue
    let redPoint = (maxHistoricalValue - minValue) / range
    let whitePoint = redPoint / 2
    let plumPoint = redPoint + (maxValue - maxHistoricalValue) / range / 2

    // Create hover labels for each data point and pass them into the chart
    // using the "customdata" property to give us more conditional logic. This is
    // necessary to hide the "Scenarios" label for historical data.
    let dataLabels: string[][] = []
    for (let i = 0; i < dataByScenario.length; i++) {
      dataLabels[i] = []
      for (let j = 0; j < dataByScenario[i].length; j++) {
        let year = j + startYear
        if (year < 2025) {
          dataLabels[i][j] =
            'Year: ' +
            year +
            '<br />Mean Annual Temperature: ' +
            dataByScenario[i][j] +
            '°C'
        } else {
          dataLabels[i][j] =
            'Year: ' +
            year +
            '<br />Scenario: ' +
            scenarioLabels[Object.keys(scenarioLabels)[i]] +
            '<br />Mean Annual Temperature: ' +
            dataByScenario[i][j] +
            '°C'
        }
      }
    }

    // Reverse arrays so they are ordered correctly on chart.
    dataByScenario = dataByScenario.reverse()
    dataLabels = dataLabels.reverse()

    // Get subset of scenarioLabels corresponding to model's scenarios.
    let scenarioLabelsSubset: Record<string, string> = {}
    for (let i = 0; i < availableScenarios.length; i++) {
      scenarioLabelsSubset[availableScenarios[i]] =
        scenarioLabels[availableScenarios[i]]
    }

    let plotData = [
      {
        x: $_.range(startYear, endYear + 1),
        y: Object.values(scenarioLabelsSubset).reverse(),
        z: dataByScenario,
        type: 'heatmap',
        colorscale: [
          [0, 'rgb(3,67,223)'],
          [whitePoint, 'rgb(255,255,255)'],
          [redPoint, 'rgb(255,0,0)'],
          [plumPoint, 'rgb(64,0,64)'],
          [1, 'rgb(255,0,255)'],
        ],
        showscale: false,
        hovertemplate: '%{customdata}',
        xhoverformat: '.0f',
        hoverlabel: {
          namelength: 0,
        },
        customdata: dataLabels,
      } satisfies Data,
    ]

    let titleText = 'Mean annual temperature for '
    if (selectedCommunity.value && selectedCommunity.value.name) {
      titleText +=
        selectedCommunity.value.name + ', ' + selectedCommunity.value.region
    } else {
      titleText += latLng.value?.lat + ', ' + latLng.value?.lng
    }
    titleText += '<br />Model: ' + modelInput.value

    let viewportWidth = window.innerWidth

    // Numbers to be used as the numerator for annotationOffset calculation
    let numerator
    if (viewportWidth > 1500) {
      numerator = 32000
    } else if (viewportWidth > 800) {
      numerator = 20000
    } else {
      numerator = 24000
    }

    let annotationOffset = numerator / viewportWidth

    $Plotly.newPlot(
      'chart',
      plotData,
      {
        title: {
          text: titleText,
          font: {
            size: 24,
          },
          y: 0.9,
          yanchor: 'top',
        },
        xaxis: {
          showgrid: false,
        },
        yaxis: {
          showgrid: false,
          side: 'right',
        },
        shapes: [
          {
            type: 'line',
            x0: 2024.5,
            y0: -0.1,
            x1: 2024.5,
            y1: 1.1,
            yref: 'paper',
            line: {
              color: '#333333',
              width: 2,
            },
          },
        ],
        annotations: [
          {
            x: 2024.5 - annotationOffset,
            y: 1.1,
            xref: 'x',
            yref: 'paper',
            text: '← Historical',
            showarrow: false,
            font: {
              size: 16,
            },
          },
          {
            x: 2024.5 + annotationOffset,
            y: 1.1,
            xref: 'x',
            yref: 'paper',
            text: 'Projected →',
            showarrow: false,
            font: {
              size: 16,
            },
          },
        ],
        height: 500,
        margin: {
          t: 130,
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

window.addEventListener('resize', () => {
  $Plotly.purge('chart')
  buildChart()
})

watch(latLng, async () => {
  $Plotly.purge('chart')
  dataStore.apiData = null
  dataStore.fetchData('temperatureAnomalies')
})

watch([apiData, modelInput], async () => {
  buildChart()
})

onUnmounted(() => {
  dataStore.apiData = null
})
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">
        Climate Stripes Part 2 (Historical + Projected)
      </h3>
      <Gimme label="Get chart and data for lat/lon point:" />
      <div v-if="latLng">
        <div>
          <div class="parameter mb-5">
            <label for="model" class="label">Model</label>
            <div class="select mr-3">
              <select id="model" v-model="modelInput">
                <option v-for="model in models" :value="model">
                  {{ model }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div id="chart"></div>
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
