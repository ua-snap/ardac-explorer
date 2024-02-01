const layers: MapLayer[] = [
  {
    id: 'historical_era_precip',
    title: 'Historical Annual Precipitation (1980-2009)',
    source: 'rasdaman',
    wmsLayerName: 'annual_precip_totals_mm',
    style: 'precip_mm_historical_era',
    legend: 'precipitation',
    default: true,
  },
  {
    id: 'midcentury_era_precip',
    title:
      'Projected Mid-Century Annual Precipitation (2040-2069, NCAR CCSM4, RCP 8.5)',
    source: 'rasdaman',
    wmsLayerName: 'annual_precip_totals_mm',
    style: 'precip_mm_midcentury_era',
    legend: 'precipitation',
  },
  {
    id: 'historical_mean_annual_snowfall',
    title: 'Historical Annual Snowfall (1910-1919)',
    source: 'rasdaman',
    wmsLayerName: 'mean_annual_snowfall_mm',
    rasdamanConfiguration: {
      dim_model: 0,
      dim_scenario: 0,
      dim_decade: 0,
    },
    style: 'snowfall_mm',
    legend: 'snowfall',
  },
  {
    id: 'future_mean_annual_snowfall',
    title: 'Projected Annual Snowfall (2090-2099, NCAR CCSM4, RCP 8.5)',
    source: 'rasdaman',
    wmsLayerName: 'mean_annual_snowfall_mm',
    rasdamanConfiguration: {
      dim_model: 5,
      dim_scenario: 3,
      dim_decade: 18,
    },
    style: 'snowfall_mm',
    legend: 'snowfall',
  },
  {
    id: 'historical_wet_days_per_year',
    title: 'Historical Wet Days Per Year (1980-2009)',
    source: 'rasdaman',
    wmsLayerName: 'wet_days_per_year',
    style: 'arctic_eds_historical_wet_days_per_year',
    legend: 'wet_days_per_year',
  },
  {
    id: 'projected_wet_days_per_year',
    title: 'Projected Wet Days Per Year (2040-2069, NCAR CCSM4, RCP 8.5)',
    source: 'rasdaman',
    wmsLayerName: 'wet_days_per_year',
    style: 'arctic_eds_projected_wet_days_per_year',
    legend: 'wet_days_per_year',
  },
]

const legend: LegendItem[] = [
  { color: '#8c510a', label: '&ge;0in, &lt;10in' },
  { color: '#d8b365', label: '&ge;10in, &lt;20in' },
  { color: '#f6e8c3', label: '&ge;20in, &lt;50in' },
  { color: '#c7eae5', label: '&ge;50in, &lt;100in' },
  { color: '#5ab4ac', label: '&ge;100in, &lt;200in' },
  { color: '#01665e', label: '&ge;200in' },
]

export { layers, legend }