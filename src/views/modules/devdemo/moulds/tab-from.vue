<template>
  <div>
    <tab-form :fieldData="fieldData"
              class="bg-white"
              :max-height="maxHeight - 60"
              @tabs-change="change"
              @submit="submit"
              @reset="reset"></tab-form>
  </div>
</template>

<script>
import { TabForm } from 'components/base/index'
export default {
  data () {
    return {
      fieldData: {
        tabOptions: [
          {
            label: '基础属性',
            name: 'sasic-attr',
            fieldData: {},
            modelData: {}
          },
          {
            label: '扩展属性',
            name: 'extend-attr',
            fieldData: {},
            modelData: {}
          }
        ]

      }
    }
  },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  created () {

  },
  mounted () {
    this.options[0].fieldData = require('assets/test-json/form_notice.json').body.formatSubsView
    // this.options[0].modelData = require('assets/test-json/form_notice_data.json')
    this.options[1].fieldData = require('assets/test-json/form_notice.json').body.formatSubsView
    // this.options[1].modelData = require('assets/test-json/form_notice_data.json')
  },
  methods: {
    change (tab, event) {
      console.log(tab)
    },
    submit (state, modelData, tab) {
      console.log(tab)
      if (state) { // 提交成功
        this.$message({
          message: '提交成功！',
          type: 'success'
        })
      } else {
        this.$message.error('请完善表单！')
      }
    },
    reset (modelData, tab) {
      console.log(tab)
    }
  },
  computed: {},
  watch: {},
  components: {
    TabForm
  }
}
</script>

<style scoped>

</style>
