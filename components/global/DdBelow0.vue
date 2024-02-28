<script lang="ts" setup>
import { useMapStore } from '~/stores/map'

const store = useStore()
const mapStore = useMapStore()
const runtimeConfig = useRuntimeConfig()

const latLng = computed(() => store.latLng)
const latLngEmpty = computed(() => Object.keys(latLng.value).length === 0)

const layers: MapLayer[] = [
  {
    id: 'dd_below_0_historical_era',
    title: 'Historical Degree Days Below 0&deg;F (1980&ndash;2009)',
    source: 'rasdaman',
    wmsLayerName: 'degree_days_below_zero',
    style: 'ardac_dd_below_0_historical_era',
    legend: 'dd_below_0',
  },
  {
    id: 'dd_below_0_midcentury_era',
    title: 'Projected Degree Days Below 0&deg;F (2040&ndash;2069)',
    source: 'rasdaman',
    wmsLayerName: 'degree_days_below_zero',
    style: 'ardac_dd_below_0_midcentury_era',
    legend: 'dd_below_0',
  },
  {
    id: 'dd_below_0_latecentury_era',
    title: 'Projected Degree Days Below 0&deg;F (2070&ndash;2099)',
    source: 'rasdaman',
    wmsLayerName: 'degree_days_below_zero',
    style: 'ardac_dd_below_0_latecentury_era',
    legend: 'dd_below_0',
  },
]

const legend: Record<string, LegendItem[]> = {
  dd_below_0: [
    { color: '#c6dbef', label: '&ge;0 F&sdot;days, &lt;200 F&sdot;days' },
    { color: '#9ecae1', label: '&ge;200 F&sdot;days, &lt;400 F&sdot;days' },
    { color: '#6baed6', label: '&ge;400 F&sdot;days, &lt;600 F&sdot;days' },
    { color: '#3182bd', label: '&ge;600 F&sdot;days, &lt;800 F&sdot;days' },
    { color: '#08519c', label: '&ge;800 F&sdot;days' },
  ],
}

const mapId = 'dd_below_0'
mapStore.setLegendItems(mapId, legend)
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Degree Days Below 0&deg;F</h3>
      <p class="mb-6">
        The map below shows the 30-year mean of degree days below 0&deg;F for
        three eras. The historical era (1980&ndash;2009) uses historical modeled
        data provided by the ERA-Interim model. The mid century
        (2040&ndash;2069) and late century (2070&ndash;2099) eras use modeled
        projections from the NCAR CCSM4 model under the RCP 8.5 emissions
        scenario.
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
        Enter lat/lon coordinates below to see a chart of degree days below
        0&deg;F for a point location. This chart displays min/mean/max values
        for historical decades using the ERA-Interim model and projected decades
        using both the GFDL CM3 and NCAR CCSM4 models under the RCP 8.5
        emissions scenario.
      </p>

      <p>
        After entering lat/lon coordinates, links will be provided where you can
        download the data that is used to populate the chart.
      </p>

      <DegreeDaysChart
        endpoint="degreeDaysBelow0"
        label="Degree days below 0&deg;F"
      />

      <div v-if="!latLngEmpty" class="my-6">
        <h5 class="title is-5">
          Download degree days below 0&deg;F data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h5>
        <ul>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/degree_days/below_zero/' +
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
                '/degree_days/below_zero/' +
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
