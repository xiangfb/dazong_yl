<template>
  <div :style="{height: `${maxHeight}px`}" class="bg-white" v-loading="loading">
    <form-column
      v-if="!loading"
      ref="column"
      :columnNum="8"
      :btnGroup="btnGroup"
      :butLoading="butLoading"
      :fieldData="puNotice"
      :modelData="modelData['fd_al_calculation']"
      :isShowBut="false"
      @but-receipt="butReceipt">
    </form-column>
    <div class="p-10 p-t-n">
      <custom-edit-table
        class="m-b-10"
        ref="custom"
        :loading="loading"
        :table-header="puNoticeSub"
        :data="modelData['fd_al_calculate_sub']"
        border></custom-edit-table>
    </div>
    <popup-list width="70%" :visibleSync="visibleSync" title="选择磅单"> <!-- 按钮点击触发的弹窗需要 -->
      <el-form :inline="true" :model="search" class="p-10 p-b-n popup_list_box">
        <el-form-item label="过磅单号：">
          <el-input style="width: 110px !important;" v-model="search.billNo" placeholder="过磅单编号"></el-input>
        </el-form-item>
        <el-form-item label="起始日期：">
          <el-date-picker
             style="width: 180px !important;"
            v-model="search.startDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="起始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期：">
          <el-date-picker
             style="width: 180px !important;"
            v-model="search.endDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="车牌号码：">
          <el-input style="width: 110px !important;" v-model="search.carNo" placeholder="车牌号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPoundList()">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="p-10 p-t-n">
        <span class="p-r-10">合计车次: 0</span>
        <span class="p-r-10">合计原发: 0</span>
        <span class="p-r-10">合计实收: 0</span>
      </div>
      <div class="p-10">
        <custom-edit-table
          class="m-b-10"
          ref="custom"
          :loading="isLoading"
          :table-header="tableHeader"
          :data="tableData"
          border
          select
          @selection-change="handleSelectionChange"
          :max-height="350"></custom-edit-table>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pn"
          :page-sizes="pageSizes"
          :page-size="ps"
          class="align-right p-n"
          layout="total, sizes, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleSync = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </popup-list>
  </div>
</template>

<script>
import Ajax from '_router/ajax'
import Config from 'config'
import { FormColumn, PopupList } from 'components/base/index'
import GlobalService from 'service/modules/popup/global-service'
import OptimusPrimeService from 'service/optimus-prime-service'
import FdAlCalculationService from 'service/modules/allot/fd_al_calculation/fd-al-calculation-service'
export default {
  data () {
    return {
      loading: true,
      butLoading: true,
      isLoading: true,
      btnGroup: [
        {
          icon: 'icon-add',
          permision: '',
          name: 'save',
          label: '保存',
          type: 'btn'
        },
        {
          icon: 'icon-search2',
          permision: '',
          name: 'poundList',
          label: '选择磅单',
          type: 'btn'
        },
        {
          icon: 'el-icon-arrow-left',
          permision: '',
          name: 'cancel',
          label: '取消',
          type: 'btn'
        }
      ],
      puNotice: {},
      puNoticeSub: [],
      modelData: {
        'fd_al_calculation': {},
        'fd_al_calculate_sub': []
      },
      visibleSync: false,
      search: {
        startDate: this.getLastYearYestdy(new Date(), -1, '00:00:00'),
        endDate: this.getLastYearYestdy(new Date(), 0, '23:59:59'),
        carNo: null,
        billNo: null
      },
      tableHeader: [],
      tableData: [],
      selectionList: {},
      resUrl: null,
      pn: 1,
      ps: 10,
      pageSizes: [10, 20, 40, 80, 100],
      total: 0
    }
  },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  created () {
    this.getMould()
  },
  mounted () {

  },
  methods: {
    butReceipt (e) {
      switch (e) {
        case 'poundList':
          if (!this.$refs.column.getData().venId) {
            this.$message.error('请选择发货公司！')
            return false
          }
          if (!this.$refs.column.getData().invId) {
            this.$message.error('请选择货物名称！')
            return false
          }
          if (!this.$refs.column.getData().reCompanyId) {
            this.$message.error('请选择收货公司！')
            return false
          }
          this.visibleSync = true
          GlobalService.optimusPrimePopup('374').then(res => {
            if (res.success) {
              this.tableHeader = res.data.resSubList.map(item => {
                if (item.fieldType === 'ENUM') {
                  item.enumOptions = {}
                  item.options.forEach(data => {
                    item.enumOptions[data.value] = data.label
                  })
                }
                return item
              })
              this.resUrl = res.data.resUrl
              this.getPoundList()
            }
          })
          break
        case 'cancel':
          this.$router.go(-1)
          break
        case 'save':
          this.$refs.column.$refs.ruleForm.validate((valid) => {
            if (valid) {
              FdAlCalculationService.save({
                entity: this.$refs.column.getData()
              }).then(res => {
                if (res.success) {
                  this.$message.success('保存成功')
                  this.$router.go(-1)
                }
              })
            } else {
              this.$message.error('请完善表单！')
            }
          })
          break
      }
    },
    getPoundList () { // 获取磅单列表
      this.isLoading = true
      Ajax.post({
        url: Config.service.api + this.resUrl,
        data: {
          limit: { ps: this.ps, pn: this.pn },
          venId: this.$refs.column.getData()['venId'],
          invId: this.$refs.column.getData()['invId'],
          reCompanyId: this.$refs.column.getData()['reCompanyId'],
          ...this.search
        }
      }).then(res => {
        if (res.success) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.isLoading = false
        }
      })
    },
    handleSelectionChange (data) {
      this.$set(this.selectionList, this.pn, data)
    },
    handleSizeChange (ps) {
      this.ps = ps
      this.getPoundList()
    },
    handleCurrentChange (pn) {
      this.pn = pn
      this.getPoundList()
    },
    getMould () { // 获取当前菜单配置
      OptimusPrimeService.optimusPrime({
        formatType: 'FORM',
        menuId: (this.$route.query && this.$route.query.id) || this.$route.meta.other.id
      }).then(res => {
        if (res.success) {
          this.puNotice = JSON.parse(JSON.stringify(res.data))
          this.puNotice.formSubList = []
          res.data.formSubList.forEach((item, index) => { // 处理表单默认值（通用）
            this.$set(this.modelData[item.customTable], item.fieldName, item.defaultValue)
            if (item.customTable === 'fd_al_calculation') {
              this.puNotice.formSubList.push(item)
            } else if (item.customTable === 'fd_al_calculate_sub') {
              item.iupdate = false
              this.puNoticeSub.push(item)
            }
          })
          this.$nextTick(() => {
            this.loading = false
          })
        }
      })
    },
    getLastYearYestdy (date, year, time) {
      var strYear = date.getFullYear() + year
      var strDay = date.getDate()
      var strMonth = date.getMonth() + 1
      if (strMonth < 10) {
        strMonth = '0' + strMonth
      }
      if (strDay < 10) {
        strDay = '0' + strDay
      }
      return `${strYear}-${strMonth}-${strDay} ${time}`
    }
  },
  computed: {},
  watch: {},
  components: {
    FormColumn,
    PopupList
  }
}
</script>

<style scoped>

</style>
