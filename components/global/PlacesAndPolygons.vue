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
            Geospatial data is at a minimum two-dimensional: a coordinate pair
            (latitude and longitude, or y and x) attaches data to a location on
            Earth. And while coordinates like (68.1399, -151.7321) or (-419837,
            1225439) are perfectly suited to computational data mapping and
            extraction, they fail to convey a sense of place. That's why ARDAC
            includes place names. Communities. Airports. National Parks.
            Wildlife Refuges. Climate Divisions. Fire Management Zones. Game
            Management Units. And more. Place names are how humans navigate
            their daily geospatial context, and representation matters because
            that context varies across space, time, and cultures. Every single
            named location in Alaska (and many throughout the circumpolar North)
            are available in ARDAC. Every community is on the map. In some
            instances, an Indigenous name is included when it was possible to
            verify the name with the
            <a href="https://www.uaf.edu/anlc" target="_blank"
              >Alaska Native Language Center at the University of Alaska
              Fairbanks</a
            >. From Afognak (Agw'aneq) to Yakutat (Yaakwdáat), over 500 named
            Alaska communities and locations are in ARDAC. But that is just the
            beginning: ARDAC has numerous other geographic lenses for analyzing
            climate and envinronmental data, inlcuding polygon vector data such
            as:
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
            available in ARDAC. Indigenous toponyms and/or proper orthography
            are included where appropriate, for example:
          </p>
          <ul>
            <li>Utqiaġvik (Barrow), Alaska</li>
            <li>ᑦᐁᔅᓕᓐᑦᐆ / Desleen (Teslin), Yukon</li>
            <li>Igluligaarjuk / ᐃᒡᓗᓕᒑᕐᔪᒃ (Chesterfield Inlet), Nunavut</li>
            <li>Воркута (Vorkuta), Russia</li>
            <li>Bjørnøya, Svalbard, Norway</li>
          </ul>
          <p class="has-text-weight-semibold mt-3">
            <a href="/item/notebook-perm-obs-temp"
              >Example: Combine and compare permafrost observations with modeled
              baseline air temperature data using SNAP Data API point location
              queries.</a
            >
          </p>

          <!-- Random Location Map Component -->
          <div class="mt-4 interactive-feature">
            <div class="interactive-label">Interactive Feature</div>
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
            <li>Pikmiktalik River (HUC 1903050230)</li>
            <li>Matanuska-Susitna Borough</li>
            <li>Vuntut Gwitchin First Nation Traditional Territory</li>
          </ul>
          <p class="has-text-weight-semibold mt-3">
            <a href="/item/notebook-precip-poly"
              >Example: Fetch a polygon from the SNAP Data API, subset
              historical baseline daily precipitation data using the polygon,
              compute statistics, and compare results with USGS streamgage
              data.</a
            >
          </p>

          <!-- Random Polygon Map Component -->
          <div class="mt-4 interactive-feature">
            <div class="interactive-label">Interactive Feature</div>
            <RandomPolygonMap />
          </div>
        </div>
      </div>
    </section>

    <section class="mt-6">
      <div class="columns">
        <div class="column is-6 pr-5 border-right">
          <h4 class="title is-5">Point Location Features</h4>
          <p>
            Thousands of point locations are manually vetted for geographic
            accuracy. Place name correctness is with third party governmental
            organizations and research institutions.
          </p>
          <ul>
            <li>Geographic extent: the circumpolar North</li>
            <li>Decimal degree precision to 4 places (≈11m accuracy)</li>
            <li>Pre-computed shortest distance between point and ocean</li>
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
          <p>
            <a href="https://earthmaps.io/places/"
              >Polygons are sourced from governmental agencies, research
              institutions, and international organizations.</a
            >
            Data are lightly curated to ensure usefulness for web applications
            and statistical analysis.
          </p>
          <ul>
            <li>Optimized geometries for web performance and analysis</li>
            <li>Minimum area threshold: 10 km²</li>
            <li>Topological integrity: geometries are valid</li>
            <li>Consistency across political boundaries</li>
            <li>Data do not constitute legal or official boundaries</li>
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
                  <td>POLYGON ((-152.9662...))</td>
                </tr>
                <tr>
                  <td>Sealaska Corporation</td>
                  <td>corporation</td>
                  <td>POLYGON ((-153.3263...))</td>
                </tr>
                <tr>
                  <td>Copper Plateau</td>
                  <td>ecoregion</td>
                  <td>POLYGON ((-143.5992...))</td>
                </tr>
                <tr>
                  <td>Upper Tanana</td>
                  <td>ethnolinguistic_region</td>
                  <td>POLYGON ((-140.9682...))</td>
                </tr>
                <tr>
                  <td>Tok Area</td>
                  <td>fire_zone</td>
                  <td>POLYGON ((-143.4561...))</td>
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

.interactive-feature {
  position: relative;
  border: 2px dashed $primary-light;
  border-radius: 8px;
  padding: 2rem 1rem 1rem;
  background-color: rgba($primary-light, 0.05);

  .interactive-label {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background-color: $primary;
    color: white;
    padding: 2px 12px;
    border-radius: 16px;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
