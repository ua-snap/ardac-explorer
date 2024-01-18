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
  <section class="section">
    <div class="container">
      <div v-for="category in categories">
        <h1 class="title is-3">{{ category['name'] }}</h1>
        <div class="mb-3" :class="'grid-' + category['slug']">
          <div
            v-for="card in cardsByCategory[category['name']]"
            class="grid-item"
          >
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
    </div>
  </section>
</template>

<style lang="scss" scoped>
.card {
  max-width: 280px;
}
</style>
