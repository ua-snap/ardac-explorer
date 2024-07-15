<script lang="ts" setup>
import bios from '~/assets/bios'

const props = defineProps<{
  person: Person
}>()

const bio = bios.find(i => {
  return i.person === props.person
})

const path = '/images/people/' + bio?.image

</script>

<template>
  <div v-if="bio" class="bio block tile is-ancestor">
    <div class="tile content is-size-5 is-parent">
      <figure class="tile is-child is-2 image">
        <img
          class="is-rounded"
          :src="path"
          :alt="`Photo of ${bio.person}`"
        />
      </figure>
      <div class="tile is-child is-align-content-center pl-5">
        <h4 class="mb-1">{{ bio?.person }}</h4>
        <p v-html="bio?.blurb"></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bio p {
  max-width: 50rem;
  line-height: 1.3;
}
</style>
