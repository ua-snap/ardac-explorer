export default [
  {
    slug: 'indicator-ftc',
    title: 'Freeze/Thaw Cycle',
    blurb:
      'Annual count of days with low temperature below freezing and high temps above freezing.',
    tags: ['Climate'],
  },
  {
    slug: 'indicator-rx1day',
    title: 'Maximum 1-day Precipitation',
    blurb: 'Maximum precipitation in a single calendar year.',
    tags: ['Climate', 'Precipitation'],
  },
  {
    slug: 'indicator-rx5day',
    title: 'Maximum 5–day precipitation',
    blurb: 'Maximum precipitation total for any 5-day period',
    tags: ['Climate', 'Precipitation'],
  },
  {
    slug: 'indicator-su',
    title: 'Summer Days',
    blurb: 'Annual count when daily max temperature (threshold) >25°C',
    tags: ['Climate'],
  },
  {
    slug: 'indicator-dw',
    title: 'Deep Winter Days',
    blurb: 'Annual count when daily min temperature (threshold) <-30°C',
    tags: ['Climate'],
  },
  {
    slug: 'indicator-hd',
    title: 'Hot Day Threshold',
    blurb:
      'The highest observed daily maximum 2 m air temperature such that there are 5 other observations equal to or greater than this value.',
    tags: ['Climate'],
  },
  {
    slug: 'indicator-cd',
    title: 'Cold Day Threshold',
    blurb:
      'The lowest observed daily minimum 2 m air temperature such that there are 5 other observations equal to or less than this value.',
    tags: ['Climate'],
  },
  {
    slug: 'indicator-wsdi',
    title: 'Warm Spell Duration Index',
    blurb:
      'Annual count of occurrences of at least 5 consecutive days with daily mean 2 m air temperature above 90th percentile of historical values for the date',
    tags: ['Climate'],
  },
  {
    slug: 'indicator-cdsi',
    title: 'Cold Spell Duration Index',
    blurb:
      'Annual count of occurrences of at least 5 consecutive days with daily mean 2 m air temperature below 10th percentile of historical values for the date',
    tags: ['Climate'],
  },
  {
    slug: 'indicator-r10mm',
    title: 'Heavy Precipitation Days',
    blurb: 'Number of days with ≥ 10mm precipitation',
    tags: ['Climate', 'Precipitation'],
  },
  {
    slug: 'indicator-cwd',
    title: 'Consecutive wet days',
    blurb: 'Number of the most consecutive days with precipitation > 1 mm',
    tags: ['Climate', 'Precipitation'],
  },
  {
    slug: 'indicator-cdd',
    title: 'Consecutive dry days',
    blurb: 'Number of the most consecutive days with precipitation < 1 mm',
    tags: ['Climate', 'Precipitation'],
  },
  {
    slug: 'hydrology-evap',
    title: 'Evapotranspiration',
    blurb: 'Monthly sum of daily evapotranspiration',
    tags: ['Climate', 'Hydrology'],
  },
  {
    slug: 'hydrology-glacier-melt',
    title: 'Glacier Melt',
    blurb: 'Monthly sum of daily glacier ice melt',
    tags: ['Climate', 'Hydrology'],
  },
  {
    slug: 'hydrology-iwe',
    title: 'Ice Water Equivalent',
    blurb: 'Monthly maximum daily ice water equivalent',
    tags: ['Climate', 'Hydrology'],
  },
  {
    slug: 'hydrology-runoff',
    title: 'Runoff',
    blurb: 'Monthly sum of daily surface runoff',
    tags: ['Climate', 'Hydrology'],
  },
  {
    slug: 'hydrology-swe',
    title: 'Snow Water Equivalent',
    blurb: 'Monthly maximum of daily snow water equivalent',
    tags: ['Climate', 'Hydrology'],
  },
  {
    slug: 'hydrology-sm',
    title: 'Soil Moisture',
    blurb: 'Monthly mean of daily soil moisture in layers 1-3',
    tags: ['Climate', 'Hydrology'],
  },
  {
    slug: 'hydrology-snow-melt',
    title: 'Snow Melt',
    blurb: 'Monthly sum of daily snowmelt',
    tags: ['Climate', 'Hydrology'],
  },
  {
    slug: 'landfast-sea-ice',
    title: 'Landfast Sea Ice Extent',
    blurb:
      'Historical daily landfast ice extent information for the Alaska coastline',
    tags: ['Cryosphere'],
  },
  {
    slug: 'communities',
    title: 'Places & Polygons',
    blurb: 'Names, coordinates, and boundaries to integrate with other data',
    tags: ['GIS'],
  },
  {
    slug: 'permafrost-magt',
    title: 'Ground Temperature',
    blurb: 'Mean annual ground temperature value, surface - 5m',
    tags: ['Climate', 'Permafrost'],
  },
  {
    slug: 'permafrost-base-top',
    title: 'Permafrost Depth: Base & Top',
    blurb: '',
    tags: ['Climate', 'Permafrost'],
  },
  {
    slug: 'permafrost-talik',
    title: 'Talik Thickness',
    blurb: 'Thickness of permafrost talik layer',
    tags: ['Climate', 'Permafrost'],
  },
  {
    slug: 'wet-days-per-year',
    title: 'Wet Days Per Year',
    blurb:
      'Number of days per calendar year where the total precipitation amount is ≥ 1.0 mm',
    tags: ['Climate'],
  },
  {
    slug: 'sea-ice-concentration',
    title: 'Sea Ice Concentration',
    blurb:
      'Monthly pan-Arctic sea ice concentration data at a resolution of approximately 17.1km for years 1850–2021',
    tags: ['Cryosphere'],
  },
  {
    slug: 'climate-beetle-protection',
    title: 'Climate Protection from Spruce Beetles',
    blurb: 'Level to which climate protects against spruce beetle outbreaks',
    tags: ['Climate', 'Terrestrial'],
  },
  {
    slug: 'dd-below-65',
    title: 'Degree Days Below 65°F',
    blurb: 'Total annual cumulative degree days below 65°F',
    tags: ['Climate'],
  },
  {
    slug: 'dd-below-0',
    title: 'Degree Days Below 0°F',
    blurb: 'Total annual cumulative degree days below 0°F',
    tags: ['Climate'],
  },
  {
    slug: 'thawing-index',
    title: 'Thawing Index',
    blurb: 'Total annual cumulative degree days above 32°F',
    tags: ['Climate'],
  },
  {
    slug: 'freezing-index',
    title: 'Freezing Index',
    blurb: 'Total annual cumulative degree days below 32°F',
    tags: ['Climate'],
  },
  {
    slug: 'elevation',
    title: 'Elevation',
    blurb: 'ASTER GDEM elevation data for Alaska and Western Canada',
    tags: ['Terrestrial'],
  },
  {
    slug: 'alfresco-flammability',
    title: 'Flammability',
    blurb: 'Modeled flammability derived from ALFRESCO simulations',
    tags: ['Terrestrial', 'Wildfire'],
  },
  {
    slug: 'alfresco-vegetation',
    title: 'Vegetation Type',
    blurb: 'Modeled vegetation type derived from ALFRESCO simulations',
    tags: ['Terrestrial', 'Wildfire'],
  },
  {
    slug: 'notebook-perm-obs-temp',
    title: 'Combining Permafrost Observations with Climate Data',
    blurb:
      'Code example of how to combine sampled permafrost and modeled historical monthly temperature data',
    tags: ['Climate', 'Permafrost', 'Programming'],
  },
  {
    slug: 'notebook-precip-poly',
    title: 'Daily Precipitation Summary, By Polygon',
    blurb:
      "Demonstration of fetching a polygon of interest and then using this polygon's bounding box to subset Daymet daily precipitation data",
    tags: ['Precipitation', 'Programming'],
  },
  {
    slug: 'notebook-era5-cds-api',
    title: 'ERA5 access via the CDS API',
    blurb: 'Learn to download ERA5 data via Python programming',
    tags: ['Temperature', 'Programming'],
  },
  {
    slug: 'notebook-fmz-flammability',
    title: 'Modeled Flammability by Fire Management Zone',
    blurb:
      'Demonstration of how to query fire management zone polygons and modeled flammability within those polygons',
    tags: ['Terrestrial', 'Programming'],
  },
  {
    slug: 'notebook-corporation-hdd',
    title: 'Heating Degree Days by Alaska Native Corporation',
    blurb:
      'Demonstration of how to query Alaska Native Corporation polygons, Alaska communities, and modeled heating degree days',
    tags: ['Climate', 'Programming'],
  },
  {
    slug: 'notebook-sea-ice-traffic',
    title: 'Marine Vessel Traffic and Sea Ice Concentration',
    blurb:
      'Learn how to combine Arctic marine vessel traffic with historical sea ice concentration data',
    tags: ['Cryosphere', 'Programming'],
  },
  {
    slug: 'notebook-raster-database',
    title: "Fetch data from SNAP's raster database",
    blurb:
      "Learn how to fetch and plot subsets of data from SNAP's raster database",
    tags: ['Climate', 'Programming'],
  },
  {
    slug: 'notebook-design-discharge',
    title: 'Design Discharge',
    blurb:
      'Learn how to calculate a design discharge value via the Rational Method',
    tags: ['Climate', 'Precipitation', 'Programming'],
  },
  {
    slug: 'notebook-frosth-depth',
    title: 'Modified Berggren Frost Depth',
    blurb: 'Learn how to calculate compute the ModBerg frost depth',
    tags: ['Climate', 'Programming'],
  },
  {
    slug: 'notebook-design-freezing-index',
    title: 'Design Freezing Index',
    blurb:
      'Learn how to calculate design freezing index by averaging the three coldest years from a given range of years',
    tags: ['Climate', 'Programming'],
  },
  {
    slug: 'notebook-design-thawing-index',
    title: 'Design Thawing Index',
    blurb:
      'Learn how to calculate design thawing index by averaging the three warmest years from a given range of years',
    tags: ['Climate', 'Programming'],
  },
  {
    slug: 'temperature-2km-cmip5',
    title: 'Temperature',
    blurb:
      'Historical and projected temperatures at various temporal and spatial resolutions',
    tags: ['Temperature'],
  },
  {
    slug: 'temperature-cmip6',
    title: 'Temperature, CMIP6 all models scenarios',
    blurb: 'Coarse-resolution temperature model outputs, CMIP6',
    tags: ['Temperature'],
  },
  {
    slug: 'precipitation-2km-cmip5',
    title: 'Precipitation, 2km',
    blurb: 'Annual means, decadal means up to monthly temporal resolution',
    tags: ['Precipitation'],
  },
  {
    slug: 'precipitation-frequency',
    title: 'Precipitation Frequency',
    blurb:
      'Precipitation frequency for various return intervals and durations across different models and eras',
    tags: ['Precipitation'],
  },
  {
    slug: 'wildfire-combined',
    title: 'Wildfire',
    blurb:
      'Access to near-real-time, historical, and model output relevant to Alaska wildfires',
    tags: ['Wildfire', 'Terrestrial'],
  },
  {
    slug: 'lightning-climatology',
    title: 'Lightning climatology',
    blurb: 'Daily number of lightning strikes in 20km grid boxes',
    tags: ['Lightning', 'Terrestrial', 'Wildfire'],
  },
] satisfies Item[]
