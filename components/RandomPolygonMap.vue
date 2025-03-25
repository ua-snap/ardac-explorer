<script setup lang="ts">
import {
  usePolygonsStore,
  type PolygonFeature,
  type PolygonGeometry,
} from '~/stores/polygons'
import { useMapStore } from '~/stores/map'

const polygonsStore = usePolygonsStore()
const mapStore = useMapStore()
const config = useRuntimeConfig()
const { $L } = useNuxtApp()

const isMapVisible = ref(false)
const mapId = 'random-polygon-map'
const mapInstance = ref<any>(null)
const polygonLayer = ref<any>(null)
const baseLayer = ref<any>(null)

const loading = computed(() => polygonsStore.isLoading)
const error = computed(() => polygonsStore.error)
const feature = computed(() => polygonsStore.randomFeature)
const geometry = computed(() => polygonsStore.featureGeometry)
const category = computed(() => polygonsStore.selectedCategory)

const featureLabel = computed(() => {
  if (!feature.value) return ''
  return feature.value.name
})

const headerLabel = computed(() => {
  if (!feature.value || !category.value) return ''

  return `${feature.value.name} - ${category.value.name}`
})

async function showRandomPolygon() {
  await polygonsStore.fetchRandomPolygon()
  if (feature.value && geometry.value) {
    isMapVisible.value = true
    nextTick(() => {
      initMap()
    })
  }
}

function initMap() {
  if (!feature.value || !geometry.value || !geometry.value.geometry) {
    console.error('Missing feature or geometry data')
    polygonsStore.setError('Missing or invalid polygon data')
    return
  }

  // Clean up existing map if it exists
  if (mapInstance.value) {
    mapInstance.value.remove()
  }

  // Create the map with default center (will be updated when polygon is added)
  const map = $L.map(mapId, {
    center: [65, -155], // Default center in Alaska
    zoom: 4, // Default zoom
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: true,
  })

  baseLayer.value = $L.tileLayer(
    'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: 'USGS The National Map',
      maxZoom: 12,
    }
  )

  baseLayer.value.addTo(map)

  try {
    // Create a valid GeoJSON feature from the geometry
    const geoJsonFeature = {
      type: 'Feature',
      properties: {
        name: feature.value.name,
        id: feature.value.id,
      },
      geometry: geometry.value.geometry,
    }

    polygonLayer.value = $L
      .geoJSON(geoJsonFeature as any, {
        style: {
          color: '#0077cc',
          weight: 2,
          opacity: 0.7,
          fillColor: '#00aaff',
          fillOpacity: 0.3,
        },
      })
      .addTo(map)

    // Fit map to polygon bounds
    if (polygonLayer.value && polygonLayer.value.getBounds) {
      map.fitBounds(polygonLayer.value.getBounds(), { padding: [20, 20] })
    } else {
      // Fallback if bounds not available
      console.warn('Could not determine polygon bounds')
    }
  } catch (e) {
    console.error('Error creating polygon layer:', e)
    polygonsStore.setError('Error displaying polygon')
  }

  // Save map instance reference
  mapInstance.value = map
}

function closeMap() {
  isMapVisible.value = false
  polygonsStore.clearRandomPolygon()
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
  <div class="random-polygon-container has-text-centered">
    <button
      class="button is-primary is-medium px-3"
      @click="showRandomPolygon"
      :class="{ 'is-loading': loading }"
      :disabled="loading"
    >
      <span class="icon ml-0 mr-2">
        <i class="fas fa-draw-polygon"></i>
      </span>
      <span>Show a random polygon feature</span>
    </button>

    <div v-if="isMapVisible && feature && geometry" class="map-container mt-4">
      <div class="map-header">
        <h4 class="title is-5">{{ headerLabel }}</h4>
        <button class="button is-small is-light px-2" @click="closeMap">
          Close
        </button>
      </div>

      <div :id="mapId" class="map-element"></div>

      <div class="feature-details mt-2">
        <p><strong>Feature ID:</strong> {{ feature.id }}</p>
      </div>
    </div>

    <div v-if="error" class="notification is-danger mt-4">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.random-polygon-container {
  margin: 2rem 0;

  .button {
    padding-left: 0;
    padding-right: 0;

    &.is-primary.is-medium {
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

  .feature-details {
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
