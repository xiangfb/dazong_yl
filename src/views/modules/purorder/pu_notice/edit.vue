<template> <!-- 主子表 代表 -->
  <div :style="{height: `${maxHeight}px`}" v-loading="loading">
    <component :is="currentView" ref="componentRef" :tips="tips" :max-height="maxHeight" :fieldData="fieldData" :modelData="modelData" @submit="submitForm" @reset="resetForm" @but-monitor="butMonitor"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import { FormColumn, MasterChildForm, TabForm, EditTable, TreeForm } from 'components/base/index'
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import PuNoticeService from 'service/modules/purorder/pu_notice/pu-notice-service'
export default {
  name: 'dynamic',
  data () {
    return {
      tips: '',
      loading: true,
      formatStyle: 'loading', // 模板类型
      mould: {
        '404': Vue.extend(NonExistent), // 404页面
        'FORMAT_FOUR_COLUMN_FROM': Vue.extend(FormColumn), // 四列表单
        'FORMAT_EIGHT_COLUMN_FROM': Vue.extend(FormColumn), // 八列表单
        'FORMAT_MASTER_CHILD_FROM': Vue.extend(MasterChildForm), // 主子表-表单
        'FORMAT_TAB_FROM': Vue.extend(TabForm), // 选项卡切换表单
        'FORMAT_EDIT_FROM': Vue.extend(EditTable), // 可编辑TABLE表单
        'FORMAT_TREE_FROM': Vue.extend(TreeForm) // 树形+表单
      },
      fieldData: {},
      modelData: { // 默認主子表必須為空對象/空數組
        'pu_notice': {},
        'pu_notice_sub': []
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
    this.getMould()
  },
  methods: {
    getMould () { // 获取当前菜单配置
      OptimusPrimeService.optimusPrime({
        formatType: 'FORM',
        menuId: (this.$route.query && this.$route.query.id) || this.$route.meta.other.id
      }).then(res => {
        if (res.success) {
          this.formatStyle = res.data.formatStyle
          this.fieldData = res.data
          this.fieldData.opations = { // 需要注明哪个是主表，哪个是子表（主子表需要）
            main: 'pu_notice',
            son: 'pu_notice_sub'
          }
          res.data.formSubList.forEach((item, index) => { // 处理表单默认值（通用）
            // if (item.fieldName === 'money') {
            //   item.calculate = JSON.stringify([
            //     {
            //       customTable: 'pu_notice_sub',
            //       fieldName: 'quantity'
            //     },
            //     {
            //       customTable: '',
            //       fieldName: '*'
            //     },
            //     {
            //       customTable: 'pu_notice_sub',
            //       fieldName: 'price'
            //     }
            //   ])
            // }
            // if (item.fieldName === 'sumAmount') {
            //   item.calculate = JSON.stringify({
            //     customTable: 'pu_notice_sub',
            //     fieldName: [
            //       {
            //         customTable: 'pu_notice_sub',
            //         fieldName: 'money'
            //       }
            //     ],
            //     mode: 'sum'
            //   })
            // }
            // // if (item.fieldName === 'sumAmount') {
            // //   item.calculate = {
            // //     customTable: 'pu_notice_sub',
            // //     fieldName: [
            // //       {
            // //         customTable: 'pu_notice_sub',
            // //         fieldName: 'quantity'
            // //       },
            // //       {
            // //         customTable: '',
            // //         fieldName: '*'
            // //       },
            // //       {
            // //         customTable: 'pu_notice_sub',
            // //         fieldName: 'price'
            // //       }
            // //     ],
            // //     mode: 'sum'
            // //   }
            // // }
            if (item.customTable === this.fieldData.opations.main) {
              this.modelData[item.customTable][item.fieldName] = item.defaultValue
            }
          })
          if (this.$route.query.currentId) {
            this.getInfo(this.$route.query.currentId)
          }
          this.$nextTick(() => {
            this.loading = false
          })
        } else {
          this.tips = res.msg
          this.formatStyle = ''
          this.loading = false
        }
      })
    },
    butMonitor (type) {
      console.log(type)
      this.$router.go(-1)
    },
    getInfo (id) {
      PuNoticeService.detail(id).then(res => {
        if (res.success) {
          this.modelData = res.data
        }
      })
    },
    submitForm (state, modelData, child) {
      if (state) { // 提交成功.
        switch (this.$route.query.type) {
          case 'create':
            PuNoticeService.save({
              entity: modelData,
              entitysub: child
            }).then(res => {
              this.$message.success('保存成功')
              this.$router.go(-1)
              console.log(res)
            })
            break
          case 'update':
            PuNoticeService.update({
              entity: modelData,
              entitysub: child
            }).then(res => {
              console.log(res)
              this.$message.success('修改成功')
              this.$router.go(-1)
            })
            break
        }
      } else {
        this.$message.error('请完善表单！')
      }
    },
    resetForm (modelData) {
      console.log(modelData)
    }
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
  components: {
    FormColumn,
    MasterChildForm,
    TabForm,
    EditTable,
    TreeForm
  }
}

</script>
