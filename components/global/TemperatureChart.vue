<script lang="ts" setup></script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Temperature chart</h3>
      <TasPrChart endpoint="temperature" label="Temperature" dataKey="tas" />
    </div>
  </section>
</template>

<style scoped></style>
