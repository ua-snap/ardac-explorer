<script lang="ts" setup>
definePageMeta({
  layout: 'home',
})

import { useStore } from '~/stores/store'

const { $Masonry } = useNuxtApp()
const store = useStore()

const items = computed<any[]>(() => store.sortedFilteredItems)
const searchActive = computed(() => store.searchActive)

const populatePage = () => {
  setTimeout(() => {
    if (items.value.length === 0) {
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

watch([items, searchActive], async () => {
  populatePage()
})
</script>

<template>
  <section class="section">
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
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
