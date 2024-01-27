<script lang="ts" setup>
const { $autoComplete } = useNuxtApp()

import items from '~/assets/items'

onMounted(() => {
  let config = {
    placeHolder: 'Search...',
    data: {
      src: items,
      keys: ['title', 'blurb'],
    },
    resultItem: {
      highlight: true,
    },
    threshold: 0,
    resultsList: {
      maxResults: 999,
    },
  }

  new $autoComplete(config)

  document
    .querySelector('#autoComplete')!
    .addEventListener('results', (event: Event) => {
      const store = useStore()
      if ((event as CustomEvent).detail.query === '') {
        store.searchActive = false
        return
      }
      let filteredItems = (event as CustomEvent).detail.results.map(
        (result: any) => {
          return result.value
        }
      )
      // Remove duplicates by converting to a Set and back to an Array.
      filteredItems = Array.from(new Set(filteredItems))
      store.filteredItems = filteredItems
      store.searchActive = true
    })
})
</script>

<template>
  <input id="autoComplete" class="ml-2" />
</template>

<style lang="scss" scoped>
:global(.autoComplete_wrapper) {
  width: 100%;
}
/* Hide results list since we are showing results as cards instead. */
:global(ul[id^='autoComplete_list']) {
  display: none;
}
</style>
