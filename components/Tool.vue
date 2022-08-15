<template>
  <!-- parent wrapper is class "tile is-ancestor" -->
  <div class="card tile">
    <header class="card-header">
      <p class="card-header-title"><a href="">{{ tool.title }}</a></p>
    </header>
    <div class="card-image">
      <figure class="image is-4by3">
        <img v-bind:src="imageUrl" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        {{ tool.description }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  max-width: 40%;
  display: inline-block;
  margin: 1rem;
}
</style>

<script>
export default {
  name: "Tool",
  props: ["tool"],
  computed: {
    imageUrl() {
      return process.env.strapiUrl + this.tool.preview.data.attributes.url;
    },
  },
};
</script>
