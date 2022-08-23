<template>
  <div>
    <div v-bind:id="mapConfiguration.layer + '--map'" class="leaflet-map"></div>
  </div>
</template>

<style lang="scss" scoped>
.leaflet-map {
  aspect-ratio: 1 / 1;
  height: 100%;
}
</style>

<script>
export default {
  name: "MiniMap",
  props: ["mapConfiguration"],
  data() {
    return {
      map: undefined,
    };
  },
  computed: {
    layer() {
      let wmsUrl =
        this.mapConfiguration.source == "rasdaman"
          ? process.env.rasdamanUrl
          : process.env.geoserverUrl;
      return new L.tileLayer.wms(wmsUrl, {
        transparent: true,
        format: "image/png",
        srs: "EPSG:3338",
        format: "image/png",
        version: "1.3.0",
        layers: [this.mapConfiguration.layer],
        styles: this.mapConfiguration.style,

        // This will merge in the various dim_scenario and other stuff, if present
        ...this.mapConfiguration.params,
      });
    },
  },
  mounted() {
    this.map = L.map(this.mapConfiguration.layer + "--map", this.getBaseMapAndLayers());
    this.layer.addTo(this.map);
  },

  methods: {
    getBaseMapAndLayers() {
      var baseLayer = new L.tileLayer.wms(process.env.geoserverUrl, {
        transparent: true,
        srs: "EPSG:3338",
        format: "image/png",
        version: "1.3.0",
        layers: ["atlas_mapproxy:alaska_osm_retina"],
      });

      // Projection definition.
      var proj = new L.Proj.CRS(
        "EPSG:3338",
        "+proj=aea +lat_1=55 +lat_2=65 +lat_0=50 +lon_0=-154 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
        {
          resolutions: [4096, 2048, 1024, 512, 256, 128, 64],

          // Origin should be lower-left coordinate
          // in projected space.  Use GeoServer to
          // find this:
          // TileSet > Gridset Bounds > compute from maximum extent of SRS
          origin: [-4648005.934316417, 444809.882955059],
        }
      );

      // // Set maximum bounds of main map
      let southWest = L.latLng("50", "-175");
      let northEast = L.latLng("65", "-98");
      let bounds = L.latLngBounds(southWest, northEast);

      // Map base configuration
      var config = {
        zoom: 0,
        minZoom: 0,
        maxZoom: 6,
        center: [64.7, -155],
        scrollWheelZoom: false,
        crs: proj,
        continuousWorld: true,
        zoomControl: false,
        doubleClickZoom: false,
        attributionControl: false,
        layers: [baseLayer],
        maxBounds: bounds,
      };

      return config;
    },
  },
};
</script>
