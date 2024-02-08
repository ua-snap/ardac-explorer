<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'

const props = defineProps<{
  type?: ItemType
  image?: string
  imageAlt?: string
  title?: string
  blurb?: string
  tags?: string[]
  slug?: string
  fullView?: string
  itemJson?: any
}>()

const blurb = ref(props.blurb || props.itemJson.blurb)
const image = ref(props.image || props.itemJson.image)
const imageAlt = ref(props.imageAlt || props.itemJson.imageAlt)
const title = ref(props.title || props.itemJson.title)
const tags = ref(props.tags || props.itemJson.tags)
const slug = ref(props.slug || props.itemJson.slug)
const fullView = ref(props.fullView || props.itemJson.fullView)

import { slugToCamelCase } from '~/utils/slugs'

const isBrief = computed<boolean>(() => {
  return props.type === 'brief'
})

const isFeatured = computed<boolean>(() => {
  return props.type === 'featured'
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

onBeforeMount(() => {
  if (props.itemJson) {
    Object.assign(props, props.itemJson)
  }
})
</script>

<template>
  <NuxtLink :to="fullViewLink">
    <div class="item">
      <div v-if="isBrief === true" class="brief">
        <h3 class="title is-4 mt-0" v-html="title"></h3>
      </div>
      <div v-else-if="isFeatured === true" class="featured">
        <span v-for="tag in tags" class="tag mt-1 mb-1 mr-1"
          ><NuxtLink :to="{ name: 'tag-tag', params: { tag: tag } }">{{
            tag
          }}</NuxtLink></span
        >
        <h3 class="title" v-html="title"></h3>
        <p v-if="blurb" v-html="blurb" class="mb-4" />
        <img :src="image" :alt="imageAlt" class="mb-4" />
      </div>
      <div v-else>
        <h3 class="title is-4 mb-2" v-html="title"></h3>
        <img v-if="image" :src="image" :alt="imageAlt" class="mb-4" />
        <p v-if="blurb" v-html="blurb" class="mb-4" />
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped></style>
