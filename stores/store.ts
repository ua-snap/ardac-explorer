import { defineStore } from 'pinia'
import items from '~/assets/items'

export const useStore = defineStore('store', () => {
  const totalItemCount = ref(items.length)
  const filteredItems = ref(items)
  const searchActive = ref(false)

  // Sort items with a priority field above items without a priority field.
  // For items with a priority field, lower numbers sort higher.
  const sortedFilteredItems = computed(() => {
    let itemsWithPriority = filteredItems.value.filter(
      item => item.priority !== undefined
    )
    let itemsWithoutPriority = filteredItems.value.filter(
      item => !item.priority
    )
    itemsWithPriority.sort((a, b) => a.priority! - b.priority!)
    return itemsWithPriority.concat(itemsWithoutPriority)
  })

  return {
    filteredItems,
    searchActive,
    totalItemCount,
    sortedFilteredItems,
  }
})
