<template>
  <div class="card__body_p_10" :style="{'height': `${maxHeight + 5}px`, 'overflow-y': 'auto'}">
    <basic-container v-show="!showAdd" class="p-n">
      <avue-crud
        class="auve_crud"
        ref="crud"
        :option="option"
        :page="page"
        :data="data"
        :table-loading="loading"
        @on-load="onLoad"
        @size-change="sizeChange"
        @current-change="currentChange"
        @search-change="searchChange"
        @sort-change="sortChange"
        @selection-change="selectionChange"
        @refresh-change="refreshChange">
      <template slot="menuLeft">
          <el-button @click="addRow" type="primary">新增</el-button>
        </template>
        <template slot="menuRight">
          <el-button type="primary" icon="el-icon-edit" @click="handleRowEdit" circle size="small"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small" @click="handleRowDel"></el-button>
        </template>
      </avue-crud>
    </basic-container>
    <basic-container v-if="showAdd" class="p-n">
      <el-button size="mini" @click="showAdd = false" plain>返回</el-button>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="name" label="名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="typeCode" label="编号">
              <el-input v-model="form.typeCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="description" label="描述">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="12">
           <el-form-item prop="cgCustomTableIds" label="业务表">
              <el-select v-model="form.cgCustomTableIds" multiple filterable placeholder="请选择">
                <el-option v-for="(item, index) in customTables" :key="index" :label="item.name" :value="item.id">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.customTable }}</span>
                </el-option>
              </el-select>
            </el-form-item>
           </el-col>
        </el-row>
        <div class="centerBox">
          <el-button @click="submitForm" :loading="butLoading" type="primary">提交</el-button>
          <el-button @click="resetForm" :loading="butLoading">重置</el-button>
        </div>
      </el-form>
    </basic-container>
  </div>
</template>

<script>
import { validatenull } from '@/util/validate'
import CustomType from 'service/source/custom-type'
let commonType = 'customType'
export default {
  name: 'custom-type',
  data () {
    return {
      butLoading: false,
      showAdd: false,
      type: '',
      search: [],
      op: {
        name: 'like'
      },
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
            label: '姓名',
            overHidden: true,
            prop: 'name',
            search: true
          },
          {
            label: '编码',
            overHidden: true,
            prop: 'typeCode'
          },
          {
            label: '描述',
            overHidden: true,
            prop: 'description'
          },
          {
            label: '创建时间',
            prop: 'createDate',
            overHidden: true,
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
      page: {
        pageSize: 10,
        currentPage: 1
      },
      data: [],
      tableRow: [],
      loading: true,
      form: {}, // 以下是新增属性
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        description: [
          { required: false, message: '请输入描述', trigger: 'blur' }
        ],
        typeCode: [
          { required: true, message: '请输入编号', trigger: 'blur' }
        ]
      },
      customTables: []
    }
  },
  mounted () {
    CustomType.select({}, 'customTable').then(res => {
      this.customTables = res.data
    })
  },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  methods: {
    addRow () { // 新增
      this.showAdd = true
      this.type = 'add'
    },
    onLoad (page) { // avue-crud初始化会触发
      this.page = page
      this.getData()
    },
    sizeChange (val) { // 更改每页多少条触发
      this.page.currentPage = 1
      this.page.pageSize = val
    },
    currentChange (val) { // 点击页码触发
      this.page.currentPage = val
    },
    searchChange (val) { // 搜索触发
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
      this.getData()
    },
    sortChange (val) { // TODO:排序触发
      console.log(val)
    },
    selectionChange (list) { // 选择触发
      this.tableRow = list
    },
    handleRowEdit () { // 编辑触发
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
      CustomType.view({}, commonType, this.tableRow[0].id).then(res => {
        if (res.success) {
          this.customType = res.data
          for (let i in this.customType) {
            if (i !== 'createDate' && i !== 'createUser' && i !== 'updateDate' && i !== 'updateUser' && i !== 'deleted') {
              this.$set(this.form, i, this.customType[i])
            }
          }
          this.showAdd = true
          this.type = 'edit'
        }
      })
    },
    handleRowDel () { // 批量删除触发
      if (validatenull(this.tableRow)) {
        this.$notify({
          showClose: true,
          message: '至少选择一行要删除的数据',
          type: 'error'
        })
        return false
      }
      this.$confirm('是否删除选中的数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.tableRow.map(item => {
          return item.id
        })
        CustomType.delete({ ids: ids }, commonType).then(res => {
          if (res.success) {
            this.$refs.crud.toggleSelection()
            this.initTableData('删除成功!')
          }
        })
      }).catch(err => {
        console.log(err, '取消删除')
      })
    },
    refreshChange ({ page, searchForm }) { // 刷新
      this.getData()
    },
    getData () { // 获取表格数据
      let params = {
        sort: this.sort,
        limit: {
          pn: this.page.currentPage,
          ps: this.page.pageSize
        },
        search: this.search
      }
      this.loading = true
      CustomType.list(params, commonType).then(res => {
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
            CustomType.create({ entity: this.form }, commonType).then(res => {
              if (res.success) {
                this.initTableData('新增成功!')
              }
              this.butLoading = false
            })
          } else {
            this.form.id = this.tableRow[0].id
            CustomType.update({ entity: this.form }, commonType).then(res => {
              if (res.success) {
                this.initTableData('修改成功!')
              }
              this.butLoading = false
            })
          }
        }
      })
    },
    resetForm () { // 重置表单数据
      this.$refs.form.resetFields()
    }
  },
  computed: {},
  watch: {},
  components: {}
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

<style lang="scss">
  .auve_crud{
    .el-input{
      width: auto !important;
    }
  }
</style>
