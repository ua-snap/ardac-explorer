<script lang="ts" setup>
const placesStore = usePlacesStore()
const dataStore = useDataStore()

const { $Plotly, $_ } = useNuxtApp()
import type { Data } from 'plotly.js-dist-min'

const apiData = computed<Record<string, any>>(() => dataStore.apiData)
const latLng = computed<LatLngValue>(() => placesStore.latLng)
const selectedCommunity = computed<CommunityValue>(
  () => placesStore.selectedCommunity
)

let historicalYears = $_.range(1901, 2006 + 1)

const buildChart = () => {
  if (apiData.value) {
    let dataByScenario: number[][] = []
    let stripeData: number[] = []
    historicalYears.forEach((year: any) => {
      let temperature = apiData.value['CRU-TS']['historical'][year]['tas']
      stripeData.push(temperature)
    })
    dataByScenario.push(stripeData)

    let minValue = $_.min(stripeData)
    let maxValue = $_.max(stripeData)
    let range = maxValue - minValue
    let redPoint = (maxValue - minValue) / range
    let whitePoint = redPoint / 2

    // Create hover labels for each data point and pass them into the chart
    // using the "customdata" property.
    let dataLabels: string[][] = []
    for (let i = 0; i < dataByScenario.length; i++) {
      dataLabels[i] = []
      for (let j = 0; j < dataByScenario[i].length; j++) {
        let year = j + 1901
        dataLabels[i][j] =
          'Year: ' +
          year +
          '<br />Mean Annual Temperature: ' +
          dataByScenario[i][j] +
          '°C'
      }
    }

    // Reverse arrays so they are ordered correctly on chart.
    dataByScenario = dataByScenario.reverse()
    dataLabels = dataLabels.reverse()

    let plotData = [
      {
        x: $_.range(1901, 2100 + 1),
        z: dataByScenario,
        type: 'heatmap',
        colorscale: [
          [0, 'rgb(3,67,223)'],
          [whitePoint, 'rgb(255,255,255)'],
          [1, 'rgb(255,0,0)'],
        ],
        showscale: false,
        hovertemplate: '%{customdata}',
        xhoverformat: '.0f',
        hoverlabel: {
          namelength: 0,
        },
        customdata: dataLabels,
      } satisfies Data,
    ]

    let titleText = 'Modeled mean annual temperature for '
    if (selectedCommunity.value && selectedCommunity.value.name) {
      titleText +=
        selectedCommunity.value.name + ', ' + selectedCommunity.value.region
    } else {
      titleText += latLng.value?.lat + ', ' + latLng.value?.lng
    }
    titleText += '<br />Model: CRU TS 4.0'

    $Plotly.newPlot(
      'chart',
      plotData,
      {
        title: {
          text: titleText,
          font: {
            size: 24,
          },
          y: 0.9,
          yanchor: 'top',
        },
        xaxis: {
          showgrid: false,
          fixedrange: true,
        },
        yaxis: {
          showgrid: false,
          fixedrange: true,
          ticklen: 0,
          showticklabels: false,
        },
        height: 500,
        margin: {
          t: 110,
          b: 50,
          l: 50,
          r: 50
        },
      },
      {
        responsive: true, // changes the height / width dynamically for charts
        displayModeBar: true, // always show the camera icon
        displaylogo: false,
        modeBarButtonsToRemove: [
          'zoom2d',
          'pan2d',
          'select2d',
          'lasso2d',
          'zoomIn2d',
          'zoomOut2d',
          'autoScale2d',
          'resetScale2d',
        ],
        toImageButtonOptions: {
          filename: 'climate_stripes',
        },
      }
    )
  }
}

watch(latLng, async () => {
  $Plotly.purge('chart')
  dataStore.apiData = null
  dataStore.fetchData('meanAnnualTemperature')
})

watch([apiData], async () => {
  buildChart()
})

onUnmounted(() => {
  dataStore.apiData = null
})
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Climate Stripes: Understanding Variability and Scale</h3>
      <p class="mb-6"></p>
      <p>Climate stripes. Warming stripes. Color bars. You’ve seen them on walls and on stickers and on shirts and protest signs but….</p>
      <h4>What are they and where do they come from?</h4>
      <p>
        <img src="assets/images/ClimateStripesStory1/ClimateStripesCollage.png">
      <p>The graphic is a great example of convergent ideas with two scientists at the University of Reading and another at the University of Georgia seemingly independently coming up with the idea. Here at the University of Alaska Fairbanks climate scientist Rick Thoman has been using them to tell stories about climate for years.</p>
      <p>In these data visualizations each stripe represents a year, with the color of the bar determined by the average temperature for that year. Typically this is the average temperature for the year at 2m elevation, or just over average head height. The stripes are colored with the darkest blue for the coldest year in that location, to the brightest red for the hottest year in that location.</p>
      <p>Put it on a sticker or a wall and there you go. An arresting data visualization of temperature. The world’s getting warmer. But what else can we learn from these stripes by looking just a tiny bit deeper?</p>

      </p>
      <h4>Similar trends are apparent over different temperature ranges</h4>
      <p>
        <p>Here’s a climate stripes graphic using gridded modeled historical data for Utqiagvik, the northernmost community in the United States on the north slope of Alaska:</p>

        <img src="assets/images/ClimateStripesStory1/Utqiagvik Climate Stripes 2022.png">

<p>And here are the climate stripes for Metlakatla, Alaska using the same historical dataset:</p>

<img src="assets/images/beetle_voltinism.png">

<p>Mean annual temperatures in Utqiagvik are around -10°C (15°F) while in Metlakatla, the southernmost community in the state near the border with British Columbia, the annual average temperature is closer to +10C (50°F). The common color palette across very different places, with different baseline climates, allows us to compare warming trends easily across latitudes and climates.</p>

<p>Looking across the world we can see that this means that in spite of their different climate both Maine and Arizona are warming, though this means different things for each place: </p>
<p>less snow for snow-machining in Maine...</p><img src="assets/images/ClimateStripesStory1/ME-tavg.png">
<p> ...and possible water scarcity in Arizona...</p><img src="assets/images/ClimateStripesStory1/AZ-tavg.png">

      </p>

      <h4>Year-to-year variation is obvious, but trends are pronounced</h4>

      <p>Okay okay, let’s stick closer to home. Alaska’s state capitol, Juneau, is a very neat but also pretty weird place. Off the road system, the state’s 3rd largest city is surrounded by mountains, islands, and America’s largest national forest. Here are the climate stripes for Juneau:</p>
      <img src="assets/images/ClimateStripesStory1/Juneau Climate Stripes 2022.png">
      <p>The variation of local weather is obvious across these stripes. This deep blue line represents 1972, the coldest year in the record with an average annual temperature of just 3.7°C (39°F). The warmest year though, is the most recent for this data…2017.</p>
      <p>Overall though the trend is clear. Some warmer than average years do exist in the beginning of the record and a few colder than average years occurred more recently, but overall a trend toward more red and less blue is obvious across the stripes. Year to year variability can be caused by specific storm patterns, recurring cycles like el nino, or just plain chance. Understanding this variability is key to understanding why climate science comes with ranges and variability built in.</p>
      <p>The world is messy and our data should reflect that.</p>

      <h4>Variation is smoothed by scale</h4>
      <p>As humans we’re only ever in one place at any given time, so the climate stripes of your home community feel powerful. You remember that warm year with no snow, or that frigid year that drove up your heating bill. This is powerful, but data also allows us to expand beyond the single point and understand our local climate in the context of the trends at broader scales.</p>
      <p>288,000 Alaskans live in our largest city, Anchorage. Here’s what the climate stripes for the City and Borough of Anchorage look like:</p>
      <img src="assets/images/beetle_voltinism.png">
      <p>But most folks who know the state will tell you that Anchorage is part of a broader ‘suburban core’ in the south-central part of Alaska. While it can be hard to draw precise lines around the “Greater Anchorage Area” we’ll expand out using a climatological perspective.</p>
      <img src="assets/images/ClimateStripesStory1/CookInletMap.png">
      <p>The “Cook Inlet Climate Division” encompasses most of the larger towns of the area including Soldotna, Wasilla, Palmer, and Homer. All told, this region covers the Matanuska-Susitna Valley and the northern half of the Kenai Peninsula hemmed in by mountains on three sides and with its local climate dominated by the moderating waters of the Cook Inlet.</p>
      <p>Here’s what the climate stripes for this area with a population of over 400,000, well over half the state, looks like:</p>
      <img src="assets/images/beetle_voltinism.png">
      <p>Local weather and unique climates can seriously affect how climate change in these stripes look at the community level. A loss of sea ice cover or a shortening winter snow cover season may amplify the change.</p>
      <p>Let’s zoom out further. Here are the climate stripes for the state of Alaska, from Attu to Kaktovik to Sitka to Kodiak and all:</p>
      <img src="assets/images/ClimateStripesStory1/Alaska Climate Stripes 2022 (1).png">
      <p>As you can see, an even wider area means an even greater smoothing of the trends. As we consider a broader area, the local impacts of rivers, elevation, mountain ranges, proximity to the ocean, and other factors get averaged out. At these wider scales fewer years stand out and the stripes begin to look more like a slow but steady march from blue to red reflecting the broader climate’s warming trends. </p>
      <p>For good measure let’s take a peek at the stripes for the entire circumpolar Arctic:</p>
      <img src="assets/images/ClimateStripesStory1/Arctic Climate Stripes 2022 (1).png">
      <p>The Arctic is warming faster than any other area of the globe so it’s not surprising to see things looking this clear. At this scale the last colder-than-average year in the Arctic was 1992.</p>
      <p>And as we look at the stripes for the globe:</p>
      <img src="assets/images/ClimateStripesStory1/GLOBE---1850-2023-MO.png">
      <p>The trend dominates the graphic. We got these non-Arctic stripes from <a href="https://showyourstripes.info">another tool</a> by the way. We don't handle global data.</p>

      <h4>The power, and shortcomings, of a good climate graphic</h4>
      <p>Overall the Climate Stripes graphics for points and for regions are a powerful tool. They are (mostly) colorblind-friendly and show clearly and obviously the facts of climate change: the trend toward a warmer climate is both clear and striking.</p>
      <p>It also allows people to see the effect in their specific place.</p>
      <p>My Region</p>
      <img src="assets/images/ClimateStripesStory1/ArcticStripesWaterisStripes.png">
      <p>My State</p>
      <img src="assets/images/ClimateStripesStory1/AKStripesAKShaped.png">
      <p>My City</p>
      <img src="assets/images/ClimateStripesStory1/Fairbanks Climate Stripes 2022.png">
      <p></p>
      <Gimme label="Get climate stripes for a community or by lat/long:" class="mt-5" />
      <div id="chart" class="mb-5"></div>
      <p>But there are shortcomings. If you want to know the precise values of any given year from these stripes you’ll have to dive into the data behind it, and a less clear trend in one specific area can be improperly generalized without the right context.</p>
      <p>Additionally these stripes typically only display historical data, so they don’t offer insights into   the possible futures in a given place.</p>
      <p>Unless….</p>
      <p>With just a few tweaks, they can do precisely that. Read this DataStory to use what you’ve learned about the climate stripes to understand RCPs, SSPs, and our possible climate futures.</p>
      <p>Also, do you wish you had your own climate stripes for your part of Alaska? Maybe your home town, your hunting spot, your ethnolinguistic region, or your lifelong favorite hydrological unit code level 10? (ours is 1908040302) This JupyterNotebook will help you do just that!</p>

    </div>
    <Bios :people="['Mike DeLue']" />
    </section>
    </template>