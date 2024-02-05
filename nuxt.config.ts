import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/_variables.scss" as *;',
        },
      },
    },
  },
  hooks: {
    'pages:extend'(pages) {
      pages.push(
        {
          path: '/item/:slug',
          file: resolve('/pages/full.vue'),
        },
        {
          path: '/tag/:tag',
          file: resolve('/pages/index.vue'),
        }
      )
    },
  },
  modules: ['@pinia/nuxt'],
  typescript: {
    typeCheck: true,
  },
})
