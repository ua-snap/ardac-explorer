<script lang="ts" setup>
const props = defineProps<{
  people: Person[]
}>()
</script>

<template>
  <hr class="light" />
  <div class="pt-5">
    <Bio v-for="person in people" :person="person" />
  </div>
</template>

<style lang="scss" scoped></style>
