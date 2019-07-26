<template> <!-- 主子表 代表 -->
    <div :style="{height: `${maxHeight}px`}" v-loading="loading">
        <component :is="currentView" ref="componentRef" :tips="tips" :max-height="maxHeight" :fieldData="fieldData"
                   :modelData="modelData" @submit="submitForm" @reset="resetForm" @but-monitor="butMonitor"></component>
    </div>
</template>

<script>
import Vue from 'vue'
import { EditTable, FormColumn, MasterChildForm, TabForm, TreeForm } from 'components/base/index'
import NonExistent from '@/components/error-page/404'
import AssayType from 'service/modules/quality/assay-type'
import AssayService from 'service/modules/quality/assay/assay-service'

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
      modelData: {
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
      AssayType.getAssayFormatSub({
        formatType: 'FORM',
        formatStyle: 'FORMAT_FOUR_COLUMN_FROM',
        menuId: this.$route.query.id,
        formatId: this.$route.query.formatId
      }, 'assayformat').then(res => {
        if (res.success) {
          this.formatStyle = res.data.formatStyle
          if (this.$route.query.currentId) {
            this.getInfo(this.$route.query.currentId)
          }
          this.fieldData = res.data
          this.fieldData.opations = { // 需要注明哪个是主表，哪个是子表（主子表需要）
            main: 'qc_assay',
            son: 'qc_assay_ex'
          }
          res.data.formSubList.forEach((item, index) => { // 处理表单默认值（通用）
            if (item.customTable === this.fieldData.opations.main) {
              if (item.defaultValue) {
                this.modelData[item.customTable][item.fieldName] = item.defaultValue
              }
            }
          })
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
      AssayService.detail(id).then(res => {
        if (res.success) {
          this.modelData = res.data
        }
      })
    },
    submitForm (state, modelData, child) {
      console.log(state)
      if (state) { // 提交成功.
        switch (this.$route.query.type) {
          case 'create':
            modelData['entryFormat'] = this.$route.query.formatId
            AssayService.save({
              entity: modelData,
              entitysub: child
            }).then(res => {
              if (res.success) {
                this.$message.success('保存成功')
                this.$router.go(-1)
              }
            })
            break
          case 'update':
            AssayService.update({
              entity: modelData,
              entitysub: child
            }).then(res => {
              if (res.success) {
                this.$message.success('修改成功')
                this.$router.go(-1)
              }
            })
            break
          case 'cancel':
            this.$router.go(-1)
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
