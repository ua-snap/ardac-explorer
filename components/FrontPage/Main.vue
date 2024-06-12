<script lang="ts" setup></script>

<template>
  <section class="section">
    <div class="columns">
      <div class="briefs column is-3 pr-5 border-right">
        <div class="content is-size-5 hello">
          <p>
            Hello! Looking for an
            <NuxtLink to="/overview">overview of the content</NuxtLink>
            available here? <NuxtLink to="/overview">&#x2192; read</NuxtLink>
          </p>
        </div>

        <ul>
          <li>
            <ItemBrief slug="indicator-ftc-cmip6" showTag />
          </li>
          <li>
            <ItemBrief slug="indicator-rx1day" showTag />
          </li>
          <li>
            <ItemBrief slug="precipitation-frequency" showTag />
          </li>
          <li>
            <ItemBrief slug="alfresco-vegetation" showTag />
          </li>
          <li>
            <ItemBrief slug="indicator-hd" showTag />
          </li>
          <li>
            <ItemBrief slug="hydrology-sm" showTag />
          </li>
          <li>
            <ItemBrief slug="indicator-wsdi" showTag />
          </li>
          <li>
            <ItemBrief slug="permafrost-base-top" showTag />
          </li>
          <li>
            <ItemBrief slug="indicator-rx5day" showTag />
          </li>
          <li>
            <ItemBrief slug="indicator-r10mm" showTag />
          </li>
          <li>
            <ItemBrief slug="indicator-cwd" showTag />
          </li>
          <li>
            <ItemBrief slug="indicator-cdd" showTag />
          </li>
        </ul>
      </div>
      <div class="featured column is-6 px-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent is-vertical">
            <div class="tile lead is-child border-bottom">
              <ItemTextPicture slug="story-arctic-climate-data-node" />
            </div>
            <div class="general">
              <div class="row tile is-parent mb-4">
                <div class="left tile is-child">
                  <ItemText slug="sea-ice-concentration" showTag />
                </div>
                <div class="right tile is-child">
                  <ItemTextPicture slug="alfresco-flammability" showTag />
                </div>
              </div>
              <div class="tile is-parent">
                <div class="left tile is-child">
                  <ItemText slug="story-beetle-climate-protection" showTag />
                </div>
                <div class="right tile is-child">
                  <ItemText slug="notebook-precip-poly" showTag />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column right pl-5 border-left">
        <ItemText slug="communities-boundaries" />
        <div class="content is-size-5">
          <hr class="light" />
          <p>Resources</p>
          <ul>
            <li>Sign up for our <a href="">newsletter</a></li>
            <li><a href="mailto:">Email us</a> with questions</li>
            <li>Visit <a href="https://earthmaps.io">data API</a></li>
            <li>Learn about <a href="">our team and who we are</a></li>
          </ul>
          <hr/>
          <h4 class="title is-4">Get involved!</h4>
          <p>You can help build this!  Do you have an idea for a data story?  Do you create datasets?  We would love to hear your ideas!</p>
          <button class="button is-info">Chat with us</button>
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
