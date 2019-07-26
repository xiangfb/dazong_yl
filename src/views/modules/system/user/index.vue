<template>
  <el-scrollbar ref="elscrollbar" :style="{height: `${maxHeight}px`}" class="p-b-n">
    <div class="table-container pull-chheight">
      <el-dialog :fullscreen='true' title="权限配置" :visible.sync="authorityShow">
        <primary @sub='authorityShow=false' :show='authorityShow' :roleId='userId'/>
      </el-dialog>
      <groupOrg v-model="modelShow" :type='tabType'
      @getList='getTabData' />
      <basic-container v-show="!showAdd">
        <avue-crud
          ref="crud"
          @row-click='clickRow'
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
          <template slot="iadmin"  slot-scope="scope" >
            <el-tag v-if="scope.row.iadmin===1">是</el-tag>
            <el-tag v-else type="warning">否</el-tag>
          </template>
          <template slot="lockFlag"  slot-scope="scope" >
            <el-tag>{{scope.row.lockFlag==='0'?'正常':'锁定'}}</el-tag>
          </template>
          <template slot="userType"  slot-scope="scope" >
            <el-tag>{{scope.row.userType===0?'Web用户':'手持机用户'}}</el-tag>
          </template>
          <template slot="menuLeft">
            <el-button @click="addRow" type="primary">新增</el-button>
            <el-button @click="authority" type="primary">权限配置</el-button>
            <el-button @click="forgetpwd" type="primary" :loading="loading">重置密码</el-button>
            <el-button @click="changRoles" type="primary">查看角色信息</el-button>
          </template>
          <template slot="menuRight">
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
              <el-form-item prop="username" label="用户名">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="realname" label="真实姓名">
                <el-input v-model="form.realname"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="phone" label="手机号">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="groupId" label="集团">
                <el-link @click="changeShow('groupShow')" icon="el-icon-edit">{{form.groupName?form.groupName:'选择集团'}}</el-link>
                <!-- <el-input v-model="form.groupId"></el-input> -->
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="orgId" label="公司">
                <el-link @click="changeShow('orgShow')" icon="el-icon-edit">{{form.orgName?form.orgName:'选择公司'}}</el-link>
                <!-- <el-button type="primary">公司<i class="el-icon-arrow-right el-icon--right"></i></el-button> -->
                <!-- <el-input v-model="form.orgId"></el-input> -->
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item prop="iadmin" label="用户类型">
                <el-switch
                  v-model="form.iadmin"
                  :active-value='1'
                  :inactive-value='0'
                  active-text="管理员"
                  inactive-text="普通用户">
                </el-switch>
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
    <!-- 弹窗 -->
    <el-dialog title="用户角色列表" :visible.sync="roleShow">
      <el-dialog
        width="30%"
        title="待选角色列表"
        :visible.sync="innerRoleShow"
        append-to-body>
        <CustomBtnGroup class="m-b-15" @on-click="butFun2" :limit="4" :btnGroup="btnGroup2"></CustomBtnGroup>
        <CustomTable
          class="m-b-15"
          ref="table2"
          :Showselection="true"
          :data="tableData2"
          id="table2"
          rowKey="id1"
          @selection-change="selectChange"
          :tableHeader="tableHeader"
        ></CustomTable>
        <!-- <edit-table :btnGroup="btnGroup2" @change="selectChange" ref="editTable" :select="true" :table-header="tableHeader" :loading="loading" :table-data="tableData2" :max-height="1067" @but-receipt="butFun2"></edit-table> -->
      </el-dialog>
      <CustomBtnGroup class="m-b-15" @on-click="butFun" :limit="4" :btnGroup="btnGroup"></CustomBtnGroup>
      <CustomTable
        class="m-b-15"
        ref="table1"
        :Showselection="true"
        :data="tableData"
        id="table1"
        rowKey="id2"
        @selection-change="selectChange"
        :tableHeader="tableHeader"
      ></CustomTable>
      <!-- <edit-table :btnGroup="btnGroup" @change="selectChange" ref="editTable" :select="true" :table-header="tableHeader" :loading="loading" :table-data="tableData" :max-height="1067" @but-receipt="butFun"></edit-table> -->
    </el-dialog>
  </el-scrollbar>
</template>

<script>
import { validatenull } from '@/util/validate'
// import DictService from 'service/source/custom-type'
import groupOrg from './groupOrg'
import DictService from 'service/admin/systemServe'
import UserService from 'service/user-service'
// import { EditTable } from 'components/base/index'
import primary from './primary'
const commonType = 'sysUser'
export default {
  name: 'sysUser',
  components: {
    groupOrg, primary
  },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  data () {
    return {
      name: '',
      userId: '',
      tabType: '',
      authorityShow: false,
      modelShow: false, // 集团-公司模块显示
      showAdd: false,
      loading: false,
      roleShow: false,
      innerRoleShow: false,
      tableRow: {},
      form: {},
      selectList: [],
      tableHeader: [
        {
          fieldName: 'roleName',
          fieldExplain: '角色',
          ishow: true
        },
        {
          fieldName: 'updateDate',
          fieldExplain: '更新时间',
          ishow: true
        }
      ],
      tableData: [],
      tableData2: [],
      btnGroup: [
        {
          icon: 'el-icon-back',
          btnType: '',
          permision: '',
          name: 'cancel',
          label: '取消',
          type: 'btn'
        },
        {
          icon: 'el-icon-plus',
          btnType: 'primary',
          permision: '',
          name: 'add',
          label: '添加',
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
      btnGroup2: [
        {
          icon: 'el-icon-back',
          btnType: '',
          permision: '',
          name: 'cancel',
          label: '取消',
          type: 'btn'
        },
        {
          icon: 'el-icon-check',
          btnType: 'primary',
          permision: '',
          name: 'push',
          label: '提交',
          type: 'btn'
        }
      ],
      rules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      DictServices: [],
      type: '',
      data: [],
      page: {
        pageSize: 10
      },
      search: [],
      // search: [{ 'key': 'formatType', 'op': 'eq', 'val': 'FORM' }],
      op: {
        username: 'like'
      },
      sort: [{ key: 'createDate', dir: 'desc' }],
      option: {
        title: '用户管理',
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
            sortable: true,
            label: '用户名',
            prop: 'username',
            overHidden: true,
            search: true
          },
          {
            sortable: true,
            label: '真实姓名',
            overHidden: true,
            prop: 'realname'
          },
          {
            sortable: true,
            label: '用户状态',
            slot: true,
            prop: 'lockFlag'
          },
          {
            label: '是否管理员',
            slot: true,
            prop: 'iadmin'
          },
          {
            label: '用户类型',
            slot: true,
            prop: 'userType'
          },
          {
            label: '手机号',
            overHidden: true,
            prop: 'phone'
          },
          {
            label: '所属集团',
            overHidden: true,
            prop: 'groupName'
          },
          {
            label: '所属公司',
            overHidden: true,
            prop: 'orgName'
          },
          {
            label: '创建时间',
            prop: 'createDate',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            overHidden: true,
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
            // more:true,
            sort: true
            // search:true,
          },
          {
            label: '修改时间',
            prop: 'updateDate',
            overHidden: true,
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
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
    // this.getData()
  },
  methods: {
    clickRow (row) {
      this.$refs.crud.toggleRowSelection(row)
      console.log(row)
    },
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
      this.userId = this.tableRow[0].id
      this.authorityShow = true
    },
    getTabData (e, type) { // 获取集团-公司选中的数据
      if (type === 'groupShow') {
        this.form.groupId = e.id
        this.form.groupName = e.groupName
      } else if (type === 'orgShow') {
        this.form.orgId = e.id
        this.form.orgName = e.orgName
      }
      this.modelShow = false
    },
    changeShow (type) { // 集团-公司模块显示状态
      this.modelShow = true
      this.tabType = type
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
            let obj = {
              username: this.form.username,
              realname: this.form.realname,
              password: this.form.password,
              groupId: this.form.groupId,
              phone: this.form.phone,
              orgId: this.form.orgId,
              iadmin: this.form.iadmin
            }
            this.form.id = ''
            DictService.create({ entity: obj }, commonType).then(res => {
              if (res.success) {
                this.initTableData('新增成功!')
              }
            })
          } else {
            this.form.id = this.tableRow[0].id
            DictService.update({ entity: this.form }, commonType).then(res => {
              if (res.success) {
                this.$refs.crud.toggleSelection()
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
      this.form = {}
      this.showAdd = true
      this.type = 'add'
    },
    changRoles () {
      if (!this.tableRow.length) {
        this.$notify({
          showClose: true,
          message: '请选择用户',
          type: 'error'
        })
        return false
      } else if (this.tableRow.length > 1) {
        this.$notify({
          showClose: true,
          message: '只能选择一个用户',
          type: 'error'
        })
        return false
      } else {
        this.roleShow = true
        this.getHasRoles()
      }
    },
    selectChange (list) {
      this.selectList = []
      list.map(res => {
        this.selectList.push(res.id)
      })
    },
    butFun (e) {
      switch (e) {
        case 'add':
          this.innerRoleShow = true
          this.getNotRoles()
          break
        case 'cancel':
          this.roleShow = false
          break
        case 'delete':
          this.deleteRoles()
          break
      }
    },
    butFun2 (e) {
      switch (e) {
        case 'push':
          this.addRows()
          break
        case 'cancel':
          this.innerRoleShow = false
          break
      }
    },
    deleteRoles () {
      if (!this.selectList.length) {
        this.$notify({
          showClose: true,
          message: '请至少选择一个角色',
          type: 'error'
        })
        return false
      } else {
        DictService.deleteRoles({ userId: this.tableRow[0].id, roleIds: this.selectList }).then(res => {
          if (res.success) {
            this.$notify({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this.getHasRoles()
          } else {
            this.$notify({
              showClose: true,
              message: res.msg,
              type: 'error'
            })
          }
        })
      }
    },
    addRows () {
      if (!this.selectList.length) {
        this.$notify({
          showClose: true,
          message: '请至少选择一个角色',
          type: 'error'
        })
        return false
      }
      DictService.addRoles({ userId: this.tableRow[0].id, roleIds: this.selectList }).then(res => {
        if (res.success) {
          this.innerRoleShow = false
          this.$notify({
            showClose: true,
            message: '添加角色成功',
            type: 'success'
          })
          this.getNotRoles()
          this.getHasRoles()
        } else {
          this.$notify({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    getHasRoles () {
      var params = {
        limit: { ps: 1000, pn: 1 }
      }
      DictService.userRoleList(this.tableRow[0].id, params).then(res => {
        if (res.success) {
          this.tableData = res.data.list
        } else {
          this.$notify({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    getNotRoles () {
      var params = {
        limit: { ps: 1000, pn: 1 }
      }
      DictService.chooseRoleList(this.tableRow[0].id, params).then(res => {
        if (res.success) {
          this.tableData2 = res.data.list
        } else {
          this.$notify({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    forgetpwd () {
      if (!this.tableRow.length) {
        this.$notify({
          showClose: true,
          message: '请选择用户',
          type: 'error'
        })
        return false
      } else if (this.tableRow.length > 1) {
        this.$notify({
          showClose: true,
          message: '请选择一个用户',
          type: 'error'
        })
        return false
      } else {
        this.loading = true
        UserService.forgetpwd(this.tableRow[0].id).then(res => {
          if (res.success) {
            this.$notify({
              showClose: true,
              message: '重置成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.msg)
          }
        }).finally(() => {
          this.loading = false
        })
      }
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
      this.search = []
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
