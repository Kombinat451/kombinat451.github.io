<template>
  <b-tab :title="label" class="m-2">
    <b-card-text><slot/></b-card-text>
  </b-tab>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
  }
}
</script>
