<script lang="ts" setup>
const { $parseDMS } = useNuxtApp()
const store = useStore()
const latLngInput = defineModel()
const latLng = ref()
const fieldMessage = ref('')

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
  // test BBOX
  if (lat >= 51.229 && lat <= 71.3526 && lon >= -179.1506 && lon <= -129.9795) {
    return validLatLng(lat, lon)
  } else {
    return invalidLatLng(
      'This point is outside the bounding box of data: latitude between 51.229–71.3526, longitude between -179.1506–129.9795'
    )
  }
}

onUnmounted(() => {
  store.latLng = {} as LatLng
})
</script>

<template>
  <div class="field my-6">
    <div class="control">
      <label class="label">Get data for lat/lon point:</label>
      <input
        class="input is-primary"
        type="text"
        placeholder="64.8436, -147.7230"
        @keydown.native.enter="validate"
        v-model="latLngInput"
      />
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
