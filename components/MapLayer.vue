<script setup lang="ts">
import { useMapStore } from '~/stores/map'
const mapStore = useMapStore()

const props = defineProps<{
  layer: MapLayer
  mapId: string
  default?: boolean
}>()

const { activeLayers } = storeToRefs(mapStore)

// I'd expect this to fire when `toggleLayer` executes in the map store.  But it's not.  Why?
// 👹👹👹
watch(activeLayers, (e) => {
  console.log(e) // nope
}, { deep: true})

const active = computed( () => {
  // This will get wired in once we figure out the reactivity
  // properly.
  return false
})

async function toggleLayer() {
  await nextTick() // so this doesn't fire before the map DOM is ready
  mapStore.toggleLayer({
    layer: props.layer,
    mapId: props.mapId,
  })
}

onMounted(() => {
  if (props.default === true) {
    toggleLayer()
  }
})
</script>

<template>
  <div
    @click="toggleLayer"
    class="layer tile is-ancestor is-parent"
    :class="{ active: active }"
  >
    <span class="tile is-child description">
      <div class="layer-title">
        <slot name="title">{{ layer.title }}</slot>
      </div>
      <div class="subtext"><slot name="subtext"></slot></div>
    </span>
    <span class="tile is-child is-1 if-active">
      <div v-if="active">&#x25b6;</div>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.layer {
  line-height: 1.2;
  font-size: 1.25rem;
  cursor: pointer;
  padding-right: 0;

  &.active {
    font-weight: 600;
    background-color: #f2c716;
  }

  .if-active {
    display: flex;
    align-items: center;
    font-size: 125%;
  }

  .subtext {
    display: block;
    margin-top: 0;
    padding-top: 0;

    font-weight: 300;
  }
}
</style>
