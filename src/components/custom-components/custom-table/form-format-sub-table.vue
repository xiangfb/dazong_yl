<template>
  <div class="bg-white">
    <CustomBtnGroup class="p-10 p-b-n" @on-click="butMonitor" :limit="limit" :butLoading="butLoading" :btn-group="btnGroup"></CustomBtnGroup>
    <div v-loading="loading" class="p-10">
      <elx-editable
        border
        ref="editable"
        class="edit-table-box"
        :row-key="rowKey"
        style="width: 100%"
        :data.sync="data"
        :edit-config="{trigger: 'click', mode: 'cell'}"
        :row-class-name="tableRowClassName"
        :height="maxHeight - 25 - 80">
        <div class="p-20" slot="empty"> <!-- 空数据展示 -->
          <avue-empty></avue-empty>
        </div>
        <elx-editable-column label="排序" width="80" fixed="left">
          <template v-slot="scope">
            <el-input class="sort_input" @keyup.enter.native="orderSort(scope.$index)" min="0" :max="dataIndex.length - 1" type="number" v-model.number="dataIndex[scope.$index]" placeholder="请输入显示顺序"/>
          </template>
        </elx-editable-column>
        <elx-editable-column width="35">
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
          <template v-if="item.ishow">
            <template>
              <elx-editable-column
                v-if="item.formSubmitType === 'ONE_TXT_POPUP'"
                showOverflowTooltip
                :min-width="item.columnWidth"
                v-bind="item"
                :key="index"
                :label="item.fieldExplain"
                :prop="item.fieldName"
                :edit-render="{type: 'visible'}">
                <template v-slot:edit="scope">
                  <el-input placeholder="请配置弹窗条件" @click.native="popupDeploy(scope.row, scope.$index, item.fieldName)" v-model="scope.row[item.fieldName]" :disabled="true"></el-input>
                </template>
              </elx-editable-column>
              <elx-editable-column
                v-else-if="item.formSubmitType === 'CALCULATE'"
                showOverflowTooltip
                :min-width="item.columnWidth"
                v-bind="item"
                :key="index"
                :label="item.fieldExplain"
                :prop="item.fieldName"
                :edit-render="item.iupdate ? {type: 'default'} : null">
                <template v-slot:edit="scope">
                  <el-input
                    disabled
                    @click.native="deployCalculate(scope)"
                    placeholder="点击配置计算方式"></el-input>
                </template>
                <template v-slot="scope">
                  <div>
                    {{calculateFun(scope.row[item.fieldName])}}
                  </div>
                </template>
              </elx-editable-column>
              <elx-editable-column
                v-else-if="item.formSubmitType === 'ONE_TXT'"
                showOverflowTooltip
                :min-width="item.columnWidth"
                v-bind="item"
                :key="index"
                :label="item.fieldExplain"
                :prop="item.fieldName"
                :edit-render="item.iupdate ? {name: 'ElInput', attrs: {clearable: true}} : null">
              </elx-editable-column>
              <elx-editable-column
                v-else-if="item.formSubmitType === 'SPECIAL_CONTRIL'"
                showOverflowTooltip
                :min-width="item.columnWidth"
                v-bind="item"
                :key="index"
                :label="item.fieldExplain"
                :prop="item.fieldName"
                :edit-render="item.iupdate ? {type: 'default'} : null">
                <template v-slot:edit="scope">
                  <el-input v-if="scope.row.formSubmitType === 'ONE_TXT'" v-model="scope.row[item.fieldName]" placeholder="请输入内容"></el-input>
                  <el-input
                    v-else-if="scope.row.formSubmitType === 'DATA_BOX_TIM'"
                    v-model="scope.row[item.fieldName]"
                    disabled
                    @click.native="chooseTime(scope)"
                    placeholder="点击选择时间"></el-input>
                  <el-switch v-else-if="scope.row.formSubmitType === 'BOOLEAN'" v-model="scope.row[item.fieldName]"></el-switch>
                </template>
                <template v-slot="scope">
                  <div class="relative" style="text-align:center" v-if="scope.row.formSubmitType === 'BOOLEAN'">
                    <el-tag disable-transitions :type="scope.row[item.fieldName] === true ? 'success' : 'danger'">
                      {{scope.row[item.fieldName] === true ? '是' : '否'}}
                    </el-tag>
                    <div class="tag_mask absolute w100 h100"></div>
                  </div>
                  <div v-if="scope.row.formSubmitType === 'DATA_BOX_TIM'">
                    {{timeFun(scope.row[item.fieldName])}}
                  </div>
                </template>
              </elx-editable-column>
              <elx-editable-column
                v-else-if="item.formSubmitType === 'MORE_TXT'"
                showOverflowTooltip
                :min-width="item.columnWidth"
                v-bind="item"
                :key="index"
                :label="item.fieldExplain"
                :prop="item.fieldName"
                :edit-render="item.iupdate ? {name: 'ElInput', attrs: {type: 'textarea', autosize: {minRows: 1, maxRows: 4}}} : null">
              </elx-editable-column>
              <elx-editable-column
                v-else-if="item.formSubmitType === 'SELECT'"
                showOverflowTooltip
                :min-width="item.columnWidth"
                v-bind="item"
                :key="index"
                :label="item.fieldExplain"
                :prop="item.fieldName"
                :edit-render="item.iupdate ? {name: 'ElSelect', options: item.options, attrs: {clearable: true,filterable:true}}: ''">
              </elx-editable-column>
              <elx-editable-column
                v-else-if="item.formSubmitType === 'MULTIPLE_SELECTION'"
                showOverflowTooltip
                header-align="left"
                align="center"
                :min-width="item.columnWidth"
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
                showOverflowTooltip
                :min-width="item.columnWidth"
                v-bind="item"
                :key="index"
                :sortable="item.sortField"
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
                showOverflowTooltip
                :min-width="item.columnWidth"
                v-bind="item"
                :key="index"
                :sortable="item.sortField"
                :label="item.fieldExplain"
                :prop="item.fieldName"
                :edit-render="item.iupdate ? {name: 'ElTimePicker', attrs: {type: 'datetime', format: item.formSubmitType.substring(13)}} : null">
              </elx-editable-column>
              <elx-editable-column
                v-else-if="item.formSubmitType && item.formSubmitType.indexOf('DATA_RANGE_BOX_TIM') !== -1"
                showOverflowTooltip
                :min-width="item.columnWidth"
                v-bind="item"
                :key="index"
                :sortable="item.sortField"
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
                :min-width="item.columnWidth"
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
                    <el-tag
                      disable-transitions>
                      {{scope.row[item.fieldName]}}
                    </el-tag>
                  </div>
                  <div v-else>
                    {{scope.row[item.fieldName]}}
                  </div>
                </template>
              </elx-editable-column>
            </template>
          </template>
        </template>
      </elx-editable>
    </div>
    <el-dialog custom-class="popup_dialog" width="700px" :visible.sync="dialogVisible" center :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="form" :model="popupForm" label-position="left" label-width="80px" size="small" :rules="rules">
        <el-form-item label="弹窗模板" prop="resFormatId">
          <el-select v-model="popupForm.resFormatId" clearable filterable placeholder="请选择弹窗模板..." :loading="resFormatLoading" @change="resFormatChange">
            <el-option v-for="(item, index) in popupOptions" :key="index" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div v-if="popupForm.resFormatId">
        <el-divider>传参</el-divider>
        <el-form ref="paramForm" :model="popupForm" label-position="top" label-width="80px" size="small">
          <el-row :gutter="20" class="m-b-10">
            <el-col :span="8">
              <div class="align-center">
                表单字段
              </div>
            </el-col>
            <el-col :span="8" class="align-center">
              <el-button type="primary" :loading="popupButLoading" @click="addParamList('paramList')">新增传参</el-button>
            </el-col>
            <el-col :span="8">
              <div class="align-center">
                查询字段
              </div>
            </el-col>
          </el-row>
          <template v-for="(item, index) in popupForm.paramList">
            <el-row :gutter="20" :key="index">
              <el-col :span="10">
                <el-form-item
                  :prop="`paramList.${index}.formatSubId`"
                  :rules="{
                    required: true, message: '必须选择表单字段', trigger: 'change'
                  }">
                  <el-select v-model="item.formatSubId" clearable filterable placeholder="请选择表单字段..." :loading="fieldLoading">
                    <el-option v-for="(item, index) in formSubList" :key="index" :label="item.fieldExplain + '[' + item.customTable + ' / ' + item.fieldName + ']'" :value="item.id">
                      {{item.fieldExplain + '[' + item.customTable + ' / ' + item.fieldName + ']'}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" class="align-center">
                <el-button type="danger" :loading="popupButLoading" @click="delParamList('paramList', index)">删除</el-button>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  :prop="`paramList.${index}.dataId`"
                  :rules="{
                    required: true, message: '必须选择查询字段', trigger: 'change'
                  }">
                  <el-select v-model="item.dataId" clearable filterable placeholder="请选择查询字段..." :loading="fieldLoading">
                    <el-option v-for="(item, index) in searchSubList" :key="index" :label="item.fieldExplain + '[' + item.customTable + ' / ' + item.fieldName + ']'" :value="item.id">
                      {{item.fieldExplain + '[' + item.customTable + ' / ' + item.fieldName + ']'}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </el-form>
        <el-divider v-if="$route.query && $route.query.type && $route.query.type === 'form'">出参</el-divider>
        <el-form v-if="$route.query && $route.query.type && $route.query.type === 'form'" ref="resourceForm" :model="popupForm" label-position="top" label-width="80px" size="small">
          <el-row :gutter="20" class="m-b-10">
            <el-col :span="8">
              <div class="align-center">
                结果字段
              </div>
            </el-col>
            <el-col :span="8" class="align-center">
              <el-button type="primary" :loading="popupButLoading" @click="addParamList('resourceList')">新增出参</el-button>
            </el-col>
            <el-col :span="8">
              <div class="align-center">
                表单字段
              </div>
            </el-col>
          </el-row>
          <template v-for="(item, index) in popupForm.resourceList">
            <el-row :gutter="20" :key="index">
              <el-col :span="10">
                <el-form-item
                  :prop="`resourceList.${index}.dataId`"
                  :rules="{
                    required: true, message: '必须选择结果字段', trigger: 'change'
                  }">
                  <el-select v-model="item.dataId" clearable filterable placeholder="请选择结果字段..." :loading="fieldLoading">
                    <el-option v-for="(item, index) in resSubList" :key="index" :label="item.fieldExplain + '[' + item.customTable + ' / ' + item.fieldName + ']'" :value="item.id">
                      {{item.fieldExplain + '[' + item.customTable + ' / ' + item.fieldName + ']'}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" class="align-center">
                <el-button type="danger" :loading="popupButLoading" @click="delParamList('resourceList', index)">删除</el-button>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  :prop="`resourceList.${index}.formatSubId`"
                  :rules="{
                    required: true, message: '必须选择表单字段', trigger: 'change'
                  }">
                  <el-select v-model="item.formatSubId" clearable filterable placeholder="请选择表单字段..." :loading="fieldLoading">
                    <el-option v-for="(item, index) in formSubList" :key="index" :label="item.fieldExplain + '[' + item.customTable + ' / ' + item.fieldName + ']'" :value="item.id">
                      {{item.fieldExplain + '[' + item.customTable + ' / ' + item.fieldName + ']'}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="popupButLoading" @click="dialogVisible = false">取 消</el-button>
        <el-button :loading="popupButLoading" v-if="$route.query && $route.query.type && $route.query.type === 'form'" type="primary" @click="onSubmit">提 交</el-button>
        <el-button :loading="popupButLoading" v-else-if="$route.query && $route.query.type && $route.query.type === 'list'" type="primary" @click="listOnSubmit">提 交</el-button>
      </span>
    </el-dialog>
    <el-dialog custom-class="time_dialog" width="550px" :title="timeRow && timeRow.row.fieldExplain" :visible.sync="timeVisible" center :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="timeForm" :model="timeResult" label-width="40px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="年">
              <el-select size="mini" style="width: 38% !important;" v-model="timeResult.yearMark" placeholder="请选择" clearable>
                <el-option label="减" value="-"></el-option>
                <el-option label="加" value="+"></el-option>
              </el-select>
              <el-input-number :min="0" style="width: 52%;" step-strictly size="mini" v-model="timeResult.year"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时">
              <el-select size="mini" style="width: 38% !important;" v-model="timeResult.hourMark" placeholder="请选择" clearable>
                <el-option label="减" value="-"></el-option>
                <el-option label="加" value="+"></el-option>
              </el-select>
              <el-input-number :min="0" :max="24" style="width: 52%;" step-strictly size="mini" v-model="timeResult.hour"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="月">
              <el-select size="mini" style="width: 38% !important;" v-model="timeResult.monthMark" placeholder="请选择" clearable>
                <el-option label="减" value="-"></el-option>
                <el-option label="加" value="+"></el-option>
              </el-select>
              <el-input-number :min="0" :max="12" style="width: 52%;" step-strictly size="mini" v-model="timeResult.month"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分">
              <el-select size="mini" style="width: 38% !important;" v-model="timeResult.minuteMark" placeholder="请选择" clearable>
                <el-option label="减" value="-"></el-option>
                <el-option label="加" value="+"></el-option>
              </el-select>
              <el-input-number :min="0" :max="60" style="width: 52%;" step-strictly size="mini" v-model="timeResult.minute"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日">
              <el-select size="mini" style="width: 38% !important;" v-model="timeResult.dayMark" placeholder="请选择" clearable>
                <el-option label="减" value="-"></el-option>
                <el-option label="加" value="+"></el-option>
              </el-select>
              <el-input-number :min="0" :max="31" style="width: 52%;" step-strictly size="mini" v-model="timeResult.day"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="秒">
              <el-select size="mini" style="width: 38% !important;" v-model="timeResult.secondMark" placeholder="请选择" clearable>
                <el-option label="减" value="-"></el-option>
                <el-option label="加" value="+"></el-option>
              </el-select>
              <el-input-number :min="0" :max="60" style="width: 52%;" step-strictly size="mini" v-model="timeResult.second"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="m-b-n">
          <el-button type="primary" @click="timeSubmit">立即创建</el-button>
          <el-button @click="timeVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog custom-class="time_dialog" width="780px" :title="alculateRow && alculateRow.row.fieldExplain" :visible.sync="alculateVisible" center :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-checkbox-group v-model="checkedAlculates">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in alculateResult" :key="index">
            <el-checkbox class="none_checkbox_label" style="margin-right: 10px;" :label="index"></el-checkbox>
            <el-cascader style="width: calc(100% - 25px);" expand-trigger="hover" :show-all-levels="false" :options="alculateOptions" v-model="item.data"></el-cascader>
          </el-col>
        </el-row>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-checkbox v-model="isTotal" style="margin-right: 10px !important;">合计</el-checkbox>
        <el-select v-if="isTotal" style="width: 200px !important;margin-right: 10px !important;" v-model="alculateType.customTable" placeholder="请选择合计表">
          <el-option v-for="(item, index) in masterObj" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button :loading="popupButLoading" @click="saveAlculate" type="primary">提 交</el-button>
        <el-button :loading="popupButLoading" @click="addAlculate" type="info">添 加</el-button>
        <el-button :loading="popupButLoading" @click="delAlculate" type="danger">删 除</el-button>
        <el-button :loading="popupButLoading" @click="alculateVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Editable, EditableColumn } from 'vue-element-extends'
import CustomType from 'service/source/custom-type'
import Sortable from 'sortablejs'
import { formatDate } from 'util/common-methods.js'
import XEUtils from 'xe-utils'
export default {
  data () {
    return {
      rowIndex: undefined,
      fieldName: undefined,
      popupButLoading: true,
      resFormatLoading: true,
      fieldLoading: true,
      rules: {
        resFormatId: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      dialogVisible: false,
      isTotal: false,
      alculateVisible: false,
      alculateRow: null,
      alculateResult: [],
      checkedAlculates: [],
      alculateOptions: [],
      alculateType: {
        customTable: '',
        mode: 'array'
      },
      timeVisible: false,
      timeRow: null,
      timeResult: {
        yearMark: '-',
        year: 0,
        monthMark: '-',
        month: 0,
        dayMark: '-',
        day: 0,
        hourMark: '',
        hour: 0,
        minuteMark: '',
        minute: 0,
        secondMark: '',
        second: 0
      },
      formSubList: [],
      searchSubList: [],
      resSubList: [],
      popupForm: {
        resFormatId: '',
        resFormatSubId: '',
        paramList: [],
        resourceList: []
      },
      popupOptions: [],
      dataIndex: [],
      data: []
    }
  },
  props: {
    masterObj: {
      type: Array,
      default () {
        return []
      }
    },
    butLoading: {
      type: Boolean,
      default: true
    },
    btnGroup: { // 按钮组
      type: Array,
      default () {
        return []
      }
    },
    limit: {
      type: Number,
      default: 4
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
    tableData: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    },
    maxHeight: {
      type: [String, Number]
    }
  },
  watch: {
    timeVisible (e) {
      if (!e) {
        this.timeResult = {
          yearMark: '-',
          year: 0,
          monthMark: '-',
          month: 0,
          dayMark: '-',
          day: 0,
          hourMark: '',
          hour: 0,
          minuteMark: '',
          minute: 0,
          secondMark: '',
          second: 0
        }
      }
    },
    tableData: {
      handler (data) {
        this.data = data.map((item, index) => {
          this.dataIndex[index] = index
          item.rowKey = index
          return item
        })
      },
      deep: true,
      immediate: true
    },
    dialogVisible (val) { // TODO: 有bug报错
      if (!val) {
        this.popupForm = {
          resFormatId: '',
          resFormatSubId: '',
          paramList: [],
          resourceList: []
        }
      }
    }
  },
  mounted () {
    this.rowDrop()
    this.getResourceList()
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (this.pendingRemoveList.some(item => item === row)) {
        return 'prohibit-edit-row'
      }
      return ''
    },
    timeFun (obj) {
      if (obj) {
        let nowDate = new Date()
        let timer = ''
        obj = JSON.parse(obj)
        if (obj.yearMark) {
          timer += (nowDate.getFullYear() + (obj.yearMark + obj.year) * 1) + '-'
        } else {
          timer += obj.year + '-'
        }
        if (obj.monthMark) {
          timer += (nowDate.getMonth() + 1 + (obj.monthMark + obj.month) * 1) + '-'
        } else {
          timer += obj.month + '-'
        }
        if (obj.dayMark) {
          timer += (nowDate.getDate() + (obj.dayMark + obj.day) * 1) + ' '
        } else {
          timer += obj.day + ' '
        }
        if (obj.hourMark) {
          timer += (nowDate.getHours() + (obj.hourMark + obj.hour) * 1) + ':'
        } else {
          timer += obj.hour + ':'
        }
        if (obj.minuteMark) {
          timer += (nowDate.getMinutes() + (obj.minuteMark + obj.minute) * 1) + ':'
        } else {
          timer += obj.minute + ':'
        }
        if (obj.secondMark) {
          timer += (nowDate.getSeconds() + (obj.secondMark + obj.second) * 1)
        } else {
          timer += obj.second
        }
        return formatDate(new Date(timer), 4)
      } else {
        return ''
      }
    },
    timeSubmit () {
      this.$set(this.data[this.timeRow.$index], 'defaultValue', JSON.stringify(this.timeResult))
      this.timeVisible = false
    },
    chooseTime (row) {
      this.timeRow = row
      if (row.row.defaultValue) {
        this.timeResult = JSON.parse(row.row.defaultValue)
      }
      this.timeVisible = true
    },
    calculateFun (row) {
      if (row) {
        let datas = JSON.parse(row)
        if (XEUtils.isArray(datas)) { // 是否为数组
          let infixExp = ''
          datas.forEach(data => {
            if (data.customTable) {
              infixExp += data.customTable + '.' + data.fieldName
            } else if (data.fieldName) {
              infixExp += ` ${data.fieldName} `
            }
          })
          return infixExp
        } else if (XEUtils.isPlainObject(datas)) { // 是否为对象
          let infixExp = ''
          datas.fieldName.forEach(data => {
            if (data.customTable) {
              infixExp += data.customTable + '.' + data.fieldName
            } else if (data.fieldName) {
              infixExp += ` ${data.fieldName} `
            }
          })
          return `SUM(${infixExp})`
        }
      }
    },
    addAlculate () {
      this.alculateResult.push({
        customTable: '',
        fieldName: '',
        data: []
      })
    },
    delAlculate () {
      if (this.checkedAlculates.length > 0) {
        this.checkedAlculates.forEach(item => {
          this.alculateResult.splice(item, 1)
        })
        this.checkedAlculates = []
      } else {
        this.$message.error('最少要选择一条数据！')
      }
    },
    saveAlculate () {
      let datas = this.alculateResult.map(item => {
        if (item.data[0] !== 'operatorData' && item.data[0] !== 'priorityData') {
          return {
            customTable: item.data[0],
            fieldName: item.data[1]
          }
        } else {
          return {
            customTable: '',
            fieldName: item.data[1]
          }
        }
      })
      if (this.isTotal) {
        if (!this.alculateType.customTable) {
          this.$message.error('请选择合计表！')
          return false
        }
        this.alculateType.fieldName = datas
        this.alculateType.mode = 'sum'
        this.$set(this.data[this.alculateRow.$index], 'calculate', JSON.stringify(this.alculateType))
      } else {
        this.alculateType = {
          customTable: '',
          mode: 'array'
        }
        this.$set(this.data[this.alculateRow.$index], 'calculate', JSON.stringify(datas))
      }
      this.alculateVisible = false
    },
    deployCalculate (row) {
      let datas = XEUtils.clone(this.masterObj, true)
      datas = datas.map(data => {
        data.children = []
        this.data.forEach(item => {
          if (data.value === item.tableCode) {
            data.children.push(item)
          }
        })
        return data
      })
      this.alculateOptions = [
        {
          value: 'operatorData',
          label: '运算符',
          children: [
            {
              value: '+',
              label: '加'
            },
            {
              value: '-',
              label: '减'
            },
            {
              value: '*',
              label: '乘'
            },
            {
              value: '/',
              label: '除'
            }
          ]
        },
        {
          value: 'priorityData',
          label: '优先级',
          children: [
            {
              value: '(',
              label: '左括号'
            },
            {
              value: ')',
              label: '右括号'
            }
          ]
        },
        ...datas
      ]
      this.alculateRow = row
      if (row.row.calculate) {
        let calculateObj = JSON.parse(row.row.calculate)
        if (XEUtils.isArray(calculateObj)) {
          this.isTotal = false
          this.alculateType = {
            customTable: '',
            mode: 'array'
          }
          this.alculateResult = calculateObj.map(item => {
            if (['(', ')'].indexOf(item.fieldName) >= 0) {
              item.data = ['priorityData', item.fieldName]
            } else if (['+', '-', '*', '/'].indexOf(item.fieldName) >= 0) {
              item.data = ['operatorData', item.fieldName]
            } else {
              item.data = ['field', item.customTable, item.fieldName]
            }
            return item
          })
        } else if (XEUtils.isPlainObject(calculateObj)) {
          this.isTotal = true
          this.alculateType = {
            customTable: calculateObj.customTable,
            mode: 'sum'
          }
          this.alculateResult = calculateObj.fieldName.map(item => {
            if (['(', ')'].indexOf(item.fieldName) >= 0) {
              item.data = ['priorityData', item.fieldName]
            } else if (['+', '-', '*', '/'].indexOf(item.fieldName) >= 0) {
              item.data = ['operatorData', item.fieldName]
            } else {
              item.data = ['field', item.customTable, item.fieldName]
            }
            return item
          })
        }
      } else {
        this.alculateType = {
          customTable: '',
          mode: 'array'
        }
        this.alculateResult = []
      }
      this.alculateVisible = true
    },
    getData () {
      return this.$refs.editable.getRecords()
    },
    getResourceList () {
      if (this.$route.query && this.$route.query.type && this.$route.query.type === 'form') { // 表单弹窗模板
        CustomType.resourceList({ // 获取弹窗模板
          sort: [{ key: 'createDate', dir: 'desc' }],
          search: [{ 'key': 'formatType', 'op': 'eq', 'val': 'RESOURCE' }]
        }, 'format').then(res => {
          this.popupOptions = res.map(item => {
            item.label = item.formatName
            item.value = item.id
            return item
          })
          this.popupButLoading = false
          this.resFormatLoading = false
        })
      } else if (this.$route.query && this.$route.query.type && this.$route.query.type === 'list') { // 列表弹窗资源
        CustomType.listResourceList().then(res => {
          this.popupOptions = res.map(item => {
            item.label = item.formatName
            item.value = item.id
            return item
          })
          this.popupButLoading = false
          this.resFormatLoading = false
        })
      }
    },
    addParamList (type) {
      this.popupForm[type].push({
        formatSubId: '',
        dataId: ''
      })
    },
    delParamList (type, index) {
      this.popupForm[type].splice(index, 1)
    },
    resFormatChange (val) {
      if (val) {
        this.popupButLoading = true
        let promises = [
          new Promise((resolve, reject) => {
            CustomType.subs(this.$route.query.id).then(res => { // 表单字段下拉
              if (res.success) {
                if (this.$route.query && this.$route.query.type && this.$route.query.type === 'list') {
                  this.searchSubList = res.data.listSubList
                } else if (this.$route.query && this.$route.query.type && this.$route.query.type === 'form') {
                  this.formSubList = res.data.formSubList
                }
                resolve(res)
              } else {
                reject(res.message)
              }
            })
          }),
          new Promise((resolve, reject) => {
            CustomType.search(val).then(res => { // 查询字段下拉
              if (res.success) {
                if (this.$route.query && this.$route.query.type && this.$route.query.type === 'form') {
                  this.searchSubList = res.data.paramList
                }
                resolve(res)
              } else {
                reject(res.message)
              }
            })
          }),
          new Promise((resolve, reject) => {
            CustomType.subs(val).then(res => { // 结果字段下拉
              if (res.success) {
                if (this.$route.query && this.$route.query.type && this.$route.query.type === 'list') {
                  this.formSubList = res.data.formSubList
                } else if (this.$route.query && this.$route.query.type && this.$route.query.type === 'form') {
                  this.resSubList = res.data.resSubList
                }
                resolve(res)
              } else {
                reject(res.message)
              }
            })
          })
        ]
        Promise.all(promises).then((res) => {
          this.fieldLoading = false
          this.popupButLoading = false
        }).catch((err) => {
          console.error(err)
        })
      }
    },
    listOnSubmit () {
      this.popupButLoading = true
      let paramValid = true
      if (this.popupForm.resFormatId) {
        this.$refs.paramForm.validate((paramValids) => {
          paramValid = paramValids
        })
      }
      this.$refs.form.validate((valid) => {
        if (valid && paramValid) {
          CustomType.listSubCreate({
            entity: {
              ...this.popupForm
            }
          }).then(res => {
            if (res.success) {
              this.$set(this.data[this.rowIndex], 'cgFormatResId', this.popupForm.resFormatId)
              this.popupButLoading = false
              this.dialogVisible = false
              this.$notify({
                title: '温馨提示',
                message: '提交成功！',
                type: 'success'
              })
            }
          })
        } else {
          this.popupButLoading = false
        }
      })
    },
    onSubmit () {
      this.popupButLoading = true
      let paramValid = true
      let resourceValid = true
      if (this.popupForm.resFormatId) {
        this.$refs.paramForm.validate((paramValids) => {
          paramValid = paramValids
        })
        this.$refs.resourceForm.validate((resourceValids) => {
          resourceValid = resourceValids
        })
      }
      this.$refs.form.validate((valid) => {
        if (valid && paramValid && resourceValid) {
          CustomType.subCreate({
            entity: {
              ...this.popupForm
            }
          }).then(res => {
            if (res.success) {
              this.$set(this.data[this.rowIndex], 'cgFormatResId', this.popupForm.resFormatId)
              this.popupButLoading = false
              this.dialogVisible = false
              this.$notify({
                title: '温馨提示',
                message: '提交成功！',
                type: 'success'
              })
            }
          })
        } else {
          this.popupButLoading = false
        }
      })
    },
    popupDeploy (row, index, fieldName) {
      this.rowIndex = index
      this.fieldName = fieldName
      this.dialogVisible = true
      this.popupButLoading = true
      this.$set(this.popupForm, 'resFormatId', row.cgFormatResId)
      this.popupForm.resFormatSubId = row.id
      this.resFormatChange(row.cgFormatResId)
      let promises = []
      if (this.$route.query && this.$route.query.type && this.$route.query.type === 'form') {
        promises = [
          new Promise((resolve, reject) => {
            CustomType.param({
              resFormatSubId: row.id
            }).then(res => {
              if (res.success) {
                this.popupForm.paramList = res.data.map(item => {
                  return {
                    formatSubId: item.fieldSub1.tableSubId,
                    dataId: item.fieldSub2.tableSubId
                  }
                })
                resolve(res)
              } else {
                reject(res.message)
              }
            })
          }),
          new Promise((resolve, reject) => {
            CustomType.resource({
              resFormatSubId: row.id
            }).then(res => {
              if (res.success) {
                this.popupForm.resourceList = res.data.map(item => {
                  return {
                    formatSubId: item.fieldSub2.tableSubId,
                    dataId: item.fieldSub1.tableSubId
                  }
                })
                resolve(res)
              } else {
                reject(res.message)
              }
            })
          })
        ]
      } else if (this.$route.query && this.$route.query.type && this.$route.query.type === 'list') {
        promises = [
          new Promise((resolve, reject) => {
            CustomType.listParam({
              resFormatSubId: row.id
            }).then(res => {
              if (res.success) {
                this.popupForm.paramList = res.data.map(item => {
                  return {
                    formatSubId: item.fieldSub1.tableSubId,
                    dataId: item.fieldSub2.tableSubId
                  }
                })
                resolve(res)
              } else {
                reject(res.message)
              }
            })
          })
        ]
      }
      Promise.all(promises).then((res) => {
        this.popupButLoading = false
      }).catch((err) => {
        console.error(err)
      })
    },
    butMonitor (e) { // 按钮组触发
      switch (e) {
        case 'default':
          this.$refs.editable.clearActive()
          this.$refs.editable.revert()
          break
      }
      this.$emit('but-receipt', e)
    },
    orderSort ($index) {
      if ($index !== this.dataIndex[$index]) {
        let currRow = this.data.splice($index, 1)[0]
        this.data.splice(this.dataIndex[$index], 0, currRow)
        this.dataIndex = this.data.map((item, index) => {
          return index
        })
      }
    },
    rowDrop () {
      this.$nextTick(() => {
        Sortable.create(this.$el.querySelector('.el-table__body-wrapper tbody'), {
          handle: '.drag-btn',
          onEnd: ({ newIndex, oldIndex }) => {
            let currRow = this.data.splice(oldIndex, 1)[0]
            this.data.splice(newIndex, 0, currRow)
            this.dataIndex = this.data.map((item, index) => {
              return index
            })
          }
        })
      })
    }
  },
  computed: {
    pendingRemoveList () {
      return this.data.filter(item => {
        return item.ihidden
      })
    }
  },
  components: {
    ElxEditable: Editable,
    ElxEditableColumn: EditableColumn
  }
}
</script>

<style lang="scss">
  .time_dialog{
    .radio_no_border{
      border-width: 0 !important;
    }
    .el-dialog__header{
      padding: 20px 10px !important;
      padding-bottom: 0px !important;
    }
    .el-dialog__body{
      padding: 10px !important;
    }
  }
  .popup_dialog{
    .el-dialog__header{
      display: none;
    }
    .el-dialog__body{
      padding-bottom: 10px!important;
    }
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
    .prohibit-edit-row{
      background: #dfdfdf;
    }
  }
  .none_checkbox_label{
    .el-checkbox__label{
      display: none !important;
    }
  }
</style>
