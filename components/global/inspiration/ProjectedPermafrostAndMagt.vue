<script lang="ts" setup>
const store = useStore()
const placesStore = usePlacesStore()
const runtimeConfig = useRuntimeConfig()
const latLng = computed(() => placesStore.latLng)
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">
        Projected permafrost and mean annual ground temperature
      </h3>
      <p>
        Annual projections of permafrost top and base depths, talik thickness,
        and mean annual ground temperature at seven different depths are
        provided by the GIPL 2.0 model for years 2021&ndash;2120. These
        projections are provided for GFDL CM3 and NCAR CCSM4 model outputs, as
        well as a 5-model average (GFDL CM3, NCAR CCSM4, GISS E2-R, IPSL
        CM5A-LR, MRI CGCM3), under the RCP 4.5 and RCP 8.5 emissions scenarios.
        Spatial resolution: 1&#8239;km.
      </p>
      <LatLngSelector />
      <div v-if="!(latLng === undefined)" class="mb-6">
        <h5 class="title is-5">
          Download data for {{ latLng?.lat }}, {{ latLng?.lng }}
        </h5>
        <ul>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/permafrost/point/gipl/' +
                latLng?.lat +
                '/' +
                latLng?.lng +
                '?format=csv'
              "
              >Download as CSV</a
            >
          </li>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/permafrost/point/gipl/' +
                latLng?.lat +
                '/' +
                latLng?.lng
              "
              >Download as JSON</a
            >
          </li>
        </ul>
      </div>
      <h5 class="title is-5">Source &amp; citation information</h5>
      <ul>
        <li>
          Source dataset and metadata:
          <a
            href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/c24a957b-8a56-40bf-bc09-43a567182d36"
            >GIPL Permafrost Model Output</a
          >
        </li>
        <li>
          Academic reference:
          <blockquote>
            Marchenko, S., Romanovsky, V., &amp; Tipenko, G. (2008). Numerical
            modeling of spatial permafrost dynamics in Alaska.
            <i
              >Ninth International Conference on Permafrost, Online Proceedings,
              Volume 2</i
            >, 1125–1130. Accessed 2023-09-08 from
            <a href="https://www.permafrost.org/event/icop9/"
              >https://www.permafrost.org/event/icop9/</a
            >
          </blockquote>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped></style>
