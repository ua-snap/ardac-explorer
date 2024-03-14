import { defineStore } from 'pinia'
const runtimeConfig = useRuntimeConfig()
const store = useStore()
const placesStore = usePlacesStore()

const endpoints: Record<string, string> = {
  beetles: '/beetles/point/',
  heatingDegreeDays: '/degree_days/heating/',
  indicators: '/indicators/base/point/',
  landfastSeaIce: '/landfastice/point/',
  freezingIndex: '/degree_days/freezing_index/',
  precipitation: '/precipitation/point/',
  precipitationFrequency: '/precipitation/frequency/point/',
  temperature: '/temperature/point/',
  thawingIndex: '/degree_days/thawing_index/',
  wetDaysPerYear: '/wet_days_per_year/all/point/',
}

export const useDataStore = defineStore('data', () => {
  // Use "any" type since apiData will be used to store many different types of
  // data we will get from the API for different ARDAC items.
  const apiData: any = ref(null)
  const dataError: Ref<boolean> = ref(false)

  const fetchData = async (dataset: string) => {
    if(placesStore.latLng === undefined) {
      return // do not try
    }
    apiData.value = null
    dataError.value = false
    let url =
      runtimeConfig.public.apiUrl +
      endpoints[dataset] +
      placesStore.latLng.lat +
      '/' +
      placesStore.latLng.lng
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (response.status === 200) {
        apiData.value = data
      } else {
        dataError.value = true
      }
    } catch (error) {
      dataError.value = true
    }
  }

  return {
    fetchData,
    apiData,
    dataError,
  }
})
