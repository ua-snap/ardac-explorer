<script lang="ts" setup>
import type { Data } from 'plotly.js-dist-min'

const { $Plotly, $_ } = useNuxtApp()
const placesStore = usePlacesStore()
const mapStore = useMapStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const modelInput = defineModel('model', { default: 'NCAR-CCSM4' })
const scenarioInput = defineModel('scenario', { default: 'rcp85' })
const vegTypeInput = defineModel('vegType', {
  default: 'deciduous_forest',
})

const apiData = computed<any[]>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const models = [
  '5modelAvg',
  'GFDL-CM3',
  'GISS-E2-R',
  'IPSL-CM5A-LR',
  'MRI-CGCM3',
  'NCAR-CCSM4',
]

const scenarioLabels: Record<string, string> = {
  rcp45: 'RCP 4.5',
  rcp60: 'RCP 6.0',
  rcp85: 'RCP 8.5',
}

const vegTypeLabels: Record<string, string> = {
  not_modeled: 'Not Modeled',
  barren_lichen_moss: 'Barren/Lichen/Moss',
  black_spruce: 'Black Spruce',
  deciduous_forest: 'Deciduous Forest',
  graminoid_tundra: 'Graminoid Tundra',
  shrub_tundra: 'Shrub Tundra',
  temperate_rainforest: 'Temperate Rainforest',
  wetland_tundra: 'Wetland Tundra',
  white_spruce: 'White Spruce',
}

const buildChart = () => {
  if (apiData.value) {
    let historicalEras = ['1950-2008']
    let projectedEras = ['2010-2039', '2040-2069', '2070-2099']

    let traces: Data[] = []

    let values: number[] = []
    historicalEras.forEach(era => {
      values.push(
        dataStore.apiData[era]['MODEL-SPINUP']['historical'][vegTypeInput.value]
      )
    })

    traces.push({
      x: historicalEras,
      y: values,
      mode: 'markers',
      type: 'scatter',
      name: 'MODEL-SPINUP',
      marker: {
        symbol: 'circle',
        size: 8,
      },
    })

    values = []
    projectedEras.forEach(era => {
      values.push(
        dataStore.apiData[era][modelInput.value][scenarioInput.value][
          vegTypeInput.value
        ]
      )
    })

    traces.push({
      x: projectedEras,
      y: values,
      mode: 'markers',
      type: 'scatter',
      name: modelInput.value,
      marker: {
        symbol: 'square',
        size: 8,
      },
    })

    $Plotly.newPlot(
      'chart',
      traces,
      {
        title: {
          text:
            'Flammability for ' +
            latLng.value?.lat +
            ', ' +
            latLng.value?.lng +
            '<br />' +
            'Model: ' +
            modelInput.value +
            ', Scenario: ' +
            scenarioLabels[scenarioInput.value],
          font: {
            size: 24,
          },
        },
        yaxis: {
          title: {
            text: vegTypeLabels[vegTypeInput.value] + ' (%)',
            font: {
              size: 18,
            },
          },
        },
      },
      {
        responsive: true, // changes the height / width dynamically for charts
        displayModeBar: true, // always show the camera icon
        displaylogo: false,
        modeBarButtonsToRemove: [
          'zoom2d',
          'pan2d',
          'select2d',
          'lasso2d',
          'zoomIn2d',
          'zoomOut2d',
          'autoScale2d',
          'resetScale2d',
        ],
      }
    )
  }
}

const layers: MapLayer[] = [
  {
    id: 'veg_type_historical_era',
    title: '1950–2008, MODEL-SPINUP',
    source: 'rasdaman',
    wmsLayerName: 'alfresco_vegetation_mode_statistic',
    style: 'ardac_veg_type',
    legend: 'veg_type',
    rasdamanConfiguration: { dim_era: 0, dim_model: 0, dim_scenario: 0 },
  },
  {
    id: 'veg_type_earlycentury_era',
    title: '2010–2039, NCAR-CCSM4, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'alfresco_vegetation_mode_statistic',
    style: 'ardac_veg_type',
    legend: 'veg_type',
    rasdamanConfiguration: { dim_era: 1, dim_model: 5, dim_scenario: 3 },
  },
  {
    id: 'veg_type_midcentury_era',
    title: '2040–2069, NCAR-CCSM4, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'alfresco_vegetation_mode_statistic',
    style: 'ardac_veg_type',
    legend: 'veg_type',
    rasdamanConfiguration: { dim_era: 2, dim_model: 5, dim_scenario: 3 },
  },
  {
    id: 'veg_type_latecentury_era',
    title: '2070–2099, NCAR-CCSM4, RCP 8.5',
    source: 'rasdaman',
    wmsLayerName: 'alfresco_vegetation_mode_statistic',
    style: 'ardac_veg_type',
    legend: 'veg_type',
    rasdamanConfiguration: { dim_era: 3, dim_model: 5, dim_scenario: 3 },
  },
]

const legend: Record<string, LegendItem[]> = {
  veg_type: [
    { color: '#ffffff', label: 'Not Modeled' },
    { color: '#616161', label: 'Barren/Lichen/Moss' },
    { color: '#035500', label: 'Black Spruce' },
    { color: '#dcdc67', label: 'Deciduous Forest' },
    { color: '#b9ba85', label: 'Graminoid Tundra' },
    { color: '#abab02', label: 'Shrub Tundra' },
    { color: '#448844', label: 'Temperate Rainforest' },
    { color: '#7fc5da', label: 'Wetland Tundra' },
    { color: '#51ab00', label: 'White Spruce' },
  ],
}

const mapId = 'veg_type'
mapStore.setLegendItems(mapId, legend)

watch([apiData, modelInput, scenarioInput, vegTypeInput], async () => {
  buildChart()
})

watch(latLng, async () => {
  $Plotly.purge('chart')
  dataStore.fetchData('vegType')
})

onUnmounted(() => {
  dataStore.apiData = null
})
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Vegetation Type</h3>
      <p class="mb-6">
        The map below shows a 5-model mode of ALFRESCO dominant vegetation type
        outputs across four eras. Historical eras show model spinup outputs.
        Projected eras show ALFRESCO vegetation type outputs using five CMIP5
        models under the RCP 8.5 emissions scenario.
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
        </template>
      </MapBlock>

      <p>
        Enter lat/lon coordinates below to see a chart of vegeation types. The
        data shown is not for the lat/lon point itself, but the mean percentage
        of the vegetation type values for the enclosing HUC-12. Historical eras
        show model spinup outputs. Projected eras show ALFRESCO vegetation type
        outputs using the selected model.
      </p>

      <p>
        After entering lat/lon coordinates, links will be provided where you can
        download the data that is used to populate the chart.
      </p>

      <Gimme />

      <div v-if="apiData">
        <div class="chart-input">
          <label for="model" class="label">Model:</label>
          <div class="select mb-5 mr-3">
            <select id="model" v-model="modelInput">
              <option v-for="model in models" :value="model">
                {{ model }}
              </option>
            </select>
          </div>
        </div>
        <div class="chart-input">
          <label for="scenario" class="label">Scenario:</label>
          <div class="select mr-3">
            <select id="scenario" v-model="scenarioInput">
              <option
                v-for="scenario in Object.keys(scenarioLabels)"
                :value="scenario"
              >
                {{ scenarioLabels[scenario] }}
              </option>
            </select>
          </div>
        </div>
        <div class="chart-input">
          <label for="vegetation-type" class="label">Vegetation Type:</label>
          <div class="select mr-3">
            <select id="vegetation-type" v-model="vegTypeInput">
              <option
                v-for="vegType in Object.keys(vegTypeLabels)"
                :value="vegType"
              >
                {{ vegTypeLabels[vegType] }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div id="chart"></div>
      <div v-if="latLng" class="my-6">
        <h4 class="title is-4">
          Download vegetation type data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <ul>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/alfresco/veg_type/local/' +
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
                '/alfresco/veg_type/local/' +
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

<style lang="scss" scoped>
.chart-input {
  display: inline-block;
  select {
    background-color: $white-lighter;
  }
}
</style>
