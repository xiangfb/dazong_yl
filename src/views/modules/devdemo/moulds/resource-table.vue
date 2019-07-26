<template>
  <div>
    <el-button type="text" @click="visible = true">点击打开外层 Dialog</el-button>
    <resource-table :visible="visible"
                    :field-data="fieldData"
                    :model-data="modelData"
                    :total="total"
                    :max-height="maxHeight"
                    @cancel="visible = false"></resource-table>
  </div>
</template>

<script>
import { ResourceTable } from 'components/base/index'
export default {
  data () {
    return {
      visible: false,
      fieldData: {},
      modelData: [],
      show: this.detailStatus,
      total: 3
    }
  },
  props: {
    detailStatus: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: Number,
      default: 1067
    }
  },
  created () {
    this.fieldData = require('assets/test-json/form_notice.json').body.formatSubsView
    this.modelData = [require('assets/test-json/form_notice_data.json')]
  },
  mounted () {

  },
  methods: {

  },
  computed: {},
  watch: {
    detailStatus (n) {
      console.log(n)
    }
  },
  components: {
    ResourceTable
  }
}
</script>

<style scoped>

</style>
