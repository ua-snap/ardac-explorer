<script lang="ts" setup></script>

<template>
  <HeaderBanner />
  <Navbar />
  <div class="container is-fullhd">
    <Header />
    <section class="section">
      <div class="content is-size-3">
        <p>
          The Arctic Data Collaborative (ARDAC) provides highly-curated,
          relevant <b>Arctic datasets</b>, streamlined <b>data access</b>,
          processing <code>code examples</code> and <b>visualizations</b> to
          support research in the North.
        </p>
      </div>
    </section>
    <Tagbar />
    <slot />
  </div>
  <Footer />
</template>

<style lang="scss" scoped></style>
