<script lang="ts" setup>
definePageMeta({
  layout: 'full',
})

import items from '~/assets/items'

const route = useRoute()
let slug = route.params.slug
let item = items.find(item => item.slug === slug)
</script>

<template>
  <h1 class="title is-3" v-html="item['title']"></h1>
  <div v-html="item['fullView']" />
</template>

<style scoped></style>
