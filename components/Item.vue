<script lang="ts" setup>
const props = defineProps<{
  type: string
  image?: string
  imageAlt?: string
  title?: string
  blurb?: string
  tags?: string[]
  slug?: string
  fullView?: string
}>()

const isSmall = computed<boolean>(() => {
  return props.type === 'small'
})
const showReadMore = computed<boolean>(() => {
  if (props.slug === undefined) {
    return false
  }
  if (props.fullView !== undefined) {
    return true
  }
  const component = resolveComponent(props.slug)
  if (typeof component === 'string') {
    return false
  } else {
    return true
  }
})
const fullViewLink = computed<string>(() => {
  return '/item/' + props.slug
})
</script>

<template>
  <div class="card">
    <div v-if="isSmall" class="card-content">
      <h5 class="title is-5" v-html="title"></h5>
    </div>
    <div v-else>
      <div v-if="image" class="card-image">
        <figure class="image is-4by3">
          <img :src="image" :alt="imageAlt" />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <h3 class="title is-4" v-html="title"></h3>
          <p v-html="blurb" />
          <div v-if="showReadMore" class="mb-4">
            <NuxtLink :to="fullViewLink">Read more</NuxtLink>
          </div>
          <span v-for="tag in tags" class="tag is-dark mb-1">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
