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

const permafrostLayers: MapLayer[] = [
  {
    id: 'pfextent_jorgenson',
    title: 'Permafrost extent (Jorgenson et al., 2008)',
    wmsLayerName: 'permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume',
    legend: 'pfextent_jorgenson',
    style: 'permafrost_beta:permafrost_extent',
    default: true,
  },
  {
    id: 'icevol_jorgenson',
    title: 'Ground ice volume (Jorgenson et al., 2008)',
    wmsLayerName: 'permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume',
    style: 'permafrost_beta:ground_ice_volume',
    legend: 'icevol_jorgenson',
  },

  {
    id: 'pfextent_obu',
    title: 'Permafrost extent (Obu et al., 2018)',
    wmsLayerName: 'permafrost_beta:obu_pf_extent',
    style: 'permafrost_beta:obu_pfextent',
    legend: 'pfextent_obu',
  },
  {
    id: 'obumagt',
    title:
      'Mean annual ground temperature at top of permafrost, 2000-2016 (modeled), Obu 2018',
    wmsLayerName: 'obu_2018_magt',
    style: 'ground_temperature_arctic_eds',
    legend: 'magt',
  },
  {
    id: 'gipl_magt_1m_2021_2050',
    title:
      'Mean annual ground temperature at 1 m depth, 2021-2050 (5-Model Average, RCP 8.5), GIPL model',
    source: 'rasdaman',
    wmsLayerName: 'crrel_gipl_outputs',
    style: 'arctic_eds_gipl_magt1m_nearcentury',
    legend: 'magt',
  },
  {
    id: 'gipl_magt_1m_2071_2100',
    title:
      'Mean annual ground temperature at 1 m depth, 2071&ndash;2100 (5&ndash;Model Average, RCP 8.5), GIPL model',
    source: 'rasdaman',
    wmsLayerName: 'crrel_gipl_outputs',
    style: 'arctic_eds_gipl_magt1m_latecentury',
    legend: 'magt',
  },
]

const permafrostLegend: Record<string, LegendItem[]> = {
  pfextent_jorgenson: [
    { color: '#253494', label: 'Continuous (&gt; 90%)' },
    { color: '#41b6c4', label: 'Discontinuous (50 - 90%)' },
    { color: '#7fcdbb', label: 'Isolated (10 - 50%)' },
    { color: '#c7e9b4', label: 'Sporadic (&lt; 10%)' },
    { color: '#ffffcc', label: 'Unfrozen' },
    { color: '#a5bfdd', label: 'Water' },
    { color: '#edf8fb', label: 'Glacial' },
  ],
  pfextent_obu: [
    { color: '#253494', label: 'Continuous (&gt; 90%)' },
    { color: '#41b6c4', label: 'Discontinuous (50 - 90%)' },
    { color: '#7fcdbb', label: 'Isolated (10 - 50%)' },
    { color: '#c7e9b4', label: 'Sporadic (&lt; 10%)' },
  ],
  magt: [
    { color: '#5e3c99', label: '&lt;25&deg;F' },
    { color: '#b2abd2', label: '&ge;25&deg;F, &lt;30&deg;F' },
    { color: '#f7f7f7', label: '&ge;30&deg;F, &lt;35&deg;F' },
    { color: '#fdb863', label: '&ge;35&deg;F, &lt;40&deg;F' },
    { color: '#e66101', label: '&ge;40&deg;F' },
  ],
  icevol_jorgenson: [
    { color: '#7fc97f', label: 'Unfrozen' },
    { color: '#2171b5', label: 'Low' },
    { color: '#6baed6', label: 'Moderate' },
    { color: '#bdd7e7', label: 'High' },
    { color: '#ffffff', label: 'Glacier' },
    { color: '#beaed4', label: 'Variable' },
  ],
}

const mapId2 = 'permafrost'
mapStore.setLegendItems(mapId2, permafrostLegend)
</script>

<template>
  <h3 class="title is-3">Future precipitation map</h3>

  <MapBlock :mapId="mapId">
    <template v-slot:layers>
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

  <MapBlock mapId="permafrost">
    <template v-slot:layers>
      <h3 class="title is-4">Permafrost</h3>

      <MapLayer mapId="permafrost" :layer="permafrostLayers[0]">
        <template v-slot:title>Permafrost extent</template>
        <template v-slot:subtext>Jorgenson et al., 2008</template>
      </MapLayer>

      <MapLayer mapId="permafrost" :layer="permafrostLayers[1]">
        <template v-slot:title>Ground ice volume</template>
        <template v-slot:subtext>Jorgenson et al., 2008</template>
      </MapLayer>

      <MapLayer mapId="permafrost" :layer="permafrostLayers[2]">
        <template v-slot:title>Permafrost extent</template>
        <template v-slot:subtext>Obu et al., 2018</template>
      </MapLayer>

      <MapLayer mapId="permafrost" :layer="permafrostLayers[3]">
        <template v-slot:title
          >Mean annual ground temperature at top of permafrost</template
        >
        <template v-slot:subtext>2000&ndash;2016, Obu et al., 2018</template>
      </MapLayer>

      <MapLayer mapId="permafrost" :layer="permafrostLayers[4]" default>
        <template v-slot:title>Mean annual ground temperature at 1m</template>
        <template v-slot:subtext
          >2021&ndash;2050, 5-Model Average, RCP 8.5, GIPL model</template
        >
      </MapLayer>

      <MapLayer mapId="permafrost" :layer="permafrostLayers[5]">
        <template v-slot:title>Mean annual ground temperature at 1m</template>
        <template v-slot:subtext
          >2071&ndash;2100, 5-Model Average, RCP 8.5, GIPL model</template
        >
      </MapLayer>
    </template>
  </MapBlock>
</template>

<style lang="scss" scoped></style>
