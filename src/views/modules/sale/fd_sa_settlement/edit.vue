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
        <elx-editable-column label="应结算" :edit-render="{type: 'visible'}">
          <template v-slot:edit="scope">
            <el-row>
              <el-col :span="8" v-for="(item, index) in scope.row.bumSettle" :key="index">
                <div class="cell_border p-t-5 p-b-5">{{item.label}}</div>
                <el-input :value="count[item.fieldName] || specialTableData[item.fieldName]" v-if="item.idisabled" disabled></el-input>
                <el-input v-model="specialTableData[item.fieldName]" v-else></el-input>
              </el-col>
            </el-row>
          </template>
        </elx-editable-column>
        <elx-editable-column label="对方结算" :edit-render="{type: 'visible'}">
          <template v-slot:edit="scope">
            <el-row>
              <el-col :span="8" v-for="(item, index) in scope.row.loanSettle" :key="index">
                <div class="cell_border p-t-5 p-b-5">{{item.label}}</div>
                <el-input :value="count[item.fieldName] || specialTableData[item.fieldName]" v-if="item.idisabled" disabled></el-input>
                <el-input v-model="specialTableData[item.fieldName]" v-else></el-input>
              </el-col>
            </el-row>
          </template>
        </elx-editable-column>
        <elx-editable-column label="质量指标" :edit-render="{type: 'visible'}">
          <template v-slot:edit="scope">
            <el-row>
              <el-col :span="12" v-for="(item, index) in scope.row.freightSettle" :key="index">
                <div class="cell_border p-t-5 p-b-5">{{item.label}}</div>
                <el-input v-if="item.label && item.idisabled" :value="count[item.fieldName] || specialTableData[item.fieldName]" disabled></el-input>
                <el-input v-else-if="item.label && !item.idisabled" v-model="specialTableData[item.fieldName]"></el-input>
                <div v-else class="cell_border bg-white p-t-5 p-b-5"></div>
              </el-col>
            </el-row>
          </template>
        </elx-editable-column>
        <template v-slot:append>
          <el-row>
            <el-col :span="8" class="align-center">
              <div class="cell_border cell_border-double p-t-5 p-b-5">备注</div>
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
        <span class="p-r-10">合计重量: 0</span>
        <span class="p-r-10">合计金额: 0</span>
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
        <el-button @click="popupConfirm" type="primary">确 定</el-button>
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
import FdSaSettlementService from 'service/modules/sale/fd_sa_settlement/fd-sa-settlement-service'
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
            { label: '收到数', fieldName: 'reSuttle', idisabled: false },
            { label: '路耗', fieldName: 'roadCons', idisabled: true },
            { label: '扣水', fieldName: 'deductWater', idisabled: false }
          ],
          freightSettle: [
            { label: '合同水', fieldName: 'contractWater', idisabled: false },
            { label: '化验水', fieldName: 'assayWater', idisabled: false }
          ]
        },
        {
          bumSettle: [
            { label: '发出数', fieldName: 'yfSuttle', idisabled: true },
            { label: '应结算数', fieldName: 'shouldSettleQuantity', idisabled: true },
            { label: '合同单价', fieldName: 'conPrice', idisabled: true }
          ],
          loanSettle: [
            { label: '扣沫', fieldName: 'deductPowder', idisabled: true },
            { label: '结算数量', fieldName: 'realSettleQuantity', idisabled: true },
            { label: '结算单价', fieldName: 'realSettlePrice', idisabled: true }
          ],
          freightSettle: [
            { label: '对方水', fieldName: 'drWater', idisabled: false },
            { label: '对方硫', fieldName: 'drSulfur', idisabled: false }
          ]
        },
        {
          bumSettle: [
            { label: '应结算金额', fieldName: 'shouldSettleMoney', idisabled: true },
            { label: '运费单价', fieldName: 'farePrice', idisabled: true },
            { label: '运费金额', fieldName: 'fareMoney', idisabled: true }
          ],
          loanSettle: [
            { label: '调整金额', fieldName: 'powderPrice', idisabled: false },
            { label: '结算金额', fieldName: 'realSettleMoney', idisabled: true },
            { label: '税率', fieldName: 'taxrate', idisabled: false }
          ],
          freightSettle: [
            { label: '无税单价', fieldName: 'realNoPrice', idisabled: true },
            { label: '无税金额', fieldName: 'realNoMoney', idisabled: true }
          ]
        }
      ],
      specialTableData: {
        startData: '',
        endData: '',
        vehicles: '0',
        reSuttle: '0',
        roadCons: '0',
        deductWater: '0',
        contractWater: '0',
        assayWater: '0',
        yfSuttle: '0',
        shouldSettleQuantity: '0',
        conPrice: '0',
        deductPowder: '0',
        realSettleQuantity: '0',
        realSettlePrice: '0',
        drWater: '0',
        drSulfur: '0',
        shouldSettleMoney: '0',
        farePrice: '0',
        fareMoney: '0',
        powderPrice: '0',
        realSettleMoney: '0',
        taxrate: '0.00',
        realNoPrice: '0.00',
        realNoMoney: '0',
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
      total: 0,
      uuID: null
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
    this.getId()
  },
  methods: {
    popupConfirm () { // 弹窗资源点击确定触发  data为已选跨页数据
      console.log(this.$refs.column)
      console.log(this.uuID)
      this.visibleSync = false
      let getList = this.$refs.custom.$refs.editable.getSelecteds()
      let ids = ''
      getList.forEach((item) => {
        console.log(item)
        ids = ids + item.wsId + ','
      })
      FdSaSettlementService.confirmPounds({
        ids: ids.substring(0, ids.length - 1),
        billType: 5,
        tmpKey: this.uuID
      }).then(res => {
        if (res.success) {
          console.log(res)
          let data = res.data
          // 应结算
          // 开始时间
          this.specialTableData.startData = data.startDate
          // 结束时间
          this.specialTableData.endData = data.endDate
          // 车数
          this.specialTableData.vehicles = data.vehicles
          // 发出数
          this.specialTableData.yfSuttle = data.calQuantity
          // 应结算数
          this.specialTableData.shouldSettleQuantity = data.calQuantity
          // 合同单价
          this.specialTableData.conPrice = data.conPrice
          // 应结算金额
          this.specialTableData.shouldSettleMoney = data.calMoney
          // 运费单价
          this.specialTableData.farePrice = 0
          // 运费金额
          this.specialTableData.fareMoney = 0
          // 对方结算
          // 收到数
          this.specialTableData.reSuttle = data.calQuantity
          // 路耗
          // this.specialTableData.conPrice = return new Decimal(this.shouldSettleQuantity).sub(new Decimal(this.reSuttle)).toNumber();
          // 扣水
          this.specialTableData.deductWater = 0
          // 扣沫
          this.specialTableData.deductPowder = 0
          // 结算数量
          // this.specialTableData.realSettleQuantity = return new Decimal(this.reSuttle).sub(new Decimal(this.deductWater)).toNumber();
          // 结算单价
          this.specialTableData.realSettlePrice = data.conPrice
          // 调整金额
          this.specialTableDatapowderPrice = 0
          // 结算金额
          // this.specialTableData.realSettleMoney = return new Decimal(this.realSettleQuantity).mul(new Decimal(this.realSettlePrice)).add(new Decimal(this.powderPrice)).toNumber();
          // 税率
          this.specialTableData.taxrate = 0

          // 质量指标
          // 合同水
          this.specialTableData.contractWater = 0
          // 化验水
          this.specialTableData.assayWater = 0
          // 对方水
          this.specialTableData.drWater = 0
          // 对方硫
          this.specialTableData.drSulfur = 0
          // 无税单价
          // this.specialTableData.realNoPrice = return new Decimal(this.realNoMoney).div(new Decimal(this.realSettleQuantity == 0?1:this.realSettleQuantity)).toFixed(num, Decimal.ROUND_HALF_DOWN);
          // 无税金额
          // this.specialTableData.realNoMoney = return new Decimal(this.realSettleMoney).div((new Decimal(this.taxrate).mul(new Decimal(0.01)).add(new Decimal(1)))).toFixed(num, Decimal.ROUND_HALF_DOWN);
          this.specialTableData.remark1 = ''
        }
      })
    },
    getMould () { // 获取当前菜单配置
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
    butReceipt (e) {
      switch (e) {
        case 'poundList':
          if (!this.$refs.column.getData().cusId) {
            this.$message.error('请选择客户名称！')
            return false
          }
          if (!this.$refs.column.getData().invId) {
            this.$message.error('请选择货物名称！')
            return false
          }
          this.visibleSync = true
          GlobalService.optimusPrimePopup('373').then(res => {
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
              console.log(this.$refs.column.getData())
              let obj = Object.assign({}, this.$refs.column.getData(), this.specialTableData)
              obj.tpCode = this.uuID
              console.log(obj)
              FdSaSettlementService.save({
                entity: obj
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
      this.isLoading = false
      Ajax.post({
        url: Config.service.api + this.resUrl,
        data: {
          limit: { ps: this.ps, pn: this.pn },
          cusId: this.$refs.column.getData()['cusId'],
          invId: this.$refs.column.getData()['invId'],
          billdate: this.$refs.column.getData()['busDate'],
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
    },
    getId () {
      FdSaSettlementService.getId().then(res => {
        if (res.success) {
          this.uuID = res.data
          console.log(this.uuID)
        }
      })
    },
    retainCount (val, num = 0) {
      return (Math.floor(val * 100) / 100).toFixed(num)
    }
  },
  computed: {
    count () {
      // 路耗
      let conPrice = this.retainCount(this.specialTableData.shouldSettleQuantity - this.specialTableData.reSuttle, 2)
      // 结算数量
      let realSettleQuantity = this.retainCount(this.specialTableData.reSuttle - this.specialTableData.deductWater, 2)
      // 结算金额
      let realSettleMoney = this.retainCount(realSettleQuantity / (this.specialTableData.realSettlePrice + this.specialTableData.powderPrice), 2)
      // 无税金额
      let realNoMoney = this.retainCount(realSettleMoney / (this.specialTableData.taxrate * 0.01 + 1), 2)
      // 无税单价
      let realNoPrice = this.retainCount(realNoMoney / (realSettleQuantity === '0' ? 1 : realSettleQuantity), 2)

      return {
        'conPrice': conPrice,
        'realSettleQuantity': realSettleQuantity,
        'realSettleMoney': realSettleMoney,
        'realNoPrice': realNoPrice,
        'realNoMoney': realNoMoney
      }
    }
  },
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
