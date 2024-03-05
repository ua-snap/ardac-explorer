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
    id: 'freezing_index_historical_era',
    title: '1980–2009, Daymet',
    source: 'rasdaman',
    wmsLayerName: 'freezing_index',
    style: 'ardac_freezing_index_historical_era',
    legend: 'freezing_index',
  },
  {
    id: 'freezing_index_midcentury_era',
    title: '2040–2069, NCAR CCSM4, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'freezing_index',
    style: 'ardac_freezing_index_midcentury_era',
    legend: 'freezing_index',
  },
  {
    id: 'freezing_index_latecentury_era',
    title: '2070–2099, NCAR CCSM4, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'freezing_index',
    style: 'ardac_freezing_index_latecentury_era',
    legend: 'freezing_index',
  },
]

const legend: Record<string, LegendItem[]> = {
  freezing_index: [
    { color: '#c6dbef', label: '&ge;0 F&sdot;days, &lt;1000 F&sdot;days' },
    { color: '#9ecae1', label: '&ge;1000 F&sdot;days, &lt;2000 F&sdot;days' },
    { color: '#6baed6', label: '&ge;2000 F&sdot;days, &lt;3000 F&sdot;days' },
    { color: '#3182bd', label: '&ge;3000 F&sdot;days, &lt;4000 F&sdot;days' },
    { color: '#08519c', label: '&ge;4000 F&sdot;days' },
  ],
}

const mapId = 'freezing_index'
mapStore.setLegendItems(mapId, legend)
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Freezing Index</h3>
      <p class="mb-6">
        The freezing index is the number of degree days above freezing per year.
        The map below shows the 30-year mean of the freezing index for three
        eras. The historical era (1980&ndash;2009) uses historical modeled data
        provided by the ERA-Interim model. The mid-century (2040&ndash;2069) and
        late-century (2070&ndash;2099) eras use modeled projections from the
        NCAR CCSM4 model under the RCP 8.5 emissions scenario.
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
        Enter lat/lon coordinates below to see a chart of the freezing index for
        a point location. This chart displays min/mean/max values for historical
        decades using the ERA-Interim model and projected decades using both the
        GFDL CM3 and NCAR CCSM4 models under the RCP 8.5 emissions scenario.
      </p>

      <p>
        After entering lat/lon coordinates, links will be provided where you can
        download the data that is used to populate the chart.
      </p>

      <DegreeDaysChart endpoint="freezingIndex" label="Freezing index" />

      <div v-if="!latLngEmpty && apiData" class="my-6">
        <h4 class="title is-4">
          Download freezing index data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <ul>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/degree_days/freezing_index/' +
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
                '/degree_days/freezing_index/' +
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
