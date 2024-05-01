import { defineStore } from 'pinia'

export const useChartStore = defineStore('chart', () => {
  // We can support additional options/params types here as needed if we end up
  // using this store for other types of charts, not just hydrology.
  let labels: Ref<HydrologyChartLabelsObj | PermafrostChartLabelsObj> =
    ref(undefined)
  let inputs: Ref<HydrologyChartInputsObj | PermafrostChartInputsObj> =
    ref(undefined)

  return {
    labels,
    inputs,
  }
})