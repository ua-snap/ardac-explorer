<script lang="ts" setup></script>

<template>
  <HeaderBanner />
  <Navbar />
  <Header />
  <section class="section">
    <div class="container">
      <div class="content is-size-3">
        <p>
          The Arctic Data Collaborative (ARDAC) provides highly-curated,
          relevant <b>Arctic datasets</b>, streamlined <b>data access</b>,
          processing <code>code examples</code> and <b>visualizations</b> to
          support research in the North.
        </p>
      </div>
    </div>
  </section>
  <Tagbar/>
  <slot />
  <Footer />
</template>

<style lang="scss" scoped></style>
