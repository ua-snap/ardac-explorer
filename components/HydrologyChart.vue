<script lang="ts" setup>
const props = defineProps<{
  label: string
  units?: string
  dataKey: string
}>()

import type { Data } from 'plotly.js-dist-min'

const { $Plotly, $_ } = useNuxtApp()
const store = useStore()
const dataStore = useDataStore()

const scenarioInput = defineModel('duration', { default: 'rcp85' })
const monthInput = defineModel('month', { default: 'jun' })

const apiData = computed<any[]>(() => dataStore.apiData)
const dataError = computed<boolean>(() => dataStore.dataError)
const latLng = computed<LatLng>(() => store.latLng)
const errorMsg = ref('')

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
    const decades: string[] = [
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
    const models = ['CanESM2', 'GFDL-ESM2M', 'CCSM4']
    let traces: Data[] = []
    let offsets: Record<string, number> = {
      CanESM2: -0.05,
      'GFDL-ESM2M': 0.0,
      CCSM4: 0.05,
    }
    let symbols: Record<string, string> = {
      CanESM2: 'circle',
      'GFDL-ESM2M': 'square',
      CCSM4: 'diamond',
    }
    let ticks: number[] = $_.range(1, decades.length + 1)

    let chartData = dataStore.apiData
    let values: Array<number | null> = []

    models.forEach(model => {
      values = []

      // Offset the chart markers/bars slightly so they don't overlap.
      // Omit the first tick mark because it's just the placeholder for the
      // 0 x-axis position, where the y-axis line is drawn.
      let offsetTicks = ticks.slice(1).map(tick => tick + offsets[model])

      decades.forEach(decade => {
        values.push(
          chartData[model][scenarioInput.value][monthInput.value][decade][
            props.dataKey
          ]
        )
      })

      traces.push({
        x: offsetTicks,
        y: values,
        mode: 'markers',
        type: 'scatter',
        name: model,
        marker: {
          symbol: Array(ticks.length).fill(symbols[model]),
          size: 8,
        },
      })
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
            store.latLng.lat +
            ', ' +
            store.latLng.lng +
            '<br />' +
            'Scenario: ' +
            scenarioLabels[scenarioInput.value] +
            ', Month: ' +
            monthLabels[monthInput.value],
          font: {
            size: 24,
          },
        },
        xaxis: {
          // Pad x-axis with one null to avoid overlapping y-axis line.
          tickvals: ([null] as Array<number | null>).concat(ticks),
          ticktext: [''].concat(decades),
          dtick: 1,
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
  errorMsg.value = ''
  $Plotly.purge('chart')
  dataStore.fetchData('hydrology')
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
  <LatLngSelector
    label="Get chart and data for lat/lon point:"
    :errorMsg="errorMsg"
  />
  <div v-if="apiData">
    <div class="parameter mr-5 mb-5">
      <label for="scenario" class="label">Scenario:</label>
      <div id="scenario" class="control mb-5">
        <label class="radio mr-3">
          <input
            type="radio"
            name="scenario"
            value="rcp45"
            v-model="scenarioInput"
          />
          RCP 4.5
        </label>
        <label class="radio mr-3">
          <input
            type="radio"
            name="scenario"
            value="rcp85"
            v-model="scenarioInput"
          />
          RCP 8.5
        </label>
      </div>
    </div>
    <div class="parameter">
      <label for="return-interval" class="label">Month:</label>
      <div class="select">
        <select id="return-interval" v-model="monthInput">
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
