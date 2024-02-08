<script lang="ts" setup>
import items from '~/assets/items'

definePageMeta({
  layout: 'home',
})
console.log(items[0])
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="briefs column is-3">
          <Item type="brief" :itemJson="items[0]" />
          <Item type="brief" :itemJson="items[1]" />
          <Item type="brief" :itemJson="items[2]" />
          <Item type="brief" :itemJson="items[3]" />
        </div>
        <div class="featured column is-6">
          <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical">
              <div class="tile is-child">
                <Item type="featured" :itemJson="items[5]" />
              </div>
              <div class="general">
                <div class="row tile is-parent mb-4">
                  <div class="left tile is-child">
                    <Item :itemJson="items[4]" />
                  </div>
                  <div class="right tile is-child">
                    <Item :itemJson="items[6]" />
                  </div>
                </div>
                <div class="row tile is-parent">
                  <div class="left tile is-child">
                    <Item :itemJson="items[7]" />
                  </div>
                  <div class="right tile is-child">
                    <Item :itemJson="items[8]" />
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
</template>

<style lang="scss" scoped>
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
  &:hover {
    h3 {
      transition: 0.3s;
      background-color: $white-lighter !important;
      color: $link !important;
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
</style>
