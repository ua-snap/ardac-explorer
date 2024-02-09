import { resolve } from 'path'

const noscriptHtml = `
<section class="section">
<div class="container">
  <h1 class="title is-1">Arctic Data Collaborative</h1>
  <div class="content is-size-5">
    <p>The Arctic Data Collaborative (ARDAC) provides highly-curated,
        relevant <b>Arctic datasets</b>, streamlined <b>data access</b>,
        processing <code>code examples</code> and <b>visualizations</b> to
        support research in the North.
    </p>
    <p>
      ⚠️ We&rsquo;re sorry, but this web tool requires
      Javascript to be enabled to run. <strong>
        Please email us at
        uaf-snap-data-tools@alaska.edu
      </strong> if you would like assistance to
      access content on this site.
    </p>
  </div>
</div>
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
          additionalData: '@use "~/assets/styles/_variables.scss" as *;',
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
    },
  },
})
