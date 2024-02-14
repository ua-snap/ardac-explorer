export default [
  {
    slug: 'future-precipitation-map',
    image: '/previews/data-preview-1.png',
    imageAlt: 'A Map',
    title: 'Future precipitation map &amp; web services',
    blurb: `See statewide precipitation maps and access web services (WMS) that can be used in your own GIS applications.`,
    tags: ['Precipitation', 'WMS', 'Map', 'Visualization', 'GIS'],
  },
  {
    slug: 'degree-days-projected-statewide',
    image: '/previews/data-preview-2.png',
    imageAlt: 'A Map',
    title: 'Degree days, projected statewide',
    blurb: `Explore climate projections used to derive future heating, freezing and thawing degree days across Alaska, as well as direct access to source data.`,
    tags: ['Degree days', 'WMS', 'Visualization', 'GIS'],
  },
  {
    slug: 'flammability-vegetation-current-conditions',
    image: '/previews/data-preview-3.png',
    imageAlt: 'A Map',
    title: 'Flammability, vegetation, current conditions',
    blurb: `Historical and projected flammability and vegetation model output, with adjacent indicators updated daily.  See a map and access data layers.`,
    tags: [
      'Wildfire',
      'Vegetation',
      'Lightning',
      'WMS',
      'Visualization',
      'Map',
    ],
  },
  {
    slug: 'northern-climate-reports',
    image: '/previews/ncr-preview.png',
    imageAlt: 'logo for northern climate reports website',
    title: 'Northern Climate Reports',
    blurb: `See charts, maps and tables of climate data for Alaska and parts of Western Canada.`,
    tags: [
      'Wildfire',
      'Vegetation',
      'Lightning',
      'WMS',
      'Visualization',
      'Map',
    ],
  },
  {
    slug: 'historical-sea-ice-atlas',
    image: '/previews/data-preview-4.png',
    imageAlt: 'logo for northern climate reports website',
    title: 'Historical Sea Ice Atlas',
    blurb: `Interactive application for viewing sea ice extent and concentration, 1850&ndash;2022.`,
    tags: ['Tool', 'Sea Ice'],
  },
  {
    slug: 'era-access-cds-api',
    image: '/previews/data-preview-6.png',
    imageAlt: 'logo for northern climate reports website',
    title: 'ERA5 access via the CDS API',
    blurb: `The Climate Data Store run by the European Center for Medium-Range Weather Forecasts provides an API and Python package for accessing ERA datasets.`,
    tags: ['Code', 'Notebook'],
  },
  {
    slug: 'arctic-eds',
    title: 'Arctic Engineering Design and Decision Support Tool (Arctic-EDS)',
    blurb: `Access data to support Arctic engineering: climate model outputs aggregated for easy access and integration into engineering workflows.`,
    tags: [
      'Tool',
      'Temperature',
      'Permafrost',
      'Hydrology',
      'Snow',
      'Precipitation',
      'Degree Days',
    ],
  },
  {
    slug: 'permafrost-observations-modeled-air-temp',
    title:
      'Permafrost Observations with Modeled Historical Air Temperature Data',
    blurb: `This notebook demonstrates how to take a set of monthly observations at a known sampling location and query the SNAP Data API for modeled historical monthly data at that location.`,
    tags: ['Temperature', 'Permafrost', 'Notebook'],
  },
  {
    slug: 'querying-daymet-daily-precipitation',
    image: '/previews/data-preview-5.png',
    imageAlt: 'temp map of alaska',
    title:
      'Querying Daymet precipitation data using the SNAP Data API',
    blurb: `In this notebook, we demonstrate a method for fetching a polygon of interest from the SNAP Data API and then using this polygon's bounding box to subset Daymet daily precipitation data.`,
    tags: ['Code', 'Notebook', 'Precipitation'],
  },
  {
    slug: 'modeled-future-flammability',
    title: `Modeled future flammability and vegetation.`,
    blurb: 'Get data for future flammability and vegetation',
    tags: ['API', 'Flammability', 'Vegetation'],
  },
  {
    slug: 'historical-nrt-wildfire',
    blurb:
      'Get information for historical fire burns and recent wildfire-related conditions',
    title: `Historical + near-real-time <a href="https://earthmaps.io/fire/" >wildfire and related research data</a>`,
    tags: ['API', 'Wildfire'],
  },
  {
    slug: 'projected-permafrost-and-magt',
    image: '/previews/projected-permafrost-and-magt.png',
    title: 'Projected permafrost and mean annual ground temperature',
    blurb: `Download projections of permafrost top and base depths, talik thickness, and mean annual ground temperature at seven different depths for years 2021–2120.`,
    tags: ['API', 'Permafrost'],
  },
  {
    type: 'general',
    slug: 'precipitation-frequency-chart',
    title: 'Precipitation frequency chart',
    blurb: `View a chart of projected precipitation frequency using data from the SNAP Data API.`,
    tags: ['API'],
  },
  {
    type: 'general',
    slug: 'temperature-chart',
    title: 'Temperature chart',
    blurb: `View a chart of historical modeled and projected temperature using data from the SNAP Data API.`,
    tags: ['API'],
  },
  {
    type: 'general',
    slug: 'precipitation-chart',
    title: 'Precipitation chart',
    blurb: `View a chart of historical modeled and projected precipitation using data from the SNAP Data API.`,
    tags: ['API'],
  },
  {
    type: 'general',
    slug: 'heating-degree-days-chart',
    title: 'Heating degree days chart',
    blurb: `View a chart of historical modeled and projected heating degree days using data from the SNAP Data API.`,
    tags: ['API'],
  },
  {
    type: 'general',
    slug: 'freezing-index-chart',
    title: 'Freezing index chart',
    blurb: `View a chart of historical modeled and projected freezing index using data from the SNAP Data API.`,
    tags: ['API'],
  },
  {
    type: 'general',
    slug: 'thawing-index-chart',
    title: 'Thawing index chart',
    blurb: `View a chart of historical modeled and projected thawing index using data from the SNAP Data API.`,
    tags: ['API'],
  },
  {
    type: 'general',
    slug: 'very-cold-day-threshold-chart',
    title: 'Very cold day threshold chart',
    blurb: `View a chart of historical modeled and projected very cold day threshold using data from the SNAP Data API.`,
    tags: ['API'],
  },
  {
    type: 'general',
    slug: 'very-hot-day-threshold-chart',
    title: 'Very hot day threshold chart',
    blurb: `View a chart of historical modeled and projected very hot day threshold using data from the SNAP Data API.`,
    tags: ['API'],
  },
  {
    type: 'general',
    slug: 'summer-days-chart',
    title: 'Summer days chart',
    blurb: `View a chart of historical modeled and projected summer days using data from the SNAP Data API.`,
    tags: ['API'],
  },
  {
    type: 'general',
    slug: 'deep-winter-days-chart',
    title: 'Deep winter days chart',
    blurb: `View a chart of historical modeled and projected deep winter days using data from the SNAP Data API.`,
    tags: ['API'],
  },
  {
    type: 'general',
    slug: 'warm-spell-duration-index-chart',
    title: 'Warm spell duration index chart',
    blurb: `View a chart of historical modeled and projected warm spell duration index using data from the SNAP Data API.`,
    tags: ['API'],
  },
  {
    type: 'general',
    slug: 'cold-spell-duration-index-chart',
    title: 'Cold spell duration index chart',
    blurb: `View a chart of historical modeled and projected cold spell duration index using data from the SNAP Data API.`,
    tags: ['API'],
  },
]
