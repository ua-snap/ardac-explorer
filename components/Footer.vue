<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="logo column is-one-fifth has-text-centered">
          <img src="~/assets/images/UAF.svg" alt="UAF Logo" />
        </div>
        <div class="column is-four-fifths">
          <p class="lead">Arctic Data Collaborative (ARDAC)</p>

          <p>
            Scientists working on Arctic research need easily obtainable climate
            and environmental data. ARDAC is a system of online technologies
            that curate distribute relevant Arctic environmental data in formats
            that improve the ability of scientists to use this data.
          </p>

          <p>
            This tool was developed by the
            <a href="https://www.snap.uaf.edu/" title="👍"
              >Scenarios Network for Alaska and Arctic Planning</a
            >
            at the
            <a href="https://uaf-iarc.org"
              >International Arctic Research Center</a
            >
            .
          </p>

          <p>
            Funding provided by the U.S. Department of Energy.
          </p>

          <p>
            Please contact
            <a href="mailto:uaf-snap-data-tools@alaska.edu"
              >uaf-snap-data-tools@alaska.edu</a
            >
            if you have questions or would like to provide feedback for this
            tool.
          </p>

          <p>
            Copyright &copy; {{ year }} University of Alaska Fairbanks. All
            rights reserved.
          </p>

          <p>
            UA is an AA/EO employer and educational institution and prohibits
            illegal discrimination against any individual.
            <a href="https://www.alaska.edu/nondiscrimination/"
              >Statement of Nondiscrimination</a
            >
            and
            <a
              href="https://www.alaska.edu/records/records/compliance/gdpr/ua-privacy-statement/"
              >Privacy Statement</a
            >
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid #888;

  .logo {
    text-align: center;
    @media (min-width: 600px) {
      text-align: right;
    }
    img {
      position: relative;
      top: 1.25rem;
      width: 75%;
      max-width: 40vw;
      margin-bottom: 1.5rem;
    }
  }

  p {
    margin: 1rem;
  }

  .lead {
    font-size: 1.5rem;
    font-weight: 700;
  }
}
</style>
