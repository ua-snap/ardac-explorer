<template>
  <div>

    <section class="section">
      <SearchControls />
      <Plate :layers="layers" v-show="!reportIsVisible">
        <template v-slot:legend>
          <component :is="legend"></component>
        </template>
      </Plate>
    </section>

    <section>
      <div class="container"></div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
td {
  padding: 8px;
  text-align: center;
}
th {
  padding: 8px;
}
</style>
<script>
import Plate from "~/components/Plate";
import Legend from "~/components/datasets/landfast_sea_ice/Legend";
import SearchControls from "~/components/SearchControls";
import layers from "~/components/datasets/landfast_sea_ice/layers";
import { mapGetters } from "vuex";

export default {
  name: "ThawingIndexController",
  components: { Plate, Legend, SearchControls },
  data() {
    return {
      layers: layers,
    };
  },
  mounted() {
    this.$store.commit("map/addLayerEventHandler", {
      event: "click",
      handler: this.handleMapClick,
    });

    if (this.isPlaceDefined) {
      this.activateReport();
    }
  },
  methods: {
    handleMapClick: function (event) {
      this.$router.push({
        path:
          this.$route.path +
          "/report/" +
          event.latlng.lat.toFixed(4) +
          "/" +
          event.latlng.lng.toFixed(4),
        hash: "#report",
      });
    },
    activateReport: function () {
      // Actually this just generates a CSV download.
      this.$store.commit("report/openReport");
    },
  },
};
</script>
