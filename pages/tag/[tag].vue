<script lang="ts" setup>
import items from '~/assets/items'
import { useStore } from '~/stores/store'
const route = useRoute()
const store = useStore()

let tag = route.params.tag as string
let filteredItems: Item[] = items.filter(item => item.tags?.includes(tag))
store.filteredItems = filteredItems
let filteredItemsCount = store.sortedFilteredItems.length

// Build the grid view of items.
var gridItems: Item[][] = []
for (let row = 0; row < store.sortedFilteredItems.length / 4; row++) {
  gridItems[row] = []
  for (let col = 0; col < 4; col++) {
    let offset = (row * 4) + col
    if (store.sortedFilteredItems[offset]) {
      gridItems[row][col] = store.sortedFilteredItems[offset]
    }
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">{{ tag }}</h2>
      <h3 class="subtitle is-3">{{ filteredItemsCount }} matching items</h3>
      <div v-for="row in gridItems" class="tile is-ancestor">
        <div class="tile is-parent">
          <div v-for="item in row" class="tile is-child is-3 block border-right border-bottom">
            <ItemTextPicture :item="item" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '~/assets/styles/items.scss';
.tile.is-child {
  padding: 0 1rem 1rem 1rem;
  margin-right: 1rem;
  &:first-of-type {
    padding-left: 0;
  }
  &:last-of-type {
    border-right: none;
  }
}
</style>
