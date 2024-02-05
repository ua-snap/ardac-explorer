// @ts-nocheck
// 👹👹👹
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
const { $L } = useNuxtApp()

// collection of Leaflet map objects, keys equal to ID of Leaflet map
const maps: { [index: string]: any } = {}

// collection of active layer Leaflet objects, keyed like `maps` var above
var layerObjects: { [index: string]: any } = {}

// Collection of leaflet control (legend) objects, keyed like `maps` var above
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
  const proj = new $L.Proj.CRS(
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

  const baseLayer = tileLayer.wms(config.public.geoserverUrl, {
    transparent: true,
    crs: proj,
    format: 'image/png',
    version: '1.3.0',
    layers: 'atlas_mapproxy:alaska_osm_retina',
  })

  // Set maximum bounds of main map
  const southWest = latLng(50.5, 155)
  const northEast = latLng(64, -131)
  const bounds = latLngBounds(southWest, northEast)

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

export const useMapStore = defineStore('map', () => {

  const count = ref(0)

  // The active layer on each map
  // NOTE that this isn't declared properly for Typescript?
  // Uncomment the bypass on like 1 and watch it fail.
  // I can't figure out the right syntax for the type
  // declaration.
  // 👹👹👹
  const activeLayers : Ref<Record<string, MapLayer>> = ref({})

  function create(mapId: string) {
    maps[mapId] = $L.map(mapId, getBaseMapAndLayers())

    // -- Restore this code -- looks real? double-check first
    // This may have never been reachable code?  maxBounds does not
    // exist anywhere in this or ARctic EDS repo -- old dead stuff?
    // maps[mapId].on('drag', function () {
    //   maps[mapId].panInsideBounds(mapConfig.maxBounds, { animate: false })
    // })

    new $L.Control.Zoom({ position: 'topright' }).addTo(maps[mapId])
  }

  function destroy(mapId: string) {
    if (maps[mapId]) {
      maps[mapId].remove()
    }
  }

  function addLegend(mapId: string) {
    // >> reroll in progress <<
    // if (legendControls[mapId]) {
    //   legendControls[mapId].remove()
    // }
    // legendControls[mapId] = new $L.Control({ position: 'topleft' })
    // legendControls[mapId].onAdd = (map: Map) => {
    //   var div = $L.DomUtil.create('div', 'info legend')
    //   div.innerHTML = ''
    //   legend.forEach(legendItem => {
    //     div.innerHTML +=
    //       '<div class="legend-item"><div class="legend-swatch" style="background-color: ' +
    //       legendItem['color'] +
    //       ';"></div> ' +
    //       legendItem['label'] +
    //       '</div>'
    //   })
    //   return div
    // }
    // legendControls[mapId].addTo(maps[mapId])
  }

  function toggleLayer(layerObj: MapLayerInstance) {
    const config = useRuntimeConfig()

    // Remove existing active layer from map
    if (
      activeLayers[layerObj.mapId] &&
      layerObjects[layerObj.mapId]
    ) {
      maps[layerObj.mapId].removeLayer(layerObjects[layerObj.mapId])
    }

    // Build new layer configuration
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
    maps[layerObj.mapId]?.addLayer(layerObjects[layerObj.mapId])

    // Is this not triggering a reactive update?
    // Why?
    // 👹👹👹
    activeLayers[layerObj.mapId] = layer

    // addLegend(layerObj.mapId)
  }

  return {
    toggleLayer,
    activeLayers,
    create,
    destroy,
    addLegend,
  }
})
