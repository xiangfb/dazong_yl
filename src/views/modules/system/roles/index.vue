
<template>
<el-scrollbar ref="elscrollbar" :style="{height: `${maxHeight}px`}" class="p-b-n">
  <div class="table-container pull-chheight">
    <el-dialog :fullscreen='true' title="权限配置" :visible.sync="authorityShow">
      <primary @sub='authorityShow=false' :show='authorityShow' :roleId='roleId'/>
    </el-dialog>
    <el-dialog :fullscreen='true' title="角色配置" :visible.sync="adminShow">
      <admin  :roleId='roleId'/>
    </el-dialog>
    <basic-container v-show="!showAdd">
      <avue-crud
        ref="crud"
        @size-change="sizeChange"
        @current-change="currentChange"
        @on-load="onLoad"
        @search-change="searchChange"
        @sort-change="sortChange"
        @date-change="dateChange"
        @selection-change="selectionChange"
        @refresh-change="refreshChange"
        :page="page"
        :data="data"
        :table-loading="loading"
        :option="option">
        <template slot="menuLeft">
          <el-button-group>
            <el-button style="margin-right:0" @click="authority" type="primary">权限配置</el-button>
            <el-button style="margin-right:0" @click="admin" type="primary">用户配置</el-button>
          </el-button-group>
        </template>
        <template slot="menuRight">
          <el-button type="primary" icon="el-icon-plus" @click="addRow" circle size="small"></el-button>
          <el-button type="primary" icon="el-icon-edit" @click="handleRowEdit" circle size="small"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small" @click="handleRowDel"></el-button>
        </template>
      </avue-crud>
    </basic-container>
    <basic-container v-show="showAdd">
      <el-button size="mini" @click="reset" plain>返回</el-button>
      <br>
      <br>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="roleDesc" label="角色标识">
              <el-input v-model="form.roleDesc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="dictLabel" label="角色名称">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="centerBox">
          <el-button @click="submitForm" type="primary">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </el-form>
    </basic-container>
  </div>
   </el-scrollbar>
</template>

<script>
import { validatenull } from '@/util/validate'
import DictService from 'service/admin/systemServe'
import primary from './primary'
import admin from './admin'
const commonType = 'roles'
export default {
  name: 'roles',
  components: {
    primary, admin
  },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  data () {
    return {
      roleId: '', // 角色ID
      authorityShow: false, // 权限配置
      adminShow: false, // 用户配置
      name: '',
      showAdd: false,
      loading: false,
      tableRow: {},
      form: {},
      rules: {
        dictTypeId: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      DictServices: [],
      type: '',
      data: [],
      page: {
        pageSize: 10
      },
      search: [{ 'key': 'formatType', 'op': 'eq', 'val': 'FORM' }],
      op: {
        dictTypeId: 'like'
      },
      sort: [{ key: 'createDate', dir: 'desc' }],
      option: {
        title: '角色管理',
        border: true,
        align: 'center',
        addBtn: false,
        menu: false,
        menuAlign: 'center',
        menuType: 'text',
        dateBtn: false,
        selection: true,
        searchShow: false,
        column: [
          {
            label: '角色标识',
            prop: 'roleDesc',
            search: true
          },
          {
            label: '角色名称',
            prop: 'roleName'
          },
          {
            label: '创建时间',
            prop: 'createDate',
            type: 'date',
            // format: 'yyyy-MM-dd hh:mm:ss',
            // valueFormat: 'yyyy-MM-dd hh:mm:ss',
            // more:true,
            sort: true
            // search:true,
          },
          {
            label: '修改时间',
            prop: 'updateDate',
            type: 'date',
            // format: 'yyyy-MM-dd hh:mm:ss',
            // valueFormat: 'yyyy-MM-dd hh:mm:ss',
            // more:true,
            sort: true
            // search:true,
          }
        ]
      },
      optionsType: [
        {
          value: 'LIST',
          label: '列表'
        }, {
          value: 'FORM',
          label: '表单'
        }, {
          value: 'SEARCH',
          label: '查询'
        }],
      value5: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    authority () { // 权限配置
      if (validatenull(this.tableRow)) {
        this.$notify({
          showClose: true,
          message: '请选择数据',
          type: 'error'
        })
        return false
      } else if (this.tableRow.length > 1) {
        this.$notify({
          showClose: true,
          message: '请选择一行数据，不要选择多行',
          type: 'error'
        })
        return false
      }
      this.roleId = this.tableRow[0].id
      this.authorityShow = true
    },
    admin () { // 用户配置
      if (validatenull(this.tableRow)) {
        this.$notify({
          showClose: true,
          message: '请选择数据',
          type: 'error'
        })
        return false
      } else if (this.tableRow.length > 1) {
        this.$notify({
          showClose: true,
          message: '请选择一行数据，不要选择多行',
          type: 'error'
        })
        return false
      }
      this.roleId = this.tableRow[0].id
      this.adminShow = true
    },
    initTableData (message) { // 修改table数据后初始化数据
      this.$notify({
        showClose: true,
        message: message,
        type: 'success'
      })
      this.form = {}
      this.type = ''
      this.showAdd = false
      this.page.currentPage = 1
      this.getData()
    },
    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            this.form.id = ''
            DictService.create({ entity: this.form }, commonType).then(res => {
              if (res.success) {
                this.initTableData('新增成功!')
              }
            })
          } else {
            this.form.id = this.tableRow[0].id
            DictService.update({ entity: this.form }, commonType).then(res => {
              if (res.success) {
                this.initTableData('修改成功!')
              }
            })
          }
        }
      })
    },
    resetForm () {
      this.$refs.form.resetFields()
    },
    reset () {
      this.showAdd = false
    },
    addRow () {
      if (this.data.length) {
        for (let i in this.data[0]) {
          this.$set(this.form, i, this.data[0][i])
        }
      }
      this.showAdd = true
      this.type = 'add'
    },
    onLoad (page) {
      this.page = page
      // this.page.pageSizes = [2, 10, 20];
      this.getData()
    },
    sizeChange (val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.getData()
      // this.getList()
    },
    currentChange (val) {
      this.page.currentPage = val
      this.getData()
    },
    refreshChange ({ page, searchForm }) { // 刷新
      this.getData()
    },
    getData () {
      let limit = {
        ps: this.page.pageSize,
        pn: this.page.currentPage
      }
      let params = { sort: this.sort, limit: limit, search: this.search }
      this.loading = true
      DictService.getList(params, commonType).then(res => {
        if (res.success) {
          this.page.total = res.data.total
          this.data = res.data.list
          this.loading = false
        } else {
          console.error(res)
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    searchChange (val) {
      this.search = [{ 'key': 'formatType', 'op': 'eq', 'val': 'FORM' }]
      for (let i in val) {
        if (val[i]) {
          this.search.push({
            key: i,
            op: this.op[i],
            val: val[i]
          })
        }
      }
      this.sort = [{ key: 'createDate', dir: 'desc' }]
      this.page.currentPage = 1
      this.page.pageSize = this.page.pageSizes[0]
      this.getData()
    },
    sortChange (val) {
      // this.$message.success('排序'+ JSON.stringify(val));
    },
    dateChange (val) {
      // this.$message.success(val);
    },
    selectionChange (list) {
      this.tableRow = list
      // this.$message.success('选中的数据'+ JSON.stringify(list));
    },
    /**
     * 批量修改
     **/
    handleRowEdit () {
      if (validatenull(this.tableRow)) {
        this.$notify({
          showClose: true,
          message: '请选择一行要编辑的数据',
          type: 'error'
        })
        return false
      } else if (this.tableRow.length > 1) {
        this.$notify({
          showClose: true,
          message: '请选择一行数据，不要选择多行',
          type: 'error'
        })
        return false
      }
      this.form = {}
      for (let i in this.tableRow[0]) {
        if (
          i !== 'createDate' &&
          i !== 'createUser' &&
          i !== 'updateDate' &&
          i !== 'updateUser' &&
          i !== 'deleted'
        ) {
          this.$set(this.form, i, this.tableRow[0][i])
        }
      }
      this.showAdd = true
      this.type = 'edit'
    },
    handleEdit (row, index) {
      this.$refs.crud.rowEdit(row, index)
    },
    /**
     * 批量删除
     **/
    handleRowDel () {
      if (validatenull(this.tableRow)) {
        this.$notify({
          showClose: true,
          message: '至少选择一行要删除的数据',
          type: 'error'
        })
        return false
      }
      // else if (this.tableRow.length > 1) {
      //   this.$notify({
      //     showClose: true,
      //     message: '请选择一行数据，不要选择多行',
      //     type: 'error',
      //   });
      //   return false;
      // }
      this.handleDel(this.tableRow)
    },
    handleDel (row, index) {
      this.$confirm('是否删除选中的数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.tableRow.map(item => {
          return item.id
        })
        DictService.delete({ ids: ids }, commonType).then(res => {
          if (res.success) {
            this.initTableData('删除成功!')
          }
        })
      }).catch(err => {
        console.log(err, '取消删除')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.centerBox {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
