<script lang="ts" setup>
import { useStore } from '~/stores/store'
const store = useStore()
const route = useRoute()
const resultsCount = computed(() => store.filteredItems.length)
const searchActive = computed(() => store.searchActive)
const totalItemCount = computed(() => store.totalItemCount)
</script>

<template>
  <div v-if="searchActive || route.params.tag">
    <div v-if="resultsCount > 0">
      <h5 class="subtitle is-5 ml-2 mt-2">
        Showing
        <strong>{{ resultsCount }}</strong>
        <span v-if="resultsCount > 1"> matches</span>
        <span v-else> match</span>
        out of
        <strong>{{ totalItemCount }}</strong>
        total items.
      </h5>
    </div>
    <div v-else>
      <p class="ml-2 mt-2">
        No matches found out of
        <strong>{{ totalItemCount }}</strong>
        possible items.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
