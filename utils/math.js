const { $_ } = useNuxtApp()

// Calculate mean and choose rounding precision based on the range of values.
export const precisionMean = values => {
  let diff = $_.max(values) - $_.min(values)
  let mean = $_.mean(values)
  return diff < 10 ? $_.round(mean, 1) : $_.round(mean)
}

// Get min/max values for the selected month of CMIP6 monthly charts.
export const monthMinMax = (values, month, dataKey) => {
  let monthValues = []
  Object.values(values).forEach(scenarios => {
    Object.values(scenarios).forEach(months => {
      Object.entries(months).forEach(([key, value]) => {
        let last2 = key.slice(-2)
        if (last2 == month) {
          monthValues.push(value[dataKey])
        }
      })
    })
  })
  let min = $_.min(monthValues)
  let max = $_.max(monthValues)
  return { min: min, max: max }
}
