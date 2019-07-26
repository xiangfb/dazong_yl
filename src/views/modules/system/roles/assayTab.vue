<template>
    <div>
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
          :table-loading="loadingT"
          :option="option">
          <template slot="menuLeft">
            <el-button @click="addClick" type="primary">添加化验单</el-button>
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
import menu from 'service/admin/systemServe'
import { validatenull } from '@/util/validate'
import tabDetail from './tabDetail'

export default {
  name: 'primary',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: [String, Number]
    }
  },
  watch: {
    value: {
      handler (n) {
        if (!n) {
          this.getData()
        }
        console.log('当前tab', n)
      },
      immediate: true,
      deep: true
    },
    roleId: {
      handler (n) {
        if (n) {
          this.getData()
        }
      },
      deep: true
    }
  },
  data () {
    return {
      name: '',
      userShow: false,
      loadingT: false,
      tableRow: {},
      form: {},
      rules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      menus: [],
      type: '',
      data: [],
      page: {
        pageSize: 10
      },
      search: [],
      op: {
        username: 'like'
      },
      sort: [{ key: 'id', dir: 'desc' }],
      option: {
        title: '',
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
            label: '化验单编号',
            prop: 'formatCode',
            overHidden: true,
            search: true
          },
          {
            label: '化验单名称',
            overHidden: true,
            prop: 'formatName'
          }
        ]
      }
    }
  },
  methods: {
    addClick () {
      this.$emit('addClick')
    },
    async addUser () {
      let assayIds = []
      this.dataList.filter(item => {
        assayIds.push(item.id)
      })
      console.log('你提交的数据是', assayIds)
      if (this.dataList === undefined) {
        this.$message.error('请选择添加的化验单')
        return false
      }
      if (this.dataList.length < 1) {
        this.$message.error('请选择添加的化验单')
        return false
      }

      let result = await menu.addUsers({
        'roleId': this.roleId,
        assayIds })
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
      console.log('success')
      this.getData()
    },
    getData () {
      // roleUser
      let limit = {
        ps: this.page.pageSize,
        pn: this.page.currentPage
      }
      let params = { sort: this.sort, limit: limit, search: this.search }
      this.loadingT = true
      menu.orgListC(this.roleId, params, 'roles', 'ass').then(res => {
        if (res.success) {
          this.page.total = res.data.total
          this.data = res.data.list
          this.loadingT = false
          this.$refs.crud.toggleSelection()
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
      let ids = this.tableRow.map(item => {
        return item.id
      })
      this.$confirm('是否删除选中的数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = { 'roleId': this.roleId, assayIds: ids }
        console.log(obj)
        menu.deleteOrgs(obj, 'roles', 'ass').then(res => {
          if (res.success) {
            this.getData()
            this.$message.success('删除成功!')
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
      this.sort = [{ key: 'id', dir: 'desc' }]
      this.page.currentPage = 1
      this.page.pageSize = this.page.pageSizes[0]
      this.getData()
    }

  },
  comporents: { tabDetail } // 注册
}

</script>
