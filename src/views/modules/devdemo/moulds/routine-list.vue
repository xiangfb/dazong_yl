<template>
  <routine-list :max-height="maxHeight - 167"
               :btn-group="btnGroup"
               :limit="2"
               :table-header="tableHeader"
               :data="data"
               :total="total"
               @but-receipt="butFun"
               @selection-change="selectionChange"
               @row-click="rowClick"
               @size-change="sizeChange"
               @current-change="currentChange"/>
</template>

<script>
import { RoutineList } from 'components/base/index'
export default {
  data () {
    return {
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
      tableHeader: [],
      data: [],
      total: 0,
      selectionList: []
    }
  },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  created () {
    this.tableHeader = require('assets/test-json/table_inv.json').body.list
    this.data = require('assets/test-json/table_inv_data.json')
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
    },
    selectionChange (list) {
      this.selectionList = list
    },
    rowClick (row, column, event) {
      console.log(row)
      console.log(column)
      console.log(event)
    },
    sizeChange (ps) {
      this.ps = ps
    },
    currentChange (pn) {
      this.pn = pn
    }
  },
  computed: {},
  watch: {},
  components: {
    RoutineList
  }
}
</script>

<style scoped>

</style>
