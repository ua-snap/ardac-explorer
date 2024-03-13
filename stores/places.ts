import { defineStore } from 'pinia'

export const usePlacesStore = defineStore('places', () => {
  const latLng: Ref<LatLngValue> = ref(undefined)

  async function fetchCommunities(): Promise<Community[]> {
    let communities = (await $fetch(
      'https://earthmaps.io/places/communities'
    )) satisfies Community[]
    return communities
  }
  return {
    fetchCommunities,
    latLng,
  }
})
