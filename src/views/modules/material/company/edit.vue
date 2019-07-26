<template> <!-- 树+表单 代表 -->
  <div :style="{height: `${maxHeight}px`}" v-loading="loading">
    <component
      :is="currentView"
      :tips="tips"
      :max-height="maxHeight"
      :btnGroup="btnGroup"
      :treeData="treeData"
      :fieldData="fieldData"
      :modelData="modelData"
      @node-click="nodeClick"
      @submit="submitForm"
      @reset="resetForm"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import { FormColumn, MasterChildForm, TabForm, EditTable, TreeForm } from 'components/base/index'
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import OrganizationService from 'service/organization-service'
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
      searchId: null,
      treeData: [],
      fieldData: {},
      modelData: {},
      btnGroup: []
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
          this.getMaterialList()
          res.data.formSubList.forEach((item, index) => {
            this.modelData[item.fieldName] = item.defaultValue
          })
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
    getData (id) {
      let params = {}
      if (id) {
        this.searchId = id
      }
      if (this.searchId) {
        params.search = [{ key: 'id', op: 'eq', val: this.searchId }]
      }
      OrganizationService.formData(params).then(res => {
        if (res.success) {
          if (res.data.list.length > 0) {
            this.modelData = res.data.list[0]
          }
        }
      })
    },
    getMaterialList (one) {
      if (this.formatStyle === 'FORMAT_TREE_FROM') {
        OrganizationService.organization().then(tree => {
          if (tree.success) {
            this.treeData = this.treeHandle(tree.data)
            this.getData(this.treeData && this.treeData[0] && this.treeData[0].id)
          } else {
            this.getData()
          }
        })
      } else {
        this.getData()
      }
    },
    treeHandle (data) {
      data.forEach(ele => {
        ele.name = ele.jsonObject.orgName
        if (ele.children && ele.children.length > 0) {
          this.treeHandle(ele.children)
        }
      })
      return data
    },
    nodeClick (data) {
      this.getData(data.id)
    },
    submitForm (state, modelData) {
      if (state) { // 提交成功.
        OptimusPrimeService.computationGroupCreate({
          entity: modelData
        }).then(res => {
          // this.$message({
          //   message: '提交成功！',
          //   type: 'success'
          // })
          console.log(res)
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
