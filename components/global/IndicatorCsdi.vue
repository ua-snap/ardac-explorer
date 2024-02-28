<script lang="ts" setup>
import { useMapStore } from '~/stores/map'

const store = useStore()
const mapStore = useMapStore()
const runtimeConfig = useRuntimeConfig()

const latLng = computed(() => store.latLng)
const latLngEmpty = computed(() => Object.keys(latLng.value).length === 0)

const layers: MapLayer[] = [
  {
    id: 'indicator_csdi_historical_era',
    title: 'Historical Cold Spell Duration Index (1980&ndash;2009)',
    source: 'rasdaman',
    wmsLayerName: 'ncar12km_indicators_era_summaries',
    style: 'ardac_indicator_csdi_historical_era',
    legend: 'csdi',
  },
  {
    id: 'indicator_csdi_midcentury_era',
    title: 'Projected Cold Spell Duration Index (2040&ndash;2069)',
    source: 'rasdaman',
    wmsLayerName: 'ncar12km_indicators_era_summaries',
    style: 'ardac_indicator_csdi_midcentury_era',
    legend: 'csdi',
  },
  {
    id: 'indicator_csdi_latecentury_era',
    title: 'Projected Cold Spell Duration Index (2070&ndash;2099)',
    source: 'rasdaman',
    wmsLayerName: 'ncar12km_indicators_era_summaries',
    style: 'ardac_indicator_csdi_latecentury_era',
    legend: 'csdi',
  },
]

const legend: Record<string, LegendItem[]> = {
  csdi: [
    { color: '#c6dbef', label: '&ge;0, &lt;1' },
    { color: '#9ecae1', label: '&ge;1, &lt;2' },
    { color: '#6baed6', label: '&ge;2, &lt;4' },
    { color: '#3182bd', label: '&ge;4, &lt;8' },
    { color: '#08519c', label: '&ge;8' },
  ],
}

const mapId = 'cold_spell_duration_index'
mapStore.setLegendItems(mapId, legend)
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Cold Spell Duration Index</h3>
      <p class="mb-6">
        The cold spell duration index is the annual count of occurrences of at
        least 5 consecutive days with daily mean 2m air temperature above 90th
        percentile of historical values for the date. The map below shows the
        30-year mean of the cold spell duration index for three eras. The
        historical era (1980&ndash;2009) uses historical modeled data provided
        by the Daymet model. The mid century (2040&ndash;2069) and late century
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
        Enter lat/lon coordinates below to see a chart of the cold spell
        duration index for a point location. This chart displays min/mean/max
        values for the historical modeled era (1980&ndash;2009) using Daymet and
        projections for the mid century (2040&ndash;2069) and late century
        (2070&ndash;2099) eras using both the MRI CGCM3 and NCAR CCSM4 models
        under two different emissions scenarios, RCP 4.5 and RCP 8.5.
      </p>

      <p>
        After entering lat/lon coordinates, links will be provided where you can
        download the data that is used to populate the chart.
      </p>

      <IndicatorsChart label="Cold spell duration index" dataKey="csdi" />

      <div v-if="!latLngEmpty" class="my-6">
        <h5 class="title is-5">
          Download cold spell duration index data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h5>
        <p>
          The following download links bundle cold spell duration index data
          with other climate indicators. Cold spell duration index uses the
          "csdi" identifier.
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
