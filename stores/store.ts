import { defineStore } from 'pinia'
import items from '~/assets/items'

export const useStore = defineStore('store', () => {
  const totalItemCount = ref(items.length)
  const allItems = ref(items)
  const filteredItems = ref(items)
  const searchActive = ref(false)

  const tagItems = (tag: string) => {
    return allItems.value.filter(item => item.tags.includes(tag))
  }

  return {
    allItems,
    filteredItems,
    searchActive,
    totalItemCount,
    tagItems,
  }
})
