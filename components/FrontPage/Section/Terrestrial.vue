<script lang="ts" setup></script>

<template>
  <h2 class="title is-2 mx-6">Terrestrial</h2>
  <hr class="light" />
  <section class="section topic pt-3">
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-parent pr-5 border-right">
        <div class="tile is-child border-bottom">
          <ItemText item="modeled-future-flammability" />
        </div>
        <div class="tile is-child">
          <ItemText item="historical-nrt-wildfire" />
        </div>
      </div>
      <div class="tile is-parent px-5">
        <div class="tile is-child">
          <ItemTextPicture item="era-access-cds-api" />
        </div>
      </div>
      <div class="tile is-parent pl-5 border-left">
        <div class="tile is-child">
          <ItemTextPicture item="degree-days-projected-statewide" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '~/assets/styles/items.scss';
</style>
