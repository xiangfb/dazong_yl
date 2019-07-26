<template>
  <el-tabs v-model="activeName">
    <el-tab-pane v-for="(item, index) in tabOptions" :key="index" :label="item.label" :name="item.name">
      <div style="overflow-y: auto; overflow-x: hidden; max-height: calc(70vh - 55px);">
      <form-column
        v-if="tabDatas && tabDatas[item.name]"
        class="p-r-n p-l-n"
        width="100%"
        :name="item.name"
        :fieldData="item.fieldData"
        :modelData="tabDatas[item.name]"></form-column>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import XEUtils from 'xe-utils'
import FormColumn from './column.vue'
import CustomType from 'service/source/custom-type'
export default {
  data () {
    return {
      tabOptions: [],
      tabDatas: {},
      activeName: null
    }
  },
  props: {
    fieldData: { // 模板资源数据
      required: true
    },
    modelData: { // 表单数据
      required: true
    }
  },
  watch: {
    fieldData: {
      handler (val) {
        CustomType.tabsEnumList().then(res => {
          if (res.success) {
            this.tabOptions = []
            let fieldData = XEUtils.clone(val, true)
            fieldData.forEach(item => {
              if (this.tabOptions.length <= 0) {
                this.tabOptions.push({
                  label: res.data[item.customTable],
                  name: item.customTable,
                  fieldData: [item]
                })
              } else {
                this.tabOptions.forEach(data => {
                  let tabOptions = this.tabOptions.map(option => {
                    return option.name
                  })
                  if (tabOptions.indexOf(item.customTable) < 0) {
                    this.tabOptions.push({
                      label: res.data[item.customTable],
                      name: item.customTable,
                      fieldData: [item]
                    })
                  } else if (data.name === item.customTable) {
                    data.fieldData.push(item)
                  }
                })
              }
            })
            this.activeName = this.tabOptions[0].name
          }
        })
      },
      deep: true, // 深度监听
      immediate: true // 首次进入也监听
    },
    modelData: {
      handler (val) {
        for (let item in val) {
          if (val[item]) {
            this.$set(this.tabDatas, item, val[item])
          } else {
            this.$set(this.tabDatas, item, [])
          }
        }
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

  },
  computed: {},
  components: {
    FormColumn
  }
}
</script>

<style scoped>

</style>
