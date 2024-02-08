export default [
  {
    
    slug: 'future-precipitation-map',
    image: '/previews/data-preview-1.png',
    imageAlt: 'A Map',
    title: 'Future precipitation map &amp; web services',
    blurb: `See <a href="">statewide precipitation maps</a> and access web services (WMS) that can be used in your own GIS applications.`,
    tags: ['Precipitation', 'WMS', 'Map', 'Visualization', 'GIS'],
    fullView: ``,
  },
  {
    
    image: '/previews/data-preview-2.png',
    imageAlt: 'A Map',
    title: 'Degree days, projected statewide',
    blurb: `Explore climate projections used to derive <a href="">future heating, freezing and thawing degree days</a> across Alaska.`,
    tags: ['Degree days', 'WMS', 'Visualization', 'GIS'],
  },
  {
    
    image: '/previews/data-preview-3.png',
    imageAlt: 'A Map',
    title: 'Flammability, vegetation, current conditions',
    blurb: `Historical and projected flammability and vegetation model output, with adjacent indicators updated daily.  <a href="">See a map and access data layers.</a>`,
    tags: [
      'Wildfire',
      'Vegetation',
      'Lightning',
      'WMS',
      'Visualization',
      'Map',
    ],
    priority: 2,
  },
  {
    priority: 1,
    
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
    
    image: '/previews/data-preview-4.png',
    imageAlt: 'logo for northern climate reports website',
    title: 'Historical Sea Ice Atlas',
    blurb: `Interactive application for viewing sea ice extent and concentration, 1850&ndash;2022.`,
    tags: ['Tool', 'Sea Ice'],
  },
  {
    
    image: '/previews/data-preview-6.png',
    imageAlt: 'logo for northern climate reports website',
    title: 'ERA5 access via the CDS API',
    blurb: `The Climate Data Store run through the European Center for Medium-Range Weather Forecasts provides a great API and associated python package for accessing the eight different ERA5 datasets they host. This notebook will demonstrate using this API to retrieve some of this data, which can then be combined with data from ARDAC for analysis.`,
    tags: ['Code', 'Notebook'],
  },
  {
    priority: 1,
    
    title: 'Arctic Engineering Design and Decision Support Tool (Arctic-EDS)',
    blurb: `Access data to support Arctic engineering: climate model outputs aggregated for easy access and integration into engineering workflows.  Download data subsets for communities and points across Alaska, and see data summaries and aggregation for near- to late-century model outputs.`,
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
    
    title:
      'Permafrost Observations with Modeled Historical Air Temperature Data',
    blurb: `This notebook demonstrates how to take a set of monthly observations at a known sampling location and query the SNAP Data API for modeled historical monthly data at that location. In this example, CALM active layer thickness (ALT) observations made at the "Imnavait Creek WET" site (U11B: 68.611, -149.3145) in the month of August are paired with CRU-TS 4.0 mean August air temperature data accessed via the SNAP Data API. (References for these datasets are included at the bottom of this notebook.)`,
    tags: ['Temperature', 'Permafrost', 'Notebook'],
  },
  {
    type: 'featured',
    slug: 'querying-daymet-daily-precipitation',
    image: '/previews/data-preview-5.png',
    imageAlt: 'temp map of alaska',
    title:
      'Querying Daymet daily precipitation data using polygons from the SNAP Data API',
    blurb: `In this notebook, we demonstrate a method for fetching a polygon of interest from the SNAP Data API and then using this polygon's bounding box to subset Daymet daily precipitation data. By only querying the Daymet data in our immediate area of interest, we avoid downloading the complete dataset and having to process it locally.`,
    tags: ['Code', 'Notebook', 'Precipitation'],
  },
  {
    type: 'brief',
    title: `Modeled <a href="https://earthmaps.io/alfresco/">future flammability and vegetation</a>`,
    tags: ['API', 'Flammability', 'Vegetation'],
  },
  {
    type: 'brief',
    title: `Historical + near-real-time <a href="https://earthmaps.io/fire/" >wildfire and related research data</a>`,
    tags: ['API', 'Wildfire'],
  },
  {
    
    slug: 'projected-permafrost-and-magt',
    image: '/previews/projected-permafrost-and-magt.png',
    title: 'Projected permafrost and mean annual ground temperature',
    blurb: `Download projections of permafrost top and base depths, talik thickness, and mean annual ground temperature at seven different depths for years 2021–2120, provided by the Geophysical Institute Permafrost Lab (GIPL 2.0) model.`,
    tags: ['API', 'Permafrost'],
  },
]
