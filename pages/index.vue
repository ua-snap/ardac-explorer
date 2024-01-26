<script lang="ts" setup>
definePageMeta({
  layout: 'home',
})

import { useStore } from '~/stores/store'

const { $Masonry } = useNuxtApp()
const store = useStore()

const items = computed<any[]>(() => store.filteredItems)
const searchActive = computed(() => store.searchActive)
const itemsByTag = ref({} as ItemsByTag)
const tags = ref(new Array<Tag>())

const populatePage = () => {
  itemsByTag.value = {}
  items.value.forEach((item: Item) => {
    item.tags?.forEach((tag: string) => {
      if (!itemsByTag.value.hasOwnProperty(tag)) {
        itemsByTag.value[tag] = new Array<Item>()
      }
      itemsByTag.value[tag].push(item)
    })
  })
  tags.value = Object.keys(itemsByTag.value).map(tag => {
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
    } else if (items.value.length > 0) {
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

watch([items, searchActive], async () => {
  populatePage()
})
</script>

<template>
  <section class="section dark">
    <div class="container">
      <Search />
      <div v-if="!store.searchActive" v-for="tag in tags">
        <h1 class="title is-3">{{ tag['name'] }}</h1>
        <div class="mb-6" :class="'grid-' + tag['slug']">
          <div v-for="item in itemsByTag[tag['name']]" class="grid-item">
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
      <div v-else>
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
        <div v-else class="has-text-centered">
          <h1 class="title is-4">No results found.</h1>
        </div>
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
