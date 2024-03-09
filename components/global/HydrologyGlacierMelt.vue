<script lang="ts" setup>
import { useMapStore } from '~/stores/map'

const store = useStore()
const mapStore = useMapStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const latLng = computed(() => store.latLng)
const latLngEmpty = computed(() => Object.keys(latLng.value).length === 0)
const apiData = computed<any[]>(() => dataStore.apiData)

const layers: MapLayer[] = [
  {
    id: 'indicator_dw_historical_era',
    title: '1980–2009, Daymet',
    source: 'rasdaman',
    wmsLayerName: 'ncar12km_indicators_era_summaries',
    style: 'ardac_indicator_dw_historical_era',
    legend: 'deep_winter_days',
  },
  {
    id: 'indicator_dw_midcentury_era',
    title: '2040–2069, NCAR CCSM4, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'ncar12km_indicators_era_summaries',
    style: 'ardac_indicator_dw_midcentury_era',
    legend: 'deep_winter_days',
  },
  {
    id: 'indicator_dw_latecentury_era',
    title: '2070–2099, NCAR CCSM4, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'ncar12km_indicators_era_summaries',
    style: 'ardac_indicator_dw_latecentury_era',
    legend: 'deep_winter_days',
  },
]

const legend: Record<string, LegendItem[]> = {
  deep_winter_days: [
    { color: '#c6dbef', label: '&ge;1 day, &lt;10 days' },
    { color: '#9ecae1', label: '&ge;10 days, &lt;20 days' },
    { color: '#6baed6', label: '&ge;20 days, &lt;40 days' },
    { color: '#3182bd', label: '&ge;40 days, &lt;80 days' },
    { color: '#08519c', label: '&ge;80 days' },
  ],
}

const mapId = 'deep_winter_days'
mapStore.setLegendItems(mapId, legend)
</script>

<template>
  <section class="section">
    <HydrologyChart label="Glacier Melt" units="㎜" dataKey="glacier_melt" />
  </section>
</template>

<style scoped></style>
