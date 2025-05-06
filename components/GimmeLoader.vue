<script lang="ts" setup>
// bbox order is
// [ lower-left lng, lower-left lat, upper-right lng, upper-right lat ]
interface Props {
  bbox?: number[]
  extent?: Extent
  ocean?: boolean
  communitiesEnabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  bbox: () => [-179.1506, 51.229, -129.9795, 71.3526],
  extent: null,
  ocean: false,
  communitiesEnabled: true,
})

const placesStore = usePlacesStore()
const isDocumentLoaded = ref(false)

onMounted(() => {
  isDocumentLoaded.value = true
})
</script>

<template>
  <div v-if="isDocumentLoaded">
    <div v-if="!placesStore.gimmeLoaded" class="loader"></div>
    <Gimme v-bind="props" />
  </div>
</template>
