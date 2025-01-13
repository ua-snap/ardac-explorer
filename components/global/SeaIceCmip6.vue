<script lang="ts" setup>
const placesStore = usePlacesStore()
const mapStore = useMapStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const apiData = computed<Record<string, any>>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const layers: MapLayer[] = [
  {
    id: 'siconc_cmip6_1950',
    title: 'March 1950, MIROC6',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_monthly_cryo_test',
    style: 'ardac_siconc',
    legend: 'siconc',
    rasdamanConfiguration: {
      dim_model: 7,
      dim_scenario: 0,
      time: '1950-03-15T12:00:00.000Z',
    },
    coastline: true,
  },
  {
    id: 'siconc_cmip6_1975',
    title: 'March 1975, MIROC6',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_monthly_cryo_test',
    style: 'ardac_siconc',
    legend: 'siconc',
    rasdamanConfiguration: {
      dim_model: 7,
      dim_scenario: 0,
      time: '1975-03-15T12:00:00.000Z',
    },
    coastline: true,
  },
  {
    id: 'siconc_cmip6_2000',
    title: 'March 2000, MIROC6',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_monthly_cryo_test',
    style: 'ardac_siconc',
    legend: 'siconc',
    rasdamanConfiguration: {
      dim_model: 7,
      dim_scenario: 0,
      time: '2000-03-15T12:00:00.000Z',
    },
    coastline: true,
  },
  {
    id: 'siconc_cmip6_2025',
    title: 'March 2025, MIROC6',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_monthly_cryo_test',
    style: 'ardac_siconc',
    legend: 'siconc',
    rasdamanConfiguration: {
      dim_model: 7,
      dim_scenario: 4,
      time: '2025-03-15T12:00:00.000Z',
    },
    coastline: true,
  },
  {
    id: 'siconc_cmip6_2050',
    title: 'March 2050, MIROC6',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_monthly_cryo_test',
    style: 'ardac_siconc',
    legend: 'siconc',
    rasdamanConfiguration: {
      dim_model: 7,
      dim_scenario: 4,
      time: '2050-03-15T12:00:00.000Z',
    },
    coastline: true,
  },
  {
    id: 'siconc_cmip6_2075',
    title: 'March 2075, MIROC6',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_monthly_cryo_test',
    style: 'ardac_siconc',
    legend: 'siconc',
    rasdamanConfiguration: {
      dim_model: 7,
      dim_scenario: 4,
      time: '2075-03-15T12:00:00.000Z',
    },
    coastline: true,
  },
  {
    id: 'siconc_cmip6_2100',
    title: 'March 2100, MIROC6',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_monthly_cryo_test',
    style: 'ardac_siconc',
    legend: 'siconc',
    rasdamanConfiguration: {
      dim_model: 7,
      dim_scenario: 4,
      time: '2100-03-15T12:00:00.000Z',
    },
    coastline: true,
  },
]

const legend: Record<string, LegendItem[]> = {
  siconc: [
    { color: '#f1eef6', label: 'Not Modeled' },
    { color: '#045a8d', label: '0&#37; &ndash; 70&#37;' },
    { color: '#2b8cbe', label: '70&#37; &ndash; 80&#37;' },
    { color: '#74a9cf', label: '80&#37; &ndash; 90&#37;' },
    { color: '#bdc9e1', label: '90&#37; &ndash; 100&#37;' },
  ],
}

const mapId = 'sea_ice_cmip6'
mapStore.setLegendItems(mapId, legend)
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Sea Ice Concentration, CMIP6</h3>
      <p class="mb-6">
        The map below shows modeled sea ice concentration for the month of March
        using the EC-Earth3-Veg model at 25-year intervals from 1950&ndash;2000.
        Intervals from 2025&ndash;2100 are based on the SSP5-8.5 emissions
        scenario.
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
        Enter a location below to see a chart of the total monthly sea ice
        concentration for a point location using the selected model, emissions
        scenario, and month. After entering a location, links will be provided
        where you can download the data that is used to populate the chart.
      </p>

      <Gimme />
      <Cmip6MonthlyChartControls
        defaultModel="MIROC6"
        defaultMonth="03"
        :datasetKeys="['siconc']"
      />
      <Cmip6MonthlyChart
        label="Sea Ice Concentration"
        units="%"
        dataKey="siconc"
      />

      <div v-if="latLng && apiData" class="my-6">
        <h4 class="title is-4">
          Download CMIP6 sea ice concentration data for {{ latLng.lat }},
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
                '?vars=siconc&format=csv'
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
                '?vars=siconc'
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
