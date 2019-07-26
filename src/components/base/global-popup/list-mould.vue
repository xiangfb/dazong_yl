<template>
  <el-dialog
    class="resource_list_box"
    width="80%"
    :visible.sync="outerVisible">
    <div class="bg-white p-30" style="min-height: 180px;overflow: auto;" v-loading="loading">
      <component
        :columnNum="columnNum"
        style="max-height: 70vh;"
        :is="currentView"
        :fieldData="fieldData"
        :census="census"
        :modelData="modelData"></component>
    </div>
  </el-dialog>
</template>

<script>
import Ajax from '_router/ajax'
import Config from 'config'
import Vue from 'vue'
import XEUtils from 'xe-utils'
import MasterChildForm from 'components/base/resource-list/master-child-form'
import FormColumn from 'components/base/resource-list/column'
import TabForm from 'components/base/resource-list/tab-form'
import GlobalService from 'service/modules/popup/global-service'
import CustomType from 'service/source/custom-type'
export default {
  data () {
    return {
      loading: true,
      outerVisible: false,
      formatStyle: '', // 模板类型
      columnNum: 4,
      mould: {
        'FORMAT_MASTER_CHILD_FROM': Vue.extend(MasterChildForm), // 主子表
        'FORMAT_FOUR_COLUMN_FROM': Vue.extend(FormColumn), // 四列
        'FORMAT_EIGHT_COLUMN_FROM': Vue.extend(FormColumn), // 八列
        'FORMAT_TAB_FROM': Vue.extend(TabForm) // 选项卡切换表单
      },
      fieldData: null,
      census: null,
      modelData: null
    }
  },
  watch: {
    outerVisible: {
      handler (val) {
        this.formatStyle = ''
        this.fieldData = null
        this.modelData = null
        this.loading = true
      },
      deep: true, // 深度监听
      immediate: true // 首次进入也监听
    }
  },
  mounted () {
    this.$bus.$on('mould/list', (data, row) => { // 全局执行 this.$bus.$emit('mould/list', '123456') 会执行该事件
      this.outerVisible = true
      let promises = [
        new Promise((resolve, reject) => {
          CustomType.listParam({
            resFormatSubId: data.id
          }).then(res => {
            if (res.success) {
              resolve(res.data)
            } else {
              reject(res.message)
            }
          })
        }),
        new Promise((resolve, reject) => {
          GlobalService.optimusPrimePopup(data.cgFormatResId).then(res => {
            if (res.success) {
              this.formatStyle = res.data.formatStyle
              this.fieldData = res.data.formSubList
              if (this.formatStyle === 'FORMAT_FOUR_COLUMN_FROM') {
                this.columnNum = 4
              } else if (this.formatStyle === 'FORMAT_EIGHT_COLUMN_FROM') {
                this.columnNum = 8
              }
              resolve(res.data)
            } else {
              reject(res.message)
            }
          })
        })
      ]
      Promise.all(promises).then((pro) => {
        let search = []
        pro[0].forEach(item => {
          if (item.fieldSub1 && item.fieldSub2) {
            search.push({
              key: item.fieldSub1.fieldName,
              op: 'eq',
              val: row[item.fieldSub2.fieldName]
            })
          }
        })
        Ajax[pro[1].resMethod.toLowerCase()]({
          url: Config.service.api + pro[1].resUrl,
          data: {
            search: search
          }
        }).then(res => {
          if (res.success) {
            let modelData = XEUtils.clone(res.data, true)
            if (modelData['tongji']) {
              this.census = res.data['tongji']
              delete modelData['tongji']
            }
            this.modelData = modelData
            this.loading = false
          }
        })
      }).catch((err) => {
        console.error(err)
      })
    })
  },
  methods: {

  },
  destroyed () {
    this.$bus.$off([
      'mould/list'
    ])
  },
  beforeDestroy () {
    this.$bus.$off([
      'mould/list'
    ])
  },
  computed: {
    currentView () {
      if (this.formatStyle) {
        return this.mould[this.formatStyle]
      } else {
        return this.mould['404']
      }
    }
  },
  components: {}
}
</script>

<style lang="scss">
  .resource_list_box{
    .el-dialog__header, .el-dialog__footer{
      padding: 10px !important;
    }
    .el-dialog__body{
      padding: 0px !important;
    }
    .resource_dialog_content{
      min-height: 60px;
    }
  }
</style>
