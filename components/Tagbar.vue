<template>
  <div class="tagbar">
    <ul>
      <li>
        <NuxtLink to="/tag/Climate">Climate</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/tag/Precipitation">Precipitation</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/tag/Hydrology">Hydrology</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/tag/Temperature">Cryosphere</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/tag/WMS">Permafrost</NuxtLink>
      </li>
      <li class="more">&#x2192; see all [bruce make this toggle]</li>
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
    }
  }
}
</style>
