<script lang="ts" setup>
// bbox order is
// [ lower-left lng, lower-left lat, upper-right lng, upper-right lat ]
const props = defineProps<{
  bbox?: number[]
  label?: string
}>()

const placesStore = usePlacesStore()
let communities = placesStore.fetchCommunities()

const { $autoComplete, $parseDMS } = useNuxtApp()

const fieldMessage = ref('') // Helper message when user is entering lat/lng
const parsedLatLng: Ref<LatLngValue> = ref(undefined)
const latLngIsValid = ref(false)
const placeIsSelected = ref(false) // has the user confirmed a place?
const placeSelectionType: Ref<PlaceType> = ref(undefined) // community | latLng
const selectedCommunityName = ref('') // i.e. Fairbanks, etc
const inputValue = ref('') // input value for autocompleter
const gimmeInput = ref() // DOM element of #gimme

onMounted(() => {
  let config = {
    selector: '#gimme',
    placeHolder: 'Search community names or enter a lat/long',
    data: {
      src: communities,
      keys: ['name', 'alt_name'],
    },
    threshold: 3,
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
      validate(input)
      return input
    },
  }
  new $autoComplete(config)

  // When a placename is selected, populate the store.
  gimmeInput.value.addEventListener('selection', function (event: CustomEvent) {
    let community = event.detail.selection.value
    placesStore.latLng = { lat: community.latitude, lng: community.longitude }
    placesStore.selectedCommunity = community
    placeIsSelected.value = true
    placeSelectionType.value = 'community'
    selectedCommunityName.value = community.name
    if (community.alt_name) {
      selectedCommunityName.value += ' / ' + community.alt_name
    }
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

  // If it's alphanumeric or empty or too short, don't try to parse / validate
  if (latLng === '' || /^[a-zA-Z]+/.test(latLng) || latLng.length <= 3) {
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
        // It's a valid lat/lng: update the button so it can
        // trigger setting the store.
        fieldMessage.value = ''

        // Rounding!
        lat = +lat.toFixed(4)
        lon = +lon.toFixed(4)
        parsedLatLng.value = { lat: lat, lng: lon } as LatLng
        latLngIsValid.value = true
        return parsedLatLng.value
      } else {
        fieldMessage.value =
          '⚠️ This point is outside the bounding box of data: latitude between ' +
          bbox[1] +
          ' – ' +
          bbox[3] +
          ', longitude between ' +
          bbox[0] +
          ' – ' +
          bbox[2]
        return false
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

// For confirming a user's Lat/Lng selection
function setLatLng() {
  placesStore.latLng = parsedLatLng.value
  placeIsSelected.value = true
  placeSelectionType.value = 'latLng'
}

async function clearSelectedPlace() {
  placesStore.latLng = undefined
  placesStore.selectedCommunity = undefined
  placeIsSelected.value = false
  placeSelectionType.value = undefined
  inputValue.value = '' // clear input
  latLngIsValid.value = false // hide button

  await nextTick() // so the focus works
  gimmeInput.value.focus()
}

const placeName = computed(() => {
  if (placeSelectionType.value === 'latLng') {
    return parsedLatLng.value?.lat + ', ' + parsedLatLng.value?.lng
  } else {
    return selectedCommunityName.value
  }
})

const dataStore = useDataStore()
const dataError = computed<boolean>(() => dataStore.dataError)
watch(dataError, async () => {
  if (dataError.value == true) {
    fieldMessage.value =
      '⚠️ Failed to load data for the selected location. Please choose a different location.'
  }
})

onUnmounted(() => {
  placesStore.latLng = undefined
  placesStore.selectedCommunity = undefined
})
</script>

<template>
  <div class="my-3">
    <div v-show="placeIsSelected && !dataError" class="selected-place">
      <div class="content is-size-5">
        <p>
          Showing data for {{ placeName }}.
          <button class="button is-link is-light" @click="clearSelectedPlace">
            &#x21BA; Pick a new place
          </button>
        </p>
      </div>
    </div>
    <div v-show="!placeIsSelected || dataError" class="field">
      <div class="control">
        <label class="label">Get data for a community or by lat/long</label>

        <input id="gimme" v-model="inputValue" ref="gimmeInput" />
        <button
          v-if="latLngIsValid"
          @click="setLatLng"
          class="button is-link is-light ml-3"
        >
          Get data for {{ parsedLatLng?.lat }}, {{ parsedLatLng?.lng }}
        </button>
      </div>
      <p class="help" v-html="fieldMessage" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/node_modules/@tarekraafat/autocomplete.js/dist/css/autoComplete.02.css';

:deep(.autoComplete_wrapper > ul > li:hover) {
  background-color: $highlight;
}

:deep(.autoComplete_wrapper > ul > li[aria-selected='true']) {
  background-color: $highlight;
}

.selected-place button {
  vertical-align: baseline;
}

#gimme {
  background-image: none;
}
</style>
