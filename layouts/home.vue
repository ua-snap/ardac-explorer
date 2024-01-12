<script lang="ts" setup></script>

<template>
  <HeaderBanner />

  <section class="section dark">
    <div class="brand mb-6">
      <h1>Arctic Data Collaborative</h1>
      <h2><img src="~/assets/images/ardac-green-logo.svg" alt="logo of ARDAC acronym"/><span>Explorer</span></h2>
    </div>
  </section>
  <section class="section dark">
    <div class="container">
      <div class="content is-size-3">
        <p>The Arctic Data Collaborative (ARDAC) provides highly-curated, relevant <b>Arctic datasets</b>, streamlined <b>data access</b>, processing <code>code examples</code> and <b>visualizations</b> to support research in the North.</p>
      </div>
    </div>
  </section>
  <section class="section dark">
    <div class="container">
      <slot />
    </div>
  </section>

  <Footer />
</template>

<style lang="scss" scoped>
.dark {
  background-color: #000;
}
.brand {
      color: #fff;
  h1 {
    color: #ccc;
    margin-left: 4rem;
    margin-bottom: -2.2rem;
    font-weight: 700;
    font-size: 2.3rem;
  }
  h2 {
    font-weight: 900;
    font-size: 6rem;
    span {
      position: relative;
      bottom: 5px;
    }
  img {
    height: 4.62rem;
  }
}
}
</style>
