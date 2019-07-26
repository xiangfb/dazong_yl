<template>
  <div class="table-container pull-chheight">
      <avue-crud
        ref="crud"
        @size-change="sizeChange"
        @current-change="currentChange"
        @on-load="onLoad"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @selection-change="selectionChange"
        :page="page"
        :data="data"
        :table-loading="loading"
        :option="option">
        <template slot-scope="scope" slot="iadmin">
            <el-tag>{{scope.row.iadmin}}</el-tag>
        </template>
      </avue-crud>
  </div>
</template>

<script>
// import DictService from 'service/source/custom-type'
import DictService from 'service/admin/systemServe'
export default {
  name: 'userList',
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
        if (n) {
          this.getData()
        }
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
      showAdd: false,
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
      sort: [{ key: 'id', dir: 'desc' }],
      option: {
        title: '化验单列表',
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
          // {
          //   label: '创建时间',
          //   prop: 'createDate',
          //   type: 'date',
          //   overHidden: true,
          //   format: 'yyyy-MM-dd hh:mm:ss',
          //   valueFormat: 'yyyy-MM-dd hh:mm:ss'
          //   // more:true,
          //   // search:true,
          // },
          // {
          //   overHidden: true,
          //   label: '修改时间',
          //   prop: 'updateDate',
          //   type: 'date',
          //   format: 'yyyy-MM-dd hh:mm:ss',
          //   valueFormat: 'yyyy-MM-dd hh:mm:ss'
          //   // more:true,
          //   // search:true,
          // }
        ]
      },
      value5: []
    }
  },
  created () {

    // this.getData()
  },
  methods: {
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
    selectionChange (list) {
      this.tableRow = list
      this.$emit('checkList', list)
      // this.$message.success('选中的数据'+ JSON.stringify(list));
    },
    getData () {
      // userList
      let limit = {
        ps: this.page.pageSize,
        pn: this.page.currentPage
      }
      let params = { sort: this.sort, limit: limit, search: this.search }
      this.loading = true
      DictService.orgList(this.roleId, params, 'sysUser', 'ass').then(res => {
        if (res.success) {
          this.page.total = res.data.total
          this.data = res.data.list
          this.$refs.crud.toggleSelection()
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
