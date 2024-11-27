<script lang="ts" setup>
const props = defineProps(['resolution', 'unit'])
</script>

<template>
  <blockquote class="xray--introblurb">
    <p><span class="robot">🔬</span> This page is a <strong>data x-ray</strong> which lets you view <em>maps</em> and get <em>charts</em> from this dataset.</p>
    <p>This dataset shows projected climate model output.  Here&rsquo;s some key acronynms and information to know about:</p>
    <ul>
      <li>GDFL-ESM4, CESM2, etc… these are the names of climate models. <a href="">&#x2192; read more</a></li>
      <li>SSP1-2.5, SSP2-4.5 etc… these are socioeconomic and emission scenarios. <a href="">&#x2192; read more</a></li>
      <li>this dataset is at a {{ resolution }}&#8239;{{ unit }} spatial resolution</li>
    </ul>
  </blockquote>
</template>

<style scoped lang="scss">
.robot {
  font-size: 2rem;
  vertical-align: baseline;
  display: inline-block;
  margin-right: 0.35rem;
}
</style>
