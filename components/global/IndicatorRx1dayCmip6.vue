<script lang="ts" setup>
const placesStore = usePlacesStore()
const mapStore = useMapStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const apiData = computed<Record<string, any>>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const layers: MapLayer[] = [
  {
    id: 'indicator_rx1day_historical_era',
    title: '1980–2009, GFDL-ESM4',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_indicators',
    style: 'ardac_indicator_rx1day_historical_era',
    legend: 'rx1day',
    rasdamanConfiguration: { dim_model: 4, dim_scenario: 0 },
    coastline: true,
  },
  {
    id: 'indicator_rx1day_midcentury_era',
    title: '2040–2069, GFDL-ESM4, SSP5-8.5',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_indicators',
    style: 'ardac_indicator_rx1day_midcentury_era',
    legend: 'rx1day',
    rasdamanConfiguration: { dim_model: 4, dim_scenario: 4 },
    coastline: true,
  },
  {
    id: 'indicator_rx1day_latecentury_era',
    title: '2070–2099, GFDL-ESM4, SSP5-8.5',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_indicators',
    style: 'ardac_indicator_rx1day_latecentury_era',
    legend: 'rx1day',
    rasdamanConfiguration: { dim_model: 4, dim_scenario: 4 },
    coastline: true,
  },
]

const legend: Record<string, LegendItem[]> = {
  rx1day: [
    { color: '#edf8fb', label: '&ge;0㎜, &lt;20㎜' },
    { color: '#b2e2e2', label: '&ge;20㎜, &lt;40㎜' },
    { color: '#66c2a4', label: '&ge;40㎜, &lt;60㎜' },
    { color: '#2ca25f', label: '&ge;60㎜, &lt;80㎜' },
    { color: '#006d2c', label: '&ge;80㎜' },
  ],
}

const mapId = 'maximum_1_day_precipitation'
mapStore.setLegendItems(mapId, legend)
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Maximum 1-day Precipitation, CMIP6</h3>
      <p class="mb-6">
        The map below shows the 30-year mean of CMIP6 maximum 1-day
        precipitation for three eras. The historical era (1980&ndash;2009) uses
        historical modeled data provided by the GFDL-ESM4 model. The mid-century
        (2040&ndash;2069) and late-century (2070&ndash;2099) eras use modeled
        projections from the GFDL-ESM4 model under the SSP5-8.5 emissions
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
        </template>
      </MapBlock>

      <p>
        Enter lat/lon coordinates below to see a chart of maximum 1-day
        precipitation for a point location. This chart displays annual
        min/mean/max values for modeled historical and projected decades for ten
        models and four scenarios. After entering lat/lon coordinates, links
        will be provided where you can download the data that is used to
        populate the chart.
      </p>

      <Gimme />
      <IndicatorsCmip6ChartControls />
      <IndicatorsCmip6Chart
        label="Maximum 1-day precipitation"
        units="m"
        dataKey="rx1day"
      />

      <div v-if="latLng && apiData" class="my-6">
        <h4 class="title is-4">
          Download maximum 1-day precipitation data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <p>
          The following download links bundle maximum 1-day precipitation data
          with other climate indicators. Maximum 1-day precipitation uses the
          "rx1day" identifier.
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
