<template>
  <div :style="{height: `${maxHeight}px`}" v-loading="loading">
    <component :is="currentView" :tips="tips" :max-height="maxHeight" :fieldData="fieldData" :modelData="modelData" @submit="submitForm" @reset="resetForm"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import { FormColumn, MasterChildForm, TabForm, EditTable, TreeForm } from 'components/base/index'
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
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
      modelData: {}
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
        menuId: this.$route.meta.other.id
      }).then(res => {
        if (res.success) {
          this.formatStyle = res.data.formatStyle
          res.data.formSubList.forEach((item, index) => {
            this.modelData[item.fieldName] = item.defaultValue
          })
          this.fieldData = res.data
          this.fieldData.btnGroup = [
            {
              icon: 'el-icon-delete',
              btnType: 'primary',
              permision: '',
              name: 'save',
              label: '保存',
              type: 'btn'
            },
            {
              icon: 'el-icon-plus',
              btnType: 'primary',
              permision: '',
              name: 'cancel',
              label: '取消',
              type: 'btn'
            }
          ]
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
