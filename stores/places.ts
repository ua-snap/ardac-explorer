import { defineStore } from 'pinia'

export const useStore = defineStore('places', () => {
  
  async function fetchCommunities(): Promise<Community[]> {
    let communities = await $fetch('https://earthmaps.io/places/communities') satisfies Community[]
    return communities
  }
  return {
    fetchCommunities
  }
})
