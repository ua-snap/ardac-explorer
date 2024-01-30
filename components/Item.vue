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

import { slugToCamelCase } from '~/utils/slugs'

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

  let camelCaseString = slugToCamelCase(props.slug)
  let vueComponents = getCurrentInstance()?.appContext.components
  if (vueComponents?.hasOwnProperty(camelCaseString)) {
    return true
  } else {
    return false
  }
})
const fullViewLink = computed<string>(() => {
  return '/item/' + props.slug
})
</script>

<template>
  <div class="p-4">
    <div>
      <img :src="image" :alt="imageAlt" class="is-pulled-right mb-4 ml-4" />
      <h3 class="title is-4 mt-0" v-html="title"></h3>
      <p v-if="blurb" v-html="blurb" class="mb-4" />
      <div v-if="showReadMore" class="mb-4">
        <NuxtLink :to="fullViewLink">Read more</NuxtLink>
      </div>
      <span v-for="tag in tags" class="tag mt-1 mb-1 mr-1"
        ><NuxtLink :to="{ name: 'tag-tag', params: { tag: tag } }">{{
          tag
        }}</NuxtLink></span
      >
    </div>
  </div>
</template>

<style scoped>
img {
  max-width: 200px;
  height: auto;
}
</style>
