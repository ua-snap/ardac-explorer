<script lang="ts" setup>
import bios from '~/assets/bios'

const props = defineProps<{
  person: Person
  compact?: boolean
}>()

const bio = bios.find(i => {
  return i.person === props.person
})
</script>

<template>
  <div v-if="compact && bio && bio.image" class="bio compact">
    <figure class="image">
      <img
        class="is-rounded"
        :src="'/images/people/' + bio.image"
        :alt="`Photo of ${bio.person}`"
      />
      <figcaption class="content is-size-4">{{ bio.person }}</figcaption>
    </figure>
  </div>
  <div v-else>
    <div v-if="bio && bio.image" class="bio block tile is-ancestor mb-5">
      <div class="tile content is-size-5 is-parent">
        <figure class="tile is-child is-2 image">
          <img
            class="is-rounded"
            :src="'/images/people/' + bio.image"
            :alt="`Photo of ${bio.person}`"
          />
        </figure>
        <div class="tile is-child is-align-content-center pl-5">
          <h4 class="mb-1">{{ bio?.person }}</h4>
          <p v-if="!compact" v-html="bio?.blurb"></p>
        </div>
        <div v-if="$slots.default && !compact" class="tile is-child">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  max-width: 150px;
}

.bio p {
  max-width: 50rem;
  line-height: 1.3;
}

.bio.compact {
  max-width: 150px;
  figcaption {
    text-align: center;
  }
}
</style>
