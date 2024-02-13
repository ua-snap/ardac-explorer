<script lang="ts" setup>
import items from '~/assets/items'

definePageMeta({
  layout: 'home',
})

</script>

<template>
  <section class="section">
    <div class="columns">
      <div class="briefs column is-3 pr-5 border-right">
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
        <ItemBrief :item="items[12]" />
        <ItemBrief :item="items[13]" />
        <ItemBrief :item="items[14]" />
        <ItemBrief :item="items[15]" />
        <ItemBrief :item="items[16]" />
        <ItemBrief :item="items[17]" />
        <ItemBrief :item="items[18]" />
        <ItemBrief :item="items[19]" />
        <ItemBrief :item="items[20]" />
        <ItemBrief :item="items[21]" />
        <ItemBrief :item="items[22]" />
        <ItemBrief :item="items[23]" />
      </div>
      <div class="featured column is-6 px-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent is-vertical">
            <div class="tile lead is-child border-bottom">
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
      <div class="column right pl-5 border-left">
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
  </section>
  <hr />
  <h2 class="title is-2 mx-6">Terrestrial</h2>
  <hr class="light" />
  <section class="section topic pt-3">
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-parent pr-5 border-right">
        <div class="tile is-child border-bottom">
          <ItemText :item="items[9]" />
        </div>
        <div class="tile is-child"><ItemText :item="items[10]" /></div>
      </div>
      <div class="tile is-parent px-5">
        <div class="tile is-child"><ItemTextPicture :item="items[11]" /></div>
      </div>
      <div class="tile is-parent pl-5 border-left">
        <div class="tile is-child"><ItemTextPicture :item="items[1]" /></div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hello {
  background-color: $white-darker;
  padding: 1rem;
  border: 1px dashed $gray-lighter;
}
.tile.row {
  border-bottom: 1px dashed $gray-lighter;
}
:deep(.item) {
  p {
    color: $gray-darker !important;
  }
  
  // We want to keep the height of headlines consistent (~=3 lines).
  // Except for the item within the `.lead` class, which is done below.
  &.text h3, &.text-picture h3 {
    min-height: 5rem;
    margin-bottom: 0.3rem;
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
    p {
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
    border-right: 1px dashed $gray-lighter;
  }
}
.general .tile.right {
  margin-left: 1rem !important;
}

.lead {
  &:deep(.item) {
    h3 {
      font-size: 215%;
      min-height: auto; // undo forced spacing used in other places
    }
  }
}

.border-left {
  border-left: 1px dashed $gray-lighter;
}

.border-right {
  border-right: 1px dashed $gray-lighter;
}

.border-bottom {
  border-bottom: 1px dashed $gray-lighter;
}
</style>
