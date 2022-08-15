<template>
  <div>
    <ul>
      <li v-for="dataset in datasets">
        <Dataset v-bind:key="dataset.id" v-bind:dataset="dataset.attributes" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import Dataset from "./Dataset";
import { mapGetters } from "vuex";

export default {
  name: "SearchResults",
  computed: {
    ...mapGetters({
      datasets: "search/datasets",
    }),
  },
  components: {
    Dataset,
  },
  created() {
    this.$fetch();
  },
  async fetch() {
    await this.$store.dispatch("search/search");
  },
};
</script>
