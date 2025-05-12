// Create filename for Plotly.js PNG exports in a consistent way across
// the entire webapp using the parameters that are available for a dataset.
export const plotFileName = params => {
  let filename = params.dataName.replace(/ /g, '_')

  if (params.communityName) {
    filename += `_${params.communityName}`
  } else if (params.latLng) {
    filename += `_${params.latLng}`
  }

  let otherParams = ['model', 'scenario', 'interval']
  otherParams.forEach(param => {
    if (params[param]) {
      filename += `_${params[param]}`
    }
  })

  return filename
}
