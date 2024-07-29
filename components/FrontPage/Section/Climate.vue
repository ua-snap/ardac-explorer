<script lang="ts" setup></script>

<template>
  <FrontPageSectionWrapper tag="Climate">
    <div class="fixed-grid has-3-cols">
      <div class="grid">
        <div class="cell border-right">
          <ItemTextPicture slug="climate-beetle-protection" />
        </div>
        <div class="cell border-right">
          <ItemTextPicture slug="indicator-ftc-cmip6" />
        </div>
        <div class="cell">
          <ItemText slug="notebook-design-discharge" />
          <ItemText slug="indicator-wsdi" />
          <ItemText slug="notebook-raster-database" />
        </div>
      </div>
    </div>
  </FrontPageSectionWrapper>
</template>

<style scoped lang="scss">
@import '~/assets/styles/items.scss';
.border-right {
  padding-right: 1em;
  border-right: 1px dashed $grey-lighter !important;
}
</style>
