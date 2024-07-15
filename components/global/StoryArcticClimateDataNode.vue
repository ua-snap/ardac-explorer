<script lang="ts" setup>
const placesStore = usePlacesStore()
const mapStore = useMapStore()
const dataStore = useDataStore()
const runtimeConfig = useRuntimeConfig()

const apiData = computed<Record<string, any>>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)

const layers: MapLayer[] = [
  {
    id: 'indicator_su_historical_era',
    title: '1980–2009, GFDL-ESM4',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_indicators',
    style: 'ardac_indicator_su_historical_era',
    legend: 'summer_days',
    rasdamanConfiguration: { dim_model: 4, dim_scenario: 0 },
  },
  {
    id: 'indicator_su_midcentury_era',
    title: '2040–2069, GFDL-ESM4, SSP5-8.5',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_indicators',
    style: 'ardac_indicator_su_midcentury_era',
    legend: 'summer_days',
    rasdamanConfiguration: { dim_model: 4, dim_scenario: 4 },
  },
  {
    id: 'indicator_su_latecentury_era',
    title: '2070–2099, GFDL-ESM4, SSP5-8.5',
    source: 'rasdaman',
    wmsLayerName: 'cmip6_indicators',
    style: 'ardac_indicator_su_latecentury_era',
    legend: 'summer_days',
    rasdamanConfiguration: { dim_model: 4, dim_scenario: 4 },
  },
]

const legend: Record<string, LegendItem[]> = {
  summer_days: [
    { color: '#fdd0a2', label: '&ge;1 day, &lt;5 days' },
    { color: '#fdae6b', label: '&ge;5 days, &lt;10 days' },
    { color: '#fd8d3c', label: '&ge;10 days, &lt;20 days' },
    { color: '#e6550d', label: '&ge;20 days, &lt;40 days' },
    { color: '#a63603', label: '&ge;40 days' },
  ],
}

let activeTab = ref('models')

const changeTab = (tab: string) => {
  activeTab.value = tab
}

const mapId = 'summer_days'
mapStore.setLegendItems(mapId, legend)

onMounted(() => {
  const community = {
    id: 'AK124',
    name: 'Fairbanks',
    alt_name: '',
    region: 'Alaska',
    country: 'US',
    latitude: 64.8378,
    longitude: -147.716,
    type: 'community',
  }
  // Set the latitude and longitude for Fairbanks
  placesStore.latLng = { lat: community.latitude, lng: community.longitude }

  // Fetch the data for the chart
  dataStore.fetchData('indicatorsCmip6')
})
</script>

<template>
  <section class="section">
    <div class="columns">
      <div class="column is-two-thirds">
        <h2 class="title is-2">
          Introducing the <span>Arctic Climate Data Node</span>
        </h2>
        <h3 class="subtitle is-3">
          Unlocking research potential for CMIP6 climate model data
        </h3>

        <div class="content is-size-4">
          <p>
            Access to large distributed data volumes has been a limiting factor
            for researchers in Alaska, which puts them at a disadvantage and
            represents a key hurdle to research advancements. Establishing the
            Arctic Climate Data Node (ACDN) at UAF provides never&ndash;before
            realized local access to cutting-edge global climate model data.
          </p>
        </div>
        <div class="content is-size-5">
          <p>
            Through support from the Department of Energy&rsquo;s
            <a
              href="https://science.osti.gov/ber/Research/eessd/Data-Management"
            >
              Earth and Environmental Systems Sciences Division Data Management
              program
            </a>
            the University of Alaska Fairbanks (UAF) has established the Arctic
            Climate Data Node. The ACDN provides local access to
            <a href="https://pcmdi.llnl.gov/CMIP6/"
              >Coupled Model Intercomparison Project Phase 6</a
            >
            (CMIP6) data and includes associated computational resources
            required to facilitate data transfer, analysis, and evaluation
            activities as well as aid in the development of new derived data
            products.
          </p>
          <p>
            The ACDN will facilitate the development of new research themes,
            process and mechanistic&ndash;based modeling activities, and
            regional synthesis activities at UAF and within the broader Arctic
            science community. Developing and establishing research computing
            infrastructure to support local storage and access to key datasets
            will provide significant capacity building to the research community
            in Alaska and to Alaska&rsquo;s rightsholders and stakeholders as
            they address the ongoing challenges of a changing climate.
          </p>
        </div>
      </div>
      <div class="column">
        <figure class="image is-square">
          <img src="/images/story-acdn-cmip6/summer-days-cmip6.png" />
          <figcaption>
            Example CMIP6 data showing change in warm summer days
          </figcaption>
        </figure>
        <figure class="image mt-6">
          <img src="/images/story-acdn-cmip6/servers_massimo-botturi.jpg" />
          <figcaption>
            Part of the server technology used by the ACDN
          </figcaption>
        </figure>
      </div>
    </div>

    <h3 class="title is-3">What does ACDN offer researchers?</h3>
    <div class="columns">
      <div class="column is-two-thirds">
        <div class="content is-size-5">
          <p>
            The Arctic Data Collaborative (ARDAC) provides researchers access to
            CMIP6 data as well as associated utilities and data products.
          </p>
        </div>
        <h3 class="subtitle is-4 mt-4 mb-1">Data ready for use in research</h3>
        <div class="content is-size-5">
          <ul>
            <li>
              curated a suite of
              <strong>
                <span class="bling">CMIP6</span> models and scenarios that
                perform best in Alaska and the pan&ndash;Arctic </strong
              >: 13 global climate models, 4 emissions scenarios, 15 variables
              <br />
              Compared to prior CMIP5 data housed at UAF, the CMIP6 data through
              the ACDN offers more models, more variables, and represents the
              current state of the art of climate model output.
            </li>
            <li>
              preprocessed:
              <strong>data are available on a common grid</strong>, allowing
              researchers to focus on applying the data and solving significant
              geospatial data hurdles
            </li>
            <li>
              derived products: standardized
              <strong>climate indicators</strong>&mdash;such as how many days
              per year exceed 25&deg;C, or how many days per year have
              temperatures above and below freezing&mdash;make baseline
              temperature and precipitation more useful
            </li>
            <li>
              <a href="#technical-information">&#x2192; see available data</a>
            </li>
          </ul>
        </div>

        <h3 class="subtitle is-4 mb-1">Multiple data access pathways</h3>
        <div class="content is-size-5">
          <ul>
            <li>
              <strong>local data access</strong> and workspace for University of
              Alaska affiliated researchers. The repository of CMIP6 data is
              attached directly to the
              <a href="https://uaf-rcs.gitbook.io/uaf-rcs-hpc-docs/hpc"
                >Chinook compute cluster</a
              >, allowing fast access and scratch space for working with data.
              <a href="#beegeefs">&#x2192; read more about ACDN storage</a>
            </li>
            <li>
              <strong
                ><a href="https://earthmaps.io">simple data API</a></strong
              >
              provides programmatic access to CMIP6 data, allowing users to
              query and download data directly from the command line or within
              their own applications. The API supports a wide range of query
              parameters, including model, scenario, variable, and geographic
              region, enabling users to extract specific subsets of data or
              perform complex analyses directly within the API.
              <br />
              Example:
              <a href="https://earthmaps.io/indicators/cmip6/point/61.5/-147"
                ><code
                  >https://earthmaps.io/indicators/cmip6/point/61.5/-147</code
                >
              </a>
            </li>

            <li>
              rasdaman: a <strong>multidimensional raster datacube</strong> for
              data analysis and mapping. Users can access CMIP6 data from
              rasdaman using the standards-based OGC formats for web mapping and
              coverage requests: WMS, and WCS/WCPS. This can be integrated into
              GIS platforms or used to extract data for local analysis.
              <a href="#rasdaman">&#x2192; read more about rasdaman</a>
            </li>

            <li>
              <strong>remote data access</strong> via Globus. Users equipped
              with a Globus account can seamlessly navigate the ACDN file
              storage system to retrieve data, transferring it to any system
              where they hold a Globus account.
              <a href="#globus">&#x2192; read more about Globus</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="block clamp">
      <h3 class="title is-3">CMIP6 Climate Indicator In Action: Summer Days</h3>
      <div class="content is-size-5">
        <p>
          Summer days are the number of days per year that are above 77&deg;F.
          The map below shows the 30-year mean of CMIP6 temperature data for
          three eras showing the number of summer days over that era. The
          historical era (1980&ndash;2009) uses model baseline data from the
          GFDL-ESM4 dataset. The mid-century era (2040&ndash;2069) and
          late-century era (2070&ndash;2099) use GFDL-ESM4 data under the
          climate scenario SSP5-8.5 scenario.
        </p>
      </div>
      <MapBlock :mapId="mapId">
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

      <IndicatorsCmip6ChartControls />
      <IndicatorsCmip6Chart label="Summer days" dataKey="su" />
    </div>
  </section>

  <section class="section">
    <h3 class="title is-3">Overview of CMIP6 data in the ACDN</h3>

    <div class="tabs is-medium is-left">
      <ul>
        <li :class="{ 'is-active': activeTab === 'models' }">
          <a @click="changeTab('models')">Models</a>
        </li>
        <li :class="{ 'is-active': activeTab === 'scenarios' }">
          <a @click="changeTab('scenarios')">Scenarios</a>
        </li>
        <li :class="{ 'is-active': activeTab === 'variables' }">
          <a @click="changeTab('variables')">Variables</a>
        </li>
      </ul>
    </div>

    <div v-if="activeTab === 'models'">
      <div class="content is-size-5">
        <table>
          <tr class="header-text">
            <th scope="col" class="model">Climate Model</th>
            <th>Institutions</th>
          </tr>
          <tr class="small-text">
            <td>ACCESS-CM2</td>
            <td>
              Commonwealth Scientific and Industrial Research Organisation,
              Australian Research Council Centre of Excellence for Climate
              System Science
            </td>
          </tr>
          <tr class="small-text">
            <td>CESM2</td>
            <td>
              National Center for Atmospheric Research, Climate and Global
              Dynamics Laboratory
            </td>
          </tr>
          <tr class="small-text">
            <td>CESM2-WACCM</td>
            <td>
              National Center for Atmospheric Research, Climate and Global
              Dynamics Laboratory
            </td>
          </tr>
          <tr class="small-text">
            <td>CNRM-CM6-1-HR</td>
            <td>
              Centre National de Recherches Meteorologiques, Centre Europeen de
              Recherche et de Formation Avancee en Calcul Scientifique
            </td>
          </tr>
          <tr class="small-text">
            <td>EC-Earth3-Veg</td>
            <td>
              EC-Earth, Rossby Center, Swedish Meteorological and Hydrological
              Institute
            </td>
          </tr>
          <tr class="small-text">
            <td>GFDL-ESM4</td>
            <td>
              National Oceanic and Atmospheric Administration, Geophysical Fluid
              Dynamics Laboratory
            </td>
          </tr>
          <tr class="small-text">
            <td>HadGEM3-GC31-LL</td>
            <td>Met Office Hadley Centre for Climate Science and Services</td>
          </tr>
          <tr class="small-text">
            <td>HadGEM3-GC31-MM</td>
            <td>Met Office Hadley Centre for Climate Science and Services</td>
          </tr>
          <tr class="small-text">
            <td>KACE-1-0-G</td>
            <td>
              National Institute of Meteorological Sciences/Korea Meteorological
              Administration, Climate Research Division
            </td>
          </tr>
          <tr class="small-text">
            <td>MIROC6</td>
            <td>
              Japan Agency for Marine-Earth Science and Technology; Atmosphere
              and Ocean Research Institute, The University of Tokyo; National
              Institute for Environmental Studies; RIKEN Center for
              Computational Science
            </td>
          </tr>
          <tr class="small-text">
            <td>MPI-ESM1-2-LR</td>
            <td>Max Planck Institute for Meteorology</td>
          </tr>
          <tr class="small-text">
            <td>NorESM2-MM</td>
            <td>NorESM Climate Modeling Consortium</td>
          </tr>
          <tr class="small-text">
            <td>TaiESM1</td>
            <td>Research Center for Environmental Changes, Academia Sinica</td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="activeTab === 'scenarios'">
      <div class="content is-size-5">
        <table>
          <tr class="header-text">
            <th>SSP</th>
            <th>Description</th>
          </tr>
          <tr></tr>
          <tr class="small-text">
            <td>SSP126</td>
            <td>
              This pathway represents a sustainable world where global
              population peaks around 2050 and declines thereafter, leading to
              rapid improvements in education, health, and economic development.
              It emphasizes low material consumption, reduced greenhouse gas
              emissions, and efficient resource use. Policies prioritize
              environmental sustainability, social equity, and international
              cooperation. Renewable energy sources dominate the energy mix, and
              technologies for carbon dioxide removal are widely deployed to
              achieve net-negative emissions by the end of the century.
            </td>
          </tr>
          <tr class="small-text">
            <td>SSP245</td>
            <td>
              SSP245 depicts a future where the world follows a moderate path of
              development with uneven progress across regions. Population growth
              continues, albeit at a slower pace, and income inequality
              persists. Economic growth is driven by a combination of fossil
              fuels and renewable energy sources, resulting in moderate
              increases in greenhouse gas emissions. Technological progress is
              moderate, and adaptation measures are implemented to address
              climate change impacts. International cooperation varies, with
              some efforts to mitigate emissions but limited success in
              achieving ambitious climate targets.
            </td>
          </tr>
          <tr class="small-text">
            <td>SSP370</td>
            <td>
              In this scenario, the world experiences a fragmented and
              regionalized future characterized by high population growth, slow
              economic development in some regions, and geopolitical tensions.
              Fossil fuels remain the dominant energy source, leading to
              substantial greenhouse gas emissions and environmental
              degradation. Efforts to address climate change are hindered by
              geopolitical conflicts, limited international cooperation, and
              inadequate mitigation policies. Adaptation measures are primarily
              reactive and insufficient to prevent significant climate impacts,
              resulting in widespread vulnerabilities and disruptions.
            </td>
          </tr>
          <tr class="small-text">
            <td>SSP585</td>
            <td>
              SSP585 represents a future where the world pursues a pathway of
              high fossil fuel use and rapid economic growth, leading to
              continued population growth and increasing demand for energy and
              resources. Despite technological advancements, efforts to mitigate
              greenhouse gas emissions are limited, resulting in a high-forcing
              scenario with extensive climate change impacts. Environmental
              degradation, biodiversity loss, and social inequalities escalate,
              exacerbating global challenges. Adaptation measures are reactive
              and often inadequate, leading to significant disruptions and
              irreversible damage to ecosystems and societies.
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="activeTab === 'variables'">
      <div class="content is-size-5">
        <table>
          <tr>
            <th scope="col" class="variable">Variable</th>
            <th scope="col">Temporal frequency</th>
          </tr>
          <tr>
            <td>Near surface air temperature (tas)</td>
            <td>Monthly, daily</td>
          </tr>
          <tr>
            <td>Maximum near surface air temperature (tasmax)</td>
            <td>Monthly, daily</td>
          </tr>
          <tr>
            <td>Minimum near surface air temperature (tasmin)</td>
            <td>Monthly, daily</td>
          </tr>
        </table>
      </div>
    </div>

</section>
<section class="section">
    <h3 id="technical-information" class="title is-3">Technical information</h3>

    <div id="acdn" class="block clamp">
      <h4 class="title is-4">Arctic Climate Data Node (ACDN)</h4>
      <div class="content is-size-5">
        <p>
          The ACDN operates as a robust storage infrastructure employing BeeGFS,
          a distributed file system technology. This setup ensures swift access
          to object storage servers via a blazing-fast 100 Gb/s network.
          Leveraging the ample storage capacity of this system, SNAP can
          efficiently store, regrid, and bias-correct data pertinent to the
          state of Alaska. Future endeavors include
          <a
            href="https://www.sciencedirect.com/science/article/pii/S1364815217305662"
            >downscaling the model data to higher resolutions</a
          >
          across Alaska's expanse and crafting additional climate indicators,
          beyond the current offerings of summer days, winter days, maximum
          1-day precipitation, and freeze/thaw cycles.
        </p>
      </div>
    </div>

    <div id="rasdaman" class="block clamp">
      <h4 class="title is-4">Rasdaman, an array database</h4>
      <div class="content is-size-5">
        <p>
          Rasdaman is an open&ndash;source software for managing massive arrays
          of multi&ndash;dimensional data, primarily used in scientific and
          geospatial applications. It&rsquo;s designed to efficiently store,
          retrieve, and analyze large&ndash;scale raster data, such as satellite
          imagery, climate data, and simulations.
        </p>
        <p>
          One of Rasdaman&rsquo;s key features is its ability to handle
          multi&ndash;dimensional data sets, enabling users to store and query
          data along multiple axes, such as time, space, and spectral
          dimensions. It supports a wide range of data formats and provides
          powerful query capabilities for extracting specific subsets of data or
          performing complex analyses directly within the database.
        </p>
        <p>
          Learn more at: <a href="https://rasdaman.org">https://rasdaman.org</a>
        </p>

        <p>
          Users can quickly access CMIP6 data using SNAP&rsquo;s Rasdaman server
          and WCS, WCPS, or WMS queries. For example, the WCS query below
          returns a subset of the multidimensional CMIP6 data in NetCDF format
          that can be processed in various environments:
        </p>

        <p>
          Data can be analyzed and visualized directly from the WCS response,
          e.g.:
        </p>
        <img
          src="/assets/images/mean_june_air_temperature.png"
          alt="Mean June Air Temperature"
        />
        <p>
          Many of SNAP&rsquo;s datasets are available as Rasdaman coverages. See
          <a href="#replacethis">this notebook</a> for a tutorial on how to use
          these services in your own work.
        </p>
      </div>
    </div>

    <div id="globus" class="block clamp">
      <h4 class="title is-4">Globus</h4>
      <div class="content is-size-5">
        <p>
          Globus is a secure, reliable, and scalable data management platform
          that enables researchers to easily move, share, and analyze large
          volumes of data. It provides a user-friendly interface for
          transferring data between storage systems, sharing data with
          collaborators, and automating data workflows. Globus&rsquo; powerful
          data management capabilities make it an ideal solution for researchers
          working with large datasets, such as CMIP6 climate model data.
        </p>
        <p>
          Users equipped with a Globus account can seamlessly navigate the ACDN
          file storage system to retrieve data, transferring it to any system
          where they hold a Globus account. This encompasses an array of major
          national laboratories furnished with supercomputing capabilities.
        </p>
        <p>
          Learn more at:
          <a href="https://www.globus.org">https://www.globus.org</a>
        </p>
      </div>
    </div>

    <Bios :people="['Scott Rupp', 'Nancy Fresco']" />

  </section>
</template>

<style scoped lang="scss">
table {
  th[scope='col'] {
    &.model,
    &.variable {
      width: 20rem;
    }
  }
}
figure {
  figcaption {
    float: left;
  }
}
</style>
