<script lang="ts" setup>
const props = defineProps<{
  label: string
  units?: string
  dataKey: string
}>()

import type { Data } from 'plotly.js-dist-min'

const { $Plotly, $_ } = useNuxtApp()
const dataStore = useDataStore()
const placesStore = usePlacesStore()

const scenarioInput = defineModel('scenario', { default: 'rcp85' })
const monthInput = defineModel('month', { default: 'jun' })

const apiData = computed<any[]>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const scenarioLabels: Record<string, string> = {
  rcp45: 'RCP 4.5',
  rcp85: 'RCP 8.5',
}

const monthLabels: Record<string, string> = {
  jan: 'January',
  feb: 'February',
  mar: 'March',
  apr: 'April',
  may: 'May',
  jun: 'June',
  jul: 'July',
  aug: 'August',
  sep: 'September',
  oct: 'October',
  nov: 'November',
  dec: 'December',
}

const buildChart = () => {
  if (apiData.value) {
    let decades = [
      '1950-1959',
      '1960-1969',
      '1970-1979',
      '1980-1989',
      '1990-1999',
      '2000-2009',
      '2010-2019',
      '2020-2029',
      '2030-2039',
      '2040-2049',
      '2050-2059',
      '2060-2069',
      '2070-2079',
      '2080-2089',
      '2090-2099',
    ]

    let traces: Data[] = []
    let chartData = dataStore.apiData
    let means: number[] = []

    decades.forEach(decade => {
      let decadeData =
        chartData['CanESM2'][scenarioInput.value][monthInput.value][decade]
      let mean = decadeData[props.dataKey]
      means.push(mean)
    })

    traces.push({
      x: decades,
      y: means,
      mode: 'markers',
      type: 'scatter',
      name: '',
      marker: {
        size: 8,
      },
    })

    let yAxisLabel = props.label
    if (props.units) {
      yAxisLabel += ' (' + props.units + ')'
    }

    $Plotly.newPlot(
      'chart',
      traces,
      {
        title: {
          text:
            props.label +
            ' for ' +
            placesStore.latLng?.lat +
            ', ' +
            placesStore.latLng?.lng +
            '<br />' +
            'Scenario: ' +
            scenarioLabels[scenarioInput.value] +
            ', Month: ' +
            monthLabels[monthInput.value],
          font: {
            size: 24,
          },
        },
        yaxis: {
          title: {
            text: yAxisLabel,
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

watch([apiData, scenarioInput, monthInput], async () => {
  buildChart()
})

watch(latLng, async () => {
  $Plotly.purge('chart')
  dataStore.fetchData('hydrology')
})

onUnmounted(() => {
  dataStore.apiData = null
})
</script>

<template>
  <Gimme />
  <div v-if="latLng && apiData">
    <div class="parameter">
      <label for="scenario" class="label">Scenario:</label>
      <div class="select mb-5 mr-3">
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
          <option v-for="month in Object.keys(monthLabels)" :value="month">
            {{ monthLabels[month] }}
          </option>
        </select>
      </div>
    </div>
  </div>
  <div id="chart"></div>
</template>

<style lang="scss" scoped>
.parameter {
  display: inline-block;
  select {
    background-color: $white-lighter;
  }
}
</style>
