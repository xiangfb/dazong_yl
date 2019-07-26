<template>
  <div class="bg-white">
    <CustomBtnGroup class="p-10 p-b-n" @on-click="butMonitor" :limit="limit" :butLoading="butLoading" :btn-group="btnGroup"></CustomBtnGroup>
    <custom-edit-table class="p-10" ref="custom" :loading="loading" :auto-sort="autoSort" :select="select" :row-key="rowKey" :table-header="tableHeader"
   :data="tableData" border :max-height="maxHeight - 25 - 50" @popup-confirm="popupConfirm"></custom-edit-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    select: {
      type: Boolean
    },
    butLoading: {
      type: Boolean,
      default: false
    },
    btnGroup: { // 按钮组
      type: Array,
      default () {
        return []
      }
    },
    limit: {
      type: Number,
      default: 5
    },
    autoSort: {
      type: Boolean
    },
    rowKey: {
      type: [Function, String]
    },
    loading: {
      type: Boolean,
      default: true
    },
    tableHeader: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    },
    maxHeight: {
      type: [String, Number]
    }
  },
  methods: {
    butMonitor (e) { // 按钮组触发
      switch (e) {
        case 'default':
          this.$refs.custom.$refs.editable.clearActive()
          this.$refs.custom.$refs.editable.revert()
          break
      }
      this.$emit('but-receipt', e)
    },
    popupConfirm (data, fatherData, index, resourceList) {
      this.$emit('popup-confirm', data, fatherData, index, resourceList)
    }
  },
  computed: {},
  watch: {},
  components: {}
}
</script>

<style scoped>

</style>
