<script lang="ts" setup>
const placesStore = usePlacesStore()
const mapStore = useMapStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const apiData = computed<any[]>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const layers: MapLayer[] = [
  {
    id: 'iwe_historical_era',
    title: '1980–2009, CanESM2, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'hydrology',
    style: 'ardac_iwe_historical_era',
    legend: 'iwe',
  },
  {
    id: 'iwe_midcentury_era',
    title: '2040–2069, CanESM2, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'hydrology',
    style: 'ardac_iwe_midcentury_era',
    legend: 'iwe',
  },
  {
    id: 'iwe_latecentury_era',
    title: '2070–2099, CanESM2, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'hydrology',
    style: 'ardac_iwe_latecentury_era',
    legend: 'iwe',
  },
  {
    id: 'swe_historical_era',
    title: '1980–2009, CanESM2, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'hydrology',
    style: 'ardac_swe_historical_era',
    legend: 'swe',
  },
  {
    id: 'swe_midcentury_era',
    title: '2040–2069, CanESM2, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'hydrology',
    style: 'ardac_swe_midcentury_era',
    legend: 'swe',
  },
  {
    id: 'swe_latecentury_era',
    title: '2070–2099, CanESM2, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'hydrology',
    style: 'ardac_swe_latecentury_era',
    legend: 'swe',
  },
]

const legend: Record<string, LegendItem[]> = {
  iwe: [
    { color: '#9ecae1', label: '&ge;0m, &lt;200m' },
    { color: '#6baed6', label: '&ge;200m, &lt;400m' },
    { color: '#4292c6', label: '&ge;400m, &lt;600m' },
    { color: '#2171b5', label: '&ge;600m, &lt;800m' },
    { color: '#084594', label: '&ge;800m' },
  ],
  swe: [
    { color: '#9ecae1', label: '&ge;0㎜, &lt;200㎜' },
    { color: '#6baed6', label: '&ge;200㎜, &lt;400㎜' },
    { color: '#4292c6', label: '&ge;400㎜, &lt;600㎜' },
    { color: '#2171b5', label: '&ge;600㎜, &lt;800㎜' },
    { color: '#084594', label: '&ge;800㎜' },
  ],
}

const mapId = 'iswe'
mapStore.setLegendItems(mapId, legend)

onUnmounted(() => {
  dataStore.apiData = null
})
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Ice/Snow Water Equivalent</h3>
      <p class="mb-6">
        The map below shows the 30-year mean annual ice/snow water equivalent
        for three eras using the CanESM2 model under the RCP 8.5 emissions
        scenario.
      </p>

      <MapBlock :mapId="mapId" class="mb-6">
        <template v-slot:layers>
          <MapLayer :mapId="mapId" :layer="layers[0]" default>
            <template v-slot:title>Ice Water Equivalent</template>
            <template v-slot:subtext>{{ layers[0].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[1]">
            <template v-slot:title>Ice Water Equivalent</template>
            <template v-slot:subtext>{{ layers[1].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[2]">
            <template v-slot:title>Ice Water Equivalent</template>
            <template v-slot:subtext>{{ layers[2].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[3]">
            <template v-slot:title>Snow Water Equivalent</template>
            <template v-slot:subtext>{{ layers[3].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[4]">
            <template v-slot:title>Snow Water Equivalent</template>
            <template v-slot:subtext>{{ layers[4].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[5]">
            <template v-slot:title>Snow Water Equivalent</template>
            <template v-slot:subtext>{{ layers[5].title }}</template>
          </MapLayer>
        </template>
      </MapBlock>

      <p>
        Enter a location below to see a chart of mean annual ice/snow water
        equivalent per decade for a point location using the CanESM2 model and
        the selected emissions scenario and month. After entering a location,
        links will be provided where you can download the data that is used to
        populate the chart.
      </p>

      <Gimme />
      <HydrologyChartControls />
      <HydrologyChart
        label="Ice water equivalent"
        units="㎜"
        dataKey="iwe"
        class="mb-5"
      />
      <HydrologyChart label="Snow water equivalent" units="㎜" dataKey="swe" />

      <div v-if="latLng && apiData" class="my-6">
        <h4 class="title is-4">
          Download ice/snow water equivalent data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <p>
          The following download links bundle ice/snow water equivalent data
          with other hydrology data. Ice water equivalent uses the "iwe"
          identifier and snow water equivalent uses the "swe" identifier.
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
