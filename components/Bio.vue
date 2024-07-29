<script lang="ts" setup>
import bios from '~/assets/bios'

const props = defineProps<{
  person: Person
}>()

const bio = bios.find(i => {
  return i.person === props.person
})
</script>

<template>
  <div v-if="bio && bio.image" class="bio block fixed-grid has-12-cols mb-6">
    <div class="grid">
      <figure class="cell is-col-span-2 image">
        <img
          class="is-rounded is-pulled-right"
          :src="'/images/people/' + bio.image"
          :alt="`Photo of ${bio.person}`"
        />
      </figure>
      <div class="cell is-col-span-6 is-align-content-center">
        <h4 class="title is-4 mb-1">{{ bio?.person }}</h4>
        <p class="content is-size-5" v-html="bio?.blurb"></p>
      </div>
      <div v-if="$slots.default" class="cell is-col-span-4 is-align-content-center">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
figure {
  padding-right: 1rem;
}
img {
  max-width: 150px;
}

.bio p {
  max-width: 50rem;
  line-height: 1.3;
}
</style>
