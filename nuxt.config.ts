const noscriptHtml = `
<style>
  section {
    width: 600px;
    margin: 50px auto;
    font-size: 110%;
    font-family: sans-serif;
    line-height: 1.3;
  }
  li {
    margin-bottom: 0.25rem;
  }
</style>
<section>
  <h1>Arctic Data Collaborative</h1>

  <p>
    The Arctic Data Collaborative (ARDAC) provides highly-curated, relevant
    <b>Arctic datasets</b>, streamlined <b>data access</b>, processing
    <code>code examples</code> and <b>visualizations</b> to support research in
    the North.
  </p>
  <p>
    ⚠️ We&rsquo;re sorry, but this web tool requires Javascript to be enabled to
    run. <strong>Please email us at uaf-snap-data-tools@alaska.edu</strong> if
    you would like assistance to access content on this site.
  </p>

  <h3>Content available on this site</h3>
  <p>
    This tool has a wide arrange of best-available climate science datasets and
    supporting content. Datasets include:
  </p>
  <ul>
    <li>
      Temperature and precipitation, from both CMIP5 and CMIP6 climate models,
      at 2km resolution over Alaska and western Canada
    </li>
    <li>
      Derived climate indicators, such as Wet Days Per Year and Deep Winter
      Days, provide additional meaning and context for changing climate
      conditions
    </li>
    <li>Hydrology, including evapotranspiration and soil moisture content</li>
    <li>
      Flammability and vegetation from the ALFRESCO fire model, driven by CMIP5
      climate models
    </li>
    <li>
      Sea ice concentration across the entire Arctic, as well as landfast sea
      ice on the Alaska coast
    </li>
  </ul>
  <p>
    For every variable in each dataset, you can see an interactive map. If you
    pick a specific place by name or latitude/longitude, you can see interactive
    charts as well as get a download of the timeseries of data for that point.
  </p>
  <p>
    This site also has interactive stories which draw upon the datasets
    available here. Written by several different researchers with the University
    of Alaska Fairbanks and other institutions, these stories help explain and
    explore the context and implications of various aspects of these datasets.
  </p>
  <p>
    Finally, we also include guides on how to write programs that use the
    <a href="https://earthmaps.io">Data API</a> that drives this application.
    Interactive online computational notebooks can be run in the browser, and
    edited to help you get started with interacting with climate data via
    Python.
  </p>
</section>

`

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // required or 3rd party libs break the app
  devtools: { enabled: true },
  css: ['assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/styles/_variables.scss" as *;
            @import "~/node_modules/bulma/sass/utilities/mixins.sass";
          `,
        },
      },
    },
  },
  modules: ['@pinia/nuxt'],
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      geoserverUrl:
        process.env.GEOSERVER_URL || 'https://gs.mapventure.org/geoserver/wms',
      apiUrl: process.env.SNAP_API_URL || 'https://earthmaps.io',
      rasdamanUrl:
        process.env.RASDAMAN_URL || 'https://maps.earthmaps.io/rasdaman/ows',
    },
  },
  app: {
    head: {
      noscript: [
        {
          children: noscriptHtml,
        },
      ],
      title: 'ARDAC',
      script: [
        {
          src: 'https://umami.snap.uaf.edu/script.js',
          'data-website-id': '29d337b9-9cf3-4962-a319-f4944161b550',
          'data-do-not-track': 'true',
          'data-domains': 'arcticdatascience.org',
          async: 'true',
          defer: 'true',
        },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },
})
