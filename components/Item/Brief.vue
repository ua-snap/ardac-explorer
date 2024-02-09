<script lang="ts" setup>
const props = defineProps<{
  item: Item
}>()
</script>

<template>
  <div class="item brief">
    <NuxtLink :to="{ name: 'item-slug', params: { slug: item.slug } }">
      <h3 class="title is-4 mt-0" v-html="item.title"></h3>
    </NuxtLink>
  </div>
</template>
