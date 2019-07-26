<template>
  <el-form :inline="true" label-position="left" :ref="formRef" label-width="auto" :model="mapData" @submit.native.prevent>
    <template v-for="(item, index) in formSubList">
      <el-form-item :prop="item.fieldName" :key="index" v-if="!item.ihidden" style="max-width: 230px;">
        <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
          <div class="nowrap">{{item.fieldExplain}}</div>
        </el-tooltip>
        <!-- 弹窗资源 -->
        <el-input
          v-if="item.formSubmitType === 'RESOURCE_CONTROLS'"
          style="width: 120px !important;"
          disabled
          @click.native="inputTap(item, index)"
          type="text"
          :placeholder="item.tipsMessage || '请输入'"
          autocomplete="off"
          v-model="mapData[item.fieldName]" />
        <!-- 自动完成 -->
        <el-autocomplete
          v-else-if="item.formSubmitType === 'AUTO_COMPLETE'"
          style="width: 120px !important;"
          :readonly="!item.iupdate"
          class="autocomplete_width100"
          v-model="mapData[item.fieldName]"
          :fetch-suggestions="((queryString, cb)=>{querySearchAsync(queryString, cb, item)})"
          clearable
          :placeholder="item.tipsMessage || '请输入'"
          autocomplete="off" />
        <!-- 下拉菜单 -->
        <el-select v-else-if="item.formSubmitType === 'SELECT'" v-model="mapData[item.fieldName]" :disabled="!item.iupdate" :placeholder="item.tipsMessage || '请选择'">
          <el-option v-for="(data, i) in item.options" :key="i" :label="data.label" :value="data.value"/>
        </el-select>
        <el-date-picker
          v-else-if="item.formSubmitType === 'DATA_BOX'"
          style="width: 120px !important;"
          v-model="mapData[item.fieldName]"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :disabled="!item.iupdate"
          :placeholder="item.tipsMessage || '请选择'"/>
        <el-date-picker
          v-else-if="item.formSubmitType === 'DATA_RANGE_BOX'"
          style="width: 120px !important;"
          v-model="mapData[item.fieldName]"
          type="datetimerange"
          range-separator="至"
          :start-placeholder="item.tipsMessage.start"
          :end-placeholder="item.tipsMessage.end"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :disabled="!item.iupdate" />
        <!-- 多行或者单行输入框 -->
        <el-input
          v-else
          style="width: 120px !important;"
          :disabled="!item.iupdate"
          :type="item.formSubmitType === 'MORE_TXT' ? 'textarea' : 'text'"
          :rows="1"
          :placeholder="item.tipsMessage || '请输入'"
          clearable
          autocomplete="off"
          v-model="mapData[item.fieldName]" />
      </el-form-item>
    </template>
    <el-form-item class="m-b-n">
      <el-button type="primary" @click="submitForm">查询</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      mapData: {}
    }
  },
  props: {
    formRef: { // form表单唯一标识
      type: String,
      default: 'ruleForm'
    },
    fieldData: { // 模板资源数据
      type: Array,
      required: true
    },
    modelData: { // 表单数据
      type: Object,
      required: true
    }
  },
  watch: {
    modelData: {
      handler (val) {
        this.mapData = Object.assign({}, val)
      },
      deep: true, // 深度监听
      immediate: true // 首次进入也监听
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    submitForm () {
      this.$refs[this.formRef].validate((valid) => {
        if (valid) {
          this.$emit('submit', true, this.mapData)
        } else {
          this.$emit('submit', false, this.mapData)
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[this.formRef].resetFields()
      this.$emit('reset', this.mapData)
    },
    querySearchAsync (queryString, cb, data) {
      let obj = []
      if (data.options && data.options.length > 0) {
        obj = !queryString || queryString.indexOf('@') >= 0 ? [] : data.options.map(item => {
          return { value: queryString + item.value }
        })
      }
      cb(obj)
    }
  },
  computed: {
    formSubList () {
      let data = this.fieldData
      return data.sort((a, b) => {
        return a.seq - b.seq
      })
    }
  },
  components: {}
}
</script>

<style lang="scss">
  .el-autocomplete.autocomplete_width100{
    width: 100% !important;
  }
</style>
