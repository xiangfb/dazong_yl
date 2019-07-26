<template> <!-- 四列表单或者八列表单 代表 -->
  <div :style="{height: `${maxHeight}px`}" v-loading="loading">
    <component :is="currentView" ref="componentRef" :tips="tips" :btnGroup="btnGroup" :max-height="maxHeight" :fieldData="fieldData" :modelData="modelData" @but-receipt="butEvent" @submit="submitForm" @reset="resetForm"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import { FormColumn, MasterChildForm, TabForm, EditTable, TreeForm } from 'components/base/index'
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import ComputationService from 'service/modules/material/computation/computation-service'
export default {
  name: 'dynamic',
  data () {
    return {
      tips: '',
      loading: true,
      btnGroup: [
        {
          btnType: 'primary',
          permision: '',
          name: 'back',
          label: '返回',
          type: 'btn'
        }
      ],
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
        menuId: (this.$route.query && this.$route.query.id) || this.$route.meta.other.id
      }).then(res => {
        if (res.success) {
          console.log('打印结果')
          console.log(this.$route.query && this.$route.query.id)
          this.formatStyle = res.data.formatStyle
          res.data.formSubList.forEach((item, index) => {
            this.modelData[item.fieldName] = item.defaultValue
          })
          if (this.$route.query.currentId) {
            this.getInfo(this.$route.query.currentId)
          }
          this.fieldData = res.data
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
    getInfo (id) {
      ComputationService.detail(id).then(res => {
        if (res.success) {
          this.modelData = res.data
        }
      })
    },
    submitForm (state, modelData) {
      if (state) { // 提交成功.
        console.log(modelData)
        switch (this.$route.query.type) {
          case 'create':
            ComputationService.save({
              entity: modelData
            }).then(res => {
              console.log(res)
              if (res.success) {
                this.$message.success('保存成功')
                this.$router.go(-1)
              }
            })
            break
          case 'update':
            ComputationService.update({
              entity: modelData
            }).then(res => {
              console.log(res)
              if (res.success) {
                this.$message.success('修改成功')
                this.$router.go(-1)
              }
            })
            break
        }
      } else {
        this.$message.error('请完善表单！')
      }
    },
    resetForm (modelData) {
      console.log(modelData)
    },
    butEvent (type) {
      switch (type) {
        case 'back':
          this.$router.replace('/modules/material/computation/list')
          break
      }
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
