<script lang="ts" setup></script>

<template>
  <FrontPageSectionWrapper tag="Hydrology">
    <div class="grid is-col-min-12">
      <div class="cell border-bottom">
        <ItemText slug="hydrology-iswe" />
      </div>
      <div class="cell">
        <ItemText slug="hydrology-evap" />
      </div>

      <div class="cell">
        <ItemTextPicture slug="notebook-design-discharge" />
      </div>

      <div class="cell">
        <ItemTextPicture slug="hydrology-runoff" />
      </div>

      <div class="cell">
        <ItemTextPicture slug="hydrology-glacier-melt" />
      </div>
    </div>
  </FrontPageSectionWrapper>
</template>

<style scoped lang="scss">
@import '~/assets/styles/items.scss';
</style>
