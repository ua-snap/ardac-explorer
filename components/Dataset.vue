<template>
  <div class="dataset">
    <div class="columns">
      <div class="column is-one-third">
        <MiniMap v-bind:mapConfiguration="dataset.map_configuration" />
        <div class="license">
          <p>
            <strong>License: </strong>
            <a href="https://creativecommons.org/licenses/by/4.0/">
              Attribution 4.0 International (CC BY 4.0)</a
            >
          </p>
        </div>
        <div class="references" v-if="dataset.references">
          <h4 class="title is-4">References</h4>
          <Reference
            v-for="reference in dataset.references.data"
            v-bind:key="reference.attributes.id"
            v-bind:reference="reference.attributes"
          />
        </div>
      </div>
      <div class="column">
        <h3 class="title is-3">{{ dataset.title }}</h3>
        <h3 class="subtitle is-4">{{ dataset.extent }}</h3>
        <div v-if="dataset.tags">
          <b-taglist>
            <b-tag
              type="is-info"
              v-for="tag in dataset.tags.data"
              v-bind:key="dataset.tags.id"
            >
              {{ tag.attributes.name }}
            </b-tag>
          </b-taglist>
        </div>

        <div class="description content is-size-5" v-html="description"></div>

        <div v-if="dataset.tools" class="tools">
          <h3 class="title is-4">This data is a part of these web tools</h3>
          <div class="tile is-ancestor">
            <Tool
              v-for="tool in dataset.tools.data"
              v-bind:key="tool.id"
              v-bind:tool="tool.attributes"
            />
          </div>
        </div>

        <div v-if="dataset.api_url" class="block">
          <h3 class="title is-4">Query this data through the API</h3>
          <p class="content is-5">
            You can query this dataset via a programmatic API.
          </p>
          <div>
            <a class="button is-info" v-bind:href="dataset.api_url"
              >Access this dataset via API</a
            >
          </div>
        </div>

        <div v-if="dataset.source_url" class="block">
          <h3 class="title is-4">Access source data</h3>
          <p class="content is-5">
            The full underlying dataset of model outputs, in raw form, can be
            downloaded and used with GIS software and geospatial programming
            libraries.
          </p>
          <div>
            <a class="button is-info" v-bind:href="dataset.source_url"
              >Access source data</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.description.content {
  margin: 2rem 0;
}

.tools {
  margin-bottom: 3rem;
}

.references {
  margin-top: 2rem;
}

.block {
  margin-top: 3rem;
}
</style>

<script>
import MiniMap from "./MiniMap";
import Tool from "./Tool";
import { marked } from "marked";

export default {
  name: "Dataset",
  props: ["dataset"],
  components: { MiniMap, Tool },
  computed: {
    description() {
      return marked(this.dataset.description);
    },
  },
};
</script>
