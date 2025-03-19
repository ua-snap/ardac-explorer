<script setup lang="ts">
import { usePlacesStore, type PointLocation } from '~/stores/places'
import { useMapStore } from '~/stores/map'
import type { LatLngTuple } from 'leaflet'

const placesStore = usePlacesStore()
const mapStore = useMapStore()
const config = useRuntimeConfig()
const { $L } = useNuxtApp()

const isMapVisible = ref(false)
const mapId = 'random-location-map'
const mapInstance = ref<any>(null)
const marker = ref<any>(null)
const baseLayer = ref<any>(null)

const loading = computed(() => placesStore.isLoading)
const error = computed(() => placesStore.error)
const location = computed(() => placesStore.randomLocation)
const locationLabel = computed(() => {
  if (!location.value) return ''

  return location.value.alt_name
    ? `${location.value.name} (${location.value.alt_name})`
    : location.value.name
})

async function showRandomLocation() {
  await placesStore.fetchRandomLocation()
  if (location.value) {
    isMapVisible.value = true
    nextTick(() => {
      initMap()
    })
  }
}

function initMap() {
  if (!location.value) return

  // Clean up existing map if it exists
  if (mapInstance.value) {
    mapInstance.value.remove()
  }

  const isInAlaska = placesStore.isLocationInAlaska(location.value)

  // Create the map
  const map = $L.map(mapId, {
    center: [location.value.latitude, location.value.longitude],
    zoom: 9,
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: true,
  })

  // Set the base layer
  if (isInAlaska) {
    // Use Alaska basemap for Alaska locations
    baseLayer.value = $L.tileLayer.wms(config.public.geoserverUrl, {
      transparent: true,
      format: 'image/png',
      version: '1.3.0',
      layers: 'atlas_mapproxy:alaska_osm_retina',
    })
  } else {
    // Use OpenStreetMap for non-Alaska locations
    baseLayer.value = $L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    )
  }

  baseLayer.value.addTo(map)

  // Add marker for the location
  const pointCoords: LatLngTuple = [
    location.value.latitude,
    location.value.longitude,
  ]
  marker.value = $L.marker(pointCoords).addTo(map)

  // Add popup with location name
  marker.value.bindPopup(locationLabel.value).openPopup()

  // Save map instance reference
  mapInstance.value = map
}

function closeMap() {
  isMapVisible.value = false
  placesStore.clearRandomLocation()
  if (mapInstance.value) {
    mapInstance.value.remove()
    mapInstance.value = null
  }
}

onBeforeUnmount(() => {
  if (mapInstance.value) {
    mapInstance.value.remove()
  }
})
</script>

<template>
  <div class="random-location-container">
    <button
      class="button is-primary"
      @click="showRandomLocation"
      :class="{ 'is-loading': loading }"
      :disabled="loading"
    >
      Show me a random point location
    </button>

    <div v-if="isMapVisible && location" class="map-container mt-4">
      <div class="map-header">
        <h4 class="title is-5">{{ locationLabel }}</h4>
        <button class="button is-small is-light" @click="closeMap">
          Close
        </button>
      </div>

      <div :id="mapId" class="map-element"></div>

      <div class="location-details mt-2">
        <p>
          <strong>Coordinates:</strong> {{ location.latitude.toFixed(4) }}°,
          {{ location.longitude.toFixed(4) }}°
        </p>
        <p v-if="location.km_to_ocean">
          <strong>Distance to ocean:</strong> {{ location.km_to_ocean }} km
        </p>
      </div>
    </div>

    <div v-if="error" class="notification is-danger mt-4">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.random-location-container {
  margin: 2rem 0;
}

.map-container {
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;

  .map-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: #f5f5f5;

    .title {
      margin-bottom: 0;
    }
  }

  .map-element {
    height: 400px;
    width: 100%;
  }

  .location-details {
    padding: 0.75rem 1rem;
    background-color: #f5f5f5;

    p {
      margin-bottom: 0.25rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
