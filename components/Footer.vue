<script lang="ts" setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="content">
    <p class="bolder">
      Made by the
      <a href="https://www.snap.uaf.edu/" title="🥗🥗"
        >Scenarios Network for Alaska + Arctic Planning</a
      >
      located at the
      <a href="https://uaf-iarc.org">International Arctic Research Center</a>.
      Funding provided by the U.S. Department of Energy.
    </p>

    <p class="lighter">
      Please contact
      <a href="mailto:uaf-snap-data-tools@alaska.edu"
        >uaf-snap-data-tools@alaska.edu</a
      >
      with questions or comments.
    </p>

    <p>
      Copyright &copy; {{ year }} University of Alaska Fairbanks. All rights
      reserved. UA is an affirmative action / equal opportunity employer,
      educational institution and provider, and prohibits illegal discrimination
      against any individual.
      <a href="https://www.alaska.edu/nondiscrimination/"
        >Statement of Nondiscrimination</a
      >
      and
      <a
        href="https://www.alaska.edu/records/records/compliance/gdpr/ua-privacy-statement/"
        >Privacy Statement</a
      >
    </p>
  </footer>
</template>

<style lang="scss" scoped>
  footer {
    border-top: 1rem solid $gray;
    background-color: $white;
    color: $black;
    padding: 3rem;

    font-size: 140%;
    font-weight: 500;
    line-height: 1.1;

    .bolder {
      font-weight: 600;
    }

    .lighter {
      font-weight: 300;
      font-size: 90%;
    }
  }
</style>
