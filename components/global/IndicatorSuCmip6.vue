<script lang="ts" setup>
const placesStore = usePlacesStore()
const mapStore = useMapStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const apiData = computed<Record<string, any>>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const layers: MapLayer[] = [
  {
    id: 'indicator_su_historical_era',
    title: '1980–2009, CNRM-CM6-1-HR',
    source: 'rasdaman',
    wmsLayerName: 'new_cmip6_indicators',
    style: 'ardac_indicator_su_historical_era',
    legend: 'su',
  },
]

const legend: Record<string, LegendItem[]> = {
  su: [
    // { color: '#edf8fb', label: '&ge;0㎜, &lt;10㎜' },
    // { color: '#b2e2e2', label: '&ge;10㎜, &lt;20㎜' },
    // { color: '#66c2a4', label: '&ge;20㎜, &lt;30㎜' },
    // { color: '#2ca25f', label: '&ge;30㎜, &lt;40㎜' },
    // { color: '#006d2c', label: '&ge;40㎜' },
  ],
}

const mapId = 'su'
mapStore.setLegendItems(mapId, legend)
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Summer Days, CMIP6</h3>

      <p>
        Enter lat/lon coordinates below to see a chart of summer days for a
        point location. This chart displays annual min/mean/max values for
        modeled historical and projected decades for ten models and four
        scenarios. After entering lat/lon coordinates, links will be provided
        where you can download the data that is used to populate the chart.
      </p>

      <MapBlock :mapId="mapId" class="mb-6">
        <template v-slot:layers>
          <MapLayer :mapId="mapId" :layer="layers[0]" default>
            <template v-slot:title>{{ layers[0].title }}</template>
          </MapLayer>
        </template>
      </MapBlock>

      <Gimme />
      <IndicatorsCmip6ChartControls />
      <IndicatorsCmip6Chart label="Summer days" dataKey="su" />

      <div v-if="latLng && apiData" class="my-6">
        <h4 class="title is-4">
          Download summer days data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <p>
          The following download links bundle summer days data with other
          climate indicators. Summer days use the "su" identifier.
        </p>
        <ul>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/indicators/cmip6/point/' +
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
                '/indicators/cmip6/point/' +
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
