<script lang="ts" setup>
const props = defineProps(['resolution', 'unit'])
</script>

<template>
  <blockquote class="xray--introblurb">
    <p><span class="robot">🔬</span> This is a <strong>dataset x-ray</strong> which lets you view <em>maps</em> and get <em>charts</em> from this dataset.</p>
    <p>This dataset shows projected climate model output.  Here&rsquo;s some key relevant information:</p>
    <ul>
      <li>GDFL-ESM4, CESM2, etc… these are the names of climate models. <a href="https://doi.org/10.1016/j.envsoft.2018.03.021">&#x2192; read more</a></li>
      <li>SSP1-2.5, SSP2-4.5 etc… these are socioeconomic and emission scenarios. <a href="https://glisa.umich.edu/wp-content/uploads/2021/03/A_Practitioners_Guide_to_Climate_Model_Scenarios.pdf">&#x2192; read more</a></li>
      <li>the spatial resolution of this dataset is {{ resolution }}&#8239;{{ unit }}</li>
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
