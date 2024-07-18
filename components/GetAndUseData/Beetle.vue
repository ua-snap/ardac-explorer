<script lang="ts" setup></script>

<template>
  <GetAndUseData
    :presentInNcr="true"
    apiUrl="https://earthmaps.io/beetles/"
    geonetworkUrl="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/090daa3e-b1f1-4dc5-81f2-b7817bd011ee"
  >
    <template #preamble>
      <slot name="preamble"></slot>
    </template>
    <li>Read all about this project...</li>
    <li>
      Academic reference (to be corrected but leaving as template):
      <blockquote>
        <p>
          Johnstone, J. F., Rupp, T. S., Olson, M. &amp; Verbyla, D. (2011).
          Modeling impacts of fire severity on successional trajectories and
          future fire behavior in Alaskan boreal forests.
          <i>Landscape Ecology, 26</i>, 487&ndash;500.
          <a href="https://doi.org/10.1007/s10980-011-9574-6"
            >https://doi.org/10.1007/s10980-011-9574-6</a
          >
        </p>
      </blockquote>
    </li>
  </GetAndUseData>
</template>
