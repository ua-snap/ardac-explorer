<script lang="ts" setup>
definePageMeta({
  layout: 'home',
})

import { useStore } from '~/stores/store'

const { $Masonry } = useNuxtApp()
const store = useStore()

const items = computed<any[]>(() => store.filteredItems)
const searchActive = computed(() => store.searchActive)

const populatePage = () => {
  setTimeout(() => {
    if (items.value.length === 0) {
      return
    }
    let gridItemSelector = '.grid-item'
    let columnWidth = 352
    new $Masonry('.grid', {
      itemSelector: gridItemSelector,
      columnWidth: columnWidth,
    })
  }, 0)
}

onMounted(() => {
  populatePage()
})

watch([items, searchActive], async () => {
  populatePage()
})
</script>

<template>
  <section class="section dark">
    <div class="container">

      <Search class="mb-6" />
      <ResultsCount />
      
      <div v-if="items.length > 0" class="mb-6 grid">
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
      <div v-else class="ml-2">
        <h1 class="title is-4">No results found.</h1>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.grid-item {
  max-width: 332px;
  margin: 10px;
}
</style>
