<template>
  <nuxt-content :document="page" />
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content('about').fetch()

    return { page };
  }
}
</script>
