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
          <el-button @click="addRow" :loading="butLoading" type="primary">新增</el-button>
          <el-button @click="copy" :loading="butLoading" type="warning">复制</el-button>
          <el-button @click="toSub('dialog')" :loading="butLoading" type="success">属性配置</el-button>
          <el-button @click="toSub('factor')" :loading="butLoading" type="info">条件配置</el-button>
          <el-button @click="toggleSelection" :loading="butLoading" type="danger">清空选择</el-button>
        </template>
        <template slot="menuRight">
          <el-button type="primary" icon="el-icon-edit" @click="handleRowEdit" circle size="small"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small" @click="handleRowDel"></el-button>
        </template>
      </avue-crud>
    </basic-container>
    <basic-container v-if="showAdd" class="p-n">
      <el-button size="mini" @click="reset" plain>返回</el-button>
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
            <el-form-item prop="cgCustomTypeId" label="业务类型">
              <el-select v-model="form.cgCustomTypeId" filterable placeholder="请选择">
                <el-option
                  v-for="item in customTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                  <!-- <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="formatStyle" label="模板样式">
              <el-select v-model="form.formatStyle" filterable placeholder="请选择">
                <el-option
                  v-for="(item, index) in formatStyle"
                  :key="index"
                  :label="item"
                  :value="index"
                ></el-option>
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
          <el-col :span="12">
            <el-form-item prop="treeResMethod" label="树请求方式">
              <el-select v-model="form.treeResMethod" clearable placeholder="请选择">
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
            <el-form-item prop="treeResUrl" label="树请求路由">
              <el-input v-model="form.treeResUrl"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item prop="viewResourceSubName" label="树展示字段">
              <el-input v-model="form.viewResourceSubName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="valueResourceSubName" label="树传参字段">
              <el-input v-model="form.valueResourceSubName"></el-input>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="12">
            <el-form-item prop="viewResourceSubId" label="树展示字段">
              <el-select v-model="form.viewResourceSubId" filterable placeholder="请选择">
                <el-option
                  v-for="item in resourceSubs"
                  :key="item.id"
                  :label="item.fieldExplain"
                  :value="item.id"
                >
                  <span style="float: left">{{ item.fieldExplain }} {{ item.fieldName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.customTable }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="valueResourceSubId" label="树传参字段">
              <el-select v-model="form.valueResourceSubId" filterable placeholder="请选择">
                <el-option
                  v-for="item in resourceSubs"
                  :key="item.id"
                  :label="item.fieldExplain"
                  :value="item.id"
                >
                  <span style="float: left">{{ item.fieldExplain }} {{ item.fieldName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.customTable }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item prop="cgFormatParamId" label="列表查询字段">
              <el-select v-model="form.cgFormatParamId" filterable placeholder="请选择">
                <el-option
                  v-for="item in paramSubs"
                  :key="item.id"
                  :label="item.fieldExplain"
                  :value="item.id"
                >
                  <span style="float: left">{{ item.fieldExplain }} {{ item.fieldName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.customTable }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item prop="formatType" label="模板类型">
              <!-- <el-input v-model="form.formatType"></el-input> -->
              <el-select disabled v-model="form.formatType" filterable placeholder="请选择">
                <el-option
                  v-for="item in optionsType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
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
import $temporary from '@/const/basic/temporary'
import { validatenull } from '@/util/validate'
import SourceService from 'service/source/custom-type.js'
let commonType = 'format'
export default {
  name: 'dialog-format',
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  data () {
    return {
      butLoading: true,
      formatStyle: $temporary.formatStyle['DATALIST']['keyLabel'],
      formatType: $temporary.formatType,
      name: '',
      showAdd: false,
      loading: false,
      tableRow: {},
      form: { formatType: 'RESOURCE' },
      rules: {
        formatName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        treeResMethod: [
          { required: true, message: '请输入树请求方式', trigger: 'blur' }
        ],
        resMethod: [
          { required: true, message: '请输入列表请求路由', trigger: 'blur' }
        ]
      },
      customTypes: [],
      resourceSubs: [], // 弹窗属性配置列表
      paramSubs: [], // 弹窗查询条件属性列表
      type: '',
      data: [],
      page: {
        pageSize: 10
      },
      search: [{ key: 'formatType', op: 'eq', val: 'RESOURCE' }],
      op: {
        formatName: 'like'
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
            overHidden: true,
            prop: 'formatName',
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
            prop: 'formatTypeLabel'
          },
          {
            label: '模板样式',
            overHidden: true,
            prop: 'formatStyle'
          },
          {
            label: '业务类型',
            overHidden: true,
            prop: 'cgCustomTypeName'
          },
          {
            label: '树请求方式',
            overHidden: true,
            prop: 'treeResMethod'
          },
          {
            label: '树请求路由',
            overHidden: true,
            prop: 'treeResUrl'
          },
          {
            label: '列表请求方式',
            overHidden: true,
            prop: 'resMethod'
          },
          {
            label: '列表请求路由',
            overHidden: true,
            prop: 'resUrl'
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
      optionsType: [
        {
          value: 'LIST',
          label: '列表'
        },
        {
          value: 'FORM',
          label: '表单'
        },
        {
          value: 'SEARCH',
          label: '查询'
        },
        {
          value: 'RESOURCE',
          label: '弹窗'
        }
      ]
    }
  },
  created () {
    // this.getData()
    this.getCustomTypes()
  },
  methods: {
    initTableData (message) {
      // 修改table数据后初始化数据
      this.$notify({
        showClose: true,
        message: message,
        type: 'success'
      })
      this.form = { formatType: 'RESOURCE' }
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
            // 调用接口 添加数据
            SourceService.create({ entity: this.form }, commonType).then(
              res => {
                if (res.success) {
                  this.initTableData('新增成功!')
                }
                this.butLoading = false
              }
            )
          } else {
            this.form.id = this.tableRow[0].id
            // 调用接口  修改数据
            SourceService.update({ entity: this.form }, commonType).then(
              res => {
                if (res.success) {
                  this.initTableData('修改成功!')
                }
                this.butLoading = false
              }
            )
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
    copy () {
      if (this.tableRow.length > 0) {
        let result = []
        this.tableRow.map(item => {
          result.push(item.id)
        })
        console.log(result)
        SourceService.copy({ ids: result }, commonType).then(res => {
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
    addRow () {
      // 初始化下拉数据
      this.paramSubs = []
      this.resourceSubs = []
      this.form = { formatType: 'RESOURCE' }
      this.showAdd = true
      this.type = 'add'
    },
    // 属性配置
    toSub (type) {
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
      if (type === 'dialog') {
        this.$router.push({
          path: '/custom/format/form/sub',
          query: { id: data.id, type: type }
        })
      } else {
        this.$router.push({
          path: '/custom/format/form/factor',
          query: { id: data.id, type: type }
        })
      }
    },
    // 清空选择
    toggleSelection () {
      this.$refs.crud.toggleSelection()
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
      // 调用接口  获取业务类型下拉列表
      SourceService.select({}, 'customType').then(res => {
        this.customTypes = res.data
      })
    },
    getResourceSubss (id) {
      // 调用接口  获取弹窗属性字段下拉列表
      SourceService.subs(id).then(res => {
        if (res.success) {
          this.resourceSubs = res.data.resSubList
        }
      })
    },
    getParamSubs (id) {
      // 调用接口  获取弹窗条件字段下拉列表
      SourceService.search(id).then(res => {
        if (res.success) {
          this.paramSubs = res.data.paramList
        }
      })
    },
    getData () {
      // 调用接口 获取初始化数据
      let limit = {
        ps: this.page.pageSize,
        pn: this.page.currentPage
      }
      let params = { sort: this.sort, limit: limit, search: this.search }
      this.loading = true
      this.butLoading = true
      SourceService.list(params, commonType).then(res => {
        this.page.total = res.data.total
        this.data = res.data.list.map(item => {
          item.formatStyle = this.formatStyle[item.formatStyle]
          item.formatTypeLabel = this.formatType[item.formatType]
          return item
        })
        this.loading = false
        this.butLoading = false
      })
    },
    searchChange (val) {
      this.search = [{ key: 'formatType', op: 'eq', val: 'RESOURCE' }]
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
      let id = this.tableRow[0].id
      if (id) {
        // this.getResourceSubss(id)
        this.getParamSubs(id)
      }
      this.form = { formatType: 'RESOURCE' }
      for (let i in this.tableRow[0]) {
        if (
          i !== 'createDate' &&
          i !== 'createUser' &&
          i !== 'updateDate' &&
          i !== 'updateUser' &&
          i !== 'deleted'
        ) {
          if (i === 'formatStyle') {
            this.$set(
              this.form,
              i,
              $temporary.formatStyle['DATALIST']['labelKey'][this.tableRow[0][i]]
            )
          } else {
            this.$set(this.form, i, this.tableRow[0][i])
          }
        }
      }
      console.log(this.form.valueResourceSubId)
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
          // 调用接口 删除选中数据
          SourceService.delete({ ids: ids }, commonType).then(res => {
            if (res.success) {
              this.$refs.crud.toggleSelection()
              this.initTableData('删除成功!')
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
