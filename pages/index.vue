<template>
  <div>
    <section class="section intro">
      <div class="container">
        <h1 class="title is-1">ARctic DAta Collaborative</h1>
        <h2 class="subtitle is-1">
          Curated datasets for Alaska and the Arctic.
        </h2>
      </div>
    </section>
    <section class="section">
      <SearchResults />
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
import SearchResults from '~/components/SearchResults'

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
