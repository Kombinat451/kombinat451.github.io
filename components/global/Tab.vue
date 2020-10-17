<template>
  <b-tab :title="label" class="m-2">
    <slot/>
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
