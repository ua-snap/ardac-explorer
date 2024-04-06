<script lang="ts" setup>
const props = defineProps<{
  defaultMonth?: string
}>()

const placesStore = usePlacesStore()
const chartStore = useChartStore()

const modelInput = defineModel('model', { default: 'GFDL-ESM4' })
const scenarioInput = defineModel('scenario', { default: 'ssp585' })

const latLng = computed<LatLngValue>(() => placesStore.latLng)

const chartLabels = computed<IndicatorsCmip6ChartLabels>(
  () => chartStore.labels as IndicatorsCmip6ChartLabels
)

chartStore.labels = {
  models: {
    'CNRM-CM6-1-HR': 'CNRM-CM6-1-HR',
    'EC-Earth3-Veg': 'EC-Earth3-Veg',
    'GFDL-ESM4': 'GFDL-ESM4',
    'HadGEM-GC31-LL': 'HadGEM-GC31-LL',
    'HadGEM-GC31-MM': 'HadGEM-GC31-MM',
    'KACE-1-0-G': 'KACE-1-0-G',
    MIROC6: 'MIROC6',
    'MPI-ESM1-2-LR': 'MPI-ESM1-2-LR',
    'NorESM2-MM': 'NorESM2-MM',
    TaiESM1: 'TaiESM1',
  },
  scenarios: {
    ssp126: 'SSP1-2.6',
    ssp245: 'SSP2-4.5',
    ssp370: 'SSP3-7.0',
    ssp585: 'SSP5-8.5',
  },
}

watch([latLng, modelInput, scenarioInput], async () => {
  chartStore.inputs = {
    model: modelInput.value,
    scenario: scenarioInput.value,
  }
})
</script>

<template>
  <div v-if="latLng && chartLabels">
    <div class="columns is-multiline">
      <div class="column is-6">
        <div class="parameter">
          <label for="model" class="label">Model:</label>
          <div class="select">
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
      </div>
      <div class="column is-6">
        <div class="parameter">
          <label for="scenario" class="label">Scenario:</label>
          <div class="select">
            <select v-model="scenarioInput">
              <option
                v-for="(label, value) in chartLabels.scenarios"
                :key="value"
                :value="value"
              >
                {{ label }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <HydrologyChart />
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
