<template>
  <div :style="{height: `${maxHeight}px`}" class="bg-white" v-loading="loading">
    <form-column
      v-if="!loading"
      ref="column"
      :columnNum="8"
      :btnGroup="btnGroup"
      :butLoading="butLoading"
      :fieldData="fieldData"
      :modelData="modelData"
      :isShowBut="false"
      @but-receipt="butReceipt">
    </form-column>
    <div class="p-l-10 p-r-10">
      <elx-editable
        ref="elxEditable"
        class="special_editable"
        border
        size="mini"
        :data.sync="tableList"
        :edit-config="{mode: 'visible'}"
        style="width: 100%">
        <elx-editable-column label="数量结算" :edit-render="{type: 'visible'}">
          <template v-slot:edit="scope">
            <el-row>
              <el-col :span="8" v-for="(item, index) in scope.row.bumSettle" :key="index">
                <div class="cell_border p-t-5 p-b-5">{{item.label}}</div>
                <el-input v-model="specialTableData[item.fieldName]" :disabled="item.idisabled"></el-input>
              </el-col>
            </el-row>
          </template>
        </elx-editable-column>
        <elx-editable-column label="货款结算" :edit-render="{type: 'visible'}">
          <template v-slot:edit="scope">
            <el-row>
              <el-col :span="8" v-for="(item, index) in scope.row.loanSettle" :key="index">
                <div class="cell_border p-t-5 p-b-5">{{item.label}}</div>
                <el-input v-model="specialTableData[item.fieldName]" :disabled="item.idisabled"></el-input>
              </el-col>
            </el-row>
          </template>
        </elx-editable-column>
        <elx-editable-column label="运费结算" :edit-render="{type: 'visible'}">
          <template v-slot:edit="scope">
            <el-row>
              <el-col :span="12" v-for="(item, index) in scope.row.freightSettle" :key="index">
                <div class="cell_border p-t-5 p-b-5">{{item.label}}</div>
                <el-input v-if="item.label" v-model="specialTableData[item.fieldName]" :disabled="item.idisabled"></el-input>
                <div v-else class="cell_border bg-white p-t-5 p-b-5"></div>
              </el-col>
            </el-row>
          </template>
        </elx-editable-column>
        <template v-slot:append>
          <el-row>
            <el-col :span="8" class="align-center">
              <el-row>
                <el-col :span="8">
                  <div class="cell_border p-t-5 p-b-5"></div>
                  <div class="cell_border bg-white p-t-5 p-b-5"></div>
                </el-col>
                <el-col :span="8">
                  <div class="cell_border p-t-5 p-b-5">干基数量</div>
                  <el-input v-model="specialTableData.dryQuantity" :disabled="true"></el-input>
                </el-col>
                <el-col :span="8">
                  <div class="cell_border cell_border-double p-t-5 p-b-5">备注</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="16">
              <el-input v-model="specialTableData.remark1" type="textarea" :rows="2" :autosize="{minRows: 2, maxRows: 2}" placeholder="请输入内容"></el-input>
            </el-col>
          </el-row>
        </template>
      </elx-editable>
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
import { Editable, EditableColumn } from 'vue-element-extends'
import { FormColumn, PopupList } from 'components/base/index'
import GlobalService from 'service/modules/popup/global-service'
import OptimusPrimeService from 'service/optimus-prime-service'
import FdAlSettlementService from 'service/modules/allot/fd_al_settlement/fd-al-settlement-service'
export default {
  data () {
    return {
      loading: true,
      butLoading: false,
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
      fieldData: {},
      modelData: {},
      tableList: [
        {
          bumSettle: [
            { label: '起始日期', fieldName: 'startData', idisabled: true },
            { label: '终止日期', fieldName: 'endData', idisabled: true },
            { label: '车数', fieldName: 'vehicles', idisabled: true }
          ],
          loanSettle: [
            { label: '合同单价', fieldName: 'conPrice', idisabled: true },
            { label: '质量扣价', fieldName: 'qualityDeductPrice', idisabled: true },
            { label: '结算单价', fieldName: 'realSettlePrice', idisabled: true }
          ],
          freightSettle: [
            { label: '运费单价', fieldName: 'farePrice', idisabled: true },
            { label: '运费金额', fieldName: 'fareMoney', idisabled: false }
          ]
        },
        {
          bumSettle: [
            { label: '原发数', fieldName: 'yfSuttle', idisabled: true },
            { label: '过磅数量', fieldName: 'weighQuantity', idisabled: true },
            { label: '扣杂', fieldName: 'mixed', idisabled: true }
          ],
          loanSettle: [
            { label: '应结金额', fieldName: 'shouldSettleMoney', idisabled: true },
            { label: '调整金额', fieldName: 'adjustMoney', idisabled: false },
            { label: '实结金额', fieldName: 'realSettleMoney', idisabled: true }
          ],
          freightSettle: [
            { label: '运费税率', fieldName: 'fareTaxrate', idisabled: false },
            { label: '运费无税单价', fieldName: 'fareNoPrice', idisabled: true }
          ]
        },
        {
          bumSettle: [
            { label: '质量扣重', fieldName: 'lossWeight', idisabled: true },
            { label: '应结算数量', fieldName: 'shouldSettleQuantity', idisabled: true },
            { label: '实际结算数', fieldName: 'realSettleQuantity', idisabled: true }
          ],
          loanSettle: [
            { label: '税率', fieldName: 'taxrate', idisabled: false },
            { label: '无税单价', fieldName: 'realNoPrice', idisabled: true },
            { label: '无税金额', fieldName: 'realNoMoney', idisabled: true }
          ],
          freightSettle: [
            { label: '', fieldName: '', idisabled: false },
            { label: '运费无税金额', fieldName: 'fareNoMoney', idisabled: true }
          ]
        }
      ],
      specialTableData: {
        startData: '',
        endData: '',
        vehicles: '0',
        conPrice: '0',
        qualityDeductPrice: '0',
        realSettlePrice: '0',
        farePrice: '0',
        fareMoney: '0',
        yfSuttle: '0',
        weighQuantity: '0',
        mixed: '0',
        shouldSettleMoney: '0',
        adjustMoney: '0',
        realSettleMoney: '0',
        fareTaxrate: '0',
        fareNoPrice: '0',
        lossWeight: '0',
        shouldSettleQuantity: '0',
        realSettleQuantity: '0',
        taxrate: '0',
        realNoPrice: '0',
        realNoMoney: '0.00',
        fareNoMoney: '0.00',
        dryQuantity: '0',
        remark1: ''
      },
      visibleSync: false,
      search: {
        startDate: this.getLastYearYestdy(new Date(), -1, '00:00:00'),
        endDate: this.getLastYearYestdy(new Date(), 0, '23:59:59'),
        billNo: null,
        carNo: null
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
  methods: {
    butReceipt (e) {
      switch (e) {
        case 'poundList':
          if (!this.$refs.column.getData().venId) {
            this.$message.error('请选择调出公司！')
            return false
          }
          if (!this.$refs.column.getData().invId) {
            this.$message.error('请选择货物！')
            return false
          }
          if (!this.$refs.column.getData().reCompanyId) {
            this.$message.error('请选择调入公司！')
            return false
          }
          this.visibleSync = true
          GlobalService.optimusPrimePopup('376').then(res => {
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
              FdAlSettlementService.save({
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
    getMould () {
      OptimusPrimeService.optimusPrime({
        formatType: 'FORM',
        menuId: (this.$route.query && this.$route.query.id) || this.$route.meta.other.id
      }).then(res => {
        if (res.success) {
          this.fieldData = res.data
          this.fieldData.formSubList.forEach((item, index) => { // 处理表单默认值（通用）
            this.modelData[item.fieldName] = item.defaultValue
          })
          this.loading = false
        }
      })
    },
    getPoundList () { // 获取磅单列表
      this.isLoading = true
      Ajax.post({
        url: Config.service.api + this.resUrl,
        data: {
          limit: { ps: this.ps, pn: this.pn },
          venId: this.$refs.column.getData()['venId'],
          invId: this.$refs.column.getData()['invId'],
          planDate: this.$refs.column.getData()['createDate'] || this.getLastYearYestdy(new Date(), 0, '23:59:59'),
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
    PopupList,
    ElxEditable: Editable,
    ElxEditableColumn: EditableColumn
  }
}
</script>

<style lang="scss">
  .special_editable{
    .cell{
      text-align: center;
      padding: 0!important;
    }
    .cell_border{
      border: 1px solid #EBEEF5;
      background: rgba(243, 247, 249, .5);
      min-height: 34px;
      border-top-width: 0px;
    }
    .cell_border-double{
      min-height: 68px;
      line-height: 48px;
    }
    .el-input input{
      text-align: center;
    }
  }
</style>
