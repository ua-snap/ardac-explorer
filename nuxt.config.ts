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
    ⚠️ We&rsquo;re sorry, but this web tool requires JavaScript to be enabled to
    run. <strong>Please email us at uaf-snap-data-tools@alaska.edu</strong> if
    you would like assistance to access content on this site.
  </p>

  <h3>Content available on this site</h3>
  <p>
    This tool has a wide range of best-available climate science datasets and
    supporting content. Datasets include:
  </p>
  <ul>
    <li>
      Temperature and precipitation, from both CMIP5 and CMIP6 climate models,
      at 2km resolution over Alaska and western Canada
    </li>
    <li>
      Derived climate indicators, such as &lsquo;wet days per year&rsquo; and &lsquo;deep winter
      days&rsquo;, provide additional meaning and context for changing climate
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

import { metas } from './utils/metas'

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
        process.env.GEOSERVER_URL || 'https://gs.earthmaps.io/geoserver/wms',
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
      title: 'Arctic Data Collaborative: ARDAC',
      script: [
        {
          src: 'https://umami.snap.uaf.edu/script.js',
          'data-website-id': '29d337b9-9cf3-4962-a319-f4944161b550',
          'data-do-not-track': 'true',
          'data-domains': 'arcticdatascience.org',
          async: 'true',
          defer: 'true',
        },
        {
          type: 'text/javascript',
          src: '//script.crazyegg.com/pages/scripts/0126/7664.js',
          async: true,
        },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      meta: [
        { name: 'description', content: metas.description },
        { name: 'og:title', content: metas.title },
        { name: 'og:image', content: metas.image },
        { name: 'og:description', content: metas.description },
        { name: 'twitterCard', content: 'summary_large_image' },
      ],
    },
  },
})
