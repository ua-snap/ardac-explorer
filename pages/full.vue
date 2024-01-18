<script lang="ts" setup>
definePageMeta({
  layout: 'full',
})

import cards from '~/assets/cards'

const route = useRoute()
let slug = route.params.slug
let card = cards.find(card => card.slug === slug)
</script>

<template>
  <h1 class="title is-3">{{ card['title'] }}</h1>
  <div v-html="card['full_view_content']" />
  <NuxtLink to="/" class="button mt-4">Go back</NuxtLink>
</template>

<style scoped></style>
