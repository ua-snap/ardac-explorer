import { defineStore } from 'pinia'
const runtimeConfig = useRuntimeConfig()

export const usePlacesStore = defineStore('places', () => {
  const selectedCommunity: Ref<CommunityValue> = ref(undefined)
  const latLng: Ref<LatLngValue> = ref(undefined)

  async function fetchCommunities(): Promise<Community[]> {
    let communities = (await $fetch(
      runtimeConfig.public.apiUrl + '/places/communities?tags=ardac'
    )) satisfies Community[]
    return communities
  }
  return {
    fetchCommunities,
    latLng,
    selectedCommunity,
  }
})
