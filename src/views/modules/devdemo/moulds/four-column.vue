<template>
  <el-scrollbar :style="{height: `${maxHeight}px`}" class="p-b-n">
    <form-column :fieldData="fieldData" :modelData="modelData" @submit="submitForm" @reset="resetForm"></form-column>
  </el-scrollbar>
</template>

<script>
import { FormColumn } from 'components/base/index'
export default {
  data () {
    return {
      fieldData: require('assets/test-json/form_notice.json').body.formatSubsView,
      modelData: {}
    }
  },
  created () {
  },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  methods: {
    submitForm (state, modelData) {
      if (state) { // 提交成功
        this.$message({
          message: '提交成功！',
          type: 'success'
        })
      } else {
        this.$message.error('请完善表单！')
      }
      console.log(modelData)
    },
    resetForm (modelData) {
      console.log(modelData)
    }
  },
  computed: {},
  watch: {},
  components: {
    FormColumn
  }
}
</script>

<style scoped>

</style>
