<script lang="ts" setup>
import type { ConcreteComponent } from 'vue'
import { getCurrentInstance } from 'vue'
import items from '~/assets/items'
import { validSlug, slugToCamelCase } from '~/utils/slugs'

const route = useRoute()
let slug = route.params.slug
let item = items.find(item => item.slug === slug)
let component: ConcreteComponent | string

const componentFileExists = computed<boolean>(() => {
  let slugString = slug.toString()
  if (!validSlug(slugString)) {
    return false
  }
  let camelCaseString = slugToCamelCase(slugString)

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
