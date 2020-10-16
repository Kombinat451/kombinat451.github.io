<template>
  <b-row>
    <b-col>
      <div v-for="article of articles" :key="article.slug">
        <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          <h2>{{ article.title }}</h2>
        </NuxtLink>
        <p>{{ $formatDate(article.createdAt) }}</p>
        <p>{{ article.description }}</p>
      </div>
    </b-col>
  </b-row>
</template>

<style>
</style>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'createdAt', 'slug'])
      .sortBy('createdAt', 'asc')
      .fetch()

    return {
      articles
    }
  }
}
</script>
