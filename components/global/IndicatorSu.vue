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
    id: 'indicator_su_historical_era',
    title: 'Historical Summer Days (1980&ndash;2009)',
    source: 'rasdaman',
    wmsLayerName: 'ncar12km_indicators_era_summaries',
    style: 'ardac_indicator_su_historical_era',
    legend: 'summer_days',
  },
  {
    id: 'indicator_su_midcentury_era',
    title: 'Projected Summer Days (2040&ndash;2069)',
    source: 'rasdaman',
    wmsLayerName: 'ncar12km_indicators_era_summaries',
    style: 'ardac_indicator_su_midcentury_era',
    legend: 'summer_days',
  },
  {
    id: 'indicator_su_latecentury_era',
    title: 'Projected Summer Days (2070&ndash;2099)',
    source: 'rasdaman',
    wmsLayerName: 'ncar12km_indicators_era_summaries',
    style: 'ardac_indicator_su_latecentury_era',
    legend: 'summer_days',
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
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Summer Days</h3>
      <p class="mb-6">
        Summer days are the number of days per year that are above 77&deg;F. The
        map below shows the 30-year mean of summer days for three eras. The
        historical era (1980&ndash;2009) uses historical modeled data provided
        by the Daymet model. The mid-century (2040&ndash;2069) and late-century
        (2070&ndash;2099) eras use modeled projections from the NCAR CCSM4 model
        under the RCP 8.5 emissions scenario.
      </p>

      <MapBlock :mapId="mapId" class="mb-6">
        <template v-slot:layers>
          <MapLayer :mapId="mapId" :layer="layers[0]" default>
            <template v-slot:title>1980&ndash;2009, Daymet</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[1]">
            <template v-slot:title
              >2040&ndash;2069, NCAR CCSM4, RCP 8.5</template
            >
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[2]">
            <template v-slot:title
              >2070&ndash;2099, NCAR CCSM4, RCP 8.5</template
            >
          </MapLayer>
        </template>
      </MapBlock>

      <p>
        Enter lat/lon coordinates below to see a chart of summer days for a
        point location. This chart displays min/mean/max values for the
        historical modeled era (1980&ndash;2009) using Daymet and projections
        for the mid-century (2040&ndash;2069) and late-century (2070&ndash;2099)
        eras using both the MRI CGCM3 and NCAR CCSM4 models under two different
        emissions scenarios, RCP 4.5 and RCP 8.5.
      </p>

      <p>
        After entering lat/lon coordinates, links will be provided where you can
        download the data that is used to populate the chart.
      </p>

      <IndicatorsChart label="Summer days" dataKey="su" />

      <div v-if="!latLngEmpty && apiData" class="my-6">
        <h5 class="title is-5">
          Download summer days data for {{ latLng.lat }}, {{ latLng.lng }}
        </h5>
        <p>
          The following download links bundle summer days data with other
          climate indicators. Summer days use the "su" identifier.
        </p>
        <ul>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/indicators/base/point/' +
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
                '/indicators/base/point/' +
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
