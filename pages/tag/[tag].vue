<script lang="ts" setup>
import items from '~/assets/items'
import { useStore } from '~/stores/store'
import type { ConcreteComponent } from 'vue'
import { getCurrentInstance } from 'vue'
const route = useRoute()
const store = useStore()

// Get stuff filtered/prioritized
let tag = route.params.tag as Tag
let filteredItems: Item[] = items.filter((item: Item) =>
  item.tags?.includes(tag)
)
store.filteredItems = filteredItems
let filteredItemsCount = store.sortedFilteredItems.length

// Fetch dynamic component for this topic if present.
let itemComponent: ConcreteComponent | string

const componentFileExists = computed<boolean>(() => {
  let slugString = 'Topic' + tag
  let vueComponents = getCurrentInstance()?.appContext.components
  if (vueComponents?.hasOwnProperty(slugString)) {
    itemComponent = resolveComponent(slugString)
    return true
  } else {
    return false
  }
})

// Build the grid view of items.
var gridItems: Item[][] = []
for (let row = 0; row < store.sortedFilteredItems.length / 4; row++) {
  gridItems[row] = []
  for (let col = 0; col < 4; col++) {
    let offset = row * 4 + col
    if (store.sortedFilteredItems[offset]) {
      gridItems[row][col] = store.sortedFilteredItems[offset]
    }
  }
}
</script>

<template>
  <section class="section" v-if="componentFileExists">
    <Component :is="itemComponent" />
  </section>
  <section class="section">
    <div class="container">
      <h2 class="title is-3">{{ tag }}</h2>
      <h3 class="subtitle is-4">
        Showing all matching items ({{ filteredItemsCount }})
      </h3>
      <div v-for="row in gridItems" class="grid is-col-min-12 is-gap-2">
        <div v-for="item in row" class="cell block border-right border-bottom">
          <ItemTextPicture :slug="item.slug" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '~/assets/styles/items.scss';
.cell {
  padding-right: 0.75rem;
  &:first-of-type {
    padding-left: 0;
  }
  &:last-of-type {
    border-right: none;
  }
}
</style>
