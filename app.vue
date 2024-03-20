<script lang="ts" setup>
// Redirect S3 hashbang URLs to Nuxt URLs.
const route = useRoute()
onBeforeMount(() => {
  if (route.hash.substring(0, 3) == '#!/') {
    navigateTo(route.hash.substring(2))
  }
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
