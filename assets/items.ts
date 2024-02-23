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
      'the lowest observed daily minimum 2 m air temperature such that there are 5 other observations equal to or less than this value.',
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
    slug: 'indicator-rx5day',
    title: 'Maximum 5–day precipitation',
    blurb: '',
    tags: ['Climate', 'Precipitation'],
  },
  {
    slug: 'indicator-r10mm',
    title: 'Number of days with precipitation > 10 mm',
    blurb: '',
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
    slug: 'hydrology-runoff',
    title: 'Daily Runoff',
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
    slug: 'permafrost-magt',
    title: 'Ground Temperature',
    blurb: 'Mean annual ground temperature value, surface - 5m',
    tags: ['Climate', 'Permafrost'],
    image: '/previews/projected-permafrost-and-magt.png',
    imageAlt: 'Example image of projected mean annual ground temperature from the GIPL model'
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
    blurb: '',
    tags: ['Climate', 'Permafrost'],
  },
  {
    slug: 'sea-ice-concentration',
    title: 'Sea Ice Concentration',
    blurb:
      'Monthly pan-Arctic sea ice concentration data at a resolution of approximately 17.1km for years 1850–2021',
    tags: ['Cryosphere'],
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
] satisfies Item[]
