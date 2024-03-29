<template>
  <div class="app-container pull-auto">
    <basic-container>
      <avue-crud ref="crud"
                 :page="page"
                 :data="tableData"
                 :table-loading="tableLoading"
                 :option="tableOption"
                 @current-change="currentChange"
                 @refresh-change="refreshChange"
                 @size-change="sizeChange"
                 @row-update="handleUpdate"
                 @row-save="handleSave"
                 @row-del="rowDel">
        <template slot="menuLeft">
          <el-button type="primary"
                     @click="handleAdd"
                     size="small"
                     v-if="permissions.generator_hospital_add">新 增</el-button>
          <br /><br />
        </template>
        <template slot-scope="scope"
                  slot="menu">
          <el-button type="primary"
                     v-if="permissions.generator_hospital_edit"
                     icon="el-icon-check"
                     size="small"
                     plain
                     @click="handleEdit(scope.row,scope.index)">编辑</el-button>
          <el-button type="danger"
                     v-if="permissions.generator_hospital_del"
                     icon="el-icon-delete"
                     size="small"
                     plain
                     @click="handleDel(scope.row,scope.index)">删除</el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
  import { fetchList, getObj, addObjaddObj, putObj, delObj } from '@/api/generator/hospital'
  import { tableOption } from '@/const/crud/generator/hospital'
  import { mapGetters } from 'vuex'
  export default {
    name: 'hospital',
    data() {
      return {
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20 // 每页显示多少条
        },
        listQuery: {
          current: 1,
          size: 20
        },
        tableLoading: false,
        tableOption: tableOption
      }
    },
    created() {
      this.getList()
    },
    mounted: function() { },
    computed: {
      ...mapGetters(['permissions'])
  },
  methods: {
    getList() {
      this.tableLoading = true
      fetchList(this.listQuery).then(response => {
        this.tableData = response.data.data.records
        this.page.total = response.data.data.total
        this.tableLoading = false
    })
    },
    currentChange(val) {
      this.page.current = val
      this.listQuery.current = val
      this.getList()
    },
    sizeChange(val) {
      this.page.size = val
      this.listQuery.size = val
      this.getList()
    },
    /**
     * @title 打开新增窗口
     * @detail 调用crud的handleadd方法即可
     *
     **/
    handleAdd: function() {
      this.$refs.crud.rowAdd()
    },
    handleEdit(row, index) {
      this.$refs.crud.rowEdit(row, index)
    },
    handleDel(row, index) {
      this.$refs.crud.rowDel(row, index)
    },
    rowDel: function(row, index) {
      var _this = this
      this.$confirm('是否确认删除ID为' + row.id + '的记录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return delObj(row.id)
        })
        .then(data => {
        _this.tableData.splice(index, 1)
      _this.$message({
        showClose: true,
        message: '删除成功',
        type: 'success'
      })
    })
    .catch(function(err) { })
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate: function(row, index, done) {
      putObj(row).then(data => {
        this.tableData.splice(index, 1, Object.assign({}, row))
      this.$message({
        showClose: true,
        message: '修改成功',
        type: 'success'
      })
      done()
    })
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave: function(row, done) {
      addObj(row).then(data => {
        this.tableData.push(Object.assign({}, row))
      this.$message({
        showClose: true,
        message: '添加成功',
        type: 'success'
      })
      done()
    })
    },
    /**
     * 刷新回调
     */
    refreshChange() {
      this.getList()
    }
  }
  }
</script>

<style lang="scss" scoped>
</style>

