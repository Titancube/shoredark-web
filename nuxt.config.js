export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'shoredark-web',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  target: 'static',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    'nuxt-typed-vuex',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyDRSAMGaq3iWz9OXFt1Gm3sP-bRDpcpiNM',
          authDomain: 'shoredark-app.firebaseapp.com',
          projectId: 'shoredark-app',
          storageBucket: 'shoredark-app.appspot.com',
          messagingSenderId: '93905256938',
          appId: '1:93905256938:web:b80c75c665ddefe298b293',
          measurementId: 'G-CTMHJC7P9E',
        },
        services: {
          auth: true, // Just as example. Can be any other service.
          firestore: true,
        },
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
