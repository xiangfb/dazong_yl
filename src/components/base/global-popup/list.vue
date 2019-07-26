<template>
  <el-dialog class="resource_list_box" :visible.sync="visibleSync" :close-on-click-modal="false" :close-on-press-escape="false" :width="width">
    <div v-if="title" slot="title" class="fs14">
      {{title}}
    </div>
    <div class="bg-white" :class="dialogBodyClass">
      <slot></slot>
    </div>
    <slot name="footer" slot="footer"></slot>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    visibleSync: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: '75%'
    },
    title: {
      type: String
    },
    dialogBodyClass: {
      type: [Object, Array]
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  computed: {},
  watch: {},
  components: {}
}
</script>

<style lang="scss">
  .resource_list_box{
    .el-dialog__header, .el-dialog__footer{
      padding: 20px 10px !important;
    }
    .el-dialog__body{
      padding: 5px !important;
    }
    .el-dialog__body{
      background: #f5f5f5;
    }
    .resource_dialog_content{
      min-height: 60px;
    }
  }
</style>
