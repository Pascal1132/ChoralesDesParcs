import tailwindAspectRatio from '@tailwindcss/aspect-ratio';
import { repositoryName, apiEndpoint } from './slicemachine.config.json';
import colors from 'tailwindcss/colors'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  colorMode: {
    preference: 'light'
  },
  app: {
    head: {
      title: 'Prismic + Nuxt Minimal Starter',
      htmlAttrs: {
        lang: 'fr',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    }
  },

  modules: ['@nuxtjs/prismic', '@nuxt/icon', '@nuxt/ui', 'vue3-carousel-nuxt'],

  prismic: {
    endpoint: apiEndpoint || repositoryName,
    preview: '/api/preview',
    clientConfig: {
      routes: [
        {
          type: 'page',
          path: '/:uid',
        },
        {
          type: 'page',
          uid: 'home',
          path: '/',
        },
      ]
    }
  },
  css: [
    '~/styles/global.css',
    '@fontsource/merriweather/400.css',
  ],
  tailwindcss: {
    config: {
        theme: {
          fontFamily: {
            sans: 'merriweather, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
          },
          extend: {
            colors: {
              primary: colors.emerald, // Vert éclatant pour représenter l'harmonie et la nature
              secondary: colors.amber, // Jaune doré pour la chaleur et l'énergie
              accent: colors.cyan, // Bleu clair pour la vivacité et le dynamisme
              highlight: colors.rose, // Rose vif pour une touche vibrante
              background: colors.gray["50"], // Fond clair et doux
              text: colors.gray["900"], // Texte noir profond pour une bonne lisibilité
              navbar: colors.gray["800"], // Fond obscure pour la barre de navigation
            }
          }
        },
      content: [
        './app/**/*.{js,ts,vue}',
        './slices/**/*.{js,ts,vue}'
      ],
      plugins: [tailwindAspectRatio]
    }
  }
})