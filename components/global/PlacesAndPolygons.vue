<script lang="ts" setup>
import RandomLocationMap from '~/components/RandomLocationMap.vue'
import RandomPolygonMap from '~/components/RandomPolygonMap.vue'

// Change the component name to match the slug pattern
defineOptions({
  name: 'PlacesAndPolygons',
})
</script>

<template>
  <article class="clamp content is-size-5">
    <h2 class="title is-2">
      Places & Polygons: Geographic Lenses for Arctic Data
    </h2>

    <section class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child">
          <h3 class="title is-4">Why Geographic Context Matters</h3>
          <p>
            Geospatial data is at a minimum two-dimensional: we use a coordinate
            pair (latitude and longitude, or y and x) to attach data to a
            location on Earth. And while coordinates like (68.1399, -151.7321)
            or (-419837, 1225439) are perfectly suited to computational
            extraction of data, they fail to convey a sense of place. That's why
            ARDAC includes place names. Communities. Airports. National Parks.
            Wildlife Refuges. Climate Divisions. Fire Management Zones. Game
            Management Units. And more. Place names are how we navigate our
            daily geospatial context, and representation matters. That's why
            every single named location in Alaska (and many throughout the
            Arctic) are available in ARDAC. Anchorage and Girdwood are different
            places, and those names mean different things. Every community is on
            the map. For some communities, an Indigenous name was also included
            when it was possible to verify the name with the Alaska Native
            Language Center at the University of Alaska Fairbanks. From Afognak
            (Agw'aneq) to Yakutat (Yaakwdáat), over 500 named Alaska communities
            and locations are represented in ARDAC. ARDAC provides multiple
            geographic perspectives to analyze climate data through geographic
            vector data such as:
          </p>
          <ul>
            <li>
              ⚖️ <strong>Administrative boundaries</strong> (boroughs, census
              areas)
            </li>
            <li>🔥 <strong>Fire management zones</strong></li>
            <li>🐻 <strong>Wildlife management units</strong></li>
            <li>
              🌿 <strong>Protected areas</strong> (parks, wildlife refuges,
              critical habitat areas)
            </li>
            <li>🌊 <strong>Watersheds</strong> (hydrologic units)</li>
            <li>
              ➕<strong>And more!</strong> (ethnolinguistic regions, climate
              divisions, ecoregions, etc.)
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="tile is-ancestor mt-6">
      <div class="tile is-parent pr-5 border-right">
        <div class="tile is-child">
          <h3 class="title is-4">Point Locations</h3>
          <p>
            Over 25,000 named point locations across the circumpolar North are
            available in ARDAC. We include Indigenous toponyms and/or proper
            orthography where appropriate, for example:
          </p>
          <ul>
            <li>Utqiaġvik (Barrow), Alaska</li>
            <li>ᑦᐁᔅᓕᓐᑦᐆ / Desleen (Teslin), Yukon</li>
            <li>Igluligaarjuk / ᐃᒡᓗᓕᒑᕐᔪᒃ (Chesterfield Inlet), Nunavut</li>
            <li>Воркута (Vorkuta), Russia</li>
            <li>Bjørnøya, Svalbard, Norway</li>
          </ul>
          <p class="has-text-weight-semibold mt-3">
            Example: Compare projected permafrost thaw rates between Interior
            Alaska communities for different climate futures. **Consider linking
            to a code example here**
          </p>

          <!-- Random Location Map Component -->
          <div class="mt-4">
            <RandomLocationMap />
          </div>
        </div>
      </div>

      <div class="tile is-parent px-5">
        <div class="tile is-child">
          <h3 class="title is-4">Polygon Boundaries</h3>
          <p>
            Choose from over 17,000 polygon features that enable zonal
            statistics (imagine cookie cutters, for data) - for example:
          </p>
          <ul>
            <li>Izembek National Wildlife Refuge</li>
            <li>Yukon Game Management Subzone 3-14</li>
            <li>Middle Fork-North Fork Chandalar Rivers (HUC 19080201)</li>
            <li>Matanuska-Susitna Borough</li>
            <li>Vuntut Gwitchin First Nation Traditional Territory</li>
          </ul>
          <p class="has-text-weight-semibold mt-3">
            Example: Determine which fire managment zone has the greatest
            increase in projected relative flammability between now and 2050.
            **Consider linking to a code example here**
          </p>

          <!-- Random Polygon Map Component -->
          <div class="mt-4">
            <RandomPolygonMap />
          </div>
        </div>
      </div>
    </section>

    <section class="mt-6">
      <div class="columns">
        <div class="column is-6 pr-5 border-right">
          <h4 class="title is-5">Point Location Features</h4>
          <ul>
            <li>Decimal degree precision to 4 places (≈11m accuracy)</li>
            <li>Pre-computed shortest distance point and the ocean</li>
            <li>Multiple name variants where available</li>
            <li>Unique alphanumeric ID for each point</li>
          </ul>

          <div class="table-container mt-3">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>alt_name</th>
                  <th>latitude</th>
                  <th>longitude</th>
                  <th>km to ocean</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>AK1</td>
                  <td>Afognak</td>
                  <td>Agw'aneq</td>
                  <td>58.0078</td>
                  <td>-152.768</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>AK2</td>
                  <td>Akhiok</td>
                  <td>Kasukuak</td>
                  <td>56.9455</td>
                  <td>-154.170</td>
                  <td>0.8</td>
                </tr>
                <tr>
                  <td>AK3</td>
                  <td>Akiachak</td>
                  <td>Akiacuar</td>
                  <td>60.9094</td>
                  <td>-161.431</td>
                  <td>33.5</td>
                </tr>
                <tr>
                  <td>AK4</td>
                  <td>Akiak</td>
                  <td>Akiaq</td>
                  <td>60.9122</td>
                  <td>-161.214</td>
                  <td>43</td>
                </tr>
                <tr>
                  <td>AK5</td>
                  <td>Akutan</td>
                  <td>Achan-ingiiga</td>
                  <td>54.1385</td>
                  <td>-165.778</td>
                  <td>1.4</td>
                </tr>
              </tbody>
            </table>
          </div>
          <small class="is-size-7 has-text-grey">
            Alaska point location CSV file preview with Indigenous names
            verified by the Alaska Native Language Center
          </small>
        </div>
        <div class="column is-6 pl-5">
          <h4 class="title is-5">Polygon Boundary Features</h4>
          <ul>
            <li>
              Optimized geometries for web performance and statistical analysis
            </li>
            <li>Minimum area threshold: 10 km²</li>
            <li>Topological integrity: geometries are valid</li>
            <li>Consistency across political boundaries</li>
          </ul>

          <div class="table-container mt-3">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th>name</th>
                  <th>type</th>
                  <th>geometry</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Central Interior</td>
                  <td>climate_division</td>
                  <td>POLYGON ((-152.9662 62.2662, ...))</td>
                </tr>
                <tr>
                  <td>Cook Inlet Region, Incorporated</td>
                  <td>corporation</td>
                  <td>POLYGON ((-153.3263 58.9128, ...))</td>
                </tr>
                <tr>
                  <td>Copper Plateau</td>
                  <td>ecoregion</td>
                  <td>POLYGON ((-143.5992 62.7129, ...))</td>
                </tr>
                <tr>
                  <td>Upper Tanana</td>
                  <td>ethnolinguistic_region</td>
                  <td>POLYGON ((-140.9682 61.5069, ...))</td>
                </tr>
                <tr>
                  <td>Tok Area</td>
                  <td>fire_zone</td>
                  <td>POLYGON ((-143.4561 64.5467, ...))</td>
                </tr>
              </tbody>
            </table>
          </div>
          <small class="is-size-7 has-text-grey">
            Some example polygon features of different types: a view similar to
            a GIS attribute table.
          </small>
        </div>
      </div>
    </section>

    <GetAndUseData
      pointDataRegion="all"
      apiUrl="https://earthmaps.io/places/"
      gitHubRepo="https://github.com/ua-snap/geospatial-vector-veracity"
    >
    </GetAndUseData>

    <div class="notification is-info is-light mt-6">
      <p>
        Learn more about these geographic lenses in another web application:
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
