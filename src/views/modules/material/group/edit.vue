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
import GroupService from 'service/modules/material/group/group-service'
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
      param: null,
      btnGroup: [
        {
          icon: 'el-icon-plus',
          btnType: 'primary',
          permision: '',
          name: 'add',
          label: '同级新增',
          type: 'btn'
        },
        {
          icon: 'el-icon-plus',
          btnType: 'primary',
          permision: '',
          name: 'cadd',
          label: '下级新增',
          type: 'btn'
        },
        {
          icon: 'el-icon-edit',
          btnType: 'primary',
          permision: '',
          name: 'save',
          label: '保存',
          type: 'btn'
        },
        {
          icon: 'el-icon-delete',
          btnType: 'primary',
          permision: '',
          name: 'delete',
          label: '删除',
          type: 'btn'
        }
      ]
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
      GroupService.formData(params).then(res => {
        if (res.success) {
          if (res.data.list.length > 0) {
            this.modelData = res.data.list[0]
            this.param = this.modelData
          }
        }
      })
    },
    getMaterialList (one) {
      if (this.formatStyle === 'FORMAT_TREE_FROM') {
        GroupService.grouptree().then(tree => {
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
        ele.name = ele.jsonObject.groupName
        if (ele.children && ele.children.length > 0) {
          this.treeHandle(ele.children)
        }
      })
      return data
    },
    nodeClick (data) {
      this.getData(data.id)
      this.param = data.jsonObject
    },
    submitForm (state, modelData) {
      if (state === 'add') { // 提交成功.
        console.log(this.modelData.parentId)
        if (this.param.parentId === null) {
          this.param.parentId = 0
        }
        GroupService.add(this.param.parentId).then(res => {
          if (res.success) {
            console.log(res.data)
            this.modelData = res.data
          }
        })
      } else if (state === 'cadd') {
        console.log(this.modelData.id)
        GroupService.add(this.param.id).then(res => {
          if (res.success) {
            this.modelData = res.data
            console.log(res.data)
          }
        })
      } else if (state === 'delete') {
        console.log(this.param.id)
        GroupService.delete(this.param.id).then(res => {
          if (res.success) {
            console.log(res.data)
            this.$message.success('操作成功!')
          }
        })
      } else {
        console.log('11111')
        console.log(modelData)
        if (modelData.id === 0 || modelData.id === null) {
          GroupService.save({
            entity: modelData
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功!')
            }
          })
        } else {
          GroupService.update({
            entity: modelData
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功!')
            }
          })
        }
        // this.$message.error('请完善表单')
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
