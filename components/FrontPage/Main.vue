<script lang="ts" setup>
import items from '~/assets/items'
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

        <ul>
          <li>
            <ItemBrief :item="items[0]" />
          </li>
          <li>
            <ItemBrief :item="items[1]" />
          </li>
          <li>
            <ItemBrief :item="items[2]" />
          </li>
          <li>
            <ItemBrief :item="items[3]" />
          </li>
          <li>
            <ItemBrief :item="items[12]" />
          </li>
          <li>
            <ItemBrief :item="items[13]" />
          </li>
          <li>
            <ItemBrief :item="items[14]" />
          </li>
          <li>
            <ItemBrief :item="items[15]" />
          </li>
          <li>
            <ItemBrief :item="items[16]" />
          </li>
          <li>
            <ItemBrief :item="items[17]" />
          </li>
          <li>
            <ItemBrief :item="items[18]" />
          </li>
          <li>
            <ItemBrief :item="items[19]" />
          </li>
          <li>
            <ItemBrief :item="items[20]" />
          </li>
          <li>
            <ItemBrief :item="items[21]" />
          </li>
          <li>
            <ItemBrief :item="items[22]" />
          </li>
          <li>
            <ItemBrief :item="items[23]" />
          </li>
        </ul>
      </div>
      <div class="featured column is-6 px-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent is-vertical">
            <div class="tile lead is-child border-bottom">
              <ItemTextPicture :item="items[11]" />
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
</template>

<style scoped lang="scss">
@import '~/assets/styles/items.scss';

.hello {
  background-color: $white-darker;
  padding: 1rem;
  border: 1px dashed $gray-lighter;
}

.briefs {
  ul li {
    margin-bottom: 1.5rem;
    .item a h3.title {
      font-weight: 400 !important;
      font-size: 25rem;
    }
  }
}

.tile.row {
  border-bottom: 1px dashed $gray-lighter;
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
</style>
