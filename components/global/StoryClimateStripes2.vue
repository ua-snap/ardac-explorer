<script lang="ts" setup>
// @ts-nocheck
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

let locationMin: number
let locationMax: number

// Get the overall min and max temperature anomalies across all models and
// scenarios for the selected location.
const setLocationMinMax = () => {
  let anomalies = []
  $_.eachDeep(apiData.value, (value, key, parent, context) => {
    // Collect all temperature anomalies from 1900 onward.
    if (
      context.parents.length == 4 &&
      context.parents[2].key == 'temperature_anomalies' &&
      parseInt(key) >= 1900
    ) {
      anomalies.push(value)
    }
  })
  locationMin = $_.min(anomalies)
  locationMax = $_.max(anomalies)
}

const buildChart = () => {
  if (apiData.value) {
    let dataByScenario: number[][] = []
    let allValues: number[] = []
    let maxHistoricalValue: number = 0

    // Get available scenarios for the selected model.
    let availableScenarios = Object.keys(
      apiData.value[modelInput.value]['temperature_anomalies']
    )
    availableScenarios.forEach(scenario => {
      let scenarioData: number[] = []
      let historicalBaseline =
        apiData.value['Berkeley-Earth']['temperature_baseline']
      let projectedBaseline =
        apiData.value[modelInput.value]['temperature_baseline']
      historicalYears.forEach((year: any) => {
        let anomaly =
          apiData.value['Berkeley-Earth']['temperature_anomalies'][
            'historical'
          ][year]
        let absoluteTemperature = anomaly
        absoluteTemperature = parseFloat(absoluteTemperature.toFixed(2))
        scenarioData.push(absoluteTemperature)
        allValues.push(absoluteTemperature)
      })
      maxHistoricalValue = $_.max(scenarioData)
      projectedYears.forEach((year: any) => {
        let anomaly =
          apiData.value[modelInput.value]['temperature_anomalies'][scenario][
            year
          ]
        let absoluteTemperature = anomaly
        absoluteTemperature = parseFloat(absoluteTemperature.toFixed(2))
        scenarioData.push(absoluteTemperature)
        allValues.push(absoluteTemperature)
      })
      dataByScenario.push(scenarioData)
    })

    if (locationMin == undefined || locationMax == undefined) {
      setLocationMinMax()
    }

    let range = locationMax - locationMin
    let redPoint = (maxHistoricalValue - locationMin) / range
    let whitePoint = (0 - locationMin) / range
    let plumPoint = redPoint + (locationMax - maxHistoricalValue) / range / 2

    // Create hover labels for each data point and pass them into the chart
    // using the "customdata" property to give us more conditional logic. This is
    // necessary to hide the "Scenarios" label for historical data.
    let dataLabels: string[][] = []
    for (let i = 0; i < dataByScenario.length; i++) {
      dataLabels[i] = []
      for (let j = 0; j < dataByScenario[i].length; j++) {
        if (dataByScenario[i][j] > 0) {
          dataByScenario[i][j] = '+' + dataByScenario[i][j]
        }
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

    // Calculate step for colorscale legend tick marks.
    let step = 1
    if (range > 10) {
      step = 2
    }
    let tickvals = $_.range(
      Math.floor(locationMin),
      Math.ceil(locationMax) + 1,
      step
    )

    // Add a "+" sign to any tickval that is positive, and set it to ticktext variable.
    let ticktext = tickvals.map((tickval: any) => {
      if (tickval > 0) {
        return '+' + tickval + '°C'
      } else {
        return tickval + '°C'
      }
    })

    let plotData = [
      {
        x: $_.range(startYear, endYear + 1),
        y: Object.values(scenarioLabelsSubset).reverse(),
        z: dataByScenario,
        type: 'heatmap',
        colorscale: [
          [0, 'hsl(223, 97%, 44%)'],
          [whitePoint, 'hsl(0, 0%, 100%)'],
          [redPoint, 'hsl(0, 100%, 50%)'],
          [plumPoint, 'hsl(300, 100%, 35%)'],
          [1, 'hsl(300, 100%, 50%)'],
        ],
        zmin: locationMin,
        zmax: locationMax,
        colorbar: {
          orientation: 'h',
          x: 0.5,
          y: -0.15,
          xanchor: 'center',
          yanchor: 'top',
          tickmode: 'array',
          tickvals: tickvals,
          ticktext: ticktext,
        },
        hovertemplate: '%{customdata}',
        xhoverformat: '.0f',
        hoverlabel: {
          namelength: 0,
        },
        customdata: dataLabels,
      } satisfies Data,
    ]

    let titleText = 'Temperature Change (°C)<br />'
    if (selectedCommunity.value && selectedCommunity.value.name) {
      titleText +=
        selectedCommunity.value.name + ', ' + selectedCommunity.value.region
    } else {
      titleText += latLng.value?.lat + ', ' + latLng.value?.lng
    }
    titleText += ', Model: ' + modelInput.value

    let viewportWidth = window.innerWidth

    // Numbers to be used as the numerator for annotationOffset calculation
    let numerator
    if (viewportWidth > 1500) {
      numerator = 30000
    } else if (viewportWidth > 800) {
      numerator = 17000
    } else {
      numerator = 22000
    }

    let annotationOffset = numerator / viewportWidth

    let footerText =
      "Historical data is provided by Berkeley Earth's Global Monthly Land + Ocean dataset.<br />" +
      'Historical temperature anomalies were calculated from the Berkeley Earth 1951-1980 baseline temperature.<br />' +
      'Projected temperature anomalies were calculated from the ' +
      modelInput.value +
      ' 1951-1980 baseline temperature.'

    $Plotly.newPlot(
      'chart',
      plotData,
      {
        title: {
          text: titleText,
          font: {
            size: 24,
          },
          y: 0.92,
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

          {
            xref: 'paper',
            yref: 'paper',
            x: 0.5,
            y: -0.45,
            xanchor: 'center',
            yanchor: 'top',
            text: footerText,
            showarrow: false,
          },
        ],
        height: 600,
        margin: {
          t: 130,
          b: 200,
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
  dataStore.apiData = undefined
  locationMin = undefined
  locationMax = undefined
  dataStore.fetchData('temperatureAnomalies')
})

watch([apiData, modelInput], async () => {
  buildChart()
})

onUnmounted(() => {
  dataStore.apiData = undefined
})
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">
        Climate Stripes Part 2 (Historical + Projected)
      </h3>
      <Gimme label="Get chart and data for lat/lon point:" />
      <div v-if="apiData">
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
