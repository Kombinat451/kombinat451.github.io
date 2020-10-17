<template>
<p class="text-center">
  <b-img class="mb-1" style="max-width:35em" :src="imgSrc" :alt="alt" center />
  <i>{{alt}}</i>
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
