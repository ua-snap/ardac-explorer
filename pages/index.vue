<script lang="ts" setup>
definePageMeta({
  layout: 'home',
})

const { $Masonry } = useNuxtApp()

onMounted(() => {
  new $Masonry('.grid', {
    itemSelector: '.grid-item',
    columnWidth: 300,
  })
})
</script>

<template>
  <div class="grid">
    <div class="card clamp grid-item mb-5">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="~/assets/images/data-preview-1.png" alt="A Map" />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <h3 class="title is-4">Future precipitation map</h3>
          <p>
            <a href=""
              >Access a <a href="#">web map service</a> combining projected
              CMIP5 precipitation and USGS web map services. This can be used in
              GIS programs to produce data summaries at a local scale.</a
            >
          </p>
          <div>
            <span class="tag is-dark">Precipitation</span>
            <span class="tag is-dark">WMS</span>
            <span class="tag is-dark">Visualization</span>
            <span class="tag is-dark">GIS</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card clamp grid-item mb-5">
      <div class="card-content">
        <div class="content">
          <h3 class="title is-3">ALFRESCO flammability and vegetation</h3>
          <p>
            Access flammability and predominant vegetation type for a
            latitude/longitude point or area of interest in JSON or CSV format
            with <a href="https://earthmaps.io/alfresco/">this API endpoint</a>.
          </p>
          <div>
            <span class="tag is-dark">Wildfire</span>
            <span class="tag is-dark">Vegetation</span>
            <span class="tag is-dark">API</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card clamp grid-item mb-5">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="~/assets/images/data-preview-1.png" alt="A Map" />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <h3 class="title is-4">Future precipitation map</h3>
          <p>
            <a href=""
              >Access a <a href="#">web map service</a> combining projected
              CMIP5 precipitation and USGS web map services. This can be used in
              GIS programs to produce data summaries at a local scale.</a
            >
          </p>
          <div>
            <span class="tag is-dark">Precipitation</span>
            <span class="tag is-dark">WMS</span>
            <span class="tag is-dark">Visualization</span>
            <span class="tag is-dark">GIS</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card clamp grid-item mb-5">
      <div class="card-content">
        <div class="content">
          <h3 class="title is-3">ALFRESCO flammability and vegetation</h3>
          <p>
            Access flammability and predominant vegetation type for a
            latitude/longitude point or area of interest in JSON or CSV format
            with <a href="https://earthmaps.io/alfresco/">this API endpoint</a>.
          </p>
          <div>
            <span class="tag is-dark">Wildfire</span>
            <span class="tag is-dark">Vegetation</span>
            <span class="tag is-dark">API</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card clamp grid-item mb-5">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="~/assets/images/data-preview-1.png" alt="A Map" />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <h3 class="title is-4">Future precipitation map</h3>
          <p>
            <a href=""
              >Access a <a href="#">web map service</a> combining projected
              CMIP5 precipitation and USGS web map services. This can be used in
              GIS programs to produce data summaries at a local scale.</a
            >
          </p>
          <div>
            <span class="tag is-dark">Precipitation</span>
            <span class="tag is-dark">WMS</span>
            <span class="tag is-dark">Visualization</span>
            <span class="tag is-dark">GIS</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card clamp grid-item mb-5">
      <div class="card-content">
        <div class="content">
          <h3 class="title is-3">ALFRESCO flammability and vegetation</h3>
          <p>
            Access flammability and predominant vegetation type for a
            latitude/longitude point or area of interest in JSON or CSV format
            with <a href="https://earthmaps.io/alfresco/">this API endpoint</a>.
          </p>
          <div>
            <span class="tag is-dark">Wildfire</span>
            <span class="tag is-dark">Vegetation</span>
            <span class="tag is-dark">API</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card clamp grid-item mb-5">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="~/assets/images/data-preview-1.png" alt="A Map" />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <h3 class="title is-4">Future precipitation map</h3>
          <p>
            <a href=""
              >Access a <a href="#">web map service</a> combining projected
              CMIP5 precipitation and USGS web map services. This can be used in
              GIS programs to produce data summaries at a local scale.</a
            >
          </p>
          <div>
            <span class="tag is-dark">Precipitation</span>
            <span class="tag is-dark">WMS</span>
            <span class="tag is-dark">Visualization</span>
            <span class="tag is-dark">GIS</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card clamp grid-item mb-5">
      <div class="card-content">
        <div class="content">
          <h3 class="title is-3">ALFRESCO flammability and vegetation</h3>
          <p>
            Access flammability and predominant vegetation type for a
            latitude/longitude point or area of interest in JSON or CSV format
            with <a href="https://earthmaps.io/alfresco/">this API endpoint</a>.
          </p>
          <div>
            <span class="tag is-dark">Wildfire</span>
            <span class="tag is-dark">Vegetation</span>
            <span class="tag is-dark">API</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card clamp grid-item mb-5">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="~/assets/images/data-preview-1.png" alt="A Map" />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <h3 class="title is-4">Future precipitation map</h3>
          <p>
            <a href=""
              >Access a <a href="#">web map service</a> combining projected
              CMIP5 precipitation and USGS web map services. This can be used in
              GIS programs to produce data summaries at a local scale.</a
            >
          </p>
          <div>
            <span class="tag is-dark">Precipitation</span>
            <span class="tag is-dark">WMS</span>
            <span class="tag is-dark">Visualization</span>
            <span class="tag is-dark">GIS</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card clamp grid-item mb-5">
      <div class="card-content">
        <div class="content">
          <h3 class="title is-3">ALFRESCO flammability and vegetation</h3>
          <p>
            Access flammability and predominant vegetation type for a
            latitude/longitude point or area of interest in JSON or CSV format
            with <a href="https://earthmaps.io/alfresco/">this API endpoint</a>.
          </p>
          <div>
            <span class="tag is-dark">Wildfire</span>
            <span class="tag is-dark">Vegetation</span>
            <span class="tag is-dark">API</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.clamp {
  max-width: 280px;
}
</style>
