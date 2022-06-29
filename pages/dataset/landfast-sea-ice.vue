<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">Landfast Sea Ice</h1>
        <h2 class="subtitle is-1">Andy Mahoney et.al. 2018</h2>
        <p></p>
      </div>
    </section>

    <Controller />
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import Controller from "~/components/datasets/landfast_sea_ice/Controller";

export default {
  layout: "dataset",
  components: {
    Controller,
  },
};
</script>
