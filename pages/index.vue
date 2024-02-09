<script lang="ts" setup>
import items from '~/assets/items'

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="briefs column is-3">
          <div class="content is-size-5 hello">
            <p>
              Hello! Not sure what you&rsquo;re looking for?
              <a href="example.com">Email us!</a>
            </p>
          </div>
          <ItemBrief :item="items[0]" />
          <ItemBrief :item="items[1]" />
          <ItemBrief :item="items[2]" />
          <ItemBrief :item="items[3]" />
        </div>
        <div class="featured column is-6">
          <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical">
              <div class="tile is-child">
                <ItemTextPicture :item="items[5]" />
              </div>
              <div class="general">
                <div class="row tile is-parent mb-4">
                  <div class="left tile is-child">
                    <ItemText :item="items[4]" />
                  </div>
                  <div class="right tile is-child">
                    <ItemText :item="items[6]" />
                  </div>
                </div>
                <div class="tile is-parent">
                  <div class="left tile is-child">
                    <ItemText :item="items[7]" />
                  </div>
                  <div class="right tile is-child">
                    <ItemText :item="items[8]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="content is-size-5">
            <p>Did you know people are awesome?</p>
            <ul>
              <li>Sign up for our newsletter</li>
              <li>Email us with questions</li>
              <li>Visit data API</li>
              <li>
                <NuxtLink
                  href="https://archive.org/details/INTERNETCLUB-REDEFININGTHEWORKPLACE/04+SYNERGIZE.mp3"
                  >Redefining the workplace</NuxtLink
                >
              </li>
              <li>Who are these people anyways?</li>
              <li>&hellip;and other content.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <hr />
  <section class="section topic">
    <h2 class="title is-2">Terrestrial</h2>
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-parent">
        <div class="tile is-child"><ItemText :item="items[9]" /></div>
        <div class="tile is-child"><ItemText :item="items[10]" /></div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child"><ItemTextPicture :item="items[11]" /></div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child"><ItemTextPicture :item="items[1]" /></div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hello {
  background-color: $white-darker;
  padding: 1rem;
  border: 2px dashed $gray-darker;
}
.tile.row {
  border-bottom: 1px dotted $gray-darker;
}
:deep(.item) {
  p {
    color: $gray-darker !important;
  }
  h3 {
    padding: 0.5rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }
  img {
    filter: grayscale(1);
  }
  &:hover {
    h3 {
      transition: 0.3s;
      background-color: $white-lighter !important;
      color: $link !important;
    }
    img {
      transition: 0.3s;
      filter: none;
    }
  }
}
.general .tile.left {
  &:deep(.item) {
    padding-right: 1rem;
    border-right: 1px dotted $gray-darker;
  }
}
.general .tile.right {
  margin-left: 1rem !important;
}

.topic {
  &:deep(.item) {
    h3 {
      min-height: 5rem;
    }
  }
}
</style>
