<template>
  <div class="mauto p-l-n p-r-n" style="width: calc(50% + 30px);min-width: 880px;">
    <CustomBtnGroup class="p-10 p-b-n" @on-click="butMonitor" :limit="limit" :butLoading="butLoading" :btn-group="btnGroup"></CustomBtnGroup>
    <el-tabs :style="{height: `${maxHeight - 25}px`}" class="bg-white p-10" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabOptions" :key="index" :label="item.label" :name="item.name">
        <div :style="{height: `${maxHeight - 105}px`, 'overflow-y': 'auto', 'overflow-x': 'hidden'}" class="p-b-n">
          <form-column :fieldData="item"
                       :ref="item.name"
                       class="p-r-n p-l-n"
                       width="100%"
                       :formRef="item.name"
                       :modelData="modelData[item.name] || item.modelData"
                       @popup-confirm="popupConfirm"
                       @submit="((state, modelData) => {submitForm(state, modelData, item)})"
                       @reset="((modelData) => {resetForm(modelData, item)})"></form-column>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FormColumn from './column'
export default {
  data () {
    return {
      tabOptions: [],
      activeName: this.tabOptions && this.tabOptions[0] && this.tabOptions[0].name
    }
  },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    },
    fieldData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    limit: {
      type: Number,
      default: 5
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
    modelData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    labelWidth: {
      type: Number,
      default: 160
    }
  },
  watch: {
    fieldData: {
      handler: 'getFieldData',
      deep: true, // 深度监听
      immediate: true // 首次进入也监听
    }
  },
  methods: {
    popupConfirm (data, fatherData, index, resourceList) {
      this.$emit('popup-confirm', data, fatherData, index, resourceList)
    },
    setData (key, val) {
      this.$refs[this.activeName][0].setData(key, val)
    },
    getFieldData (val) {
      let fieldData = JSON.parse(JSON.stringify(val))
      if (fieldData.tabOptions && fieldData.tabOptions.length > 0) {
        fieldData.tabOptions.forEach((item, index) => {
          item.modelData = {}
          item.formSubList = fieldData.formSubList.filter(data => {
            item.modelData[data.fieldName] = data.defaultValue
            return data.customTable === item.name
          })
        })
        this.tabOptions = fieldData.tabOptions
        if (!this.activeName) {
          this.activeName = this.tabOptions[0] && this.tabOptions[0].name
        }
      }
    },
    handleClick (tab, event) {
      this.$emit('tabs-change', tab, event)
    },
    submitForm (state, modelData, tab) {
      let data = {}
      this.tabOptions.forEach(item => {
        data[item.name] = this.$refs[item.name][0].getData()
      })
      this.$emit('submit', state, data, tab)
    },
    resetForm (modelData, tab) {
      this.$emit('reset', modelData, tab)
    },
    butMonitor (type, data) { // 按钮组触发
      this.$emit('but-receipt', type)
    }
  },
  components: {
    FormColumn
  }
}
</script>

<style scoped>

</style>
