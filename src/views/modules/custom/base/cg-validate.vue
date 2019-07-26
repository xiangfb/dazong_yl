
<template>
  <div class="card__body_p_10" :style="{'height': `${maxHeight + 5}px`, 'overflow-y': 'auto'}">
    <basic-container v-show="!showAdd" class="p-n">
      <avue-crud
        ref="crud"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="getData"
        @on-load="onLoad"
        @search-change="searchChange"
        @sort-change="sortChange"
        @date-change="dateChange"
        @selection-change="selectionChange"
        :page="page"
        :data="data"
        :table-loading="loading"
        :option="option"
      >
        <template slot="menuLeft">
          <el-button @click="addRow" type="primary">新增</el-button>
        </template>
        <template slot="menuRight">
          <el-button type="primary" icon="el-icon-edit" @click="handleRowEdit" circle size="small"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small" @click="handleRowDel"></el-button>
        </template>
      </avue-crud>
    </basic-container>
    <basic-container v-show="showAdd" class="p-n">
      <el-button size="mini" @click="reset" plain>返回</el-button>
      <br>
      <br>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="validateName" label="验证名称">
              <el-input v-model="form.validateName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="validateTitle" label="验证提醒">
              <el-input v-model="form.validateTitle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="validateMethod" label="验证正则">
              <el-input v-model="form.validateMethod"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-divider></el-divider>
          <edit-table :btnGroup="btnGroup" ref="editTable" select
           :table-header="formAllout" :table-data="formAlloutData"
        @but-receipt="butFun" :loading='false'></edit-table>-->
        <div class="centerBox">
          <el-button @click="submitForm" type="primary">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { validatenull } from '@/util/validate'
import SourceService from 'service/source/custom-type'
let commonType = 'cgValidate'
export default {
  name: 'custom-enum',
  // components: { EditTable },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
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
      },
      type: '',
      data: [],
      page: {
        pageSize: 10
      },
      search: [],
      op: {
        validateName: 'like',
        validateTitle: 'like'
      },
      sort: [{ key: 'createDate', dir: 'desc' }],
      option: {
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
            label: '验证名称',
            prop: 'validateName',
            overHidden: true,
            search: true
          },
          {
            label: '验证正则',
            overHidden: true,
            prop: 'validateMethod'
          },
          {
            label: '验证提醒',
            overHidden: true,
            prop: 'validateTitle',
            search: true
          },
          {
            label: '创建时间',
            prop: 'createDate',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
            sortable: true,
            // more:true,
            sort: true
            // search:true,
          }
        ]
      }
    }
  },
  methods: {
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
    submitForm () { // 表单提交
      this.$refs.form.validate(valid => {
        if (valid) {
          this.butLoading = true
          if (this.type === 'add') {
            this.form.id = ''
            SourceService.create({ entity: this.form }, commonType).then(res => {
              if (res.success) {
                this.initTableData('新增成功!')
              }
              this.butLoading = false
            })
          } else {
            this.form.id = this.tableRow[0].id
            SourceService.update({ entity: this.form }, commonType).then(res => {
              if (res.success) {
                this.initTableData('修改成功!')
              }
              this.butLoading = false
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
          if (
            i !== 'createDate' &&
            i !== 'createUser' &&
            i !== 'updateDate' &&
            i !== 'updateUser' &&
            i !== 'deleted'
          ) {
            this.$set(this.form, i, this.data[0][i])
          }
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
    getData () {
      let limit = {
        ps: this.page.pageSize,
        pn: this.page.currentPage
      }
      let params = { sort: this.sort, limit: limit, search: this.search }
      this.loading = true
      // TODO:调用接口  初始化列表数据
      SourceService.list(params, commonType).then(res => {
        this.data = res.data.list
        this.page.total = res.data.total
        this.loading = false
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
      SourceService.view({}, commonType, this.tableRow[0].id).then(res => {
        this.formAlloutData = res.data.entitysub
      })

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
          message: '请选择一行要删除的数据',
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
      })
        .then(() => {
          let ids = []
          this.tableRow.map(v => {
            ids.push(v.id)
          })
          // TODO:调用接口  删除选中的数据
          SourceService.delete({ ids: ids }, commonType).then(res => {
            if (res.success) {
              this.$notify({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
              this.$refs.crud.toggleSelection()
              this.getData()
            }
          })
        })
        .catch(err => {
          console.log(err)
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
