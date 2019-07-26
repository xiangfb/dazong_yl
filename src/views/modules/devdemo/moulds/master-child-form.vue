<template>
  <div>
    <master-child-form :limit="2"
                       :max-height="maxHeight - 125"
                       :btnGroup="btnGroup"
                       :field-data="fieldData"
                       :model-data="modelData"
                       :table-header="tableHeader"
                       :data="data"
                       @but-receipt="butFun"></master-child-form>
  </div>
</template>

<script>
import { MasterChildForm } from 'components/base/index'
export default {
  data () {
    return {
      selectionList: [],
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
      ],
      fieldData: {},
      modelData: {},
      tableHeader: [],
      data: []
    }
  },
  props: {
    maxHeight: {
      type: [String, Number]
    }
  },
  created () {
    this.fieldData = require('assets/test-json/form_notice.json').body.formatSubsView
    this.tableHeader = require('assets/test-json/form_notice.json').body.formatSubsView.formSubList
    this.data = [require('assets/test-json/table_inv_data.json')[0]]
  },
  mounted () {

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
    MasterChildForm
  }
}
</script>

<style scoped>

</style>
