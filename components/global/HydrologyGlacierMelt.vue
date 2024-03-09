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
    id: 'hydrology_glacier_melt_historical_era',
    title: '1980–2009, NCAR CCSM4, RCP 8.5, July',
    source: 'rasdaman',
    wmsLayerName: 'hydrology',
    style: 'ardac_hydrology_glacier_melt_historical_era',
    legend: 'glacier_melt',
  },
  {
    id: 'hydrology_glacier_melt_midcentury_era',
    title: '2040–2069, NCAR CCSM4, RCP 8.5, July',
    source: 'rasdaman',
    wmsLayerName: 'hydrology',
    style: 'ardac_hydrology_glacier_melt_midcentury_era',
    legend: 'glacier_melt',
  },
  {
    id: 'hydrology_glacier_melt_latecentury_era',
    title: '2070–2099, NCAR CCSM4, RCP 8.5, July',
    source: 'rasdaman',
    wmsLayerName: 'hydrology',
    style: 'ardac_hydrology_glacier_melt_latecentury_era',
    legend: 'glacier_melt',
  },
]

const legend: Record<string, LegendItem[]> = {
  glacier_melt: [
    { color: '#c6dbef', label: '&ge;1 day, &lt;10 days' },
    { color: '#9ecae1', label: '&ge;10 days, &lt;20 days' },
    { color: '#6baed6', label: '&ge;20 days, &lt;40 days' },
    { color: '#3182bd', label: '&ge;40 days, &lt;80 days' },
    { color: '#08519c', label: '&ge;80 days' },
  ],
}

const mapId = 'glacier_melt'
mapStore.setLegendItems(mapId, legend)
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Glacier Melt</h3>
      <MapBlock :mapId="mapId" class="mb-6">
        <template v-slot:layers>
          <MapLayer :mapId="mapId" :layer="layers[0]" default>
            <template v-slot:title>{{ layers[0].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[1]">
            <template v-slot:title>{{ layers[1].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[2]">
            <template v-slot:title>{{ layers[2].title }}</template>
          </MapLayer>
        </template>
      </MapBlock>

      <HydrologyChart label="Glacier Melt" units="㎜" dataKey="glacier_melt" />

      <div v-if="!latLngEmpty && apiData" class="my-6">
        <h4 class="title is-4">
          Download glacier melt data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <p>
          The following download links bundle glacier melt data with other
          climate indicators. Glacier melt uses the "glacier_melt" identifier.
        </p>
        <ul>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/hydrology/point/' +
                latLng.lat +
                '/' +
                latLng.lng +
                '?format=csv'
              "
              >Download as CSV</a
            >
          </li>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/hydrology/point/' +
                latLng.lat +
                '/' +
                latLng.lng
              "
              >Download as JSON</a
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
