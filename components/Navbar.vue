<template>
  <div class="nav-wrapper">
    <b-navbar>
      <template slot="start">
        <b-navbar-item href="/"> Home </b-navbar-item>
        <b-navbar-dropdown label="About">
          <b-navbar-item tag="nuxt-link" to="/about"> About </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <a class="button is-light" href="http://earthmaps.io">
            <strong>Data API</strong>
          </a>
        </b-navbar-item>

        <b-navbar-item tag="div">
          <a class="button is-light" href="https://apollo.snap.uaf.edu:1443">
            <strong>Laboratory</strong>
          </a>
        </b-navbar-item>

      </template>
    </b-navbar>
  </div>
</template>

<style lang="scss" scoped>
.nav-wrapper {
  border-bottom: 1px solid #ccc;
}
</style>

<script>
export default {
  name: "Navbar",
};
</script>
