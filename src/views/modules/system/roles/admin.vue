<template>
  <div class="table-container pull-chheight">
    <el-dialog width="80%"
    append-to-body
    :visible.sync="userShow">
      <userList @checkList='checkList'  :roleId='roleId'/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userShow = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <basic-container>
      <avue-crud
        ref="crud"
        @size-change="sizeChange"
        @current-change="currentChange"
        @on-load="onLoad"
        @search-change="searchChange"
        @selection-change="selectionChange"
        @refresh-change="refreshChange"
        :page="page"
        :data="data"
        :table-loading="loading"
        :option="option">
        <template slot="menuLeft">
          <el-button @click="userShow=true" type="primary">添加用户</el-button>
        </template>
        <template slot="menuRight">
          <el-button type="danger" icon="el-icon-delete" circle size="small" @click="handleRowDel"></el-button>
        </template>
        <template slot-scope="scope" slot="iadmin">
            <el-tag>{{scope.row.iadmin}}</el-tag>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
// import DictService from 'service/source/custom-type'
import { validatenull } from '@/util/validate'
import DictService from 'service/admin/systemServe'
import userList from './userList'
export default {
  props: {
    roleId: {
      type: [String, Number]
    }
  },
  components: {
    userList
  },
  data () {
    return {
      name: '',
      userShow: false,
      loading: false,
      tableRow: {},
      form: {},
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
      op: {
        username: 'like'
      },
      sort: [{ key: 'createDate', dir: 'desc' }],
      option: {
        title: '角色配置',
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
            label: '用户名',
            prop: 'username',
            search: true
          },
          {
            label: '姓名',
            prop: 'realname'
          },
          {
            label: '是否管理员',
            prop: 'iadmin',
            solt: true
          },
          {
            label: '创建时间',
            prop: 'createDate',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss'
            // more:true,
            // search:true,
          },
          {
            label: '修改时间',
            prop: 'updateDate',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss'
            // more:true,
            // search:true,
          }
        ]
      }
    }
  },
  created () {

    // this.getData()
  },
  methods: {
    async addUser () {
      let userIds = []
      this.dataList.filter(item => {
        userIds.push(item.id)
      })
      console.log('你提交的数据是', userIds)
      if (this.dataList === undefined) {
        this.$message.error('请选择添加的用户')
        return false
      }
      if (this.dataList.length < 1) {
        this.$message.error('请选择添加的用户')
        return false
      }

      let result = await DictService.addUsers({
        'roleId': this.roleId,
        userIds })
      if (result) {
        this.userShow = false
        this.getData()
        this.$message.success('保存成功')
      }
    },
    checkList (e) { // 选中的数据
      this.dataList = e
      console.log('当前选中的数据', e)
    },
    resetForm () {
      this.$refs.form.resetFields()
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
      // roleUser
      let limit = {
        ps: this.page.pageSize,
        pn: this.page.currentPage
      }
      let params = { sort: this.sort, limit: limit, search: this.search }
      this.loading = true
      DictService.roleUser(this.roleId, params).then(res => {
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
    selectionChange (list) {
      this.tableRow = list
      // this.$message.success('选中的数据'+ JSON.stringify(list));
    },
    /**
     * 批量删除
     **/
    handleRowDel () {
      console.log(this.tableRow)
      if (validatenull(this.tableRow)) {
        this.$notify({
          showClose: true,
          message: '至少选择一行要删除的数据',
          type: 'error'
        })
        return false
      }
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
        let obj = { 'roleId': this.roleId, userIds: ids }
        DictService.deleteUsers(obj).then(res => {
          if (res.success) {
            this.getData()
            this.initTableData('删除成功!')
          }
        })
      }).catch(err => {
        console.log(err, '取消删除')
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
