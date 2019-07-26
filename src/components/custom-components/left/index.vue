<template>
  <div :style="{width: typeof width === 'string'?width: width + 'px'}">
    <slot>左侧内容</slot>
  </div>
</template>

<script>
export default {
  name: 'left-components',
  props: {
    width: {
      type: [String, Number],
      default: '100%'
    }
  }
}
</script>
