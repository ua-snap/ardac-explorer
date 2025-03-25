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
      const response = await fetch(runtimeConfig.public.apiUrl + '/places/communities')
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid or empty data received from API')
      }
      
      // Group locations by country
      // This is extra logic because the API doesn't return point locations grouped by country
      // And if we randomly select from all locations, Canada, especially Ontario and Quebec,
      // will be overrepresented.
      const locationsByCountry = new Map<string, PointLocation[]>()
      
      data.forEach((location: PointLocation) => {
        const country = location.country?.trim() || 'Unknown'
        if (!locationsByCountry.has(country)) {
          locationsByCountry.set(country, [])
        }
        locationsByCountry.get(country)!.push(location)
      })
      
      // Get array of available countries
      const countries = Array.from(locationsByCountry.keys())
      
      if (countries.length === 0) {
        throw new Error('No country data available')
      }
      
      // Select a random country
      const randomCountry = countries[Math.floor(Math.random() * countries.length)]
      
      // Get locations for the selected country
      const countryLocations = locationsByCountry.get(randomCountry)!
      
      let selectedLocation: PointLocation
      
      // Special handling for Canada - select by province first
      if (randomCountry === 'CA') {
        // Group Canadian locations by region/province
        const locationsByRegion = new Map<string, PointLocation[]>()
        
        countryLocations.forEach((location: PointLocation) => {
          const region = location.region?.trim() || 'Unknown'
          if (!locationsByRegion.has(region)) {
            locationsByRegion.set(region, [])
          }
          locationsByRegion.get(region)!.push(location)
        })
        
        // Get array of available regions
        const regions = Array.from(locationsByRegion.keys())
        
        if (regions.length === 0) {
          // Fallback to normal selection if no region data
          selectedLocation = countryLocations[Math.floor(Math.random() * countryLocations.length)]
        } else {
          // Select a random region
          const randomRegion = regions[Math.floor(Math.random() * regions.length)]
          
          // Get locations for the selected region
          const regionLocations = locationsByRegion.get(randomRegion)!
          
          // Select a random location from the selected region
          selectedLocation = regionLocations[Math.floor(Math.random() * regionLocations.length)]
        }
      } else {
        // For non-Canadian locations, select randomly as before
        selectedLocation = countryLocations[Math.floor(Math.random() * countryLocations.length)]
      }
      
      // Assign the selected location to the ref
      randomLocation.value = selectedLocation
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
