<script lang="ts" setup></script>

<template>
  <h3 class="title is-3">Excelsior!</h3>

  <p class="mb-3">This content is loaded from a component file.</p>

  <p class="mb-3">
    When visiting the URL for an item, this page first checks if a component
    file exists that corresponds to the item's slug. If so, it will display that
    component.
  </p>

  <p class="mb-3">
    If no component file exists for the item's slug, this page will instead
    display the item's "fullView" field if it exists.
  </p>

  <p>
    If neither a component file nor "fullView" field exists for an item, no
    "Read more" link is displayed for the item. If a user somehow lands at this
    URL anyway, they get an "item not found" message.
  </p>
</template>

<style scoped></style>
