<script lang="ts" setup>
// true if "see all" is expanded
const expanded = ref(false)
const expandedText = computed(() => {
  return expanded.value === false ? '&#x2192; see all' : '&#x2715; close'
})
</script>

<template>
  <div class="tagbar">
    <ul>
      <li>
        <NuxtLink
          data-umami-event="Tagbar Clicked"
          data-umami-event-tag="Climate"
          to="/tag/Climate"
          >Climate</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          to="/tag/Precipitation"
          data-umami-event="Tagbar Clicked"
          data-umami-event-tag="Precipitation"
          >Precipitation</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          to="/tag/Wildfire"
          data-umami-event="Tagbar Clicked"
          data-umami-event-tag="Wildfire"
          >Wildfire</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          to="/tag/Cryosphere"
          data-umami-event="Tagbar Clicked"
          data-umami-event-tag="Cryosphere"
          >Cryosphere</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          to="/tag/Permafrost"
          data-umami-event="Tagbar Clicked"
          data-umami-event-tag="Permafrost"
          >Permafrost</NuxtLink
        >
      </li>
      <li @click="expanded = !expanded" class="more" v-html="expandedText"></li>
    </ul>
    <ul v-show="expanded">
      <li>
        <NuxtLink
          to="/tag/Hydrology"
          data-umami-event="Tagbar Clicked"
          data-umami-event-tag="Hydrology"
          >Hydrology</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          to="/tag/Terrestrial"
          data-umami-event="Tagbar Clicked"
          data-umami-event-tag="Terrestrial"
          >Terrestrial</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          to="/tag/Programming"
          data-umami-event="Tagbar Clicked"
          data-umami-event-tag="Programming"
          >Programming</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          to="/tag/Temperature"
          data-umami-event="Tagbar Clicked"
          data-umami-event-tag="Temperature"
          >Temperature</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          to="/tag/Lightning"
          data-umami-event="Tagbar Clicked"
          data-umami-event-tag="Lightning"
          >Lightning</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          to="/tag/CMIP6"
          data-umami-event="Tagbar Clicked"
          data-umami-event-tag="CMIP6"
          >CMIP6</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tagbar {
  border-top: 1px solid $gray-darker;
  border-bottom: 1px solid $gray-darker;
  padding: 1rem 4rem;
  font-size: 1.5rem;
  font-weight: 600;
  ul li {
    display: inline-block;
    padding-right: 4rem;
    a {
      color: $black;
      &:hover {
        transition: 0.3s;
        background-color: $white-lighter !important;
        color: $link !important;
      }
    }
    &.more {
      font-weight: 300;
      &:hover {
        cursor: pointer;
        transition: 0.3s;
        color: $link !important;
        text-decoration: underline;
      }
    }
  }
}
</style>
