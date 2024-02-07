export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    html.bodyAppend.push(`
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
    `)
  })
})
