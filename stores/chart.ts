import { defineStore } from 'pinia'

export const useChartStore = defineStore('chart', () => {
  let labels: Ref<
    | HydrologyChartLabelsObj
    | PermafrostChartLabelsObj
    | IndicatorsCmip6ChartLabelsObj
  > = ref(undefined)
  let inputs: Ref<
    | HydrologyChartInputsObj
    | PermafrostChartInputsObj
    | IndicatorsCmip6ChartInputsObj
  > = ref(undefined)

  return {
    labels,
    inputs,
  }
})
