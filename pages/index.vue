<script lang="ts" setup>
import cards from '~/assets/cards.json'
definePageMeta({
  layout: 'home',
})

const { $Masonry } = useNuxtApp()

onMounted(() => {
  new $Masonry('.grid', {
    itemSelector: '.grid-item',
    columnWidth: 300,
  })
})
</script>

<template>
  <div class="grid">
    <div class="card clamp grid-item mb-5" v-for="card in cards">
      <div v-if="card['image']" class="card-image">
        <figure class="image is-4by3">
          <img :src="card['image']" :alt="card['image_alt']" />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <h3 class="title is-4">{{ card['title'] }}</h3>
          <p v-html="card['blurb']" />
          <span v-for="tag in card['tags']" class="tag is-dark mb-1">{{
            tag
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.clamp {
  max-width: 280px;
}
</style>
