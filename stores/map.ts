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

import {
  tileLayer,
  latLng,
  latLngBounds,
  type TileLayer,
  type MapOptions,
} from 'leaflet'

var coastlineLayer: TileLayer.WMS
var populatedPlaces: TileLayer.WMS
var mask: TileLayer.WMS

function getBaseMapAndLayers(): MapOptions {
  const config = useRuntimeConfig()

  // Projection definition.
  const proj = new $L.Proj.CRS(
    'EPSG:3572',
    '+proj=laea +lat_0=90 +lon_0=-150 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs',
    {
      resolutions: [12000, 6000, 3000, 1500, 750],

      // Origin should be lower-left coordinate
      // in projected space.  Use GeoServer to
      // find this:
      // TileSet > Gridset Bounds > compute from maximum extent of SRS
      origin: [0.0, -1915741.27],
    }
  )

  const baseLayer = tileLayer.wms(
    'https://basemap.nationalmap.gov/arcgis/services/USGSShadedReliefOnly/MapServer/WMSServer',
    {
      transparent: true,
      crs: proj,
      format: 'image/png',
      version: '1.3.0',
      layers: '0',
    }
  )

  // Set maximum bounds of main map
  const southWest = latLng(50.5, 155)
  const northEast = latLng(64, -131)
  const bounds = latLngBounds(southWest, northEast)

  // Map base configuration
  let layerConfig: MapOptions = {
    zoom: 0,
    zoomSnap: 0.1,
    minZoom: 0,
    maxZoom: 6,
    center: [90, 0],
    scrollWheelZoom: false,
    crs: proj,
    zoomControl: false,
    doubleClickZoom: false,
    attributionControl: false,
    layers: [baseLayer],
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

    // Remove existing active layer & coastline from map
    if (layerObjects[layerObj.mapId]) {
      maps[layerObj.mapId].removeLayer(layerObjects[layerObj.mapId])
      if (maps[layerObj.mapId]?.hasLayer(populatedPlaces)) {
        maps[layerObj.mapId].removeLayer(populatedPlaces)
      }
      if (maps[layerObj.mapId]?.hasLayer(mask)) {
        maps[layerObj.mapId].removeLayer(mask)
      }
      if (
        coastlineLayer != undefined &&
        maps[layerObj.mapId].hasLayer(coastlineLayer)
      ) {
        maps[layerObj.mapId].removeLayer(coastlineLayer)
      }
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
      opacity: 0.85,
      ...layer.rasdamanConfiguration,
    }

    let wmsUrl =
      layer.source == 'rasdaman'
        ? config.public.rasdamanUrl
        : config.public.geoserverUrl

    layerObjects[layerObj.mapId] = tileLayer.wms(wmsUrl, layerConfiguration)
    maps[layerObj.mapId]?.addLayer(layerObjects[layerObj.mapId])

    populatedPlaces = tileLayer.wms(config.public.geoserverUrl, {
      transparent: true,
      format: 'image/png',
      layers: 'ne_10m_populated_places',
      styles: 'playground:ardac_places_filtered',
      zIndex: 10,
    })
    maps[layerObj.mapId]?.addLayer(populatedPlaces)

    mask = tileLayer.wms(config.public.geoserverUrl, {
      transparent: true,
      format: 'image/png',
      layers: 'playground:cmip6_epsg3572_mask',
      styles: 'playground:mask_epsg3572',
      zIndex: 20,
    })
    maps[layerObj.mapId]?.addLayer(mask)

    if (layerObj.layer.bbox) {
      const bounds = latLngBounds(
        latLng(layerObj.layer.bbox[1], layerObj.layer.bbox[0]),
        latLng(layerObj.layer.bbox[3], layerObj.layer.bbox[2])
      )
      maps[layerObj.mapId]?.fitBounds(bounds)
    }

    if (layerObj.layer.coastline) {
      coastlineLayer = tileLayer.wms(config.public.geoserverUrl, {
        transparent: true,
        format: 'image/png',
        version: '1.3.0',
        layers: 'playground:ne_10m_coastline_epsg3572',
      })
      maps[layerObj.mapId]?.addLayer(coastlineLayer)
    }

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
