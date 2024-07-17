<script lang="ts" setup></script>

<template>
  <div class="section">
    <div class="content is-size-5">
      <h2 class="title is-2">People</h2>
      <p>Placeholder text for why collaboration is important for us!</p>
    </div>
  </div>
  <div class="section bios">
    <Bio person="Scott Rupp">
      <ul>
        <li><ItemBrief slug="story-arctic-climate-data-node" /></li>
        <li><ItemBrief slug="alfresco-flammability" /></li>
        <li><ItemBrief slug="alfresco-vegetation" /></li>
      </ul>
    </Bio>
  </div>
</template>

<style lang="scss" scoped>
::v-deep ul li .item.brief a h3 {
  color: $link;
}
</style>
