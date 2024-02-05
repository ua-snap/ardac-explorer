<script lang="ts" setup>
const props = defineProps<{
  items: Item[]
}>()
</script>

<template>
  <table class="table m-2 mt-5">
    <thead>
      <tr>
        <th class="pr-3">Title</th>
        <th class="pl-3">Description</th>
      </tr>
    </thead>
    <tr v-for="item in items">
      <td v-html="item.title" class="pr-3 py-2" />
      <td v-html="item.blurb" class="pl-3 py-2" />
    </tr>
  </table>
</template>

<style lang="scss" scoped></style>
