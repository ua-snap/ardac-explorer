<script lang="ts" setup></script>

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
            <ItemBrief slug="indicator-ftc" />
          </li>
          <li>
            <ItemBrief slug="indicator-rx1day" />
          </li>
          <li>
            <ItemBrief slug="indicator-su" />
          </li>
          <li>
            <ItemBrief slug="indicator-dw" />
          </li>
          <li>
            <ItemBrief slug="indicator-hd" />
          </li>
          <li>
            <ItemBrief slug="indicator-cd" />
          </li>
          <li>
            <ItemBrief slug="indicator-wsdi" />
          </li>
          <li>
            <ItemBrief slug="indicator-cdsi" />
          </li>
          <li>
            <ItemBrief slug="indicator-rx5day" />
          </li>
          <li>
            <ItemBrief slug="indicator-r10mm" />
          </li>
          <li>
            <ItemBrief slug="indicator-cwd" />
          </li>
          <li>
            <ItemBrief slug="indicator-cdd" />
          </li>
        </ul>
      </div>
      <div class="featured column is-6 px-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent is-vertical">
            <div class="tile lead is-child border-bottom">
              <ItemTextPicture slug="permafrost-magt" />
            </div>
            <div class="general">
              <div class="row tile is-parent mb-4">
                <div class="left tile is-child">
                  <ItemText slug="sea-ice-concentration" />
                </div>
                <div class="right tile is-child">
                  <ItemText slug="permafrost-talik" />
                </div>
              </div>
              <div class="tile is-parent">
                <div class="left tile is-child">
                  <ItemText slug="hydrology-sm" />
                </div>
                <div class="right tile is-child">
                  <ItemText slug="notebook-perm-obs-temp" />
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

@media (min-width: 769px) {
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
