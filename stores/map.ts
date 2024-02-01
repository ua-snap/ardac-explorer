// import _ from 'lodash'
// const mapContent = require('~/components/map_content')
import { layers, legend } from '~/components/map_content'

import { defineStore } from 'pinia'
const { $L } = useNuxtApp()

// These three variables needs to be outside of the Store or there's problems
// because Leaflet mutates the state of the map, and Vuex
// throws a "Don't do that" error; plus, having these objects
// within the scope of the Nuxt/Vue reactivity decoration causes
// unpredictable buggy behavior ("too much recursion")

// collection of Leaflet map objects, keys mapping to map_content.js
const maps: { [index: string]: any } = {}

// collection of active layer Leaflet objects, keyed like `maps` var above
var layerObjects: { [index: string]: any } = {}

// Collection of legend objects, keyed like `maps` var above
var legendControls: { [index: string]: any } = {}

import {
  tileLayer,
  control,
  latLng,
  latLngBounds,
  type MapOptions,
  type Map,
} from 'leaflet'

function getBaseMapAndLayers(): MapOptions {
  const config = useRuntimeConfig()

  // Projection definition.
  var proj = new $L.Proj.CRS(
    'EPSG:3338',
    '+proj=aea +lat_1=55 +lat_2=65 +lat_0=50 +lon_0=-154 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs',
    {
      resolutions: [4096, 2048, 1024, 512, 256, 128, 64],

      // Origin should be lower-left coordinate
      // in projected space.  Use GeoServer to
      // find this:
      // TileSet > Gridset Bounds > compute from maximum extent of SRS
      origin: [-4648005.934316417, 444809.882955059],
    }
  )

  let baseLayer = tileLayer.wms(config.public.geoserverUrl, {
    transparent: true,
    crs: proj,
    format: 'image/png',
    version: '1.3.0',
    layers: 'atlas_mapproxy:alaska_osm_retina',
  })

  // Set maximum bounds of main map
  let southWest = latLng(50.5, 155)
  let northEast = latLng(64, -131)
  let bounds = latLngBounds(southWest, northEast)

  // Map base configuration
  let layerConfig: MapOptions = {
    zoom: 1,
    minZoom: 1,
    maxZoom: 6,
    center: [64.7, -155],
    scrollWheelZoom: false,
    crs: proj,
    // continuousWorld: true, // RED FLAG >> FIX BEFORE MERGE
    zoomControl: false,
    doubleClickZoom: false,
    attributionControl: false,
    layers: [baseLayer],
    maxBounds: bounds,
  }

  return layerConfig
}

function buildLayer(layer: MapLayer) {
  let layerConfiguration = {
    transparent: true,
    format: 'image/png',
    version: '1.3.0',
    layers: layer.wmsLayerName,
    id: layer.id,
    style: layer.style,
  }

  if (layer.rasdamanConfiguration) {
    layerConfiguration = {
      ...layerConfiguration,
      ...layer.rasdamanConfiguration,
    }
  }

  const config = useRuntimeConfig()
  let wmsUrl =
    layer.source == 'rasdaman'
      ? config.public.rasdamanUrl
      : config.public.geoserverUrl

  return tileLayer.wms(wmsUrl, layerConfiguration)
}

export const useStore = defineStore('map', () => {
  //const childRef = ref<InstanceType<typeof ChildComponent>>()
  //{ [index: string]: any }

  const selectedLayer = ref<MapLayerInstance>()

  // const totalItemCount = ref(items.length)
  // const filteredItems = ref(items)
  // const searchActive = ref(false)

  function create(mapName: string) {
    maps[mapName] = $L.map(mapName, getBaseMapAndLayers())

    // Craig, check:
    // This may have never been reachable code?  maxBounds does not
    // exist anywhere in this or ARctic EDS repo -- old dead stuff?
    // maps[mapName].on('drag', function () {
    //   maps[mapName].panInsideBounds(mapConfig.maxBounds, { animate: false })
    // })

    new $L.Control.Zoom({ position: 'topright' }).addTo(maps[mapName])
  }

  function destroy(mapName: string) {
    if (maps[mapName]) {
      maps[mapName].remove()
    }
  }

  // What type is layerInfo? -- pack into toggleLayer
  // function setSelectedLayer(layerInfo) {
  //   // Because it's an object, need to use Vue.set to get
  //   // proper reactivity
  //   Vue.set(state.selectedLayers, layerInfo.mapName, layerInfo.layer.id)
  // }

  //
  function addLegend(mapId: string) {
    if (legendControls[mapId]) {
      legendControls[mapId].remove()
    }

    legendControls[mapId] = new $L.Control({ position: 'topleft' })

    legendControls[mapId].onAdd = (map: Map) => {
      var div = $L.DomUtil.create('div', 'info legend')
      div.innerHTML = ''
      legend.forEach(legendItem => {
        div.innerHTML +=
          '<div class="legend-item"><div class="legend-swatch" style="background-color: ' +
          legendItem['color'] +
          ';"></div> ' +
          legendItem['label'] +
          '</div>'
      })
      return div
    }

    legendControls[mapId].addTo(maps[mapId])
  }

  function toggleLayer(layerObj: MapLayerInstance) {
    const config = useRuntimeConfig()

    // Remove existing layer: right now, we only
    // want one layer to be visible on any map in the Atlas.
    // Need to test explicitly for the existence of the
    // layerObject because this code can get run while
    // the full DOM is hydrating, see MapLayer / mounted().

    // Need to figure out this "selectedLayers" stuff
    // If it's only ever 1 layer, we can handle it that way.

    // if (
    //   state.selectedLayers[layerObj.mapId] &&
    //   layerObjects[layerObj.mapId]
    // ) {
    //   maps[layerObj.mapId].removeLayer(layerObjects[layerObj.mapId])
    // }

    // Build configuration merging some basics with
    // layer-specific configuration in map_content.js
    let layer = layerObj.layer
    let layerConfiguration = {
      transparent: true,
      format: 'image/png',
      version: '1.3.0',
      layers: layer.wmsLayerName,
      id: layer.id,
      style: layer.style,
      rasdamanConfiguration: layer.rasdamanConfiguration,
    }

    let wmsUrl =
      layer.source == 'rasdaman'
        ? config.public.rasdamanUrl
        : config.public.geoserverUrl

    layerObjects[layerObj.mapId] = tileLayer.wms(wmsUrl, layerConfiguration)
    maps[layerObj.mapId].addLayer(layerObjects[layerObj.mapId])
    
    selectedLayer.value = {
      mapId: layerObj.mapId,
      layer: layer,
    }

    addLegend(layerObj.mapId)
    
  }

  return {
    toggleLayer,
    selectedLayer,
    create,
    destroy,
    addLegend,
    // searchActive,
    // totalItemCount,
  }
})

export default {
  mutations: {},
}
