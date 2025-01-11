<script lang="ts" setup>
// bbox order is
// [ lower-left lng, lower-left lat, upper-right lng, upper-right lat ]
interface Props {
  bbox?: number[]
  extent?: Extent
  ocean?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  bbox: () => [-179.1506, 51.229, -129.9795, 71.3526],
  extent: null,
  ocean: false,
})

let bbox = props.bbox
let extent = props.extent

import { point } from '@turf/helpers'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'

// Import needed extent GeoJSON file dynamically.
const getGeoJson = async (extent: Extent) => {
  let geoJsonString: typeof import('*?raw')
  if (extent == 'alaska') {
    geoJsonString = await import('~/assets/alaska.geojson?raw')
  } else if (extent == 'blockyAlaska') {
    geoJsonString = await import('~/assets/blocky_alaska.geojson?raw')
  } else if (extent == 'mizukami') {
    geoJsonString = await import('~/assets/mizukami.geojson?raw')
  } else if (extent == 'elevation') {
    geoJsonString = await import('~/assets/elevation.geojson?raw')
  }
  return JSON.parse(geoJsonString!.default)
}

// TypeScript types for Turf.js are currently in flux, so use "any" for now.
// See https://github.com/Turfjs/turf/issues/2617
let parsedGeoJson: any

if (extent != null) {
  parsedGeoJson = await getGeoJson(extent)
} else {
  // Turn the BBOX into GeoJSON
  parsedGeoJson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [bbox[0], bbox[1]],
              [bbox[0], bbox[3]],
              [bbox[2], bbox[3]],
              [bbox[2], bbox[1]],
              [bbox[0], bbox[1]],
            ],
          ],
        },
        properties: {},
      },
    ],
  }
}

const placesStore = usePlacesStore()
let communities = await placesStore.fetchCommunities()

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
    data: {},
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

  let extentCommunities = communitiesWithinExtent()
  if (extentCommunities.length > 0) {
    config.data = {
      src: extentCommunities,
      keys: ['name', 'alt_name'],
    }
  } else {
    config.data = {
      src: [],
    }
  }
  new $autoComplete(config)

  // When a placename is selected, populate the store.
  gimmeInput.value.addEventListener('selection', function (event: CustomEvent) {
    let community = event.detail.selection.value

    // If it's an ocean type selector, choose the associated ocean pixel.
    if (props.ocean) {
      placesStore.latLng = {
        lat: community.ocean_lati,
        lng: community.ocean_long,
      }
    } else {
      placesStore.latLng = { lat: community.latitude, lng: community.longitude }
    }
    placesStore.selectedCommunity = community
    placeIsSelected.value = true
    placeSelectionType.value = 'community'
    selectedCommunityName.value = community.name
    if (community.alt_name) {
      selectedCommunityName.value += ' / ' + community.alt_name
    }
  })
})

const withinExtent = (lat: number, lng: number) => {
  let latLngPoint = point([lng, lat])
  for (let feature of parsedGeoJson.features) {
    console.log(feature, latLngPoint)
    if (booleanPointInPolygon(latLngPoint, feature)) {
      return true
    }
  }
  return false
}

const communitiesWithinExtent = () => {
  let communitiesInExtent = []
  for (let community of communities) {
    console.log("testing", community)
    if (withinExtent(community.latitude, community.longitude)) {
      // If it's an ocean-type selector and the place is coastal,
      // or it's not an oacean-type selector, add the community.
      if ((props.ocean && community.is_coastal) || !props.ocean)
        communitiesInExtent.push(community)
    }
  }

  return communitiesInExtent
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

      // This currently does not support BBOXes that cross the antimeridian.
      let isInsideBBOX =
        lat >= bbox[1] && lat <= bbox[3] && lon >= bbox[0] && lon <= bbox[2]

      if (!isInsideBBOX) {
        fieldMessage.value =
          '⚠️ This point is outside the bounding box of data: latitude between ' +
          bbox[1] +
          ' – ' +
          bbox[3] +
          ', longitude between ' +
          bbox[0] +
          ' – ' +
          bbox[2]
        latLngIsValid.value = false
        return false
      }

      let validPoint: boolean
      if (withinExtent(lat, lon)) {
        validPoint = true
      } else {
        validPoint = false
      }

      fieldMessage.value = ''
      if (validPoint) {
        // Rounding!
        lat = +lat.toFixed(4)
        lon = +lon.toFixed(4)
        parsedLatLng.value = { lat: lat, lng: lon } as LatLng
        latLngIsValid.value = true
        return parsedLatLng.value
      } else {
        latLngIsValid.value = false
        fieldMessage.value += '⚠️ This point is outside the data extent.'
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

        <p>
          Only communities within the footprint of the data are included in this
          search.
        </p>
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
  <LoadIndicator />
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
