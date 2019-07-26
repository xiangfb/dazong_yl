<template>
  <div  :style="{height: typeof height === 'string'?height: height + 'px',background: background,padding: padding,marginBottom: typeof marginBottom === 'string'?marginBottom: marginBottom + 'px',marginTop: typeof marginTop === 'string'?marginTop: marginTop + 'px'}">
    <slot>基础内容</slot>
  </div>
</template>

<script>
export default {
  name: 'left-components',
  props: {
    height: {
      type: [String, Number]
    },
    background: {
      type: String,
      default: '#fff'
    },
    padding: {
      type: String,
      default: '0'
    },
    marginTop: {
      type: [String, Number],
      default: 0
    },
    marginBottom: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
