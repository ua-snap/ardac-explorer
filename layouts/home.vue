<script lang="ts" setup></script>

<template>
  <HeaderBanner />
  <Navbar />
  <Edition />
  <BetaNotice />
  <div class="container is-fullhd">
    <Header />
    <section class="section">
      <div class="content">
        <p class="is-size-3">
          The Arctic Data Collaborative (ARDAC) provides highly-curated,
          relevant <b>Arctic datasets</b>, streamlined <b>data access</b>,
          processing <code>code examples</code> and <b>visualizations</b> to
          support research in the North.
        </p>
        <p class="trumpet is-size-4">
          <span>📢</span>
          <NuxtLink to="/tag/CMIP6"
            >check out just-added CMIP6 datasets!</NuxtLink
          >
        </p>
      </div>
    </section>
    <Tagbar />
    <slot />
  </div>
  <Footer />
</template>

<style lang="scss" scoped>
.trumpet span {
  display: inline-block;
  margin-right: 0.75rem;
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
}
</style>
