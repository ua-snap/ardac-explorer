<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  presentInNcr: {
    type: Boolean,
    default: false,
  },
  presentInEds: {
    type: Boolean,
    default: false,
  },
  apiUrl: {
    type: String,
  },
  geonetworkUrl: {
    type: String,
    required: false,
  },
  gitHubRepo: {
    type: String,
    required: false,
  },
  pointDataRegion: {
    type: String,
    required: false,
    validator: (value: string) => [
      'alaska', 'alberta', 'british_columbia', 'faroe', 'finland',
      'greenland', 'iceland', 'manitoba', 'newfoundland_and_labrador',
      'northwest_territories', 'norway', 'nunavut', 'ontario', 'quebec',
      'russia', 'saskatchewan', 'sweden', 'yukon', 'all'
    ].includes(value)
  }
})

const formattedRegion = computed(() => {
  if (props.pointDataRegion === 'all') return ''
  return props.pointDataRegion
    ?.replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

const regionsList = computed(() => [
  { name: 'Alaska', key: 'alaska', countryCode: 'US' },
  { name: 'Alberta', key: 'alberta', countryCode: 'CA' },
  { name: 'British Columbia', key: 'british_columbia', countryCode: 'CA' },
  { name: 'Faroe Islands', key: 'faroe', countryCode: 'FO' },
  { name: 'Finland', key: 'finland', countryCode: 'FI' },
  { name: 'Greenland', key: 'greenland', countryCode: 'GL' },
  { name: 'Iceland', key: 'iceland', countryCode: 'IS' },
  { name: 'Manitoba', key: 'manitoba', countryCode: 'CA' },
  { name: 'Newfoundland and Labrador', key: 'newfoundland_and_labrador', countryCode: 'CA' },
  { name: 'Northwest Territories', key: 'northwest_territories', countryCode: 'CA' },
  { name: 'Norway', key: 'norway', countryCode: 'NO' },
  { name: 'Nunavut', key: 'nunavut', countryCode: 'CA' },
  { name: 'Ontario', key: 'ontario', countryCode: 'CA' },
  { name: 'Quebec', key: 'quebec', countryCode: 'CA' },
  { name: 'Russia', key: 'russia', countryCode: 'RU' },
  { name: 'Saskatchewan', key: 'saskatchewan', countryCode: 'CA' },
  { name: 'Sweden', key: 'sweden', countryCode: 'SE' },
  { name: 'Yukon', key: 'yukon', countryCode: 'CA' }
])

const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
</script>

<template>
  <h4 class="title is-4 mt-6">Get &amp; use this data</h4>
  <slot name="preamble"></slot>
  <div class="content is-size-5">
    <ul>
      <li v-if="props.pointDataRegion === 'all'">
        Download point location CSV files for:
        <div class="columns is-multiline mt-2">
          <div class="column is-one-third" v-for="(col, index) in 3" :key="index">
            <ul class="region-list">
              <li v-for="region in regionsList.slice(index*6, (index+1)*6)" :key="region.key">
                <span class="mr-2">{{ getFlagEmoji(region.countryCode) }}</span>
                <a :href="`https://github.com/ua-snap/geospatial-vector-veracity/raw/main/vector_data/point/${region.key}_point_locations.csv`">
                  {{ region.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li v-else-if="props.pointDataRegion">
        <a :href="`https://github.com/ua-snap/geospatial-vector-veracity/raw/main/vector_data/point/${props.pointDataRegion}_point_locations.csv`">
          Download {{ formattedRegion }} CSV file
        </a>
      </li>
      <li v-if="props.presentInNcr && props.presentInEds">
        Access this data in the context of climate change projections at
        <a href="https://northernclimatereports.org"
          >Northern Climate Reports</a
        >
        and in the context of additional data for engineers at the
        <a href="https://arcticeds.org"
          >Arctic Environmental and Engineering Data and Design Support System (Arctic-EDS)</a
        >
      </li>
      <li v-else-if="props.presentInNcr">
        Access this data in the context of climate change projections at
        <a href="https://northernclimatereports.org"
          >Northern Climate Reports</a
        >
      </li>
      <li v-else-if="props.presentInEds">
        Access this data in the context of additional data for engineers at the
        <a href="https://arcticeds.org"
          >Arctic Engineering Decision Support (Arctic-EDS)</a
        >
      </li>
      <li>
        Query this and other datasets from an
        <a :href="props.apiUrl"
          >API that provides data in CSV and JSON format</a
        >
      </li>
      <li v-if="props.geonetworkUrl">
        <a :href="props.geonetworkUrl"
          >Download the source dataset and access metadata</a
        >
      </li>
      <li v-if="props.gitHubRepo">
        <a :href="props.gitHubRepo"
          >Visit the GitHub repository for this item.</a
        >
      </li>
      <slot></slot>
    </ul>
  </div>
</template>

<style scoped>
.region-list {
  list-style: none;
  margin-left: 0;
  
  li {
    margin-bottom: 0.25rem;
    line-height: 1.25;
  }
  
  a {
    font-size: 0.9em;
  }
}
</style>
