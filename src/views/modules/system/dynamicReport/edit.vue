<template> <!-- 可编辑表单 代表 -->
  <div :style="{height: `${maxHeight}px`}" v-loading="loading">
    <component ref="component" :is="currentView" :tips="tips" :max-height="maxHeight"
      :loading="false"
      :btnGroup="btnGroup"
      :butLoading="butLoading"
      :tableHeader="fieldData"
      :tableData="modelData"
      @but-receipt="butMonitor"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import { FormColumn, MasterChildForm, TabForm, EditTable, TreeForm } from 'components/base/index'
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import reportTemplateFieldsInfo from 'service/modules/system/templateFieldsInfo/reportTemplateFieldsInfo'
export default {
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
      btnGroup: [
        {
          permision: '',
          name: 'save',
          label: '保存',
          type: 'btn'
        },
        {
          permision: '',
          name: 'cancel',
          label: '返回',
          type: 'btn'
        }
      ],
      butLoading: true,
      fieldData: [],
      modelData: []
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
          this.fieldData = res.data.formSubList.map(item => {
            if (item.fieldType === 'ENUM') {
              item.enumOptions = {}
              item.options.forEach((data, i) => {
                if (data.value === '0' || data.value === '1') {
                  item.enumOptions[parseInt(data.value)] = data.label
                  item.options[i].value = parseInt(item.options[i].value)
                } else {
                  item.enumOptions[data.value] = data.label
                }
              })
            }
            return item
          })
          if (this.$route.query.templateType) {
            this.getInfo(this.$route.query.templateType)
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
    butMonitor (e) {
      switch (e) {
        case 'save':
          console.log(this.$refs.component.$refs.custom.$refs.editable.getUpdateRecords()) // 表单已修改数据
          this.butLoading = true
          reportTemplateFieldsInfo.update(this.$refs.component.$refs.custom.$refs.editable.getUpdateRecords()).then(res => {
            if (res.success) {
              this.$message.success('修改成功！')
              this.$router.go(-1)
            }
            this.butLoading = false
          }).catch(() => {
            this.butLoading = false
          })
          break
        case 'cancel':
          this.$router.go(-1)
          break
      }
    },
    getInfo (templateType) {
      reportTemplateFieldsInfo.list(templateType).then(res => {
        if (res.success) {
          this.modelData = res.data
          this.butLoading = false
        }
      })
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

<style scoped>

</style>
