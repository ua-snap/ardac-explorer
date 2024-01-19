<script lang="ts" setup>
definePageMeta({
  layout: 'home',
})

import { useStore } from '~/stores/store'

const { $Masonry } = useNuxtApp()
const store = useStore()
const cards = computed(() => store.filteredItems)
const searchActive = computed(() => store.searchActive)
const cardsByTag = ref({})
const tags = ref([])

const populatePage = () => {
  cardsByTag.value = {}
  cards.value.forEach(card => {
    card.tags.forEach(tag => {
      if (!cardsByTag.value.hasOwnProperty(tag)) {
        cardsByTag.value[tag] = []
      }
      cardsByTag.value[tag].push(card)
    })
  })
  tags.value = Object.keys(cardsByTag.value).map(tag => {
    return {
      name: tag,
      slug: tag.toLowerCase().replaceAll(' ', '-'),
    }
  })
  setTimeout(() => {
    let gridItemSelector = '.grid-item'
    let columnWidth = 352
    if (!store.searchActive) {
      tags.value.forEach(tag => {
        let gridSelector = `.grid-${tag['slug']}`
        new $Masonry(gridSelector, {
          itemSelector: gridItemSelector,
          columnWidth: columnWidth,
        })
      })
    } else {
      new $Masonry('.grid', {
        itemSelector: gridItemSelector,
        columnWidth: columnWidth,
      })
    }
  }, 0)
}

onMounted(() => {
  populatePage()
})

watch([cards, searchActive], async () => {
  populatePage()
})
</script>

<template>
  <Search />
  <section class="section">
    <div class="container">
      <div v-if="!store.searchActive" v-for="tag in tags">
        <h1 class="title is-3">{{ tag['name'] }}</h1>
        <div class="mb-6" :class="'grid-' + tag['slug']">
          <div v-for="card in cardsByTag[tag['name']]" class="grid-item">
            <Item
              :type="card.type"
              :image="card.image"
              :imageAlt="card.altImage"
              :title="card.title"
              :blurb="card.blurb"
              :tags="card.tags"
              :slug="card.slug"
              :fullView="card.fullView"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="mb-6 grid">
          <div v-for="card in cards" class="grid-item">
            <Item
              :type="card.type"
              :image="card.image"
              :imageAlt="card.altImage"
              :title="card.title"
              :blurb="card.blurb"
              :tags="card.tags"
              :slug="card.slug"
              :fullView="card.fullView"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.card {
  max-width: 332px;
  margin: 10px;
}
</style>
