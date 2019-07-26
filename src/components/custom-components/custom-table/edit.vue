<template>
  <div v-loading="loading">
    <elx-editable
      ref="editable"
      class="edit-table-box"
      :row-key="rowKey"
      style="width: 100%"
      :data.sync="tableData"
      :edit-rules="validRules"
      @selection-change="handleSelectionChange"
      @sort-change="sortChangeEvent"
      :edit-config="{trigger: 'click', mode: 'cell'}"
      :stripe="stripe"
      :border="border"
      :height="maxHeight"
      :max-height="maxHeight"
      :size="size"
      :fit="fit"
      :show-header="showHeader">
      <div class="p-20" slot="empty"> <!-- 空数据展示 -->
        <avue-empty></avue-empty>
      </div>
      <elx-editable-column type="selection" v-if="select" width="35" fixed="left"></elx-editable-column>
      <elx-editable-column label="排序" width="80" fixed="left" v-if="autoSort">
        <template v-slot="scope">
          <el-input class="sort_input" @keyup.enter.native="orderSort(scope.$index)" min="0" :max="dataIndex.length - 1" type="number" v-model.number="dataIndex[scope.$index]" placeholder="请输入显示顺序"/>
        </template>
      </elx-editable-column>
      <elx-editable-column width="35" v-if="autoSort">
        <template v-slot:header="scope">
          <el-tooltip class="item" placement="top">
            <div slot="content">按住后可以上下拖动排序，<br>完成后点击保存即可！</div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
        <template>
          <i class="el-icon-rank drag-btn"></i>
        </template>
      </elx-editable-column>
      <template v-for="(item, index) in tableHeader">
        <template v-if="item.ishow && !item.ihidden">
          <template v-if="item.calculate">
            <elx-editable-column
              :sortable="item.isortField ? 'custom' : false"
              showOverflowTooltip
              :width="item.columnWidth"
              v-bind="item"
              :key="index"
              :label="item.fieldExplain"
              :prop="item.fieldName">
              <template v-slot="scope">
                <div class="el-input el-input--small is-disabled">
                  <div class="el-input__inner nowrap">
                    {{calculateFun(item, scope)}}
                  </div>
                </div>
              </template>
            </elx-editable-column>
          </template>
          <template v-else>
            <elx-editable-column
              v-if="item.formSubmitType === 'RESOURCE_CONTROLS'"
              :sortable="item.isortField ? 'custom' : false"
              showOverflowTooltip
              :width="item.columnWidth"
              v-bind="item"
              :key="index"
              :label="item.fieldExplain"
              :prop="item.fieldName"
              :edit-render="{type: 'visible'}">
              <template v-slot:edit="scope">
                <el-tooltip :disabled="!scope.row[item.fieldName]" class="item" effect="dark" :enterable="false" :content="scope.row[item.fieldName] + ''" placement="top">
                  <el-input class="selectInput" placeholder="请选择..." disabled v-model="scope.row[item.fieldName]" @click.native="resourceClick(scope.row, item, scope.$index)"></el-input>
                </el-tooltip>
              </template>
            </elx-editable-column>
            <elx-editable-column
              v-else-if="item.formSubmitType === 'SEARCH_AUTOMATIC'"
              :sortable="item.isortField ? 'custom' : false"
              showOverflowTooltip
              :width="item.columnWidth"
              v-bind="item"
              :key="index"
              :label="item.fieldExplain"
              :prop="item.fieldName"
              :edit-render="item.iupdate ? {type: 'default'} : null">
              <template v-slot:edit="scope">
                <el-autocomplete
                  @select="((data) => {autocompleteChange(data, scope.$index)})"
                  :debounce="500"
                  placement="top"
                  popper-class="edit-table-autocomplete-box"
                  class="autocomplete_width100"
                  v-model="scope.row[item.fieldName]"
                  :fetch-suggestions="((queryString, cb) => {querySearchAsync(queryString, cb, item)})"
                  clearable
                  autocomplete="off">
                  <div slot-scope="scope">
                    <span v-for="(obj, key) in scope.item.showData" :key="key">{{obj}}&emsp;</span>
                  </div>
                </el-autocomplete>
              </template>
            </elx-editable-column>
            <elx-editable-column
              v-else-if="item.formSubmitType === 'ONE_TXT'"
              :sortable="item.isortField ? 'custom' : false"
              showOverflowTooltip
              :width="item.columnWidth"
              v-bind="item"
              :key="index"
              :label="item.fieldExplain"
              :prop="item.fieldName"
              :edit-render="item.iupdate ? {name: 'ElInput', attrs: {clearable: true}, events: {change: uniqueKey}} : null">
            </elx-editable-column>
            <elx-editable-column
              v-else-if="item.formSubmitType === 'MORE_TXT'"
              :sortable="item.isortField ? 'custom' : false"
              showOverflowTooltip
              :width="item.columnWidth"
              v-bind="item"
              :key="index"
              :label="item.fieldExplain"
              :prop="item.fieldName"
              :edit-render="item.iupdate ? {name: 'ElInput', attrs: {type: 'textarea', autosize: {minRows: 1, maxRows: 4}}, events: {change: uniqueKey}} : null">
            </elx-editable-column>
            <elx-editable-column
              v-else-if="item.formSubmitType === 'SINGLE_ELECTION' || item.formSubmitType === 'SELECT'"
              :sortable="item.isortField ? 'custom' : false"
              showOverflowTooltip
              :width="item.columnWidth"
              v-bind="item"
              :key="index"
              :label="item.fieldExplain"
              :prop="item.fieldName"
              :edit-render="item.iupdate ? {type: 'default'} : null">
              <template v-slot:edit="scope">
                <el-select v-model="scope.row[item.fieldName]" filterable clearable placeholder="请选择">
                  <el-option
                    v-for="data in item.options"
                    :key="data.value"
                    :disabled="data.disabled"
                    :label="data.label"
                    :value="data.value">
                  </el-option>
                </el-select>
              </template>
              <template v-slot="scope">{{ getSelectLabel(scope.row[item.fieldName], 'value', 'label', item.options) }}</template>
            </elx-editable-column>
            <elx-editable-column
              v-else-if="item.formSubmitType === 'MULTIPLE_SELECTION' || item.formSubmitType === 'BOOLEAN'"
              :sortable="item.isortField ? 'custom' : false"
              showOverflowTooltip
              header-align="left"
              align="center"
              :width="item.columnWidth"
              v-bind="item"
              :key="index"
              :label="item.fieldExplain"
              :prop="item.fieldName"
              :edit-render="item.iupdate ? {type: 'default'} : null">
              <template v-slot:edit="scope">
                <el-switch v-model="scope.row[item.fieldName]" size="mini"></el-switch>
              </template>
              <template v-slot="scope">
                <div class="relative">
                  <el-tag disable-transitions :type="scope.row[item.fieldName] ? 'success' : 'danger'">{{scope.row[item.fieldName] ? '是' : '否'}}</el-tag>
                  <div class="tag_mask absolute w100 h100"></div>
                </div>
              </template>
            </elx-editable-column>
            <elx-editable-column
              v-else-if="item.formSubmitType && item.formSubmitType.indexOf('DATA_BOX_TIM') !== -1"
              :sortable="item.isortField ? 'custom' : false"
              showOverflowTooltip
              :width="item.columnWidth"
              v-bind="item"
              :key="index"
              :label="item.fieldExplain"
              :prop="item.fieldName"
              :edit-render="item.iupdate ? {type: 'default'} : null">
              <template v-slot:edit="scope">
                <el-date-picker v-model="scope.row[item.fieldName]" type="datetime" placeholder="选择日期" :format="item.formSubmitType.substring(13)" value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </template>
            </elx-editable-column>
            <elx-editable-column
              v-else-if="item.formSubmitType && item.formSubmitType.indexOf('TIME_BOX_TIM') !== -1"
              :sortable="item.isortField ? 'custom' : false"
              showOverflowTooltip
              :width="item.columnWidth"
              v-bind="item"
              :key="index"
              :label="item.fieldExplain"
              :prop="item.fieldName"
              :edit-render="item.iupdate ? {type: 'default'} : null">
              <!-- :edit-render="item.iupdate ? {name: 'ElTimePicker', attrs: {type: 'datetime', valueFormat: 'HH:mm:ss'}} : null"> -->
              <template v-slot:edit="scope">
                <el-time-picker
                  v-model="scope.row[item.fieldName]"
                  type="datetime"
                  placeholder="选择时间"
                  value-format="HH:mm:ss">
                </el-time-picker>
              </template>
            </elx-editable-column>
            <elx-editable-column
              v-else-if="item.formSubmitType && item.formSubmitType.indexOf('DATA_RANGE_BOX_TIM') !== -1"
              :sortable="item.isortField ? 'custom' : false"
              showOverflowTooltip
              :width="item.columnWidth"
              v-bind="item"
              :key="index"
              :label="item.fieldExplain"
              :prop="item.fieldName"
              :edit-render="item.iupdate ? {name: 'ElDatePicker', attrs: {
                type: 'datetimerange'
                }
              } : null">
            </elx-editable-column>
            <elx-editable-column
              v-else
              :sortable="item.isortField ? 'custom' : false"
              showOverflowTooltip
              :width="item.columnWidth"
              v-bind="item"
              :key="index"
              :label="item.fieldExplain"
              :prop="item.fieldName">
              <template v-slot="scope">
                <div style="text-align:center" v-if="item.fieldType === 'BOOLEAN'">
                  <el-tag
                    disable-transitions
                    :type="scope.row[item.fieldName] ? 'success' : 'danger'">
                    {{scope.row[item.fieldName] ? '是' : '否'}}
                  </el-tag>
                </div>
                <div style="text-align:center" v-else-if="item.fieldType === 'ENUM' && scope.row[item.fieldName]">
                  <el-tag disable-transitions>
                    {{item.enumOptions[scope.row[item.fieldName]]}}
                  </el-tag>
                </div>
                <div v-else-if="item.cgFormatResId">
                  <el-link class="nowrap" @click="linkFun(item, scope.row)" style="font-size: 12px;font-weight: 400;display: block;line-height: 1;" type="primary">
                    {{scope.row[item.fieldName]}}
                  </el-link>
                </div>
                <div class="nowrap" v-else>
                  {{scope.row[item.fieldName]}}
                </div>
              </template>
            </elx-editable-column>
          </template>
        </template>
      </template>
    </elx-editable>
    <global-popup
      :dataDetail="dataDetail"
      @visibleSync="visibleSync"
      @confirm="confirm"></global-popup>
  </div>
</template>

<script>
/**
 * ONE_TXT(1, "一行文本"),
 * MORE_TXT(2, "多行文本"),
 * DATA_BOX_TIM(3, "日期选择框"),
 * TIME_BOX_TIM(4, "时间选择框"),
 * SINGLE_ELECTION(5, "单选下拉"), TODO:
 * MULTIPLE_SELECTION(6, "多选下拉"),
 * BOOLEAN(7, "布尔"), TODO:
 * RESOURCE_CONTROLS(8, "单选资源弹窗"),
 * RESOURCE_CONTROLS_MORE(9, "多选资源弹窗"), TODO:
 * EDITOR(10, "文本编辑器"),
 */
import { GlobalPopup } from 'components/base/index'
import { Editable, EditableColumn } from 'vue-element-extends'
import { formatDate, infixExpPostfixRxp, calcExp } from 'util/common-methods.js'
import Ajax from '_router/ajax'
import Config from 'config'
import GlobalService from 'service/modules/popup/global-service'
import CustomType from 'service/source/custom-type'
import Sortable from 'sortablejs'
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      globalData: {},
      validRules: {},
      dataIndex: [],
      dataDetail: {
        mapData: null,
        data: null,
        index: null
      },
      tablePublicData: {},
      tableData: []
    }
  },
  props: {
    publicData: {
      type: Object
    },
    select: {
      type: Boolean
    },
    autoSort: {
      type: Boolean
    },
    rowKey: {
      type: [Function, String],
      default: 'rowKey'
    },
    loading: {
      type: Boolean,
      default: true
    },
    tableHeader: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    },
    data: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    },
    height: { // Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
      type: [String, Number]
    },
    label: { // 序号列title
      type: String,
      default: '序号'
    },
    showSelection: { // 是否显示多选框
      type: Boolean,
      default: false
    },
    selectable: { // 多选是否可勾选
      type: Function
    },
    reserveSelection: { // 是否保留之前数据
      type: Boolean
    },
    emptyText: { // 空数据提示
      type: String,
      default: '暂无数据'
    },
    maxHeight: {
      type: [String, Number]
    },
    border: { // 是否带有纵向边框
      type: Boolean,
      default: false
    },
    size: { // Table 的尺寸    可选值： medium / small / mini
      type: String,
      default: 'mini'
    },
    fit: { // 列的宽度是否自撑开
      type: Boolean,
      default: true
    },
    showHeader: { // 是否显示表头
      type: Boolean,
      default: true
    },
    stripe: { // 是否为斑马纹 table
      type: Boolean,
      default: false
    }
  },
  watch: {
    data: {
      handler (data) {
        this.$emit('update-data', data)
        this.tableData = data.map((item, index) => {
          this.dataIndex[index] = index
          item.rowKey = index
          return item
        })
      },
      deep: true,
      immediate: true
    },
    tableData: {
      handler (data) {
        this.$emit('update-data', data)
      },
      deep: true,
      immediate: true
    },
    tableHeader: {
      handler (data) {
        let datas = JSON.parse(JSON.stringify(data))
        datas.forEach(item => {
          if (item.ishow && item.iupdate) {
            let rules = []
            if (item.irequired) {
              rules.push({
                required: true, message: `必须填写${item.fieldExplain}`, trigger: 'change'
              })
            }
            if (item.cgValidate) {
              rules.push({
                validator: (rule, value, callback) => {
                  let validator = item.cgValidate.validateTitle
                  if (validator[0] === '/') {
                    validator = validator.substr(1)
                  }
                  if (validator[validator.length - 1] === '/') {
                    validator = validator.substr(0, validator.length - 1)
                  }
                  if (new RegExp(validator).test(value) || value === '') {
                    callback()
                  } else {
                    callback(new Error(item.cgValidate.validateMethod))
                  }
                },
                trigger: 'change'
              })
            }
            this.validRules[item.fieldName] = rules
          }
        })
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    this.rowDrop()
  },
  methods: {
    autocompleteChange (data, index) {
      if (this.globalData[data.key] && this.globalData[data.key].resource && this.globalData[data.key].resource.length > 0) {
        this.globalData[data.key].resource.forEach(item => {
          this.setData(index, item.fieldSub1.fieldName, data.data[item.fieldSub2.fieldName], item.fieldSub1.fieldName === data.key)
        })
      }
    },
    sendSearchRequest (data, value, callBack, key) {
      Ajax[data.resMethod.toLowerCase()]({
        url: Config.service.api + data.resUrl.replace('{search}', value.ResetBlank() || null)
      }).then(res => {
        if (res.success) {
          let lists = XEUtils.clone(res.data, true).map(item => {
            let datas = {}
            data.resSubList.forEach(element => {
              // 如果是隐藏的字段，不显示
              if (!element.ihidden) {
                datas[element.fieldName] = item[element.fieldName]
              }
            })
            return {
              showData: datas,
              data: item,
              key: key
            }
          })
          callBack(lists)
        }
      })
    },
    querySearchAsync (queryString, cb, data) {
      if (this.globalData[data.fieldName] && this.globalData[data.fieldName].sendReqData) {
        this.sendSearchRequest(this.globalData[data.fieldName].sendReqData, queryString, cb, data.fieldName)
      } else {
        Promise.all([
          new Promise((resolve, reject) => {
            GlobalService.optimusPrimePopup(data.cgFormatResId).then(res => {
              if (res.success) {
                resolve(res.data)
              }
            })
          }),
          new Promise((resolve, reject) => {
            CustomType.resource({ // 请求出参
              resFormatSubId: data.id
            }).then(res => {
              if (res.success) {
                resolve(res.data)
              }
            })
          })
        ]).then(res => {
          this.$set(this.globalData, data.fieldName, {
            sendReqData: res[0],
            resource: res[1]
          })
          this.sendSearchRequest(res[0], queryString, cb, data.fieldName)
        })
      }
    },
    linkFun (data, row) {
      this.$bus.$emit('mould/list', data, row)
    },
    handleSelectionChange (data) {
      this.$emit('selection-change', data)
    },
    validErrorEvent (rule, row, column, cell) {
      this.$message.error(rule.message)
    },
    sortChangeEvent ({ column, prop, order }) {
      /**
       * 正序('asc')
       * 逆序('desc')
       */
      this.$emit('sort-change', prop, order === 'ascending' ? 'asc' : 'desc')
    },
    visibleSync () {
      this.dataDetail = {
        mapData: null,
        data: null,
        index: null
      }
    },
    confirm (selectedsData, fatherData, index, resourceList) {
      this.visibleSync()
      this.$emit('popup-confirm', selectedsData, fatherData, index, resourceList)
      if (resourceList && resourceList.length > 0) {
        resourceList.forEach(item => {
          this.setData(index, item.fieldSub1.fieldName, selectedsData[0][item.fieldSub2.fieldName])
        })
      }
    },
    resourceClick (row, data, index) {
      this.dataDetail = {
        mapData: this.publicData || row,
        data: data,
        index: index
      }
    },
    setData (index, key, val, token = false) {
      if (this.tableData[index][key] !== undefined || token) {
        this.$set(this.tableData[index], key, val)
      }
    },
    insertEvent (d = null, rowIndex = 0) { // 从第rowIndex行新增一行新数据
      let data = {
        rowKey: this.tableData.length
      }
      for (let item in this.tableHeader) {
        if (this.tableHeader[item] && this.tableHeader[item].fieldName) {
          if (this.tableHeader[item].formSubmitType === 'DATA_BOX_TIM' && this.tableHeader[item].defaultValue) {
            let nowDate = new Date()
            let obj = JSON.parse(this.tableHeader[item].defaultValue)
            let timeDate = ''
            if (obj.yearMark) {
              timeDate += (nowDate.getFullYear() + (obj.yearMark + obj.year) * 1) + '-'
            } else {
              timeDate += obj.year + '-'
            }
            if (obj.monthMark) {
              timeDate += (nowDate.getMonth() + 1 + (obj.monthMark + obj.month) * 1) + '-'
            } else {
              timeDate += obj.month + '-'
            }
            if (obj.dayMark) {
              timeDate += (nowDate.getDate() + (obj.dayMark + obj.day) * 1) + ' '
            } else {
              timeDate += obj.day + ' '
            }
            if (obj.hourMark) {
              timeDate += (nowDate.getHours() + (obj.hourMark + obj.hour) * 1) + ':'
            } else {
              timeDate += obj.hour + ':'
            }
            if (obj.minuteMark) {
              timeDate += (nowDate.getMinutes() + (obj.minuteMark + obj.minute) * 1) + ':'
            } else {
              timeDate += obj.minute + ':'
            }
            if (obj.secondMark) {
              timeDate += (nowDate.getSeconds() + (obj.secondMark + obj.second) * 1)
            } else {
              timeDate += obj.second
            }
            data[this.tableHeader[item].fieldName] = formatDate(new Date(timeDate), 4)
          } else {
            data[this.tableHeader[item].fieldName] = this.tableHeader[item].defaultValue
          }
          if (d && d[this.tableHeader[item].fieldName]) {
            data[this.tableHeader[item].fieldName] = d[this.tableHeader[item].fieldName]
          }
        }
      }
      let newData = JSON.parse(JSON.stringify(this.tableData))
      newData.splice(0, 0, data)
      this.$emit('update-data', newData)
      this.$refs.editable.insertAt(data, rowIndex).then(() => {
        this.dataIndex = this.tableData.map((item, index) => {
          return index
        })
        if (rowIndex !== -1) {
          const currRow = this.tableData.splice(this.tableData.length - 1, 1)[0]
          this.tableData.splice(rowIndex + 1, 0, currRow)
        }
        this.tableData = this.tableData.map((item, index) => {
          this.dataIndex[index] = index
          item.rowKey = index
          return item
        })
      })
    },
    orderSort ($index) {
      if ($index !== this.dataIndex[$index]) {
        const currRow = this.tableData.splice($index, 1)[0]
        this.tableData.splice(this.dataIndex[$index], 0, currRow)
        this.dataIndex = this.tableData.map((item, index) => {
          return index
        })
      }
    },
    rowDrop () {
      this.$nextTick(() => {
        Sortable.create(this.$el.querySelector('.el-table__body-wrapper tbody'), {
          handle: '.drag-btn',
          onEnd: ({ newIndex, oldIndex }) => {
            const currRow = this.tableData.splice(oldIndex, 1)[0]
            this.tableData.splice(newIndex, 0, currRow)
            this.dataIndex = this.tableData.map((item, index) => {
              return index
            })
            this.$forceUpdate()
          }
        })
      })
    },
    uniqueKey (scope, value) { // 更新主子表公用数据
      this.$emit('update-data', this.tableData)
    },
    getSelectLabel (value, valueProp, labelProp, list) {
      value = value + ''
      let item = XEUtils.find(list, item => item[valueProp] + '' === value)
      return item ? item[labelProp] : null
    },
    calculateFun (data, scope) {
      if (XEUtils.isPlainObject(this.publicData) && data.calculate !== '' && data.calculate !== undefined) { // 判断是否是一个对象
        let infixExp = []
        data.calculate.forEach(item => {
          if (item.customTable) {
            infixExp.push(this.publicData[item.customTable][scope.$index][item.fieldName])
          } else if (item.fieldName) {
            infixExp.push(item.fieldName)
          }
        })
        console.log(calcExp(infixExpPostfixRxp(infixExp)))
        let calcExpNum = calcExp(infixExpPostfixRxp(infixExp)) === 'NaN' ||
          calcExp(infixExpPostfixRxp(infixExp)) === 'Infinity' ||
          parseInt(calcExp(infixExpPostfixRxp(infixExp))) === 'NaN'
          ? '0'
          : parseInt(calcExp(infixExpPostfixRxp(infixExp)))
        this.tableData[scope.$index][data.fieldName] = calcExpNum
        return calcExpNum
      } else {
        console.error('请提供publicData！')
        return ''
      }
    }
  },
  components: {
    GlobalPopup,
    ElxEditable: Editable,
    ElxEditableColumn: EditableColumn
  }
}
</script>

<style lang="scss">
  .selectInput{
    &>.el-input__inner[disabled="disabled"]{
      cursor: pointer !important;
    }
  }
  .edit-table-autocomplete-box{
    width: auto !important;
    margin-left: -5px;
  }
  .sort_input{
    input{
      padding-right: 0!important;
    }
  }
  .tag_mask{
    left: 0;
    top: 0;
    z-index: 1;
  }
  .edit-table-box{
    .el-table__body tr.hover-row>td,
    .el-table__body .el-table__row:hover>td{
      background-color: inherit;
    }
    &.elx-editable .elx-editable-row.sortable-ghost,
    &.elx-editable .elx-editable-row.sortable-chosen{
      background-color: #fff6b2;
    }
    .drag-btn{
      cursor: move;
    }
  }
</style>
