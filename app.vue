<script lang="ts" setup>
// Redirect S3 hashbang URLs to Nuxt URLs.
const route = useRoute()

onMounted(() => {
  if (route.hash.substring(0, 3) == '#!/') {
    navigateTo(route.hash.substring(2))
  }
})

import { metas } from '@/utils/metas'

// SEO meta tag configuration
useSeoMeta({
  title: metas.title,
  ogTitle: metas.title,
  description: metas.description,
  ogDescription: metas.description,
  ogImage: metas.image,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
