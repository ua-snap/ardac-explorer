<script lang="ts" setup>
// bbox order is
// [ lower-left lng, lower-left lat, upper-right lng, upper-right lat ]
const props = defineProps<{
  bbox?: number[]
  label?: string
}>()

import items from '~/assets/items'

const store = useStore()
const placesStore = usePlacesStore()

const { $autoComplete, $parseDMS } = useNuxtApp()

const fieldMessage = ref('')
const parsedLatLng: Ref<LatLngValue> = ref(undefined)
const latLngIsValid = ref(false)
let communities = placesStore.fetchCommunities()

onMounted(() => {
  let config = {
    selector: '#gimme',
    placeHolder: 'Search community names or enter a lat/long',
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
        let community = match.value
        if (community.alt_name) {
          element.innerHTML =
            element.innerHTML + ' <span>/ ' + community.alt_name + '</span>'
        }
      },
    },
    // Intercept/test for valid Lat/Lng
    query: (input: string) => {
      let result = validate(input)
      if (result) {
        placesStore.latLng = result
      }
      return input
    },
  }
  new $autoComplete(config)

  // When a placename is selected, populate the store.
  document
    .querySelector('#gimme')!
    .addEventListener('selection', function (event) {
      let community = (event as CustomEvent).detail.selection.value
      placesStore.latLng = { lat: community.latitude, lng: community.longitude }
    })
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

  // If it's alphanumeric or empty, don't try to parse / validate
  if (latLng === '' || /^[a-zA-Z]+/.test(latLng)) {
    fieldMessage.value = ''
    latLngIsValid.value = false
    return false
  }

  // ParseDMS throws if parsing fails: capture + ignore
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
        // Rounding!
        lat = +(lat.toFixed(2))
        lon = +(lon.toFixed(2))

        // It's a valid lat/lng: update the button so it can
        // trigger setting the store.
        fieldMessage.value = ''
        parsedLatLng.value = { lat: lat, lng: lon } as LatLng
        latLngIsValid.value = true
        return parsedLatLng.value
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
  fieldMessage.value = `Lat/long must be in decimal degrees or DMS format, i.e. 65°30'0.56" -140°7'34.45"`
  latLngIsValid.value = false
  parsedLatLng.value = undefined
  placesStore.latLng = undefined
  return false
}

function setLatLng() {
  placesStore.latLng = parsedLatLng.value
}

onUnmounted(() => {
  placesStore.latLng = undefined
})
</script>

<template>
  <div class="content is-size-4">{{ placesStore.latLng }}</div>
  <div class="field">
    <div class="control">
      <label class="label">Get data for a community or by lat/long</label>
      <input id="gimme" />
      <button
        v-if="latLngIsValid"
        @click="setLatLng"
        class="button is-link is-light"
      >
        Get data for {{ parsedLatLng?.lat }}, {{ parsedLatLng?.lng }}
      </button>
    </div>
    <p class="help" v-html="fieldMessage" />
  </div>
</template>

<style lang="scss" scoped>
@import '~/node_modules/@tarekraafat/autocomplete.js/dist/css/autoComplete.02.css';

:deep(.autoComplete_wrapper > ul > li:hover) {
  background-color: #b7ffaf;
}

#gimme {
  background-image: none;
}
</style>
