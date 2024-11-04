const { $_ } = useNuxtApp()

// Calculate mean and choose rounding precision based on the range of values.
export const precisionMean = values => {
  let diff = $_.max(values) - $_.min(values)
  let mean = $_.mean(values)
  return diff < 10 ? $_.round(mean, 1) : $_.round(mean)
}

export const deepMinMeanMonth = (values, month) => {
  let monthRegexp = new RegExp(`\\d\\d\\d\\d-${month}`)
  let picked = $_.pickDeep(values, monthRegexp)
  let min = deepMin(picked)
  return min
}

export const deepMaxMeanMonth = (values, month) => {
  let monthRegexp = new RegExp(`\\d\\d\\d\\d-${month}`)
  let picked = $_.pickDeep(values, monthRegexp)
  let max = deepMax(picked)
  return max
}

export const deepMin = values => {
  let min = deepCompare(values, (a, b) => { return a < b })
  return min
}

export const deepMax = values => {
  let min = deepCompare(values, (a, b) => { return a > b })
  return min
}

// Comparator is a function that takes two arguments (value, acc)
// and returns a boolean.
export const deepCompare = (values, comparator) => {
  let min = $_.reduceDeep(values,
    (acc, value) => {
      if(typeof acc == 'number' && typeof value == 'number') {
        if(comparator(value, acc)) {
          return value
        } else {
          return acc
        }
      } else {
        // Waiting for tree navigation to hit its first leaf
        if(typeof value == 'number') {
          return value
        }
      }
      return acc
    }
  );
  return min
}