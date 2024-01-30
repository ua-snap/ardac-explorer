import { defineStore } from 'pinia'
import items from '~/assets/items'

export const useStore = defineStore('store', () => {
  const totalItemCount = ref(items.length)
  const filteredItems = ref(items)
  const searchActive = ref(false)

  return {
    filteredItems,
    searchActive,
    totalItemCount,
  }
})
