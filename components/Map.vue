<script lang="ts" setup>
// import { mapGetters } from 'vuex'

// export default {
//   name: 'Map',
//   props: ['mapName'],
//   mounted() {
//     this.$store.commit('map/create', this.mapName)
//   },
//   destroyed() {
//     this.$store.commit('map/destroy', this.mapName)
//   },
// }

const props = defineProps<{
  mapId: string
}>()

</script>

<template>
  <div :id="mapId" class="map"></div>
</template>

<style lang="scss" scoped>
.map {
  aspect-ratio: 1/1;
  height: 100%;
}
.deep {
  .legend {
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.7);
    .legend-item {
      display: flex;
      align-items: center;
      font-size: 1rem;
    }
    .legend-swatch {
      display: inline-block;
      border: 1px solid #666;
      margin: 5px;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
