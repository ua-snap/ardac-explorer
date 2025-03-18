<script lang="ts" setup>
// Change the component name to match the slug pattern
defineOptions({
  name: 'PlacesAndPolygons'
})

</script>

<template>
  <article class="clamp content is-size-5">
    <h2 class="title is-2">Places & Polygons: Geographic Lenses for Arctic Data</h2>
    
    <section class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child">
          <h3 class="title is-4">Why Geographic Context Matters</h3>
          <p>
            Geospatial data is at a minimum two-dimensional: we use a coordinate pair (latitude and longitude, or y and x) to attach data to a locatio
             on Earth. And while coordinates like (68.1399, -151.7321) or (-419837, 1225439) are perfectly suited to computational extraction of data, they fail to convey a sense of place.
             That’s why ARDAC includes place names. Communities. Airports. National Parks. Wildlife Refuges. Climate Divisions. Fire Management Zones. Game Management Units. And more.
             Place names are how we navigate our daily geospatial context, and representation matters. That’s why every single named location in Alaska (and many throughout the Arctic) are available in ARDAC.
             Anchorage and Girdwood are different places, and those names mean different things.
             Every community is on the map. For some communities, an Indigenous name was also included when it was possible to verify the name with the Alaska Native Language Center at the University of Alaska Fairbanks.
             From Afognak (Agw’aneq) to Yakutat (Yaakwdáat), over 500 named Alaska communities and locations are represented in ARDAC.
             ARDAC provides multiple geographic perspectives to analyze climate data through geographic vector data such as:
          </p>
          <ul>
            <li>⚖️ <strong>Administrative boundaries</strong> (boroughs, census areas)</li>
            <li>🔥 <strong>Fire management zones</strong></li>
            <li>🐻 <strong>Wildlife management units</strong></li>
            <li>🌿 <strong>Protected areas</strong> (parks, wildlife refuges, critical habitat areas)</li>
            <li>🌊 <strong>Watersheds</strong> (hydrologic units)</li>
            <li>➕<strong>And more!</strong> (ethnolinguistic regions, climate divisions, ecoregions, etc.)</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="tile is-ancestor mt-6">
      <div class="tile is-parent pr-5 border-right">
        <div class="tile is-child">
          <h3 class="title is-4">Point Location Place Names</h3>
          <p>
            We include Indigenous toponyms with proper orthography:
          </p>
          <ul>
            <li>Utqiaġvik (Barrow), Alaska</li>
            <li>ᑦᐁᔅᓕᓐᑦᐆ / Desleen (Teslin), Yukon</li>
            <li>Igluligaarjuk / ᐃᒡᓗᓕᒑᕐᔪᒃ (Chesterfield Inlet), Nunavut</li>
          </ul>
          <p class="has-text-weight-semibold mt-3">
            Compare projected permafrost thaw rates between Interior Alaska communities for different climate futures. **Consider linking to a code example here**
          </p>
        </div>
      </div>
      
      <div class="tile is-parent px-5">
        <div class="tile is-child">
          <h3 class="title is-4">Polygon Boundaries</h3>
          <p>
            Our polygon features enable zonal statistics (imagine cookie cutters, for data) for:
          </p>
          <ul>
            <li>🏞️ Protected area analysis</li>
            <li>🔥 Fire risk modeling</li>
            <li>🐟 Watershed hydrology</li>
            <li>🌡️ Climate division trends</li>
          </ul>
          <p class="has-text-weight-semibold mt-3">
            Example: Determine which fire managment zone has the greatest increase in projected relative flammability between now and 2050. **Consider linking to a code example here**
          </p>
        </div>
      </div>
    </section>

    <section class="mt-6">
      <h3 class="title is-4">Point Location Implementation Details</h3>
      <div class="columns">
        <div class="column is-6">
          <h4 class="title is-5">Point Data Standards</h4>
          <ul>
            <li>4 decimal place precision (≈11m accuracy)</li>
            <li>Coastal distance measurements</li>
            <li>Multiple name variants</li>
            <li>Tag-based filtering (ardac, eds, ncr)</li>
          </ul>
        </div>
        <div class="column is-6">
          <h4 class="title is-5">Polygon Processing</h4>
          <ul>
            <li>Simplified geometries for web performance</li>
            <li>Minimum area threshold (10 km²)</li>
            <li>Topological validation</li>
            <li>Transboundary consistency possible</li>
          </ul>
        </div>
      </div>
    </section>

    <GetAndUseData
      presentInNcr
      apiUrl="https://earthmaps.io/places/"
      gitHubRepo="https://github.com/ua-snap/geospatial-vector-veracity"
    >
      <li>
        Access polygon metadata sheets with coordinate reference system details
        and simplification parameters
      </li>
      <li>
        Download original source files with provenance documentation from our
        <a href="https://github.com/ua-snap/geospatial-vector-veracity" target="_blank">
          version-controlled repository
        </a>
      </li>
    </GetAndUseData>

    <div class="notification is-info is-light mt-6">
      <p>
        See these geographic lenses in action on our other web applications:
        <a href="https://northernclimatereports.org/places" target="_blank">
          Northern Climate Reports → Places
        </a>
      </p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.clamp {
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem;
}

.border-right {
  border-right: 1px solid $gray-lighter;
}

.notification a {
  text-decoration: underline;
}
</style> 