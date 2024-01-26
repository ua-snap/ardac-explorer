<script lang="ts" setup>
definePageMeta({
  layout: 'full',
})

import type { ConcreteComponent } from 'vue'
import { getCurrentInstance } from 'vue'
import items from '~/assets/items'

const route = useRoute()
let slug = route.params.slug
let item = items.find(item => item.slug === slug)
let component: ConcreteComponent | string

const componentFileExists = computed<boolean>(() => {
  let slugString = slug.toString()

  // Validate that slug is not empty and contains only expected characters.
  if (slugString === '' || !slugString.match(/^[a-z0-9-]+$/)) {
    return false
  }

  // Convert slug string from lowercase-with-dashes style to the CamelCase
  // style used for Vue components.
  let camelCaseString = slugString
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

  let vueComponents = getCurrentInstance()?.appContext.components
  if (vueComponents?.hasOwnProperty(camelCaseString)) {
    component = resolveComponent(camelCaseString)
    return true
  } else {
    return false
  }
})
</script>

<template>
  <div v-if="componentFileExists">
    <Component :is="component" />
  </div>
  <div v-else-if="item?.fullView">
    <div v-html="item?.fullView"></div>
  </div>
  <div v-else>Item not found.</div>
</template>

<style scoped></style>
