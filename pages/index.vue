<script lang="ts" setup>
definePageMeta({
  layout: 'home',
})

// Redirect S3 hashbang URLs to Nuxt URLs.
const route = useRoute()
onMounted(() => {
  if (route.hash.substring(0, 3) == '#!/') {
    navigateTo(route.hash.substring(2), { external: true })
  }
})
</script>

<template>
  <FrontPageMain />
  <hr />
  <FrontPageSectionClimate />
  <FrontPageSectionPrecipitation />
  <FrontPageSectionHydrology />
  <FrontPageSectionCryosphere />
  <FrontPageSectionPermafrost />
</template>

<style lang="scss" scoped></style>
