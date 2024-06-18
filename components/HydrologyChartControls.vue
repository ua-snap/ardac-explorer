<script lang="ts" setup>
const props = defineProps<{
  defaultMonth?: string
}>()

const dataStore = useDataStore()
const placesStore = usePlacesStore()
const chartStore = useChartStore()

const scenarioInput = defineModel('scenario', { default: 'rcp85' })
const monthInput = defineModel('month', { default: 'mar' })

if (props.defaultMonth) {
  monthInput.value = props.defaultMonth
}

const apiData = computed<any[]>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const chartLabels = computed<HydrologyChartLabels>(
  () => chartStore.labels as HydrologyChartLabels
)

chartStore.labels = {
  scenarios: {
    rcp45: 'RCP 4.5',
    rcp85: 'RCP 8.5',
  },
  months: {
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
  },
}

watch([latLng, scenarioInput, monthInput], async () => {
  chartStore.inputs = {
    scenario: scenarioInput.value,
    month: monthInput.value,
  }
})
</script>

<template>
  <div v-if="latLng && chartLabels && apiData">
    <div class="parameter">
      <label for="scenario" class="label">Scenario:</label>
      <div class="select mb-5 mr-3">
        <select id="scenario" v-model="scenarioInput">
          <option
            v-for="scenario in Object.keys(chartLabels.scenarios)"
            :value="scenario"
          >
            {{ chartLabels.scenarios[scenario] }}
          </option>
        </select>
      </div>
    </div>
    <div class="parameter mb-5">
      <label for="month" class="label">Month:</label>
      <div class="select">
        <select id="month" v-model="monthInput">
          <option
            v-for="month in Object.keys(chartLabels.months)"
            :value="month"
          >
            {{ chartLabels.months[month] }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.parameter {
  display: inline-block;
  select {
    background-color: $white-lighter;
  }
}
</style>
