<template>
  <div>
    <el-dialog
    element-loading-background="rgba(0, 0, 0, 0.8)"
    @close='close'
     width="55%" title="列表" :visible.sync="show">
     <el-table
     v-loading="loading"
    ref="singleTable"
    :height='height'
    :data="data"
    highlight-current-row
    @current-change="selectionChange"
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column v-for="(item,index) in header" :key="index"
      align='center'
      :property="item.value"
      :label="item.label">
    </el-table-column>
  </el-table>
  <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="limit.pn"
      :page-sizes="pageSizes"
      :page-size="limit.ps"
      class="align-right p-n"
      layout="total, sizes, prev, pager, next"
      :total="total"
    ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getList">完成</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import groupOrgService from '@/service/group_org-service'

// import { RoutineList } from 'components/base/index'
export default {
  data () {
    return {
      height: '',
      loading: false,
      show: this.value,
      header: [],
      limit: {
        pn: 1,
        ps: 15
      },
      pageSizes: [5, 10, 15, 20, 25, 30],
      total: 1,
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
      selectionList: {}
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },
    changeNum: { type: Number,
      default: 0 },
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  created () {
    this.height = window.screen.availHeight - 460
    // this.data = temList.data
  },
  mounted () {

  },
  methods: {
    handleSizeChange (ps) {
      this.limit.pn = 1
      this.limit.ps = ps
      this.getData()

      console.log('22' + ps)
    },
    handleCurrentChange (pn) {
      this.limit.pn = pn
      this.getData()

      console.log(pn)
    },
    getData () {
      this.loading = true
      let sub = { limit: this.limit }
      if (this.type === 'groupShow') {
        groupOrgService.getGropList(sub).then(res => {
          this.data = res.data.list
          this.total = res.data.total
          this.loading = false
          console.log(res.data)
        })
      } else {
        groupOrgService.getOrgList(sub).then(res => {
          this.data = res.data.list
          this.total = res.data.total
          this.loading = false
          console.log(res.data)
        })
      }
    },
    close () {
      this.show = false
      this.$emit('getList')
    },
    getList () {
      console.log(this.selectionList)
      try {
        if (!this.selectionList.id) {
          this.$message({
            type: 'warning',
            message: '请选择一个选项!'
          })
          return false
        }
        this.$emit('getList', this.selectionList, this.type)
        console.log('选中的数据')
        console.log(this.selectionList)
        this.show = false
      } catch (error) {
        this.$message({
          type: 'warning',
          message: '请选择一个选项!'
        })
        return false
      }
    },

    selectionChange (list) {
      this.selectionList = list
      console.log(list)
    },
    rowClick (row, column, event) {
      console.log(row)
      // console.log(column)
      // console.log(event)
    },
    sizeChange (ps) {
      this.limit.ps = ps
      this.getData()
    },
    currentChange (pn) {
      this.limit.pn = pn
      this.getData()
    }
  },
  computed: {},
  watch: {
    value (n) {
      this.show = n
      if (n) {
        console.log('你的类型是' + this.type)
        if (this.type === 'groupShow') {
          this.header = [
            { label: '集团编号', value: 'groupCode' },
            { label: '集团名称', value: 'groupName' }
          ]
        } else {
          this.header = [
            { label: '公司编号', value: 'orgCode' },
            { label: '公司名称', value: 'orgName' }
          ]
        }
        this.getData()
      } else {
        // Object.assign(this.$data, this.$options.data())
      }
      console.log(n)
    },
    changeNum () {
      this.getData()
    }
  },
  components: {
    // RoutineList
  }
}
</script>

<style scoped>

</style>
