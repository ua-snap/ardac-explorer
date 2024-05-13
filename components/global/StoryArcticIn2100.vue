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
    title: '1980–2009, GFDL-ESM4',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_indicators',
    style: 'ardac_indicator_su_historical_era',
    legend: 'summer_days',
    rasdamanConfiguration: { dim_model: 4, dim_scenario: 0 },
  },
  {
    id: 'indicator_su_midcentury_era',
    title: '2040–2069, GFDL-ESM4, SSP5-8.5',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_indicators',
    style: 'ardac_indicator_su_midcentury_era',
    legend: 'summer_days',
    rasdamanConfiguration: { dim_model: 4, dim_scenario: 4 },
  },
  {
    id: 'indicator_su_latecentury_era',
    title: '2070–2099, GFDL-ESM4, SSP5-8.5',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_indicators',
    style: 'ardac_indicator_su_latecentury_era',
    legend: 'summer_days',
    rasdamanConfiguration: { dim_model: 4, dim_scenario: 4 },
  },
]

const legend: Record<string, LegendItem[]> = {
  summer_days: [
    { color: '#fdd0a2', label: '&ge;1 day, &lt;5 days' },
    { color: '#fdae6b', label: '&ge;5 days, &lt;10 days' },
    { color: '#fd8d3c', label: '&ge;10 days, &lt;20 days' },
    { color: '#e6550d', label: '&ge;20 days, &lt;40 days' },
    { color: '#a63603', label: '&ge;40 days' },
  ],
}

const mapId = 'summer_days'
mapStore.setLegendItems(mapId, legend)

onMounted(() => {
  const community = {
    id: 'AK124',
    name: 'Fairbanks',
    alt_name: '',
    region: 'Alaska',
    country: 'US',
    latitude: 64.8378,
    longitude: -147.716,
    type: 'community',
  }
  // Set the latitude and longitude for Fairbanks
  placesStore.latLng = { lat: community.latitude, lng: community.longitude }

  // Fetch the data for the chart
  dataStore.fetchData('indicatorsCmip6')
})
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">
        The Arctic in 2100: New climate model data for Arctic researchers
      </h3>
      <p class="mb-6">
        Through support from the Department of Energy&apos;s Earth and
        Environmental Systems Sciences Division&apos;s Data Management program
        the University of Alaska Fairbanks (UAF) has established the Arctic
        Climate Data Node (ACDN). The ACDN provides local access to
        <a href="https://pcmdi.llnl.gov/CMIP6/"
          >Coupled Model Intercomparison Project Phase 6</a
        >
        (CMIP6) data and includes associated computational resources required to
        facilitate data transfer, analysis, and evaluation activities as well as
        aid in the development of new derived data products.
      </p>
      <p class="mb-6">
        Access to large distributed data volumes has been a limiting factor for
        researchers in Alaska, which puts them at a disadvantage and represents
        a key hurdle to research advancements. Establishing the ACDN at UAF
        provides never&ndash;before realized local access to cutting-edge global
        climate model data. The ACDN will facilitate the development of new
        research themes, process and mechanistic&ndash;based modeling
        activities, and regional synthesis activities at UAF and within the
        broader Arctic science community. Developing and establishing research
        computing infrastructure to support local storage and access to key
        datasets will provide significant capacity building to the research
        community in Alaska and to Alaska&apos;s rightsholders and stakeholders
        as they address the ongoing challenges of a changing climate.
      </p>
      <p class="mb-6">
        The Arctic Data Collaborative (ADAC) provides researcher access to CMIP6
        data as well as associated utilities and data products. ARDAC has
        curated a suite of CMIP6 models and scenarios that perform best in
        Alaska and the pan-Arctic. This data package includes 13 regridded
        global climate models across 4 emission scenarios for 15 variables.
      </p>

      <h3 class="title is-5">Example Climate Indicator: Summer Days, CMIP6</h3>
      <p class="mb-6">
        Summer days are the number of days per year that are above 77&deg;F. The
        map below shows the 30-year mean of CMIP6 temperature data for three
        eras showing the number of summer days over that era. The historical era
        (1980&ndash;2009) uses model baseline data from the GFDL-ESM4 dataset.
        The mid-century era (2040&ndash;2069) and late-century era
        (2070&ndash;2099) use GFDL-ESM4 data under the climate scenario SSP5-8.5
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
    </div>
    <IndicatorsCmip6ChartControls />
    <IndicatorsCmip6Chart label="Summer days" dataKey="su" />
    &nbsp;
    <h3 class="title is-4">CMIP6 vs CMIP5 data: What&apos;s the big deal?</h3>
    <p class="mb-6">
      The Coupled Model Intercomparison Project (CMIP) is a collaborative
      international effort to improve climate models. The CMIP6 data is the
      latest iteration of this project and includes data from 2014 to 2020. The
      CMIP6 data is more detailed and accurate than the CMIP5 data, which was
      released in 2012. The CMIP6 data includes more models, more variables, and
      more scenarios than the CMIP5 data. This makes the CMIP6 data more useful
      for researchers and policymakers who are studying climate change and its
      impacts.
    </p>
  </section>
</template>

<style scoped></style>
