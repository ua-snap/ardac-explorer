<script lang="ts" setup>
const placesStore = usePlacesStore()
const dataStore = useDataStore()
</script>

<template>
  <div v-if="placesStore.latLng && !dataStore.apiData && !dataStore.dataError">
    <progress class="progress" />
  </div>
</template>
