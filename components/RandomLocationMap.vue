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

const headerLabel = computed(() => {
  if (!location.value) return ''

  let label = locationLabel.value

  // Add region and country if available
  const parts = []
  if (location.value.region && location.value.region.trim()) {
    parts.push(location.value.region)
  }
  if (location.value.country && location.value.country.trim()) {
    parts.push(location.value.country)
  }

  if (parts.length > 0) {
    label += `, ${parts.join(', ')}`
  }

  return label
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

  // Create the map
  const map = $L.map(mapId, {
    center: [location.value.latitude, location.value.longitude],
    zoom: 8,
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: true,
  })

  // Determine maxZoom based on country
  let maxZoom = 8 // Default for most of the world
  if (location.value.country) {
    const country = location.value.country.trim().toLowerCase()
    if (country === 'us' || country === 'usa' || country === 'united states') {
      maxZoom = 16
    } else if (country === 'canada' || country === 'ca') {
      maxZoom = 12
    }
  }

  // Use USGS National Map for all locations
  baseLayer.value = $L.tileLayer(
    'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: 'USGS The National Map',
      maxZoom: maxZoom,
    }
  )

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
      class="button is-primary is-medium is-fullwidth"
      @click="showRandomLocation"
      :class="{ 'is-loading': loading }"
      :disabled="loading"
    >
      <span class="icon mr-2">
        <i class="fas fa-map-marker-alt"></i>
      </span>
      <span>Show me a random ARDAC point location</span>
    </button>

    <div v-if="isMapVisible && location" class="map-container mt-4">
      <div class="map-header">
        <h4 class="title is-5">{{ headerLabel }}</h4>
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

  .button.is-primary.is-medium.is-fullwidth {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 2px solid darken($primary, 5%);
    font-weight: 600;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }
  }
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
