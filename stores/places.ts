import { defineStore } from 'pinia'
const runtimeConfig = useRuntimeConfig()

export interface PointLocation {
  id: string
  name: string
  alt_name?: string
  latitude: number
  longitude: number
  km_to_ocean?: number
  country?: string
  region?: string
}

export const usePlacesStore = defineStore('places', () => {
  const selectedCommunity: Ref<CommunityValue> = ref(undefined)
  const latLng: Ref<LatLngValue> = ref(undefined)
  const randomLocation = ref<PointLocation | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCommunities(): Promise<Community[]> {
    let communities = (await $fetch(
      runtimeConfig.public.apiUrl + '/places/communities?tags=ardac'
    )) satisfies Community[]
    return communities
  }

  async function fetchRandomLocation() {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch('https://earthmaps.io/places/communities')
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid or empty data received from API')
      }
      
      // Select a random location from the array
      const randomIndex = Math.floor(Math.random() * data.length)
      randomLocation.value = data[randomIndex]
    } catch (err) {
      console.error('Error fetching random location:', err)
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
      randomLocation.value = null
    } finally {
      isLoading.value = false
    }
  }

  function clearRandomLocation() {
    randomLocation.value = null
  }

  function isLocationInAlaska(location: PointLocation | null): boolean {
    if (!location) return false
    
    // Rough bounding box for Alaska
    const alaskaBounds = {
      minLat: 51.0,
      maxLat: 72.0,
      minLon: -180.0,
      maxLon: -130.0
    }
    
    return (
      location.latitude >= alaskaBounds.minLat &&
      location.latitude <= alaskaBounds.maxLat &&
      location.longitude >= alaskaBounds.minLon &&
      location.longitude <= alaskaBounds.maxLon
    )
  }

  return {
    fetchCommunities,
    latLng,
    selectedCommunity,
    randomLocation,
    isLoading,
    error,
    fetchRandomLocation,
    clearRandomLocation,
    isLocationInAlaska
  }
})
