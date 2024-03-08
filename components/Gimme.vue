<script lang="ts" setup>
// bbox order is left, bottom, right, top
const props = defineProps<{
  bbox?: number[]
  label?: string
  errorMsg?: string
}>()

import { useStore as usePlacesStore } from '~/stores/places'
const store = useStore()
const placeStore = usePlacesStore()
const { $autoComplete, $parseDMS } = useNuxtApp()
const fieldMessage = ref('')
const inputLabel = ref('Get data for a community or by lat/long')
if (props.label) {
  inputLabel.value = props.label
}
let communities = placeStore.fetchCommunities()

import items from '~/assets/items'

onMounted(() => {
  let config = {
    selector: '#gimme',
    placeHolder: 'Search places or enter a lat/long',
    data: {
      src: communities,
      keys: ['name'],
    },
    threshold: 0,
    resultsList: {
      maxResults: 999,
    },
    // Include alt name if possible
    resultItem: {
      element: (element: HTMLElement, match: any) => {
        console.log(match)
        let community = match.value
        if (community.alt_name) {
          element.innerHTML =
            element.innerHTML + ' <span>(' + community.alt_name + ')</span>'
        }
      },
    },
    // Intercept/test for valid Lat/Lng
    query: (input: string) => {
      if (validate(input)) {
        alert('winner')
      }
      return input
    },
  }
  new $autoComplete(config)
})

let bbox: number[]
if (props.bbox) {
  bbox = props.bbox
} else {
  bbox = [-179.1506, 51.229, -129.9795, 71.3526]
}

const validate = (latLng: string) => {
  let lat: number
  let lon: number

  try {
    let parsedDms = $parseDMS(latLng)
    if (parsedDms && parsedDms.lat && parsedDms.lon) {
      lat = parsedDms.lat
      lon = parsedDms.lon

      // Make sure lat/lon is within BBOX.
      // This currently does not support BBOXes that cross the antimeridian.
      if (
        lat >= bbox[1] &&
        lat <= bbox[3] &&
        lon >= bbox[0] &&
        lon <= bbox[2]
      ) {
        return true
      } else {
        fieldMessage.value =
          'This point is outside the bounding box of data: latitude between ' +
          bbox[1] +
          ' – ' +
          bbox[3] +
          ', longitude between ' +
          bbox[0] +
          ' – ' +
          bbox[2]
      }
    }
  } catch (e) {
    // ignore, it's ParseDMS throwing an error
  }
  return false
}

onUnmounted(() => {
  store.latLng = {} as LatLng
})
</script>

<template>
  <div class="field">
    <div class="control">
      <label class="label" v-html="inputLabel" />
      <input id="gimme" />
      <button class="button is-link is-light">Get data</button>
    </div>
    <p class="help" v-html="fieldMessage" />
  </div>
</template>

<style lang="scss" scoped>
@import '~/node_modules/@tarekraafat/autocomplete.js/dist/css/autoComplete.02.css';
</style>
