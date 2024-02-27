<script lang="ts" setup></script>

<template>
  <h2 class="title is-2 mx-6"><NuxtLink to="/tag/Precipitation">Precipitation <span class="more">&#x2192; see all</span></NuxtLink></h2>
  <hr class="light" />
  <section class="section topic pt-3">
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-parent pr-5 border-right">
        <div class="tile is-child border-bottom">
          <ItemText slug="indicator-rx1day" />
        </div>
        <div class="tile is-child">
          <ItemText slug="indicator-rx5day" />
        </div>
      </div>
      <div class="tile is-parent px-5">
        <div class="tile is-child">
          <ItemTextPicture slug="notebook-era5-cds-api" />
        </div>
      </div>
      <div class="tile is-parent pl-5 border-left">
        <div class="tile is-child">
          <ItemTextPicture slug="notebook-precip-poly" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '~/assets/styles/items.scss';
h2.title.is-2 a {
  color: $black !important; 
  &:hover {
    color: $link !important;
  }
  .more {
    font-size: 60%;
    font-weight: 300;
  }
}
</style>
