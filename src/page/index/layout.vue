<template>
  <router-view :max-height="maxHeight"></router-view>
</template>

<script>
export default {
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  }
}
</script>
