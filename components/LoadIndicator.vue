<script lang="ts" setup>
const placesStore = usePlacesStore()
const dataStore = useDataStore()

const apiData = computed<any>(() => dataStore.apiData)
const dataErrors = computed<any>(() => dataStore.dataError)

const anyApiData = computed(() => {
  return Object.values(apiData.value).some(
    value =>
      typeof value === 'object' &&
      value != null &&
      Object.keys(value).length > 0
  )
})

const anyDataErrors = computed(() => {
  return Object.values(dataErrors.value).some(value => value == true)
})
</script>

<template>
  <div v-if="placesStore.latLng && !anyApiData && !anyDataErrors">
    <progress class="progress" />
  </div>
</template>
