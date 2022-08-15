<template>
  <!-- parent wrapper is class "tile is-ancestor" -->
  <div class="definition">
    <h5 class="title is-5">
      <a v-bind:href="reference.url">{{ reference.title }}</a>
    </h5>
    <h5 class="subtitle is-6" v-html="description"></h5>
  </div>
</template>

<style lang="scss" scoped>
.reference {
  max-width: 40%;
  display: inline-block;
  margin: 1rem;
}
</style>

<script>
import { marked } from "marked";

export default {
  name: "Reference",
  props: ["reference"],
  computed: {
    description() {
      return marked(this.reference.description);
    },
  },
};
</script>
