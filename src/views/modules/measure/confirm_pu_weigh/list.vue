<template>
  <div class="bg-white">
    <div class="p-10">
      <elx-editable
        v-loading="loading"
        class="confirm_pu_weigh_table"
        ref="elxTable"
        border
        :edit-config="{trigger: 'click', mode: 'cell'}"
        :height="maxHeight - 75"
        :data.sync="list"
        :span-method="objectSpanMethod"
        style="width: 100%">
        <div class="p-20" slot="empty"> <!-- 空数据展示 -->
          <avue-empty></avue-empty>
        </div>
        <elx-editable-column type="selection" :selectable="selectableEvent" width="35" fixed="right"></elx-editable-column>
        <!-- :disabled="!scope.row['ihandle'] || !scope.row['confirmSubButs'] || (scope.row['confirmSubButs'] && scope.row['confirmSubButs'].indexOf('CONFIRM_NO') > -1)" -->
        <template v-for="(item, index) in tableHeader">
          <template v-if="item.ishow && !item.ihidden">
            <elx-editable-column
              showOverflowTooltip
              :min-width="item.columnWidth"
              v-bind="item"
              :key="index"
              :label="item.fieldExplain"
              :prop="item.fieldName"
              :edit-render="item.iupdate ? {type: 'default'} : null">
              <template v-slot:edit="scope">
                <el-input
                  v-model="scope.row[item.fieldName]"
                  :disabled="!scope.row['ihandle'] || !scope.row['confirmSubButs'] || (scope.row['confirmSubButs'] && scope.row['confirmSubButs'].indexOf('CONFIRM_NO') > -1)"
                  placeholder="请输入内容"></el-input>
              </template>
              <template v-slot="scope">
                <div style="text-align: center" v-if="item.formSubmitType === 'ENUM' && scope.row[item.fieldName]">
                  <el-tag disable-transitions>
                    {{item.options[scope.row[item.fieldName]]}}
                  </el-tag>
                </div>
                <div v-else>
                  {{scope.row[item.fieldName]}}
                </div>
              </template>
            </elx-editable-column>
          </template>
        </template>
        <el-table-column align="center" min-width="200" fixed="right" label="操作">
          <template v-slot="scope">
            <template v-for="(type, i) in scope.row.data.confirmSubButs">
              <el-button
                v-if="!butType(type).show"
                :key="i"
                :type="butType(type).type"
                @click="butEvent(type, scope.row)"
                size="mini">{{butType(type).label}}</el-button>
            </template>
          </template>
        </el-table-column>
      </elx-editable>
    </div>
    <div class="m-r-5">
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
  </div>
</template>

<script>
import { Editable, EditableColumn } from 'vue-element-extends'
import tableHead from '@/const/basic/spanTable'
import ConfirmPuWeighService from 'service/modules/measure/confirm-pu-weigh-service'
export default {
  data () {
    return {
      loading: true,
      pn: 1,
      ps: 10,
      pageSizes: [10, 20, 40, 80, 100],
      total: 0,
      spanArr: [],
      mergeParams: [],
      tableHeader: [],
      list: []
    }
  },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  created () {
    this.tableHeader = tableHead.confirmPuWeighHead.map(item => {
      if (item.imerge) {
        this.mergeParams.push(item.fieldName)
      }
      return item
    })
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      this.spanArr = []
      this.list = []
      ConfirmPuWeighService.list({
        limit: {
          pn: this.pn,
          ps: this.ps
        }
      }).then(res => {
        if (res.success) {
          res.data.list.forEach((item, index) => {
            if (item.confirmWeighSubVoList.length > 0) {
              item.confirmWeighSubVoList.forEach((data, i) => {
                if (i === 0) {
                  this.spanArr[this.spanArr.length] = item.confirmWeighSubVoList.length
                } else {
                  this.spanArr[this.spanArr.length] = 0
                }
                this.list.push({
                  ...item,
                  ...data
                })
              })
            } else {
              this.spanArr[this.spanArr.length] = 1
              this.list.push(item)
            }
          })
          this.total = res.data.total
          this.loading = false
        }
      })
    },
    handleSizeChange (ps) {
      this.ps = ps
      this.getList()
    },
    handleCurrentChange (pn) {
      this.pn = pn
      this.getList()
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (this.mergeParams.indexOf(column.property) > -1) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    butEvent (type, row) {
      ConfirmPuWeighService.submit({
        'entity': {
          'regCodes': [
            row.data.regCode
          ],
          'confirmSubBut': type
        },
        'entitysub': [
          {
            'regSubId': row.data.regSubId,
            'weighSubId': row.data.weighSubId,
            'preQuantity': null,
            'deAddrId': null,
            'deDeptId': null,
            'deWareId': null,
            'dePoseId': null,
            'reAddrId': null,
            'reDeptId': null,
            'reWareId': null,
            'rePoseId': null,
            'deConfirmer': '',
            'reConfirmer': '',
            'preNums': null,
            'deNums': null,
            'reNums': row.data.reNums,
            'deductWater': row.data.deductWater,
            'deductImpurity': row.data.deductImpurity,
            'deductDetritus': row.data.deductDetritus,
            'deductStone': row.data.deductStone,
            'deductOther': row.data.deductOther,
            'deductRateWater': row.data.deductRateWater,
            'deductRateImpurity': row.data.deductRateImpurity,
            'deductRateDetritus': row.data.deductRateDetritus,
            'deductRateStone': row.data.deductRateStone,
            'deductRateOther': row.data.deductRateOther
          }
        ]
      }).then(res => {
        this.$message.success(res.msg)
        this.getList()
      })
      console.log(row) // 点击获取当前按钮整条数据
      console.log(type) // 获取按钮类型
    },
    selectableEvent (row, index) {
      return !(!row['ihandle'] || !row['confirmSubButs'] || (row['confirmSubButs'] && row['confirmSubButs'].indexOf('CONFIRM_NO') > -1))
    },
    butType (type) {
      if (type === 'CONFIRM') {
        return {
          type: 'primary',
          label: '确认'
        }
      } else if (type === 'CONFIRM_NO') {
        return {
          type: 'warning',
          label: '无法确认'
        }
      } else if (type === 'CONFIRM_NOT') {
        return {
          type: 'danger',
          label: '取消确认'
        }
      } else if (type === 'CONFIRM_AGAIN') {
        return {
          type: 'success',
          label: '重新确认'
        }
      } else if (type === 'SINGLE_WEIGH') {
        return {
          type: 'success',
          label: '车辆重出'
        }
      }
    }
  },
  computed: {},
  watch: {},
  components: {
    ElxEditable: Editable,
    ElxEditableColumn: EditableColumn
  }
}
</script>

<style lang="scss">
  .confirm_pu_weigh_table{
    .el-table__body-wrapper.is-scrolling-left~.el-table__fixed, .el-table__body-wrapper.is-scrolling-none~.el-table__fixed, .el-table__body-wrapper.is-scrolling-none~.el-table__fixed-right, .el-table__body-wrapper.is-scrolling-right~.el-table__fixed-right {
      box-shadow: none !important;
      border: 0 !important;
    }
    .el-table__fixed{
      border-right: 3px solid #dedede;
    }
    .el-table__fixed-right{
      border-left: 3px solid #dedede;
    }
  }
</style>
