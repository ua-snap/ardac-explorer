<script setup lang="ts">
const props = defineProps<{
  mapId: string
}>()

// export default {

//   computed: {
//     mapTitle() {
//       return mapContent.titles[this.mapName]
//     },
//     layers() {
//       return mapContent.layers[this.mapName]
//     },
//   },
// methods: {
//   selectDefaultLayer() {
//     let defaultLayer = _.filter(mapContent.layers[this.map], layer => {
//       return layer['default']
//     })[0]
//   },
// },
// }
</script>

<template>
  <div class="columns">
    <div class="column is-one-third">
      <slot name="layers"> </slot>
    </div>
    <div class="column">
      <Map :mapId="mapId" class="map" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map {
  width: 100%;
}
</style>
