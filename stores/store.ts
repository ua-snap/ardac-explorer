import { defineStore } from 'pinia'
import items from '~/assets/items'

export const useStore = defineStore('store', () => {
  const filteredItems = ref(items)
  const searchActive = ref(false)

  return {
    filteredItems,
    searchActive,
  }
})
