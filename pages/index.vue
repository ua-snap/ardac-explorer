<script lang="ts" setup>
definePageMeta({
  layout: 'home',
})

const { $Masonry } = useNuxtApp()

import cards from '~/assets/cards.json'

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
    let gridItemSelector = `.grid-item-${category['slug']}`
    new $Masonry(gridSelector, {
      itemSelector: gridItemSelector,
      columnWidth: 300,
    })
  })
})
</script>

<template>
  <div v-for="category in categories">
    <h1 class="title is-3">{{ category['name'] }}</h1>
    <div :class="'mb-3 grid-' + category['slug']">
      <div
        :class="'card clamp mb-5 grid-item-' + category['slug']"
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
</template>

<style lang="scss" scoped>
.clamp {
  max-width: 280px;
}
</style>
