<script lang="ts" setup>
const props = defineProps<{
  item: Item
}>()
</script>

<template>
  <div class="item text-picture">
    <NuxtLink :to="{ name: 'item-slug', params: { slug: item.slug } }">
      <h3 class="title is-4" v-html="item.title"></h3>
      <p v-html="item.blurb" class="mb-4" />
      <figure class="image is-5by4">
        <img :src="item.image" :alt="item.imageAlt" class="mb-4" />
      </figure>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped></style>
