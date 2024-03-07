<script lang="ts" setup>
// bbox order is left, bottom, right, top
const props = defineProps<{
  bbox?: number[]
  label?: string
  errorMsg?: string
}>()



const { $autoComplete, $parseDMS } = useNuxtApp()

import items from '~/assets/items'

onMounted(() => {
  let config = {
    placeHolder: 'Search...',
    data: {
      src: items,
      keys: ['title', 'blurb'],
    },
    resultItem: {
      highlight: true,
    },
    threshold: 0,
    resultsList: {
      maxResults: 999,
    },
  }

  new $autoComplete(config)

  document
    .querySelector('#autoComplete')!
    .addEventListener('results', (event: Event) => {
      const store = useStore()
      if ((event as CustomEvent).detail.query === '') {
        store.searchActive = false
        return
      }
      let filteredItems = (event as CustomEvent).detail.results.map(
        (result: any) => {
          return result.value
        }
      )
      // Remove duplicates by converting to a Set and back to an Array.
      filteredItems = Array.from(new Set(filteredItems))
      store.filteredItems = filteredItems
      store.searchActive = true
    })
})



const store = useStore()
const latLngInput = defineModel()
const latLng = ref()
const fieldMessage = ref('')
const inputLabel = ref('Get data for lat/lon point:')

if (props.label) {
  inputLabel.value = props.label
}

let bbox: number[]
if (props.bbox) {
  bbox = props.bbox
} else {
  bbox = [-179.1506, 51.229, -129.9795, 71.3526]
}

fieldMessage.value = ''
let unparseableMessage =
  "Input can't be turned into lat/lng.  Accepted formats are decimal degrees and DMS, i.e. 65.24, -142.22 or 58º 18' 0'' N, 134º 24' 57.6'' W"

const invalidLatLng = (message: string) => {
  fieldMessage.value = message
  latLng.value = {}
  return false
}

const validLatLng = (lat: number, lng: number) => {
  fieldMessage.value = ''
  store.latLng = { lat: lat, lng: lng }
  return true
}

const validate = () => {
  if (!latLngInput.value) {
    return false // do nothing if it's empty
  }
  let lat: number
  let lon: number
  try {
    let parsedDms = $parseDMS(latLngInput.value)
    if (parsedDms && parsedDms.lat && parsedDms.lon) {
      lat = parsedDms.lat
      lon = parsedDms.lon
    } else {
      fieldMessage.value = ''
      return invalidLatLng(unparseableMessage)
    }
  } catch (e) {
    return invalidLatLng(unparseableMessage)
  }
  // Make sure lat/lon is within BBOX.
  // This currently does not support BBOXes that cross the antimeridian.
  if (lat >= bbox[1] && lat <= bbox[3] && lon >= bbox[0] && lon <= bbox[2]) {
    return validLatLng(lat, lon)
  } else {
    return invalidLatLng(
      'This point is outside the bounding box of data: latitude between ' +
        bbox[1] +
        ' – ' +
        bbox[3] +
        ', longitude between ' +
        bbox[0] +
        ' – ' +
        bbox[2]
    )
  }
}

onUnmounted(() => {
  store.latLng = {} as LatLng
})

watch(
  () => props.errorMsg,
  async () => {
    if (props.errorMsg) {
      invalidLatLng(props.errorMsg)
    }
  }
)
</script>

<template>
  <div class="field my-6">
    <div class="control">
      <label class="label" v-html="inputLabel" />
      <input
        class="input is-primary mr-3"
        type="text"
        placeholder="64.8436, -147.7230"
        @keydown.enter="validate"
        @keydown.tab="validate"
        v-model="latLngInput"
      />
      <button @click="validate" class="button is-link is-light">Go</button>
    </div>
    <p class="help" v-html="fieldMessage" />
  </div>
</template>

<style lang="scss" scoped>
.input {
  width: 300px;
  background-color: $white-lighter;
}
</style>
