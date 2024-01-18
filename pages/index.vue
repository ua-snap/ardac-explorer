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
})
</script>

<template>
  <div v-for="category in categories">
    <h1 class="title is-3">{{ category['name'] }}</h1>
    <div class="mb-3" :class="'grid-' + category['slug']">
      <div v-for="card in cardsByCategory[category['name']]" class="grid-item">
        <Item
          :category="category.name"
          :type="card.type"
          :image="card.image"
          :imageAlt="card.altImage"
          :title="card.title"
          :blurb="card.blurb"
          :tags="card.tags"
        />
      </div>
    </div>
  </div>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">Subsection experimental itemfarm 🥗🥗 salad</h2>

      <div class="grid2" style="position: relative">
       


        <!-- "general" content atoms -->
        <!-- <div class="card grid-item medium">
         
         
  



        <diviv>
      >
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
        </div>-->
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.card {
  max-width: 280px;
}
</style>
