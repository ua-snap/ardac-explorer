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
      <h3 class="title is-3">Freeze/Thaw Cycle</h3>

      <p>
        Enter lat/lon coordinates below to see a chart of freeze/thaw cycle days
        for a point location. This chart displays annual min/mean/max values for
        modeled historical and projected decades for ten models and four
        scenarios. After entering lat/lon coordinates, links will be provided
        where you can download the data that is used to populate the chart.
      </p>

      <Gimme />
      <IndicatorsCmip6ChartControls />
      <IndicatorsCmip6Chart
        label="Freeze/thaw cycle"
        units="days"
        dataKey="ftc"
      />

      <div v-if="latLng && apiData" class="my-6">
        <h4 class="title is-4">
          Download freeze/thaw cycle data for {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <p>
          The following download links bundle freeze/thaw cycle data with other
          climate indicators. Freeze/thaw cycle uses the "ftc" identifier.
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
