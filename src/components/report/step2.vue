<template>
  <div>
    <el-dialog
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :show-close = 'false'
     width="80%" title="模板列表" :visible.sync="show">
     <el-button-group>
  <el-button type="primary" @click='butFun("add")' icon="el-icon-plus">添加</el-button>
  <el-button type="primary" @click='butFun("edit")' icon="el-icon-edit">编辑</el-button>
  <el-button type="primary" @click='butFun("delete")' icon="el-icon-delete">删除</el-button>
</el-button-group>
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
    <el-table-column
    align='center'
      property="code"
      label="模板编码">
    </el-table-column>
    <el-table-column
    align='center'
      property="title"
      label="模板名称">
    </el-table-column>
    <el-table-column
    align='center'
      property="createDate"
      label="创建时间">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini" type="primary"
          @click="addMenu(scope.$index, scope.row)">添加到菜单</el-button>
      </template>
    </el-table-column>
  </el-table>
      <!-- <routine-list :max-height="maxHeight - 167"
      v-loading="loading"
                :btn-group="btnGroup"
                :limit="2"
                :fieldData="tableHeader"
                :modelData="data"
                :options='option'
                :total="total"
                :searchShow='false'
                @but-receipt="butFun"
                @selection-change="selectionChange"
                @row-click="rowClick"
                @size-change="sizeChange"
                @current-change="currentChange"/> -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getList">完成</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import ReportService from '@/service/report-service'

// import { RoutineList } from 'components/base/index'
export default {
  data () {
    return {
      height: '',
      loading: false,
      show: this.value,
      option: {
        limit: '',
        pn: 1,
        ps: 1,
        pageSizes: [],
        total: 1
      },
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
      selectionList: {}
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    changeNum: { type: Number,
      default: 0 },
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  created () {
    this.height = window.screen.availHeight / 2
    console.log(window.screen.availHeight + '****')
    // this.tableHeader = {
    //   listSubList: [
    //     { fieldExplain: '模板编码',
    //       fieldName: 'code',
    //       formSubmitType: 'ONE_TXT',
    //       columnWidth: '120',
    //       ishow: true },
    //     { fieldExplain: '模板名称',
    //       fieldName: 'title',
    //       formSubmitType: 'ONE_TXT',
    //       columnWidth: '120',
    //       ishow: true },
    //     { fieldExplain: '创建时间',
    //       fieldName: 'createDate',
    //       formSubmitType: 'ONE_TXT',
    //       columnWidth: '320',
    //       ishow: true }]
    // }
    this.data = [{
      'check': true,
      'code': 'cs001',
      'title': 'demo1',
      'createDate': '2019-04-12'

    } ]
    // this.data = temList.data
  },
  mounted () {

  },
  methods: {
    // TODO:添加到菜单列表
    addMenu (index, data) {
      ReportService.addMenu(data.id).then(res => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
      })
      console.log(index)
      console.log(data.id)
    },
    getData () {
      this.loading = true
      ReportService.getTemList('pu_weight').then(res => {
        this.data = res.data
        this.loading = false
        console.log(res.data)
      })
    },
    getList () {
      if (!this.selectionList.id) {
        this.$message({
          type: 'warning',
          message: '请选择一个模板!'
        })
        return false
      }
      this.$emit('getList', this.selectionList)
      console.log(this.selectionList)
      this.show = false
    },
    butFun (e) {
      switch (e) {
        case 'add':
          this.opType = 'op'
          this.$emit('add', this.opType)
          break
        case 'edit':
          // TODO: 编辑接口
          if (!this.selectionList.id) {
            this.$message({
              type: 'warning',
              message: '请选择一条数据!'
            })
            return false
          }
          if (!this.selectionList.id) {
            this.$message({
              type: 'warning',
              message: '不允许选择多条数据!'
            })
            return false
          }
          let item = this.selectionList
          this.regionForm = item
          // this.regionForm.region = [item.province, item.city, item.town]
          this.opType = 'op'
          this.$emit('edit', this.regionForm)
          break
        case 'delete':
          if (!this.selectionList.id) {
            this.$message({
              type: 'warning',
              message: '请选择一条数据!'
            })
            return false
          }
          if (!this.selectionList.id) {
            this.$message({
              type: 'warning',
              message: '不允许选择多条数据!'
            })
            return false
          }
          this.$confirm('确定删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading = true
            let id = this.selectionList.id
            console.log(ReportService)
            console.log(id)

            ReportService.remTem(id).then(res => {
              this.getData()
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // })
            })
          }).catch(() => {

          })
          break
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
      this.ps = ps
    },
    currentChange (pn) {
      this.pn = pn
    }
  },
  computed: {},
  watch: {
    value (n) {
      this.show = n
      if (n) {
        this.getData()
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
