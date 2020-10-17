<template>
<p>
  <b-img style="max-width:35em" :src="imgSrc" :alt="alt" center />
</p>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  },
  computed: {
    imgSrc() {
      try {
        return require(`~/assets/${this.src}`)
      } catch (error) {
        return null
      }
    }
  }
}
</script>
