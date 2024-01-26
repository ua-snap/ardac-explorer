<script lang="ts" setup></script>

<template>
  <section class="section dark">
    <div class="brand mb-6">
      <h1>Arctic Data Collaborative</h1>
      <h2>
        <img
          src="~/assets/images/ardac-green-logo.svg"
          alt="logo of ARDAC acronym"
        /><span>Explorer</span>
      </h2>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.brand {
  color: $white;
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
