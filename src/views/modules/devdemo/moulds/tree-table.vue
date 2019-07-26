<template>
  <tree-table class="p-b-n"
              :tree-max-height="treeMaxHeight"
              :tree-data="treeData"
              :max-height="maxHeight - 163"
              :btn-group="btnGroup"
              :table-header="tableHeader"
              :data="data"
              :total="total"
              @node-click="nodeClick"
              @but-receipt="butFun"
              @selection-change="selectionChange"
              @row-click="rowClick"
              @size-change="sizeChange"
              @current-change="currentChange"/>
</template>

<script>
import { TreeTable } from 'components/base/index'
export default {
  name: 'tree-list',
  data () {
    return {
      treeMaxHeight: 0,
      treeData: [],
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
      total: 0
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
    // console.log(require('assets/test-json/table_inv_tree_data.json'))
    this.tableHeader = require('assets/test-json/table_inv.json').body.list
    this.data = require('assets/test-json/table_inv_data.json')
  },
  mounted () {
    this.treeMaxHeight = document.documentElement.clientHeight - 114
  },
  methods: {
    nodeClick (data, node, event) { // 点击节点触发
      console.log(data)
    },
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
    TreeTable
  }
}
</script>
