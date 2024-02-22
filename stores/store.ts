import { defineStore } from 'pinia'
import items from '~/assets/items'

export const useStore = defineStore('store', () => {
  const totalItemCount = ref(items.length)
  const filteredItems: Ref<Item[]> = ref(items)
  const searchActive = ref(false)
  const latLng = ref({} as LatLng)

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

  const itemBySlug = (slug: Slug): Item => {
    return items.find(item => item.slug === slug)!
  }

  return {
    filteredItems,
    searchActive,
    totalItemCount,
    latLng,
    sortedFilteredItems,
    itemBySlug,
  }
})
