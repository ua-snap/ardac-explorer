import { defineStore } from 'pinia'

export const usePlacesStore = defineStore('places', () => {
  const selectedCommunity: Ref<CommunityValue> = ref(undefined)
  const latLng: Ref<LatLngValue> = ref(undefined)

  async function fetchCommunities(): Promise<Community[]> {
    let communities = (await $fetch(
      'http://localhost:5000/places/communities'
    )) satisfies Community[]
    return communities
  }
  return {
    fetchCommunities,
    latLng,
    selectedCommunity,
  }
})
