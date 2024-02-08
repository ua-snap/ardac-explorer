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
      <div class="tile is-ancestor">
        <div class="tile is-parent is-3 is-vertical">
          <div class="tile is-child">
            <Item type="small" :itemJson="items[0]" />
          </div>
          <div class="tile is-child">
            <Item type="small" :itemJson="items[1]" />
          </div>
          <div class="tile is-child">
            <Item type="small" :itemJson="items[2]" />
          </div>
          <div class="tile is-child">
            <Item type="small" :itemJson="items[3]" />
          </div>
        </div>
        <div class="tile is-parent is-6 is-vertical">
          <div class="tile is-child">
            <Item type="grand" :itemJson="items[4]" />
          </div>
          <div class="tile is-child">
            <Item type="grand" :itemJson="items[5]" />
          </div>
        </div>
        <div class="tile is-parent is-3 is-vertical content is-size-4">
          <ul class="mt-0">
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
  </section>
</template>

<style lang="scss" scoped></style>
