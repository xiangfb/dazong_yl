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
          <el-button @click="toggleSelection" :loading="butLoading" type="danger">清空选择</el-button>
          <el-button type="primary" @click="task(1)" :loading="butLoading">启用任务</el-button>
          <el-button type="primary" @click="task(2)" :loading="butLoading">暂停任务</el-button>
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
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="jobGroup" label="任务分组">
              <el-input v-model="form.jobGroup"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="jobName" label="任务名">
              <el-input v-model="form.jobName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="jobClass" label="执行方法">
              <el-input v-model="form.jobClass"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="cronJob" label="是否使用">
              <el-switch v-model="form.cronJob">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="cronExpression" label="cron">
              <el-input :disabled="!form.cronJob" v-model="form.cronExpression"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="message" label="任务描述">
              <el-input v-model="form.message"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="repeatTime" label="重复时间">
              <el-input :disabled="form.cronJob" v-model="form.repeatTime"></el-input>
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
import CustomType from 'service/admin/systemServe'

let commonType = 'task'
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
      name: '',
      showAdd: false,
      loading: false,
      tableRow: {},
      form: { },
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
      search: [],
      op: {
        jobName: 'like'
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
            label: '任务分组',
            overHidden: true,
            prop: 'jobGroup',
            solt: true
          },
          {
            label: '任务名',
            prop: 'jobName',
            search: true,
            overHidden: true
          },
          {
            label: 'cron',
            overHidden: true,
            prop: 'cronExpression'
          },
          {
            label: '执行方法',
            overHidden: true,
            prop: 'jobClass',
            solt: true
          },
          {
            label: '任务描述',
            overHidden: true,
            prop: 'message'
          },
          {
            label: '重复时间',
            overHidden: true,
            prop: 'repeatTime'
          },
          {
            label: '任务状态',
            overHidden: true,
            prop: 'statusTest',
            solt: true
          },
          {
            label: '创建人',
            overHidden: true,
            prop: 'createUserName'
          },
          {
            label: '修改人',
            overHidden: true,
            prop: 'updateUserName'
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
          }
        ]
      },
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
  },
  methods: {
    async task (type) {
      if (validatenull(this.tableRow)) {
        this.$notify({
          showClose: true,
          message: '请选择一行要编辑的数据',
          type: 'error'
        })
        return false
      }
      let result
      console.log('当前数据', this.tableRow)
      switch (type) {
        case 1:
          this.butLoading = true
          console.log('启用任务')
          result = await CustomType.startStack({ jobs: this.tableRow })
          if (result.success) {
            this.initTableData('任务启用成功!')
            this.$refs.crud.toggleSelection()
            this.butLoading = false
          }
          break
        case 2:
          if (this.tableRow.length > 1) {
            this.$notify({
              showClose: true,
              message: '请选择一行数据，不要选择多行',
              type: 'error'
            })
            return false
          }
          this.butLoading = true
          result = await CustomType.stopStack(this.tableRow[0].id)
          if (result.success) {
            this.initTableData('任务禁用成功!')
            this.$refs.crud.toggleSelection()
            this.butLoading = false
          }
          console.log('禁用任务')
          break
      }
    },
    initTableData (message) { // 修改table数据后初始化数据
      this.$notify({
        showClose: true,
        message: message,
        type: 'success'
      })
      this.form = { }
      this.type = ''
      this.showAdd = false
      this.page.currentPage = 1
      this.getData()
    },
    submitForm () {
      console.log('当前的form', this.form)
      this.$refs.form.validate(valid => {
        if (valid) {
          this.butLoading = true
          if (this.type === 'add') {
            this.form.id = ''
            if ('id' in this.form) {
              delete (this.form.id)
            }
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
      this.form = { }
      this.showAdd = true
      this.type = 'add'
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
      CustomType.getList(params, commonType).then(res => {
        if (res.success) {
          this.page.total = res.data.total
          this.data = res.data.list.map(item => {
            switch (item.status) {
              case 'execute':
                item['statusTest'] = '执行中'
                break
              case 'pause':
                item['statusTest'] = '暂停'
                break
              case 'unStartUp':
                item['statusTest'] = '未启动'
                break
            }
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
      this.form = { }
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
        CustomType.delete_(ids, commonType).then(res => {
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
