export default {
  modules: ['bootstrap-vue/nuxt', '@nuxt/content'],
  plugins: ['~/plugins/utils.js'],
  components: true,
  head: {
    meta: [
      // Encoding
      { charset: 'utf-8' },

      // Responsive / Bootstrap
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'},

      // Open Graph
      { property: 'og:title',       content: 'Kombinat451 - tech activist collective'},
      { property: 'og:description', content: 'HTTP 451 Unavailable For Legal Reasons'},
      { property: 'og:url',         content: 'https://www.kombinat451.org/'},
      { property: 'og:type',        content: 'website'},
      { property: 'og:image',       content: 'https://avatars3.githubusercontent.com/u/25828950'},

      // Twitter
      { name: 'twitter:card',        content: 'summary'},
      { name: 'twitter:title',       content: 'Kombinat451 - tech activist collective'},
      { name: 'twitter:description', content: 'HTTP 451 Unavailable For Legal Reasons'},
      { name: 'twitter:image',       content: 'https://avatars3.githubusercontent.com/u/25828950'},
      { name: 'twitter:site',        content: '@Kombinat451'},
      { name: 'twitter:creator',     content: '@Kombinat451'}
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
