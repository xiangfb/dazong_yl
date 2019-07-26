
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
          <el-button @click="initData" :loading="loadingBtn" type="primary">初始化数据</el-button>
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
            <el-form-item prop="name" label="名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="customTable" label="业务表">
              <el-input v-model="form.customTable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="beanSimpleName" label="实体简单类名">
              <el-input v-model="form.beanSimpleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="beanFullName" label="实体全类名">
              <el-input v-model="form.beanFullName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="description" label="描述">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <el-divider></el-divider>
          <edit-table :btnGroup="btnGroup" ref="editTable"
          select :max-height='maxHeight'
           :table-header="formAllout" :table-data="formAlloutData"  @but-receipt="butFun" :loading='false'></edit-table>
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
import { EditTable } from 'components/base/index'
import tableHead from '@/const/basic/formatHead'
import SourceService from 'service/source/custom-type.js'
// import { formatDate } from 'util/common-methods.js'
let commonType = 'customTable'
export default {
  name: 'custom-table',
  components: { EditTable },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  data () {
    return {
      name: '',
      loadingBtn: false,
      height: 300,
      idStatus: false,
      showAdd: false,
      loading: false,
      tableRow: {},
      form: {},
      btnGroup: [
        {
          btnType: 'primary',
          permision: '',
          name: 'save',
          label: '新增',
          type: 'btn'
        },
        {
          btnType: 'danger',
          permision: '',
          name: 'delete',
          label: '删除',
          type: 'btn'
        }
      ],
      formAllout: [],
      formAlloutData: [
        {
          fieldName: '',
          fieldDbName: '',
          fieldExplain: '',
          fieldType: ''
        }
      ], // 表格数据
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        description: [
          { required: false, message: '请输入描述', trigger: 'blur' }
        ],
        typeCode: [{ required: true, message: '请输入编号', trigger: 'blur' }]
      },
      type: '',
      data: [],
      page: {
        pageSize: 10
      },
      search: [],
      op: {
        name: 'like',
        customTable: 'like'
      },
      sort: [
        { key: 'createDate', dir: 'desc' }],
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
            overHidden: true,
            label: '名称',
            prop: 'name',
            search: true
          },
          {
            label: '业务表',
            overHidden: true,
            prop: 'customTable',
            search: true
          },
          {
            label: '实体简单类名',
            overHidden: true,
            prop: 'beanSimpleName'
          },
          {
            label: '实体全类名',
            overHidden: true,
            prop: 'beanFullName'
          },
          {
            label: '描述',
            overHidden: true,
            prop: 'description'
          },
          {
            label: '创建时间',
            prop: 'createDate',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
            // more:true,
            sort: true
            // search:true,
          },
          {
            label: '修改时间',
            prop: 'updateDate',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
            // more:true,
            sort: true
            // search:true,
          }
        ]
      }
    }
  },
  created () {
    this.formAllout = tableHead.child
    this.getAlert()
    // this.getData()
  },
  methods: {
    // 获取枚举列表
    getAlert () {
      SourceService.select({
      }, 'customEnum').then(res => {
        this.formAllout.map(item => {
          if (item.fieldName === 'fieldEnumId') {
            item.options = res.data.map(data => {
              data.label = data.enumDescribe
              data.value = data.id
              return data
            })
          }
        })
      })
    },
    initData () {
      if (validatenull(this.tableRow)) {
        this.$notify({
          showClose: true,
          message: '请选择初始化数据',
          type: 'error'
        })
        return false
      }
      this.loadingBtn = true
      let ids = this.tableRow.map(item => {
        return item.id
      })
      console.log(ids)
      SourceService.init({ ids }, commonType).then(res => {
        this.loadingBtn = false
        this.$message.success('初始化成功')
      })
    },
    butFun (type) { // 表格按钮触发
      switch (type) {
        case 'save':
          // this.formAlloutData.push({
          //   fieldName: '',
          //   fieldDbName: '',
          //   fieldExplain: '',
          //   fieldType: ''
          // })
          this.$refs.editTable.$refs.custom.$refs.editable.insert()
          break
        case 'delete':
          this.$refs.editTable.$refs.custom.$refs.editable.removeSelecteds()
          break
      }
    },
    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          var entitysub = this.$refs.editTable.$refs.custom.$refs.editable.getRecords()
          if (this.type === 'add') {
            if (entitysub[0].fieldName === '') {
              this.$message.error('请填写属性')
              return false
            }
            this.form.id = ''
            // TODO:调用接口  添加数据
            SourceService.create({ entity: this.form, entitysub }, commonType).then(
              res => {
                if (res.success) {
                  this.$notify({
                    showClose: true,
                    message: '新增成功',
                    type: 'success'
                  })
                  this.showAdd = false
                  this.type = ''
                  this.getData()
                }
              }
            )
          } else {
            this.form.id = this.tableRow[0].id
            // TODO:调用接口  修改数据
            SourceService.update({ entity: this.form, entitysub }, commonType).then(
              res => {
                if (res.success) {
                  this.$notify({
                    showClose: true,
                    message: '修改成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.type = ''
                  this.showAdd = false
                  this.form.id = ''
                  this.getData()
                }
              }
            )
          }
        }
      })
    },
    resetForm () {
      this.$refs.form.resetFields()
      this.$refs.editTable.$refs.custom.$refs.editable.reset()
    },
    reset () {
      this.showAdd = false
    },
    addRow () {
      this.idStatus = false
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
      // TODO:调用接口  数据初始化
      SourceService.list(params, commonType).then(res => {
        this.data = res.data.list
        if (this.data.length) {
          // this.data.map(v => {
          //   v.createDate = formatDate(v.createDate)
          //   v.updateDate = formatDate(v.updateDate)
          // })
          // for (let i in this.data[0]) {
          //   if (
          //     i !== "createDate" &&
          //     i !== "createUser" &&
          //     i !== "updateDate" &&
          //     i !== "updateUser" &&
          //     i !== "deleted"
          //   ) {
          //     this.$set(this.form, i, this.data[0][i]);
          //   }
          // }
        }
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
      this.idStatus = true
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
