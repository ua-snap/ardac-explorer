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
        <div class="columns">
          <div class="column">
            <a href="https://northernclimatereports.org/">
              <img class="showcase" src="~/assets/images/showcases/ncr.png" alt="Northern Climate Reports" />
            </a>
            <span class="tag is-warning is-light">Temperature</span>
            <span class="tag is-link is-light">Precipitation</span>
            <span class="tag is-warning is-light">Permafrost</span>
            <span class="tag is-danger is-light">Flammability</span>
            <span class="tag is-success is-light">Vegetation</span>
          </div>
          <div class="column">
            <a href="http://dev.arcticeds.org/">
              <img class="showcase" src="~/assets/images/showcases/arctic-eds.png" alt="Arctic ED" />
            </a>
            <span class="tag is-warning is-light">Temperature</span>
            <span class="tag is-link is-light">Precipitation</span>
            <span class="tag is-white is-light">Snowfall</span>
            <span class="tag is-warning is-light">Permafrost</span>
          </div>
        </div>
      </div>
    </section>
    <section class="section datasets">
      <div class="container">
        <h2 class="title is-2">Data</h2>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.showcase {
  width: 100%;
  border: 1px solid #ccc;
}
</style>
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
