<template>
  <div>
    <tree-form :tree-data="treeData"
               :field-data="fieldData"
               :model-data="modelData"
               :limit="2"
               :tree-max-height="treeMaxHeight"
               :btn-group="btnGroup"
               :max-height="maxHeight - 72"
               @but-receipt="butFun"></tree-form>
  </div>
</template>

<script>
import { TreeForm } from 'components/base/index'
export default {
  data () {
    return {
      treeMaxHeight: 0,
      treeData: [],
      fieldData: {},
      modelData: {},
      btnGroup: [
        {
          icon: 'el-icon-plus',
          btnType: 'primary',
          permision: '',
          name: 'add',
          label: '新增',
          type: 'btn'
        },
        {
          icon: 'el-icon-edit',
          btnType: 'primary',
          permision: '',
          name: 'edit',
          label: '修改',
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
      type: Number,
      default: 1067
    }
  },
  created () {
    this.treeData = require('assets/test-json/table_inv_tree_data.json')
    this.fieldData = require('assets/test-json/form_notice.json').body.formatSubsView
    this.modelData = require('assets/test-json/form_notice_data.json')
  },
  mounted () {
    this.treeMaxHeight = document.documentElement.clientHeight - 114
  },
  methods: {
    butFun (e) {
      switch (e) {
        case 'add':
          this.opType = 'op'
          break
        case 'edit':
          if (!this.selectionList.length) {
            this.$message({
              type: 'warning',
              message: '请选择一条数据!'
            })
            return false
          }
          if (this.selectionList.length > 1) {
            this.$message({
              type: 'warning',
              message: '不允许选择多条数据!'
            })
            return false
          }
          let item = this.selectionList[0]
          this.regionForm = item
          this.regionForm.region = [item.province, item.city, item.town]
          this.opType = 'op'
          break
        case 'delete':
          if (this.selectionList.length) {
            this.$confirm('确定删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let arr = this.selectionList.map(v => v.id)
              this.data.map((v) => {
                if (arr.includes(v.id)) {
                  v.delete = true
                }
              })
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }).catch(() => {

            })
          } else {
            this.$message({
              type: 'warning',
              message: '请先选择至少一条数据!'
            })
          }
          break
      }
    }
  },
  computed: {},
  watch: {},
  components: {
    TreeForm
  }
}
</script>

<style scoped>

</style>
