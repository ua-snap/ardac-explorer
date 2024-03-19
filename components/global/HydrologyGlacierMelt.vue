<script lang="ts" setup>
import type { Data } from 'plotly.js-dist-min'

const { $Plotly, $_ } = useNuxtApp()
const placesStore = usePlacesStore()
const mapStore = useMapStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const apiData = computed<any[]>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const layers: MapLayer[] = [
  {
    id: 'glacier_melt_historical_era',
    title: '1980–2009, CanESM2, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'hydrology',
    style: 'ardac_glacier_melt_historical_era',
    legend: 'glacier_melt',
  },
  {
    id: 'glacier_melt_midcentury_era',
    title: '2040–2069, CanESM2, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'hydrology',
    style: 'ardac_glacier_melt_midcentury_era',
    legend: 'glacier_melt',
  },
  {
    id: 'glacier_melt_latecentury_era',
    title: '2070–2099, CanESM2, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'hydrology',
    style: 'ardac_glacier_melt_latecentury_era',
    legend: 'glacier_melt',
  },
]

const legend: Record<string, LegendItem[]> = {
  glacier_melt: [
    { color: '#9ecae1', label: '&ge;0m, &lt;5m' },
    { color: '#6baed6', label: '&ge;5m, &lt;10m' },
    { color: '#4292c6', label: '&ge;10m, &lt;15m' },
    { color: '#2171b5', label: '&ge;15m, &lt;20m' },
    { color: '#084594', label: '&ge;20m' },
  ],
}

const mapId = 'glacier_melt'
mapStore.setLegendItems(mapId, legend)

onUnmounted(() => {
  dataStore.apiData = null
})
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Glacier Melt</h3>
      <p class="mb-6">
        The map below shows the 30-year mean annual glacier melt for three eras
        using the CanESM2 model under the RCP 8.5 emissions scenario.
      </p>

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

      <p>
        Enter a location below to see a chart of glacier melt for a point
        location for three eras using the CanESM2 model for the selected
        emissions scenario and month. interval. After entering a location, links
        will be provided where you can download the data that is used to
        populate the chart.
      </p>

      <HydrologyChart label="Glacier melt" units="㎜" dataKey="glacier_melt" />

      <div v-if="latLng && apiData" class="my-6">
        <h4 class="title is-4">
          Download glacier melt data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <p>
          The following download links bundle glacier melt data with other
          hydrology data. Glacier melt uses the "glacier_melt" identifier.
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

<style lang="scss" scoped></style>
