import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - admin',
    title: 'pablito-jere',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  target: 'static',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://pablitojere-api.azurewebsites.net/api/', // 'http://localhost:5000/api/' // ,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#0c0c22",
          secondary: "#4e4c6b",
          background: "#13142a",
          light: "#aaa6ca",
          dark: "#00001a",
          accent: colors.grey.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: "#0c0c22",
          secondary: "#4e4c6b",
          background: "#13142a",
          light: "#aaa6ca",
          dark: "#00001a",
          accent: colors.grey,
          info: colors.teal,
          warning: colors.amber,
          error: colors.deepOrange,
          success: colors.green,
        },
      },
    },
  },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: "token", // property name that the Back-end sends for you as a access token for saving on localStorage and cookie of user browser
          global: true,
          required: true,
          type: "Bearer",
          maxAge: 60 * 60,
        },
        refreshToken: {
          property: "token", // property name that the Back-end sends for you as a refresh token for saving on localStorage and cookie of user browser
          data: "token", //
          maxAge: 60 * 60 * 24 * 30
        },// setting user fetch api to false
        endpoints: {
          login: { url: "/accounts/login", method: "post" },
          refresh: { url: "/accounts/refreshToken", method: "get" },
          logout: false, //  we don't have an endpoint for our logout in our API and we just remove the token from localstorage
          // user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
          user: false,
        },
        // autoLogout: false
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
