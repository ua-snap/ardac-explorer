<script lang="ts" setup>
definePageMeta({
  layout: 'home',
})

const { $Masonry } = useNuxtApp()

import cards from '~/assets/cards'

let cardsByCategory = {}
cards.forEach(card => {
  if (!cardsByCategory[card.category]) {
    cardsByCategory[card.category] = []
  }
  cardsByCategory[card.category].push(card)
})

let categories = Object.keys(cardsByCategory).map(category => {
  return {
    name: category,
    slug: category.toLowerCase().replaceAll(' ', '-'),
  }
})

onMounted(() => {
  categories.forEach(category => {
    let gridSelector = `.grid-${category['slug']}`
    new $Masonry(gridSelector, {
      itemSelector: '.grid-item',
      columnWidth: 300,
    })
  })

  new $Masonry('.grid2', {
    itemSelector: '.grid-item',
    columnWidth: 300,
  })
})
</script>

<template>
  <div v-for="category in categories">
    <h1 class="title is-3">{{ category['name'] }}</h1>
    <div class="mb-3" :class="'grid-' + category['slug']">
      <div
        class="card clamp mb-5 grid-item"
        v-for="card in cardsByCategory[category['name']]"
      >
        <div v-if="card['image']" class="card-image">
          <figure class="image is-4by3">
            <img :src="card['image']" :alt="card['image_alt']" />
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <h3 class="title is-4">{{ card['title'] }}</h3>
            <p v-html="card['blurb']" />
            <span v-for="tag in card['tags']" class="tag is-dark mb-1">{{
              tag
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">Subsection experimental itemfarm 🥗🥗 salad</h2>

      <div class="grid2" style="position: relative;">
        <!-- Example 1: "smallest" content atoms -->
        <div class="card grid-item small">
          <div class="card-content">
            <h5 class="title is-5">
              Modeled
              <a href="https://earthmaps.io/alfresco/"
                >future flammability and vegetation</a
              >
            </h5>
          </div>
        </div>

        <div class="card grid-item small">
          <div class="card-content">
            <h5 class="title is-5">
              Historical + near-real-time
              <a href="https://earthmaps.io/alfresco/"
                >wildfire and related research data</a
              >
            </h5>
          </div>
        </div>

        <div class="card grid-item small">
          <div class="card-content">
            <h5 class="title is-5">
              <a href="https://earthmaps.io/boundary/"
                >Places &amp; boundaries</a
              >
              in Alaska and parts of western Canada
            </h5>
          </div>
        </div>

        <!-- "general" content atoms -->
        <div class="card grid-item medium">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="~/assets/images/data-preview-1.png" alt="A Map" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <h3 class="title is-4">Future precipitation map &amp; web services</h3>
              <p>
                See <a href="">statewide precipitation maps</a> and access web services (WMS) that can be used in your own GIS applications.
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

        <div class="card grid-item medium">
          <div class="card-image">
            <figure class="image is-square">
              <img src="~/assets/images/data-preview-2.png" alt="A Map" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <h3 class="title is-4">Degree days, projected statewide</h3>
              <p>
                Explore climate projections used to derive <a href="">future heating, freezing and thawing degree days</a> across Alaska.
              </p>
              <div>
                <span class="tag is-dark">Degree days</span>
                <span class="tag is-dark">WMS</span>
                <span class="tag is-dark">Visualization</span>
                <span class="tag is-dark">GIS</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card grid-item medium">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="~/assets/images/data-preview-3.png" alt="A Map" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <h3 class="title is-4">Flammability, vegetation, current conditions</h3>
              <p>
                Historical and projected flammability and vegetation model output, with adjacent indicators updated daily.  <a href="">See a map and access data layers.</a>
              </p>
              <div>
                <span class="tag is-dark">Wildfire</span>
                <span class="tag is-dark">Vegetation</span>
                <span class="tag is-dark">Lightning</span>
                <span class="tag is-dark">WMS</span>
                <span class="tag is-dark">Visualization</span>
                <span class="tag is-dark">GIS</span>
              </div>
            </div>
          </div>
        </div>


        <div class="card grid-item big">
          <div class="card-image">
            <figure class="image">
              <img src="~/assets/images/ncr-preview.png" alt="A Map" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <h3 class="title is-4">Northern Climate Reports</h3>
              <p>
                See charts, maps and tables of climate data for Alaska and parts of Western Canada.
              </p>
              <div>
                <span class="tag is-dark">Tool</span>
                <span class="tag is-dark">Permafrost</span>
                <span class="tag is-dark">Temperature</span>
                <span class="tag is-dark">Precipitation</span>
                <span class="tag is-dark">Vegetation</span>
                <span class="tag is-dark">Lightning</span>
                <span class="tag is-dark">WMS</span>
                <span class="tag is-dark">Visualization</span>
                <span class="tag is-dark">GIS</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card grid-item big">
          <div class="card-image">
            <figure class="image">
              <img src="~/assets/images/data-preview-4.png" alt="A Map" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <h3 class="title is-4">Historical Sea Ice Atlas</h3>
              <p>
                Interactive application for viewing sea ice extent and concentration, 1850&ndash;2022.
              </p>
              <div>
                <span class="tag is-dark">Tool</span>
                <span class="tag is-dark">Sea ice</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card grid-item medium">
          <div class="card-image">
            <figure class="image">
              <img src="~/assets/images/data-preview-6.png" alt="A Map" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <h3 class="title is-4">ERA5 access via the CDS API</h3>
              <p>
                The Climate Data Store run through the European Center for Medium-Range Weather Forecasts provides a great API and associated python package for accessing the eight different ERA5 datasets they host. This notebook will demonstrate using this API to retrieve some of this data, which can then be combined with data from ARDAC for analysis.
              </p>
              <div>
                <span class="tag is-dark">Notebook</span>
              </div>
            </div>
          </div>
        </div>


        <div class="card grid-item">
          <div class="card-content">
            <div class="content">
              <h3 class="title is-4">Arctic Engineering Design and Decision Support Tool (Arctic-EDS)</h3>
              <p>
                Access data to support Arctic engineering: climate model outputs aggregated for easy access and integration into engineering workflows.  Download data subsets for communities and points across Alaska, and see data summaries and aggregation for near- to late-century model outputs.
              </p>
              <div>
                <span class="tag is-dark">Tool</span>
                <span class="tag is-dark">Temperature</span>
                <span class="tag is-dark">Precipitation</span>
                <span class="tag is-dark">Permafrost</span>
                <span class="tag is-dark">Hydrology</span>
                <span class="tag is-dark">Degree days</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card grid-item medium">
          <div class="card-content">
            <div class="content">
              <h3 class="title is-4">Permafrost Observations with Modeled Historical Air Temperature Data</h3>
              <p>
                This notebook demonstrates how to take a set of monthly observations at a known sampling location and query the SNAP Data API for modeled historical monthly data at that location. In this example, CALM active layer thickness (ALT) observations made at the "Imnavait Creek WET" site (U11B: 68.611, -149.3145) in the month of August are paired with CRU-TS 4.0 mean August air temperature data accessed via the SNAP Data API. (References for these datasets are included at the bottom of this notebook.)
              </p>
              <div>
                <span class="tag is-dark">Notebook</span>
                <span class="tag is-dark">Temperature</span>
                <span class="tag is-dark">Permafrost</span>
                <span class="tag is-dark">API</span>
              </div>
            </div>
          </div>
        </div>


        <div class="card grid-item medium">
          <div class="card-image">
            <figure class="image">
              <img src="~/assets/images/data-preview-5.png" alt="A Map" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <h3 class="title is-4">Querying Daymet daily precipitation data using polygons from the SNAP Data API</h3>
              <p>
                In this notebook, we demonstrate a method for fetching a polygon of interest from the SNAP Data API and then using this polygon's bounding box to subset Daymet daily precipitation data. By only querying the Daymet data in our immediate area of interest, we avoid downloading the complete dataset and having to process it locally.
              </p>
              <div>
                <span class="tag is-dark">Notebook</span>
                <span class="tag is-dark">Precipitation</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.clamp {
  max-width: 280px;
}

.small {
  width: 20%;
}

.medium {
  width: 30%;
}

.big {
  width: 50%;
}
</style>
