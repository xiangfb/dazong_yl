<template>
  <div class="report-box">
    <!-- 时间过滤 -->
    <el-dialog
      title="条件筛选"
      width="40%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :visible.sync="factorScreenShow">
      <el-form>
        <el-form-item label="开始日期" label-width="120px">
          <div class="block">
            <el-date-picker
              v-model="params.startTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="结束日期" label-width="120px">
          <div class="block">
            <el-date-picker
              v-model="params.endTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subTimeRange">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 模板列表 -->
    <el-dialog
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :close-on-click-modal='false'
      :close-on-press-escape='false'
      :show-close = 'false'
      width="80%" title="模板列表" :visible.sync="temListShow">
      <div class="flex">
        <div class="flex-1">
          <el-button-group>
            <el-button type="primary" @click='operateTemplate("add")' icon="el-icon-plus">添加</el-button>
            <el-button type="primary" @click='operateTemplate("edit")' icon="el-icon-edit">编辑</el-button>
            <el-button type="primary" @click='operateTemplate("delete")' icon="el-icon-delete">删除</el-button>
          </el-button-group>
        </div>
        <el-button type="primary" @click="getSelectionTemList">完成</el-button>
      </div>
      <el-table
        v-loading="temListLoading"
        ref="singleTable"
        :height="temListHeight"
        :data="temListData"
        highlight-current-row
        @current-change="selectionChange"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
        align='center'
          property="code"
          label="模板编码">
        </el-table-column>
        <el-table-column
        align='center'
          property="title"
          label="模板名称">
        </el-table-column>
        <el-table-column
        align='center'
          property="createDate"
          label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini" type="primary"
              @click="addMenu(scope.row)">添加到菜单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 添加/修改模板 -->
    <el-dialog width="80%" title="模板操作" @close='handleTemShow = false' :visible.sync="handleTemShow">
      <div class="flex ">
        <div class="flex-1 no_bottom">
          <el-form :inline="true" :model="reportModel">
            <el-form-item label="报表编号">
              <el-input :disabled="true" v-model="reportModel.code" placeholder="报表编号"></el-input>
            </el-form-item>
            <el-form-item label="报表名称">
              <el-input v-model="reportModel.title" placeholder="报表名称"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- <el-button type="primary" :disabled="active === 2 && rightData.length>0?false:true" @click="edit">项目修改</el-button> -->
      </div>
      <div class="flex add-main m-t-20">
        <div>
          <el-steps direction="vertical" :active="stepActive">
            <el-step title="统计依据"></el-step>
            <el-step title="统计内容"></el-step>
            <el-step title="统计排序"></el-step>
            <el-step title="自定义配置"></el-step>
          </el-steps>
        </div>
        <div class="searchBox" v-if="stepActive >= 3">
        </div>
        <el-transfer
          v-else
          ref='transfer'
          v-loading="transferLoading"
          target-order="push"
          @right-check-change='rightListChange'
          @change='transferChange'
          :titles="titles"
          v-model="transferValue"
          :props="{
            key: 'index',
            label: 'name'
          }"
          :data="transferData">
        </el-transfer>
      </div>
      <div slot="footer">
        <el-button @click="stepActive--" :disabled="stepActive < 1">上一步</el-button>
        <el-button v-if="stepActive >= 3" type="primary" @click="addSub">完成</el-button>
        <el-button v-else @click="stepActive++">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// views/modules/material/fr_report/report/index
// views/modules/devdemo/report/index
import ReportService from '@/service/report-service'
function getNowFormatDate (str) {
  var date = new Date()
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + str
  return currentdate
}
export default {
  data () {
    return {
      params: { // 条件查询列表
        limit: {
          pn: 1,
          ps: 10
        },
        startTime: getNowFormatDate('00:00:00'),
        endTime: getNowFormatDate('23:59:00')
      },
      pickerOptions: { // 禁止时间选比现在大的
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      factorScreenShow: true, // 时间过滤显示
      temListShow: false, // 模板列表显示
      handleTemShow: false, // 操作模板显示
      temListLoading: true,
      temListHeight: window.screen.availHeight * 0.5,
      temListData: [],
      selectionTemList: {},
      reportModel: {
        code: '',
        title: ''
      },
      stepActive: 0,
      titles: ['待选列', '已选列'],
      transferLoading: true,
      transferValue: [],
      transferData: [],
      rightData: [],
      entityParams: { // 添加模块
        template: {
          countFields: [],
          groupFields: [],
          orderFields: [],
          search: { searchItems: [], searchName: '' }
        },
        templateType: 'pu_weight',
        title: ''
      }
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    operateTemplate (e) {
      switch (e) {
        case 'add':
          this.getTransferData('group', 'groupFields')
          break
        case 'edit':
          this.hasSelectionTemList(() => {
            this.handleTemShow = true
          })
          ReportService.checkTem(this.selectionTemList.id).then(res => {
            if (res.success) {
              this.reportModel.title = res.data.title
              this.reportModel.code = res.data.code
            }
          })
          break
        case 'delete':
          this.hasSelectionTemList(() => {
            this.$confirm('确定删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.temListLoading = true
              ReportService.remTem(this.selectionTemList.id).then(res => {
                if (res.success) {
                  this.getTemList()
                }
              })
            }).catch(() => {})
          })
          break
      }
    },
    getTransferData (type, arr) { // 获取穿梭框数据
      this.handleTemShow = true
      ReportService.getTemData({
        templateType: 'pu_weight',
        [type]: 1
      }).then((res) => {
        if (res.success) {
          this.transferData = res.data.map((item, index) => {
            item['index'] = index
            item['name'] = item.fieldName
            return item
          })
          if (this.id !== 0) {
            console.log('进来没有啊')
            this.entity.template[arr] = this.editArr[arr]
            var key = []
            var len = this.entity.template[arr].length
            console.log(len)
            console.log(this.entity.template[arr])
            for (let i = 0; i < this.data.length; i++) {
              for (let j = 0; j < len; j++) {
                if (this.entity.template[arr][j].sourceName === this.data[i].name) {
                  this.entity.template[arr][j].key = i
                  this.data[i].oldField = this.entity.template[arr][j].source
                  this.data[i].oldName = this.entity.template[arr][j].sourceName
                  this.data[i].field = this.entity.template[arr][j].field
                  this.data[i].fieldName = this.entity.template[arr][j].fieldName
                  key.push(i)
                }
              }
            }
            this.key[arr + 'K'] = key
            if (arr) {
              this.entity.template[arr].map(item => {
                if (item.key || item.key === 0) {
                  this.data[item.key].name = `${item.sourceName}=${item.fieldName}`
                }
              })
            }
            console.log(key)
            this.value1 = key
          } else {
            if (arr) {
              this.entityParams.template[arr].forEach(item => {
                if (item.key || item.key === 0) {
                  this.transferData[item.key].name = `${item.sourceName}=${item.fieldName}`
                }
              })
            }
          }

          this.loading = false
        }
      })
    },
    rightListChange () {

    },
    transferChange () {

    },
    getTemList () { // 获取模板列表
      this.temListLoading = true
      ReportService.getTemList('pu_weight').then(res => {
        if (res.success) {
          this.temListData = res.data
          this.temListLoading = false
        }
      })
    },
    addMenu (data) { // TODO:添加到菜单列表
      ReportService.addMenu(data.id).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        }
      })
    },
    getSelectionTemList () { // 获取选中模板
      this.hasSelectionTemList(() => {
        this.temListShow = false
      })
    },
    hasSelectionTemList (callBack) { // 是否有选中数据
      if (!this.selectionTemList.id) {
        this.$message({
          type: 'error',
          message: '请选择一个模板！'
        })
        return false
      }
      if (callBack) {
        callBack()
      }
    },
    selectionChange (list) { // 选中一个模板
      this.selectionTemList = list
    },
    subTimeRange () { // 提交时间筛选
      if (this.params.startTime && this.params.endTime && (new Date(this.params.endTime) > new Date(this.params.startTime))) {
        this.factorScreenShow = false
        this.temListShow = true
        this.getTemList()
      } else {
        this.$message({
          type: 'error',
          message: '筛选条件不满足！'
        })
      }
    }
  },
  computed: {},
  watch: {},
  components: {}
}
</script>

<style lang="scss">
  .report-box{
    .el-dialog__body{
      padding-top: 10px !important;
    }
    .el-table__body tr.current-row>td{
      background-color: #8cb8ff !important;
    }
    .no_bottom .el-form-item{
      margin-bottom: 0 !important;
    }
    .add-main{
      justify-content: space-around;
    }
  }
</style>
