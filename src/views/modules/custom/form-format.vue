<template>
  <div class="card__body_p_10" :style="{'height': `${maxHeight + 5}px`, 'overflow-y': 'auto'}">
    <basic-container v-show="!showAdd" class="p-n">
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
          <el-button @click="addRow" :loading="butLoading" type="primary">新增</el-button>
          <el-button @click="copy" :loading="butLoading" type="warning">复制</el-button>
          <el-button @click="toSub" :loading="butLoading" type="success">属性配置</el-button>
          <el-button @click="toggleSelection" :loading="butLoading" type="danger">清空选择</el-button>
          <el-button @click="getSelectionAll" :loading="butLoading">获取已选</el-button>
        </template>
        <template slot="menuRight">
          <el-button type="primary" icon="el-icon-edit" @click="handleRowEdit" circle size="small"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small" @click="handleRowDel"></el-button>
        </template>
      </avue-crud>
    </basic-container>
    <basic-container v-if="showAdd" class="p-n">
      <el-button size="mini" @click="reset" :loading="butLoading" plain>返回</el-button>
      <br>
      <br>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="formatName" label="名称">
              <el-input v-model="form.formatName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="formatCode" label="编号">
              <el-input v-model="form.formatCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="formatType" label="模板类型">
              <!-- <el-input v-model="form.formatType"></el-input> -->
               <el-select disabled v-model="form.formatType" filterable  placeholder="请选择">
                <el-option
                  v-for="item in optionsType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="formatStyle" label="模板样式">
               <el-select v-model="form.formatStyle" filterable  placeholder="请选择">
                <el-option
                  v-for="(item, index) in formatStyle"
                  :key="index"
                  :label="item"
                  :value="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="cgCustomTypeId" label="业务类型">
              <el-select v-model="form.cgCustomTypeId" filterable  placeholder="请选择">
                <el-option
                  v-for="item in customTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  <!-- <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="resMethod" label="列表请求方式">
              <el-select v-model="form.resMethod" clearable placeholder="请选择">
                <el-option
                  v-for="item in methods"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="resUrl" label="列表请求路由">
              <el-input v-model="form.resUrl"></el-input>
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
import $temporary from '@/const/basic/temporary'
import { validatenull } from '@/util/validate'
import CustomType from 'service/source/custom-type'
let commonType = 'format'
export default {
  name: 'form-format',
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  data () {
    return {
      butLoading: true,
      formatStyle: $temporary.formatStyle['FROM']['keyLabel'],
      formatType: $temporary.formatType,
      name: '',
      showAdd: false,
      loading: false,
      tableRow: {},
      form: { formatType: 'FORM' },
      rules: {
        formatName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      customTypes: [],
      type: '',
      data: [],
      page: {
        pageSize: 10
      },
      search: [{ 'key': 'formatType', 'op': 'eq', 'val': 'FORM' }],
      op: {
        formatName: 'like'
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
            label: '名称',
            prop: 'formatName',
            overHidden: true,
            search: true
          },
          {
            label: '编码',
            overHidden: true,
            prop: 'formatCode'
          },
          {
            label: '模板类型',
            overHidden: true,
            prop: 'formatTypeLabel',
            solt: true
          },
          {
            label: '模板样式',
            overHidden: true,
            prop: 'formatStyle',
            solt: true
          },
          {
            label: '业务类型',
            overHidden: true,
            prop: 'cgCustomTypeName'
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
            sort: true
          },
          {
            label: '是否默认',
            overHidden: true,
            prop: 'isDefaultModel'
          }
        ]
      },
      methods: [
        // 请求方式
        {
          label: 'GET',
          value: 'GET'
        },
        {
          label: 'POST',
          value: 'POST'
        },
        {
          label: 'PUT',
          value: 'PUT'
        },
        {
          label: 'DELETE',
          value: 'DELETE'
        }
      ],
      optionsType: [
        {
          value: 'FORM',
          label: '表单'
        }
      ]
    }
  },
  created () {
    // this.getData()
    this.getCustomTypes()
  },
  methods: {
    initTableData (message) { // 修改table数据后初始化数据
      this.$notify({
        showClose: true,
        message: message,
        type: 'success'
      })
      this.form = { formatType: 'FORM' }
      this.type = ''
      this.showAdd = false
      this.page.currentPage = 1
      this.getData()
    },
    submitForm () {
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
    resetForm () {
      this.$refs.form.resetFields()
    },
    reset () {
      this.showAdd = false
    },
    addRow () {
      this.form = { formatType: 'FORM' }
      this.showAdd = true
      this.type = 'add'
    },
    copy () {
      if (this.tableRow.length > 0) {
        let result = []
        this.tableRow.map(item => {
          result.push(item.id)
        })
        CustomType.copy({ ids: result }, commonType).then(res => {
          if (res.success) {
            this.$notify({
              showClose: true,
              message: '操作成功！',
              type: 'success'
            })
            this.getData()
          }
        })
      } else {
        this.$notify({
          showClose: true,
          message: '请选择要复制的数据！',
          type: 'error'
        })
        return false
      }
    },
    // 属性配置
    toSub () {
      if (validatenull(this.tableRow)) {
        this.$notify({
          showClose: true,
          message: '请选择一行要配置的数据',
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
      let data = this.tableRow[0]
      if (data.formatType === 'LIST' || data.formatType === 'FORM') {
        this.$router.push({ path: '/custom/format/form/sub', query: { 'id': data.id, type: 'form' } })
      } else {
        this.$notify({
          showClose: true,
          message: '模板类型异常，请等待完善',
          type: 'error'
        })
        return false
      }
    },
    // 清空选择
    toggleSelection () {
      this.$refs.crud.selectClear()
    },
    getSelectionAll () {
      console.log(this.$refs.crud.tableSelect)
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
    getCustomTypes () {
      CustomType.select({}, 'customType').then(res => {
        this.customTypes = res.data
      })
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
      this.butLoading = true
      this.loading = true
      CustomType.list(params, commonType).then(res => {
        if (res.success) {
          this.page.total = res.data.total
          this.data = res.data.list.map(item => {
            item.formatStyle = this.formatStyle[item.formatStyle]
            item.formatTypeLabel = this.formatType[item.formatType]
            return item
          })
          this.butLoading = false
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
     * 修改
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
      this.form = { formatType: 'FORM' }
      for (let i in this.tableRow[0]) {
        if (i !== 'createDate' && i !== 'createUser' && i !== 'updateDate' && i !== 'updateUser' && i !== 'deleted') {
          if (i === 'formatStyle') {
            this.$set(this.form, i, $temporary.formatStyle['FROM']['labelKey'][this.tableRow[0][i]])
          } else {
            this.$set(this.form, i, this.tableRow[0][i])
          }
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
        // 调用接口 删除选中数据
        CustomType.delete({ ids: ids }, commonType).then(res => {
          if (res.success) {
            this.$refs.crud.toggleSelection()
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
