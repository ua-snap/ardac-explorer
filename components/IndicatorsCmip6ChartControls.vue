<script lang="ts" setup>
const props = defineProps<{
  defaultMonth?: string
}>()

const dataStore = useDataStore()
const placesStore = usePlacesStore()
const chartStore = useChartStore()

const defaultScenario = 'ssp585'

const modelInput = defineModel('model', { default: 'GFDL-ESM4' })
const scenarioInput = defineModel('scenario', { default: defaultScenario })

const apiData = computed<any[]>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const chartLabels = computed<IndicatorsCmip6ChartLabels>(
  () => chartStore.labels as IndicatorsCmip6ChartLabels
)

chartStore.labels = {
  models: {
    // Restore these models when things are settled
    // CESM2: 'CESM2',
    'CNRM-CM6-1-HR': 'CNRM-CM6-1-HR',
    // 'EC-Earth3-Veg': 'EC-Earth3-Veg',
    'GFDL-ESM4': 'GFDL-ESM4',
    'HadGEM-GC31-LL': 'HadGEM-GC31-LL',
    'HadGEM-GC31-MM': 'HadGEM-GC31-MM',
    'KACE-1-0-G': 'KACE-1-0-G',
    MIROC6: 'MIROC6',
    'MPI-ESM1-2-LR': 'MPI-ESM1-2-LR',
  },
  scenarios: {
    ssp126: 'SSP1-2.6',
    ssp245: 'SSP2-4.5',
    ssp370: 'SSP3-7.0',
    ssp585: 'SSP5-8.5',
  },
}

// Some models do not have data for all scenarios. Use this function to react
// accordingly by graying out scenario options or reverting back to the default
// scenario if user accidentally lands on an invalid model/scenrio combination.
const scenarioPresent = (value: string) => {
  if (apiData.value) {
    return apiData.value[value as any][modelInput.value] != null
  }
}

watch([latLng, modelInput, scenarioInput], async () => {
  if (!scenarioPresent(scenarioInput.value)) {
    scenarioInput.value = defaultScenario
  }
  chartStore.inputs = {
    model: modelInput.value,
    scenario: scenarioInput.value,
  }
})
</script>

<template>
  <div v-if="latLng && chartLabels && apiData">
    <div class="parameter">
      <label for="model" class="label">Model:</label>
      <div class="select mb-5 mr-3">
        <select v-model="modelInput">
          <option
            v-for="(label, value) in chartLabels.models"
            :key="value"
            :value="value"
          >
            {{ label }}
          </option>
        </select>
      </div>
    </div>
    <div class="parameter">
      <label for="scenario" class="label">Scenario:</label>
      <div class="select">
        <select v-model="scenarioInput">
          <option
            v-for="(label, value) in chartLabels.scenarios"
            :key="value"
            :value="value"
            :disabled="!scenarioPresent(value)"
          >
            {{ label }}
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
