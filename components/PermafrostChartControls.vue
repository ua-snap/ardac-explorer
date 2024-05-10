<script lang="ts" setup>
const props = defineProps<{
  defaultMonth?: string
}>()

const placesStore = usePlacesStore()
const chartStore = useChartStore()

const scenarioInput = defineModel({ default: 'RCP 8.5' })
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const chartLabels = computed<HydrologyChartLabels>(
  () => chartStore.labels as HydrologyChartLabels
)

chartStore.labels = {
  scenarios: { 'RCP 4.5': 'RCP 4.5', 'RCP 8.5': 'RCP 8.5' },
}

watch([latLng, scenarioInput], async () => {
  chartStore.inputs = {
    scenario: scenarioInput.value,
  }
})
</script>

<template>
  <div v-if="latLng && chartLabels">
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
