<template>
  <div>
    <section class="section intro">
      <div class="container">
        <h1 class="title is-1">ARctic DAta Collaborative</h1>
        <h2 class="subtitle is-1">Curated datasets for Alaska and the Arctic.</h2>
      </div>
    </section>
    <section class="section showcases">
      <div class="container">
        <h2 class="title is-2">Showcases</h2>
      </div>
    </section>
    <section class="section datasets">
      <div class="container">
        <h2 class="title is-2">Data</h2>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
export default {
  name: "HomePage",
  layout: "home",
  created() {
    const path = (/#!(\/.*)$/.exec(this.$route.fullPath) || [])[1];
    if (path) {
      this.$router.push({ path: path });
    }
  },
};
</script>
