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
            <div class="tile is-vertical">
              <div class="tile is-parent">
                <Item type="featured" :itemJson="items[4]" />
              </div>
              <div class="tile is-parent">
                <div class="tile is-child">
                  <Item :itemJson="items[5]" />
                </div>
                <div class="tile is-child">
                  <Item :itemJson="items[6]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class= "content is-size-5">
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
          </ul></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.briefs :deep(.item) {
  margin-top: -0.5rem; // align to top of column
 margin-bottom: 0.5rem;
 padding: 0.5rem;
 &:hover {
  background-color: $white-lighter !important;
  color: #88f;
 }
}
.featured .tile {
  border-bottom: 1px dotted #888;
}
</style>
