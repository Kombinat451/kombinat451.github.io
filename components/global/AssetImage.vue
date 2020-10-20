<template>
<b-container>
  <b-row>
    <b-img class="mb-1" :src="imgSrc" :alt="alt" center />
    <b-col cols="12">
      <p class="text-center">
        <i>{{alt}}</i>
      </p>
    </b-col>
  </b-row>
</b-container>
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
