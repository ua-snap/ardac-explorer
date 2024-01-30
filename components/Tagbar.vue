<template>
  <div class="tagbar">
    <ul>
      <li>
        <NuxtLink to="/tag/Wildfire">Wildfire</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/tag/Vegetation">Vegetation</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/tag/Precipitation">Precipitation</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/tag/Temperature">Temperature</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/tag/WMS">WMS</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/tag/Degree Days">Degree Days</NuxtLink>
      </li>
      <li>etc etc etc</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tagbar {
  border-top: 1px solid $gray-darker;
  border-bottom: 1px solid $gray-darker;
  padding: 1rem 4rem;
  font-size: 1.25rem;
  font-weight: 600;
  ul li {
    display: inline-block;
    padding-right: 4rem;
  }
}
</style>
