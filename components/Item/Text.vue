<script lang="ts" setup>
const props = defineProps<{
  slug: Slug
  showTag?: boolean
}>()

const store = useStore()
let item = store.itemBySlug(props.slug)
</script>

<template>
  <div class="item text">
    <Tag v-if="showTag" :tag="item.tags[0]" />
    <NuxtLink :to="{ name: 'item-slug', params: { slug: item.slug } }">
      <h3 class="title is-4" v-html="item.title"></h3>
      <p v-html="item.blurb" class="mb-4" />
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped></style>
