<script lang="ts" setup></script>

<template>
  <FrontPageSectionWrapper tag="Precipitation">
    <div class="grid is-col-min-12">
      <div class="cell border-bottom">
        <ItemText slug="indicator-rx1day" />
      </div>
      <div class="cell">
        <ItemText slug="indicator-rx5day" />
      </div>

      <div class="cell">
        <ItemTextPicture slug="precipitation-frequency" />
      </div>

      <div class="cell">
        <ItemTextPicture slug="notebook-precip-poly" />
      </div>
    </div>
  </FrontPageSectionWrapper>
</template>

<style scoped lang="scss">
@import '~/assets/styles/items.scss';
</style>
