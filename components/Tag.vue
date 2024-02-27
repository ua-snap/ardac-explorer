<script lang="ts" setup>

const props = defineProps<{
  tag: Tag
}>()

const tagPath = computed(() => {
  return '/tag/' + props.tag
})
</script>

<template>
  <NuxtLink :to="tagPath" class="tag">
    {{ tag }}
  </NuxtLink>
</template>

<style scoped></style>
