<template>
  <div>
    <section class="section intro">
      <div class="container">
        <img src="~/assets/images/ARDAC_full.svg" />
        <h1 class="title is-1">
          <strong>AR</strong>ctic <strong>DA</strong>ta
          <strong>C</strong>ollaborative
        </h1>
        <h2 class="subtitle is-2">
          Access and apply deep data to Arctic research
        </h2>
      </div>
    </section>
    <section class="section">
      <SearchResults />
    </section>
  </div>
</template>
<style lang="scss" scoped>
.intro {
  text-align: center;
  img {
    height: 7rem;
    display: inline-block;
    margin: 0.5rem auto 0.5rem;
  }
  h1 {
    margin: 1rem 0.5rem;
    text-align: center;
  }
  h2 {
    font-size: 2rem;
    font-weight: 300;
  }
}

section {
  border-bottom: 1px solid #efefef;
}
</style>
<script>
import SearchResults from "~/components/SearchResults";

export default {
  name: "HomePage",
  layout: "home",
  components: { SearchResults },
  created() {
    const path = (/#!(\/.*)$/.exec(this.$route.fullPath) || [])[1];
    if (path) {
      this.$router.push({ path: path });
    }
  },
};
</script>
