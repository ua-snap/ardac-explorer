<script lang="ts" setup>
const placesStore = usePlacesStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const apiData = computed<Record<string, any>>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Maximum 1-day Precipitation, CMIP6</h3>

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
        units="㎜"
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
