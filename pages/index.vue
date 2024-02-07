<script lang="ts" setup>
definePageMeta({
  layout: 'home',
})

import { useStore } from '~/stores/store'

const { $Masonry } = useNuxtApp()
const store = useStore()
const route = useRoute()

const items = computed<any[]>(() => store.sortedFilteredItems)
const searchActive = computed(() => store.searchActive)
const masonryThreshold = 5

let tag = route.params.tag
if (tag === undefined) {
  store.filteredItems = store.allItems
} else {
  store.filteredItems = store.tagItems(tag.toString())
}

const populatePage = () => {
  setTimeout(() => {
    // Use table display instead of Masonry if the number of filtered items is
    // less than or equal to the masonryThreshold.
    if (items.value.length <= masonryThreshold) {
      return
    }
    let gridItemSelector = '.grid-item'
    let columnWidth = 550
    new $Masonry('.grid', {
      itemSelector: gridItemSelector,
      columnWidth: columnWidth,
      horizontalOrder: true,
    })
  }, 0)
}

onMounted(() => {
  populatePage()
})

onUnmounted(() => {
  store.searchActive = false
})

watch([items, searchActive], async () => {
  populatePage()
})
</script>

<template>
  <section class="section">
    <div class="container">
      <h3 v-html="tag" v-if="tag" class="title is-3 ml-2" />
      <Search v-if="!tag" class="mb-5" />
      <ResultsCount />
      <div v-if="items.length > masonryThreshold" class="mb-6 grid">
        <div v-for="item in items" class="grid-item">
          <Item
            :type="item.type"
            :image="item.image"
            :imageAlt="item.imageAlt"
            :title="item.title"
            :blurb="item.blurb"
            :tags="item.tags"
            :slug="item.slug"
            :fullView="item.fullView"
          />
        </div>
      </div>
      <div v-else-if="items.length > 0" class="mb-6">
        <ResultsTable :items="items" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
