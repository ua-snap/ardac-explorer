<script lang="ts" setup>
const placesStore = usePlacesStore()
const mapStore = useMapStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const { $Plotly, $_ } = useNuxtApp()
import type { Data } from 'plotly.js-dist-min'

const yearInput = defineModel('snowpack', { default: '2007' })

const apiData = computed<Record<string, any>>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const years = $_.range(1996, 2009)

const layers: MapLayer[] = [
  {
    id: 'landfast_sea_ice_1997',
    title: 'June 1st, 1997',
    source: 'rasdaman',
    wmsLayerName: 'landfast_sea_ice_extent',
    style: 'ardac_landfast_sea_ice_extent',
    legend: 'landfast_sea_ice',
    rasdamanConfiguration: { time: '1997-06-01T00:00:00.000Z' },
  },
  {
    id: 'landfast_sea_ice_1998',
    title: 'June 1st, 1998',
    source: 'rasdaman',
    wmsLayerName: 'landfast_sea_ice_extent',
    style: 'ardac_landfast_sea_ice_extent',
    legend: 'landfast_sea_ice',
    rasdamanConfiguration: { time: '1998-06-01T00:00:00.000Z' },
  },
  {
    id: 'landfast_sea_ice_1999',
    title: 'June 1st, 1999',
    source: 'rasdaman',
    wmsLayerName: 'landfast_sea_ice_extent',
    style: 'ardac_landfast_sea_ice_extent',
    legend: 'landfast_sea_ice',
    rasdamanConfiguration: { time: '1999-06-01T00:00:00.000Z' },
  },
  {
    id: 'landfast_sea_ice_2000',
    title: 'June 1st, 2000',
    source: 'rasdaman',
    wmsLayerName: 'landfast_sea_ice_extent',
    style: 'ardac_landfast_sea_ice_extent',
    legend: 'landfast_sea_ice',
    rasdamanConfiguration: { time: '2000-06-01T00:00:00.000Z' },
  },
  {
    id: 'landfast_sea_ice_2001',
    title: 'June 1st, 2001',
    source: 'rasdaman',
    wmsLayerName: 'landfast_sea_ice_extent',
    style: 'ardac_landfast_sea_ice_extent',
    legend: 'landfast_sea_ice',
    rasdamanConfiguration: { time: '2001-06-01T00:00:00.000Z' },
  },
  {
    id: 'landfast_sea_ice_2002',
    title: 'June 1st, 2002',
    source: 'rasdaman',
    wmsLayerName: 'landfast_sea_ice_extent',
    style: 'ardac_landfast_sea_ice_extent',
    legend: 'landfast_sea_ice',
    rasdamanConfiguration: { time: '2002-06-01T00:00:00.000Z' },
  },
  {
    id: 'landfast_sea_ice_2003',
    title: 'June 1st, 2003',
    source: 'rasdaman',
    wmsLayerName: 'landfast_sea_ice_extent',
    style: 'ardac_landfast_sea_ice_extent',
    legend: 'landfast_sea_ice',
    rasdamanConfiguration: { time: '2003-06-01T00:00:00.000Z' },
  },
  {
    id: 'landfast_sea_ice_2004',
    title: 'June 1st, 2004',
    source: 'rasdaman',
    wmsLayerName: 'landfast_sea_ice_extent',
    style: 'ardac_landfast_sea_ice_extent',
    legend: 'landfast_sea_ice',
    rasdamanConfiguration: { time: '2004-06-01T00:00:00.000Z' },
  },
  {
    id: 'landfast_sea_ice_2005',
    title: 'June 1st, 2005',
    source: 'rasdaman',
    wmsLayerName: 'landfast_sea_ice_extent',
    style: 'ardac_landfast_sea_ice_extent',
    legend: 'landfast_sea_ice',
    rasdamanConfiguration: { time: '2005-06-01T00:00:00.000Z' },
  },
  {
    id: 'landfast_sea_ice_2006',
    title: 'June 1st, 2006',
    source: 'rasdaman',
    wmsLayerName: 'landfast_sea_ice_extent',
    style: 'ardac_landfast_sea_ice_extent',
    legend: 'landfast_sea_ice',
    rasdamanConfiguration: { time: '2006-06-01T00:00:00.000Z' },
  },
  {
    id: 'landfast_sea_ice_2007',
    title: 'June 1st, 2007',
    source: 'rasdaman',
    wmsLayerName: 'landfast_sea_ice_extent',
    style: 'ardac_landfast_sea_ice_extent',
    legend: 'landfast_sea_ice',
    rasdamanConfiguration: { time: '2007-06-01T00:00:00.000Z' },
  },
]

const legend: Record<string, LegendItem[]> = {
  landfast_sea_ice: [{ color: '#0000FF', label: 'Sea Ice' }],
}

const mapId = 'landfast_sea_ice'
mapStore.setLegendItems(mapId, legend)

const buildChart = () => {
  // Package the data into a 2D array (months x days) for the heatmap chart.
  // 0 = sea ice absent
  // 1 = sea ice present
  // 2 = no data
  // 3 = grid padding for invalid dates
  let dataByMonth: number[][] = []
  for (let month = 1; month < 13; month++) {
    let monthData: number[] = []
    let daysInMonth = new Date(parseInt(yearInput.value), month, 0).getDate()
    let paddedMonth = month.toString().padStart(2, '0')
    for (let dayOfMonth = 1; dayOfMonth < daysInMonth + 1; dayOfMonth++) {
      let paddedDay = dayOfMonth.toString().padStart(2, '0')
      let date = `${paddedMonth}-${paddedDay}-${yearInput.value}`
      if (!apiData.value.hasOwnProperty(date)) {
        monthData.push(2)
        continue
      }
      let data = parseInt(apiData.value[date])
      if (data == 1) {
        monthData.push(1)
      } else {
        monthData.push(0)
      }
    }
    let paddingLength = Math.abs(31 - daysInMonth)
    let monthPadding = $_.fill(Array(paddingLength), 3, 0, paddingLength)
    monthData = monthData.concat(monthPadding)
    dataByMonth.push(monthData)
  }

  let abbreviatedMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  // Reverse these arrays so they are ordered correctly on chart.
  abbreviatedMonths = abbreviatedMonths.reverse()
  dataByMonth = dataByMonth.reverse()

  // Create hover labels for each data point and pass them into the chart
  // using the "customdata" property to give us more conditional logic.
  // Mostly, this just allows us to hide non-existent dates for placeholder
  // cells in the heatmap so we don't have labels like "Feb 31: No data".
  let dataLabels: string[][] = []
  for (let i = 0; i < dataByMonth.length; i++) {
    dataLabels[i] = Array(31)
    for (let j = 0; j < dataByMonth[i].length; j++) {
      let dayofMonth = j + 1
      if (dataByMonth[i][j] == 0) {
        dataLabels[i][j] =
          abbreviatedMonths[i] + ' ' + dayofMonth + ': No sea ice present'
      } else if (dataByMonth[i][j] == 1) {
        dataLabels[i][j] =
          abbreviatedMonths[i] + ' ' + dayofMonth + ': Sea ice present'
      } else if (dataByMonth[i][j] == 2) {
        dataLabels[i][j] = abbreviatedMonths[i] + ' ' + dayofMonth + ': No data'
      } else {
        dataLabels[i][j] = 'Invalid date'
      }
    }
  }

  let plotData = [
    {
      x: $_.range(1, 31),
      y: abbreviatedMonths,
      z: dataByMonth,
      type: 'heatmap',
      colorscale: [
        [0.0, 'rgb(255,255,255)'],
        [0.33, 'rgb(0,0,255)'],
        [0.66, 'rgb(180,180,180)'],
        [1.0, 'rgb(96,96,96)'],
      ],
      showscale: false,
      xgap: 2,
      ygap: 2,
      zmin: 0,
      zmax: 3,
      hovertemplate: '%{customdata}<extra></extra>',
      customdata: dataLabels,
    } satisfies Data,
  ]

  $Plotly.newPlot(
    'chart',
    plotData,
    {
      title: {
        text:
          'Landfast sea ice for ' +
          latLng.value?.lat +
          ', ' +
          latLng.value?.lng +
          '<br />' +
          'Year: ' +
          yearInput.value,
        font: {
          size: 24,
        },
      },
      xaxis: {
        title: {
          text: 'Day of the month',
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

watch(latLng, async () => {
  $Plotly.purge('chart')
  dataStore.apiData = null
  dataStore.fetchData('landfastSeaIce')
})

watch([apiData, yearInput], async () => {
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
      <h3 class="title is-3">Landfast Sea Ice Extent</h3>
      <p class="mb-6">
        The map below shows landfast sea ice extent for June 1st from
        1997&ndash;2007.
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
          <MapLayer :mapId="mapId" :layer="layers[7]">
            <template v-slot:title>{{ layers[7].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[8]">
            <template v-slot:title>{{ layers[8].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[9]">
            <template v-slot:title>{{ layers[9].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[10]">
            <template v-slot:title>{{ layers[10].title }}</template>
          </MapLayer>
        </template>
      </MapBlock>

      <p>
        Enter lat/lon coordinates below to see a chart of landfast sea ice
        presence for a point location over time. After entering lat/lon
        coordinates, links will be provided where you can download the data that
        is used to populate the chart.
      </p>

      <!-- TODO: Put some thought into the bbox. -->
      <Gimme
        label="Get chart and data for lat/lon point:"
        :bbox="[-179.1506, 0, -129.9795, 90]"
      />

      <div v-if="latLng && apiData">
        <div class="parameter">
          <label for="year" class="label">Year:</label>
          <div class="select mb-5 mr-3">
            <select id="year" v-model="yearInput">
              <option v-for="year in years" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div id="chart"></div>
      <div v-if="latLng && apiData" class="my-6">
        <h4 class="title is-4">
          Download landfast sea ice data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <ul>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/landfastice/point/' +
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
                '/landfastice/point/' +
                latLng.lat +
                '/' +
                latLng.lng
              "
              >Download as JSON</a
            >
          </li>
        </ul>
      </div>
      <GetAndUseData apiUrl="https://earthmaps.io/landfastice/" />
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
