<template>
  <article>
    <!--<prev-next :prev="prev" :next="next" />-->
    <h1>{{ article.title }}</h1>
    <p class="text-center">{{ $formatDate(article.date) }}</p>

    <nav class="my-4 toc">
      <i>Table of content</i>
      <ol>
        <li v-for="link of article.toc" :key="link.id">
          <NuxtLink :to="`#${link.id}`" :class="{ 'py-2': link.depth === 2, 'ml-2 pb-2': link.depth === 3 }">
            {{ link.text }}
          </NuxtLink>
        </li>
      </ol>
    </nav>

    <nuxt-content :document="article" />

    <b-row>
      <b-pagination-nav class="mx-auto" :link-gen="linkGen" :number-of-pages="articles.length" use-router></b-pagination-nav>
    </b-row>
  </article>
</template>

<style>
.toc ol {
  margin-top: 0.5em;
  padding-left: 1em;
}
.toc li {
  list-style-type: none;
}
</style>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles').only(['slug']).fetch()
    const last = articles.length-1;
    const slug = params.slug ? params.slug : articles[last].slug
    const article = await $content('articles', slug).fetch()

    return {
      article,
      articles
    }
  },

  methods: {
    linkGen(pageNum) {
      const slug = this.articles[pageNum-1].slug
      return { path: `/blog/${slug}` }
    }
  }
}
</script>

