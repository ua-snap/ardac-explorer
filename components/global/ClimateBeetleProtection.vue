<script lang="ts" setup>
const placesStore = usePlacesStore()
const mapStore = useMapStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const snowpackInput = defineModel('snowpack', { default: 'medium' })
const scenarioInput = defineModel('scenario', { default: 'rcp85' })

const apiData = computed<Record<string, any>>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const eras = ['2010-2039', '2040-2069', '2070-2099']
const models = ['NCAR-CCSM4', 'GFDL-ESM2M', 'HadGEM2-ES', 'MRI-CGCM3']

const snowpackLabels: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
}

const scenarioLabels: Record<string, string> = {
  rcp45: 'RCP 4.5',
  rcp85: 'RCP 8.5',
}

const layers: MapLayer[] = [
  {
    id: 'beetles_historical_era',
    title: '1980–2009, Daymet, Medium Snowpack',
    source: 'rasdaman',
    wmsLayerName: 'beetle_risk',
    style: 'beetle_risk',
    legend: 'beetles',
    rasdamanConfiguration: {
      dim_era: 0,
      dim_model: 0,
      dim_scenario: 0,
      dim_snowpack: 1,
    },
  },
  {
    id: 'beetles_midcentury_era',
    title: '2040–2069, NCAR CCSM4, RCP 8.5, Medium Snowpack',
    source: 'rasdaman',
    wmsLayerName: 'beetle_risk',
    style: 'beetle_risk',
    legend: 'beetles',
    rasdamanConfiguration: {
      dim_era: 2,
      dim_model: 1,
      dim_scenario: 2,
      dim_snowpack: 1,
    },
  },
  {
    id: 'beetles_latecentury_era',
    title: '2070–2099, NCAR CCSM4, RCP 8.5, Medium Snowpack',
    source: 'rasdaman',
    wmsLayerName: 'beetle_risk',
    style: 'beetle_risk',
    legend: 'beetles',
    rasdamanConfiguration: {
      dim_era: 3,
      dim_model: 1,
      dim_scenario: 2,
      dim_snowpack: 1,
    },
  },
]

const legend: Record<string, LegendItem[]> = {
  beetles: [
    { color: '#00B800', label: 'High' },
    { color: '#FFEF0A', label: 'Minimal' },
    { color: '#FB2F18', label: 'None' },
  ],
}

const mapId = 'beetles'
mapStore.setLegendItems(mapId, legend)

watch(latLng, async () => {
  dataStore.apiData = null
  dataStore.fetchData('beetles')
})

onUnmounted(() => {
  dataStore.apiData = null
})
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Climate Protection from Spruce Beetles</h3>
      <h3 class="title is-5">Introduction</h3>
      <p class="mb-6">
        Spruce beetles are small insects that play a significant role in
        Alaska's forests, particularly in infesting spruce trees such as white
        spruce, Sitka spruce, and Lutz spruce. These outbreaks can cause
        substantial damage to forest ecosystems and have economic repercussions.
        In recent years, the frequency and severity of spruce beetle outbreaks
        in Alaska have increased, prompting researchers to delve deeper into
        understanding the factors influencing these outbreaks.
      </p>
      <h3 class="title is-5">The Beetle Lifecycle and Climate Connection</h3>
      <p class="mb-6">
        Spruce beetles have a lifecycle closely tied to climate conditions.
        Adult beetles typically fly to new trees in the spring, where females
        lay eggs. The timing of beetle flight is often linked to temperature,
        with flight occurring when temperatures reach approximately 16°C or
        warmer. Once hatched, larvae develop over the summer, with some maturing
        into adults by the end of the season. The rate of maturation, termed
        univoltinism, depends on the accumulation of heat during the summer
        months. Beetles that mature in a single summer (univoltine) have a
        higher chance of survival compared to those that overwinter as larvae
        (semivoltine).
      </p>
      <h3 class="title is-5">Climate Factors and Outbreak Patterns</h3>
      <p class="mb-6">
        Climate plays a crucial role in shaping spruce beetle outbreaks. Warmer
        temperatures can accelerate beetle development, leading to more frequent
        outbreaks. Conversely, cold temperatures during fall and winter can
        limit beetle survival. Predation by woodpeckers also influences beetle
        populations, with larvae being particularly vulnerable. Understanding
        these climate factors is essential for predicting and mitigating
        outbreaks.
      </p>
      <h3 class="title is-5">Modeling Spruce Beetle Outbreaks</h3>
      <p class="mb-6">
        To better understand and predict spruce beetle outbreaks, researchers
        developed a comprehensive model that incorporates various climate
        factors and beetle lifecycle stages. The model assesses the risk of
        outbreaks across different time periods, considering historical climate
        data and beetle population dynamics. By calibrating the model with
        observed outbreak patterns, researchers can categorize climate
        protection levels and identify regions at higher risk of outbreaks.
      </p>
      <h3 class="title is-5">Implications for Forest Management</h3>
      <p class="mb-6">
        Understanding the factors driving spruce beetle outbreaks is essential
        for effective forest management and conservation efforts. By identifying
        areas with elevated outbreak risk, forest managers can implement
        proactive measures to mitigate beetle infestations, such as targeted
        tree removal, forest thinning, and monitoring programs. These management
        practices can help maintain the health and resilience of Alaska's
        forests in the face of changing climate conditions.
      </p>
      <h3 class="title is-5">Conclusion</h3>

      <p class="mb-6">
        Spruce beetle outbreaks pose significant challenges to Alaska's forests,
        but through interdisciplinary research and advanced modeling techniques,
        scientists are gaining valuable insights into the complex interactions
        between climate, beetle populations, and forest ecosystems. By applying
        this knowledge, stakeholders can work towards sustainable forest
        management practices that help protect Alaska's valuable spruce forests
        for future generations.
      </p>
    </div>
    <div class="content is-size-5">
      <h3 class="title is-3">Climate Protection from Spruce Beetles</h3>
      <p class="mb-6">
        The map below shows the 30-year mean of climate protection from spruce
        beetles for three eras with medium snowpack. The historical era
        (1980&ndash;2009) uses historical modeled data provided by the Daymet
        model. The mid-century (2040&ndash;2069) and late-century
        (2070&ndash;2099) eras use modeled projections from the NCAR CCSM4 model
        under the RCP 8.5 emissions scenario.
      </p>

      <MapBlock :mapId="mapId" class="mb-6">
        <template v-slot:layers>
          <MapLayer :mapId="mapId" :layer="layers[0]" default>
            <template v-slot:title>{{ layers[0].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[1]">
            <template v-slot:title>{{ layers[1].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[2]">
            <template v-slot:title>{{ layers[2].title }}</template>
          </MapLayer>
        </template>
      </MapBlock>

      <p>
        Enter lat/lon coordinates below to see a table of climate protection
        from spruce beetles for a point location. This table displays risk
        levels for the historical modeled era (1980&ndash;2009) using Daymet and
        projections for the mid-century (2040&ndash;2069) and late-century
        (2070&ndash;2099) eras using the NCAR CCSM4, GFDL ESM2M, HadGEM2 ES, and
        MRI CGCM3 models under two different emissions scenarios (RCP 4.5 and
        RCP 8.5) and two different snowpack levels (low and medium).
      </p>

      <p>
        After entering lat/lon coordinates, links will be provided where you can
        download the data that is used to populate the table.
      </p>

      <Gimme />

      <div v-if="latLng && apiData">
        <div class="parameter">
          <label for="snowpack" class="label">Snowpack:</label>
          <div class="select mb-5 mr-3">
            <select id="snowpack" v-model="snowpackInput">
              <option
                v-for="snowpack in Object.keys(snowpackLabels)"
                :value="snowpack"
              >
                {{ snowpackLabels[snowpack] }}
              </option>
            </select>
          </div>
        </div>
        <div class="parameter mb-5">
          <label for="scenario" class="label">Scenario:</label>
          <div class="select">
            <select id="scenario" v-model="scenarioInput">
              <option
                v-for="scenario in Object.keys(scenarioLabels)"
                :value="scenario"
              >
                {{ scenarioLabels[scenario] }}
              </option>
            </select>
          </div>
        </div>
        <h4 class="title is-4">
          Climate protection from spruce beetles for {{ latLng.lat }},
          {{ latLng.lng }} with
          {{ snowpackLabels[snowpackInput].toLowerCase() }} snowpack
        </h4>
        <table class="mb-6">
          <tr>
            <th>Model</th>
            <th>1988&ndash;2017</th>
            <th>2010&ndash;2039</th>
            <th>2040&ndash;2069</th>
            <th>2070&ndash;2099</th>
          </tr>
          <tr>
            <td>Daymet</td>
            <td>
              {{
                apiData['1988-2017']['Daymet']['Historical'][snowpackInput][
                  'climate-protection'
                ]
              }}
            </td>
            <td>N/A</td>
            <td>N/A</td>
            <td>N/A</td>
          </tr>
          <tr v-for="model in models">
            <td>
              {{ model.replace('-', ' ') }} ({{
                scenarioLabels[scenarioInput]
              }})
            </td>
            <td>N/A</td>
            <td v-for="era in eras">
              <span v-if="era == '1988-2017'">
                {{
                  apiData[era]['Daymet']['Historical'][snowpackInput][
                    'climate-protection'
                  ]
                }}
              </span>
              <span v-else>
                {{
                  apiData[era][model][scenarioInput][snowpackInput][
                    'climate-protection'
                  ]
                }}
              </span>
            </td>
          </tr>
        </table>
        <h4 class="title is-4">
          Download climate protection from spruce beetles data for
          {{ latLng.lat }},
          {{ latLng.lng }}
        </h4>
        <ul>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/beetles/point/' +
                latLng.lat +
                '/' +
                latLng.lng +
                '?format=csv'
              "
              >Download as CSV</a
            >
          </li>
          <li>
            <a
              :href="
                runtimeConfig.public.apiUrl +
                '/beetles/point/' +
                latLng!.lat +
                '/' +
                latLng!.lng
              "
              >Download as JSON</a
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.parameter {
  display: inline-block;
  select {
    background-color: $white-lighter;
  }
}
</style>
