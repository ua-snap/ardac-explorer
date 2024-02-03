<script lang="ts" setup>
import { useMapStore } from '~/stores/map'
const mapStore = useMapStore()

const layers: MapLayer[] = [
  {
    id: 'historical_era_precip',
    title: 'Historical Annual Precipitation (1980-2009)',
    source: 'rasdaman',
    wmsLayerName: 'annual_precip_totals_mm',
    style: 'precip_mm_historical_era',
    legend: 'precipitation',
    default: true,
  },
  {
    id: 'midcentury_era_precip',
    title:
      'Projected Mid-Century Annual Precipitation (2040-2069, NCAR CCSM4, RCP 8.5)',
    source: 'rasdaman',
    wmsLayerName: 'annual_precip_totals_mm',
    style: 'precip_mm_midcentury_era',
    legend: 'precipitation',
  },
  {
    id: 'historical_mean_annual_snowfall',
    title: 'Historical Annual Snowfall (1910-1919)',
    source: 'rasdaman',
    wmsLayerName: 'mean_annual_snowfall_mm',
    rasdamanConfiguration: {
      dim_model: 0,
      dim_scenario: 0,
      dim_decade: 0,
    },
    style: 'snowfall_mm',
    legend: 'snowfall',
  },
  {
    id: 'future_mean_annual_snowfall',
    title: 'Projected Annual Snowfall (2090-2099, NCAR CCSM4, RCP 8.5)',
    source: 'rasdaman',
    wmsLayerName: 'mean_annual_snowfall_mm',
    rasdamanConfiguration: {
      dim_model: 5,
      dim_scenario: 3,
      dim_decade: 18,
    },
    style: 'snowfall_mm',
    legend: 'snowfall',
  },
  {
    id: 'historical_wet_days_per_year',
    title: 'Historical Wet Days Per Year (1980-2009)',
    source: 'rasdaman',
    wmsLayerName: 'wet_days_per_year',
    style: 'arctic_eds_historical_wet_days_per_year',
    legend: 'wet_days_per_year',
  },
  {
    id: 'projected_wet_days_per_year',
    title: 'Projected Wet Days Per Year (2040-2069, NCAR CCSM4, RCP 8.5)',
    source: 'rasdaman',
    wmsLayerName: 'wet_days_per_year',
    style: 'arctic_eds_projected_wet_days_per_year',
    legend: 'wet_days_per_year',
  },
]

const legend: Record<string, LegendItem[]> = {
  precipitation: [
    { color: '#8c510a', label: '&ge;0in, &lt;10in' },
    { color: '#d8b365', label: '&ge;10in, &lt;20in' },
    { color: '#f6e8c3', label: '&ge;20in, &lt;50in' },
    { color: '#c7eae5', label: '&ge;50in, &lt;100in' },
    { color: '#5ab4ac', label: '&ge;100in, &lt;200in' },
    { color: '#01665e', label: '&ge;200in' },
  ],
  snowfall: [
    { color: '#edf8fb', label: '&ge;0in, &lt;2.5in' },
    { color: '#bfd3e6', label: '&ge;2.5in, &lt;5in' },
    { color: '#9ebcda', label: '&ge;5in, &lt;10in' },
    { color: '#8c96c6', label: '&ge;10in, &lt;20in' },
    { color: '#8856a7', label: '&ge;20in, &lt;50in' },
    { color: '#810f7c', label: '&ge;50in' },
  ],
  wet_days_per_year: [
    { color: '#edf8fb', label: '&ge;0 days, &lt;60 days' },
    { color: '#ccece6', label: '&ge;60 days, &lt;120 days' },
    { color: '#99d8c9', label: '&ge;120 days, &lt;180 days' },
    { color: '#66c2a4', label: '&ge;180 days' },
  ],
}
const mapId = 'precipitation'
mapStore.setLegendItems(mapId, legend)
</script>

<template>
  <h3 class="title is-3">Future precipitation map</h3>

  <MapBlock :mapId="mapId">
    <template v-slot:layers>
      <h3 class="title is-4">Precipitation</h3>

      <MapLayer :mapId="mapId" :layer="layers[0]" default>
        <template v-slot:title>Total annual precipitation, historical</template>
        <template v-slot:subtext>1980&ndash;2009, CRU TS 4.0</template>
      </MapLayer>

      <MapLayer :mapId="mapId" :layer="layers[1]">
        <template v-slot:title>Total annual precipitation, projected</template>
        <template v-slot:subtext>2040&ndash;2069, NCAR CCSM4, RCP 8.5</template>
      </MapLayer>

      <MapLayer :mapId="mapId" :layer="layers[2]">
        <template v-slot:title>Total annual snowfall, historical</template>
        <template v-slot:subtext>1910&ndash;1919, CRU TS 3.1</template>
      </MapLayer>

      <MapLayer :mapId="mapId" :layer="layers[3]">
        <template v-slot:title>Total annual snowfall, projected</template>
        <template v-slot:subtext>2090&ndash;2099, NCAR CCSM4, RCP 8.5</template>
      </MapLayer>

      <MapLayer :mapId="mapId" :layer="layers[4]">
        <template v-slot:title>Wet days per year, historical</template>
        <template v-slot:subtext>1980&ndash;2009, ERA-Interim</template>
      </MapLayer>

      <MapLayer :mapId="mapId" :layer="layers[5]">
        <template v-slot:title>Wet days per year, projected</template>
        <template v-slot:subtext>2040&ndash;2069, NCAR CCSM4, RCP 8.5</template>
      </MapLayer>
    </template>
  </MapBlock>
</template>

<style lang="scss" scoped></style>
