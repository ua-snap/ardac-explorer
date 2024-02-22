<script lang="ts" setup>
const props = defineProps<{
  item: Slug
}>()

const store = useStore()
let item = store.itemBySlug(props.item)
</script>

<template>
  <div class="item brief">
    <NuxtLink :to="{ name: 'item-slug', params: { slug: item.slug } }">
      <h3 class="title is-5" v-html="item.title"></h3>
    </NuxtLink>
  </div>
</template>
