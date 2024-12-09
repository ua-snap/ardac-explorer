<script lang="ts" setup>
const placesStore = usePlacesStore()
const mapStore = useMapStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const apiData = computed<any[]>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const layers: MapLayer[] = [
  {
    id: 'precipitation_cmip6_1950',
    title: 'August 1950, EC-Earth3-Veg',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_monthly',
    style: 'ardac_pr',
    legend: 'pr',
    rasdamanConfiguration: {
      dim_model: 2,
      dim_scenario: 0,
      time: '1950-08-15T12:00:00.000Z',
    },
    coastline: true,
  },
  {
    id: 'precipitation_cmip6_1975',
    title: 'August 1975, EC-Earth3-Veg',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_monthly',
    style: 'ardac_pr',
    legend: 'pr',
    rasdamanConfiguration: {
      dim_model: 2,
      dim_scenario: 0,
      time: '1975-08-15T12:00:00.000Z',
    },
    coastline: true,
  },
  {
    id: 'precipitation_cmip6_2000',
    title: 'August 2000, EC-Earth3-Veg',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_monthly',
    style: 'ardac_pr',
    legend: 'pr',
    rasdamanConfiguration: {
      dim_model: 2,
      dim_scenario: 0,
      time: '2000-08-15T12:00:00.000Z',
    },
    coastline: true,
  },
  {
    id: 'precipitation_cmip6_2025',
    title: 'August 2025, EC-Earth3-Veg, SSP5-8.5',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_monthly',
    style: 'ardac_pr',
    legend: 'pr',
    rasdamanConfiguration: {
      dim_model: 2,
      dim_scenario: 4,
      time: '2025-08-15T12:00:00.000Z',
    },
    coastline: true,
  },
  {
    id: 'precipitation_cmip6_2050',
    title: 'August 2050, EC-Earth3-Veg, SSP5-8.5',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_monthly',
    style: 'ardac_pr',
    legend: 'pr',
    rasdamanConfiguration: {
      dim_model: 2,
      dim_scenario: 4,
      time: '2050-08-15T12:00:00.000Z',
    },
    coastline: true,
  },
  {
    id: 'precipitation_cmip6_2075',
    title: 'August 2075, EC-Earth3-Veg, SSP5-8.5',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_monthly',
    style: 'ardac_pr',
    legend: 'pr',
    rasdamanConfiguration: {
      dim_model: 2,
      dim_scenario: 4,
      time: '2075-08-15T12:00:00.000Z',
    },
    coastline: true,
  },
  {
    id: 'precipitation_cmip6_2100',
    title: 'August 2100, EC-Earth3-Veg, SSP5-8.5',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_monthly',
    style: 'ardac_pr',
    legend: 'pr',
    rasdamanConfiguration: {
      dim_model: 2,
      dim_scenario: 4,
      time: '2100-08-15T12:00:00.000Z',
    },
    coastline: true,
  },
]

const legend: Record<string, LegendItem[]> = {
  pr: [
    { color: '#edf8fbff', label: '&ge;0㎜, &lt;50㎜' },
    { color: '#b2e2e2ff', label: '&ge;50㎜, &lt;100㎜' },
    { color: '#66c2a4ff', label: '&ge;100㎜, &lt;150㎜' },
    { color: '#2ca25fff', label: '&ge;150㎜, &lt;200㎜' },
    { color: '#006d2cff', label: '&ge;200㎜' },
  ],
}

const mapId = 'snow_melt'
mapStore.setLegendItems(mapId, legend)

onUnmounted(() => {
  dataStore.apiData = null
})
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Precipitation, CMIP6</h3>
      <p class="mb-6">
        The map below shows modeled total precipitation for the month of August
        using the EC-Earth3-Veg model at 25-year intervals from 1950–2000.
        Intervals from 2025–2100 are based on the SSP5-8.5 emissions scenario.
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
          <MapLayer :mapId="mapId" :layer="layers[3]">
            <template v-slot:title>{{ layers[3].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[4]">
            <template v-slot:title>{{ layers[4].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[5]">
            <template v-slot:title>{{ layers[5].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[6]">
            <template v-slot:title>{{ layers[6].title }}</template>
          </MapLayer>
        </template>
      </MapBlock>

      <p>
        Enter a location below to see a chart of the total monthly precipitation
        for a point location using the selected model, emissions scenario, and
        month. After entering a location, links will be provided where you can
        download the data that is used to populate the chart.
      </p>

      <Gimme />
      <Cmip6MonthlyChartControls defaultMonth="08" :datasetKeys="['pr']" />
      <Cmip6MonthlyChart label="Precipitation" units="㎜" dataKey="pr" />

      <div v-if="latLng && apiData" class="my-6">
        <h4 class="title is-4">
          Download CMIP6 precipitation data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <ul>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/cmip6/point/' +
                latLng.lat +
                '/' +
                latLng.lng +
                '?vars=pr&format=csv'
              "
              >Download as CSV</a
            >
          </li>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/cmip6/point/' +
                latLng.lat +
                '/' +
                latLng.lng +
                '?vars=pr'
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
