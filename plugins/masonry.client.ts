import * as Masonry from 'masonry-layout'

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      Masonry,
    },
  }
})
