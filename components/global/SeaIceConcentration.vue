<script lang="ts" setup>
const placesStore = usePlacesStore()
const mapStore = useMapStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const { $Plotly, $_ } = useNuxtApp()
import type { Data } from 'plotly.js-dist-min'

const monthInput = defineModel('month', { default: '3' })

const apiData = computed<Record<string, any>>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const years = $_.range(1850, 2021)

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const layers: MapLayer[] = [
  {
    id: 'sea_ice_concentration_1850',
    title: 'March, 1850',
    source: 'rasdaman',
    wmsLayerName: 'hsia_arctic_production',
    style: 'ardac_sea_ice_concentration_1850',
    legend: 'sea_ice_concentration',
  },
  {
    id: 'sea_ice_concentration_1875',
    title: 'March, 1875',
    source: 'rasdaman',
    wmsLayerName: 'hsia_arctic_production',
    style: 'ardac_sea_ice_concentration_1875',
    legend: 'sea_ice_concentration',
  },
  {
    id: 'sea_ice_concentration_1900',
    title: 'March, 1900',
    source: 'rasdaman',
    wmsLayerName: 'hsia_arctic_production',
    style: 'ardac_sea_ice_concentration_1900',
    legend: 'sea_ice_concentration',
  },
  {
    id: 'sea_ice_concentration_1925',
    title: 'March, 1925',
    source: 'rasdaman',
    wmsLayerName: 'hsia_arctic_production',
    style: 'ardac_sea_ice_concentration_1925',
    legend: 'sea_ice_concentration',
  },
  {
    id: 'sea_ice_concentration_1950',
    title: 'March, 1950',
    source: 'rasdaman',
    wmsLayerName: 'hsia_arctic_production',
    style: 'ardac_sea_ice_concentration_1950',
    legend: 'sea_ice_concentration',
  },
  {
    id: 'sea_ice_concentration_1975',
    title: 'March, 1975',
    source: 'rasdaman',
    wmsLayerName: 'hsia_arctic_production',
    style: 'ardac_sea_ice_concentration_1975',
    legend: 'sea_ice_concentration',
  },
  {
    id: 'sea_ice_concentration_2000',
    title: 'March, 2000',
    source: 'rasdaman',
    wmsLayerName: 'hsia_arctic_production',
    style: 'ardac_sea_ice_concentration_2000',
    legend: 'sea_ice_concentration',
  },
]

const legend: Record<string, LegendItem[]> = {
  sea_ice_concentration: [
    { color: '#084594', label: '&ge;0%, &lt;20%' },
    { color: '#2171b5', label: '&ge;20%, &lt;40%' },
    { color: '#4292c6', label: '&ge;40%, &lt;60%' },
    { color: '#6baed6', label: '&ge;60%, &lt;80%' },
    { color: '#9ecae1', label: '&ge;80%' },
  ],
}

const mapId = 'sea_ice_concentration'
mapStore.setLegendItems(mapId, legend)

const buildChart = () => {
  if (apiData.value) {
    let traces: Data[] = []
    let values: number[] = []

    years.forEach((year: number) => {
      let paddedMonth = monthInput.value.toString().padStart(2, '0')
      let yearAndMonth = year.toString() + '-' + paddedMonth
      values.push(apiData.value[yearAndMonth])
    })

    traces.push({
      x: years,
      y: values,
      mode: 'lines',
      type: 'scatter',
      marker: {
        size: 8,
      },
    })

    $Plotly.newPlot(
      'chart',
      traces,
      {
        title: {
          text:
            'Sea ice concentration for ' +
            latLng.value?.lat +
            ', ' +
            latLng.value?.lng +
            '<br />' +
            'Month: ' +
            months[parseInt(monthInput.value) - 1],
          font: {
            size: 24,
          },
        },
        xaxis: {
          title: {
            text: 'Year',
            font: {
              size: 18,
            },
          },
          showgrid: false,
        },
        yaxis: {
          showgrid: false,
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

watch(latLng, async () => {
  $Plotly.purge('chart')
  dataStore.apiData = null
  dataStore.fetchData('seaIceConcentration')
})

watch([apiData, monthInput], async () => {
  if (apiData.value) {
    buildChart()
  }
})

onUnmounted(() => {
  dataStore.apiData = null
})
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Sea Ice Concentration</h3>
      <p class="mb-6">
        The map below shows pan-Arctic sea ice concentration for March at
        25-year intervals from 1980&ndash;2000.
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
        Enter lat/lon coordinates below to see a chart of sea ice concentration
        for a point location over time. After entering lat/lon coordinates,
        links will be provided where you can download the data that is used to
        populate the chart.
      </p>

      <!-- TODO: Put some thought into the bbox. -->
      <Gimme
        label="Get chart and data for lat/lon point:"
        :bbox="[-179.1506, 0, -129.9795, 90]"
      />

      <div v-if="latLng && apiData">
        <div class="parameter">
          <label for="year" class="label">Month:</label>
          <div class="select mb-5 mr-3">
            <select id="year" v-model="monthInput">
              <option
                v-for="month in months"
                :value="months.indexOf(month) + 1"
              >
                {{ month }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div id="chart"></div>
      <div v-if="latLng && apiData" class="my-6">
        <h4 class="title is-4">
          Download sea ice concentration data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <ul>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/seaice/point/' +
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
                '/seaice/point/' +
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
.parameter {
  display: inline-block;
  select {
    background-color: $white-lighter;
  }
}
</style>
