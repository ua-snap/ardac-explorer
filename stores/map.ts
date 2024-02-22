import { defineStore } from 'pinia'
const { $L } = useNuxtApp()

// Leaflet map objects, keys equal to ID of Leaflet map
const maps: { [index: string]: any } = {}

// Active layer Leaflet objects, keyed like `maps` var above
var layerObjects: { [index: string]: any } = {}

// Leaflet control (legend) objects, keyed like `maps` var above
var legendControls: { [index: string]: any } = {}

// Legend items for each map, keyed like `maps` var above.
var legendItems: { [index: string]: any } = {}

import { tileLayer, latLng, latLngBounds, type MapOptions } from 'leaflet'

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
    zoomControl: false,
    doubleClickZoom: false,
    attributionControl: false,
    layers: [baseLayer],
    maxBounds: bounds,
  }

  return layerConfig
}

export const useMapStore = defineStore('map', () => {
  // The active layer on each map
  const activeLayers: Ref<Record<string, MapLayer>> = ref({})

  // Create the Leaflet map object.
  // mapID = string corresponding to element ID.
  function create(mapId: string) {
    maps[mapId] = $L.map(mapId, getBaseMapAndLayers())
    new $L.Control.Zoom({ position: 'topright' }).addTo(maps[mapId])
  }

  function destroy(mapId: string) {
    if (maps[mapId]) {
      maps[mapId].remove()
    }
  }

  // `legends` is an object with keys corresponding to the name of the
  // legend to use for the layer, and values which is an array of legend items.
  function setLegendItems(
    mapId: string,
    legends: Record<string, LegendItem[]>
  ) {
    legendItems[mapId] = legends
  }

  // legendKey = the `legend` property in the definition of a MapLayer.
  function addLegend(mapId: string, legendKey: string) {
    // Legends must be provided by the component rendering
    // the map via the `setLegends` method.
    if (!legendItems[mapId]) {
      throw `Legend items not set for map ID '${mapId}' in mapStore`
    }

    // Remove the active map legend, if present
    if (legendControls[mapId]) {
      legendControls[mapId].remove()
    }

    legendControls[mapId] = new $L.Control({ position: 'topleft' })
    legendControls[mapId].onAdd = (map: L.Map) => {
      var div = $L.DomUtil.create('div', 'info legend')
      div.innerHTML = ''
      legendItems[mapId][legendKey].forEach((legendItem: LegendItem) => {
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

    // Remove existing active layer from map
    if (layerObjects[layerObj.mapId]) {
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
      styles: layer.style,
      ...layer.rasdamanConfiguration,
    }

    let wmsUrl =
      layer.source == 'rasdaman'
        ? config.public.rasdamanUrl
        : config.public.geoserverUrl

    layerObjects[layerObj.mapId] = tileLayer.wms(wmsUrl, layerConfiguration)
    maps[layerObj.mapId]?.addLayer(layerObjects[layerObj.mapId])

    activeLayers.value[layerObj.mapId] = layer

    addLegend(layerObj.mapId, layer.legend)
  }

  return {
    toggleLayer,
    activeLayers,
    create,
    setLegendItems,
    destroy,
    addLegend,
  }
})
