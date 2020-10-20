export default {
  modules: ['bootstrap-vue/nuxt', '@nuxt/content'],
  plugins: ['~/plugins/utils.js'],
  components: true,
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
    ]
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'index',
        path: '/',
        component: resolve(__dirname, 'pages/blog/_slug.vue')
      })
    }
  }
}
