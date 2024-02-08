<script lang="ts" setup>
import items from '~/assets/items'
import { useStore } from '~/stores/store'
const route = useRoute()
const { $Masonry } = useNuxtApp()
const store = useStore()

let tag = route.params.tag as string
let filteredItems:Item[] = items.filter(item => item.tags?.includes(tag))
store.filteredItems = filteredItems
let filteredItemsCount = store.sortedFilteredItems.length

onMounted(() => {
  setTimeout(() => {
    let gridItemSelector = '.grid-item'
    let columnWidth = 550
    new $Masonry('.grid', {
      itemSelector: gridItemSelector,
      columnWidth: columnWidth,
    })
  }, 0)
})
</script>

<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">{{ tag }}</h2>
      <h3 class="subtitle is-3">{{ filteredItemsCount }} matching items</h3>
      <div class="grid">
        <div v-for="item in store.sortedFilteredItems" class="grid-item">
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
