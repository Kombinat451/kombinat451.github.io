export default {
  modules: ['bootstrap-vue/nuxt', '@nuxt/content'],
  plugins: ['~/plugins/utils.js'],
  components: true,
  head: {
    meta: [
        { charset: 'utf-8' }
    ]
  },
  //target: 'static',
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
