<template>
  <div class="bg-white" :style="{width: width || (columnNum === 4 ? '50%' : '100%'), margin: 'auto', 'min-width': '550px'}">
    <CustomBtnGroup v-if="btnGroup.length > 0" class="p-10 p-b-n" @on-click="butMonitor" :limit="limit" :btn-group="btnGroup"></CustomBtnGroup>
    <div class="p-10" :style="{'max-height': isShowBut ? `${maxHeight - 60}px` : '', 'overflow-y': isShowBut ? 'auto' : ''}">
      <el-form label-position="right" :ref="formRef" :label-width="`${labelWidth}px`" :model="mapData" @submit.native.prevent hide-required-asterisk>
        <el-row :gutter="20">
          <template v-for="(item, index) in formSubList">
            <el-col v-if="item.ishow && !item.ihidden" :span="48 / columnNum" :key="index">
              <template v-if="item.calculate">
                <el-form-item :prop="item.fieldName"
                              :rules="rulesMate(item)">
                  <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                    <div class="nowrap">
                      <span v-if="item.irequired" class="required-asterisk-box">*</span>
                      {{item.fieldExplain}}
                    </div>
                  </el-tooltip>
                  <el-tooltip :disabled="!calculateData[item.fieldName]" class="item" effect="dark" :enterable="false" :content="calculateData[item.fieldName] + ''" placement="top">
                    <div class="el-input el-input--small is-disabled">
                      <div class="el-input__inner">
                        {{calculateData[item.fieldName]}}
                      </div>
                    </div>
                  </el-tooltip>
                </el-form-item>
              </template>
              <template v-else-if="item.formSubmitType === 'ONE_TXT' || item.formSubmitType === 'MORE_TXT'"> <!-- 多行或者单行输入框 -->
                <el-form-item :prop="item.fieldName"
                              :rules="rulesMate(item)">
                  <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                    <div class="nowrap">
                      <span v-if="item.irequired" class="required-asterisk-box">*</span>
                      {{item.fieldExplain}}
                    </div>
                  </el-tooltip>
                  <el-tooltip :disabled="!item.tipsMessage && !mapData[item.fieldName]" class="item" effect="dark" :enterable="false" :content="mapData[item.fieldName] || item.tipsMessage" placement="top">
                    <el-input :disabled="!item.iupdate"
                              :type="item.formSubmitType === 'ONE_TXT' ? 'text' : 'textarea'"
                              :rows="1"
                              :placeholder="item.tipsMessage || '请输入'"
                              @change="uniqueKey"
                              clearable
                              autocomplete="off"
                              v-model="mapData[item.fieldName]" />
                  </el-tooltip>
                </el-form-item>
              </template>
              <template v-else-if="item.formSubmitType === 'RESOURCE_CONTROLS' || item.formSubmitType === 'RESOURCE_CONTROLS_MORE'"> <!-- 弹窗资源 -->
                <el-form-item :prop="item.fieldName"
                              :rules="rulesMate(item)">
                  <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                    <div class="nowrap">
                      <span v-if="item.irequired" class="required-asterisk-box">*</span>
                      {{item.fieldExplain}}
                    </div>
                  </el-tooltip>
                  <el-tooltip :disabled="!item.tipsMessage && !mapData[item.fieldName]" class="item" effect="dark" :enterable="false" :content="mapData[item.fieldName] || item.tipsMessage" placement="top">
                    <div>
                      <el-input
                        disabled
                        type="text"
                        :placeholder="item.tipsMessage || '请输入'"
                        autocomplete="off"
                        @click.native="inputTap(item, index)"
                        v-model="mapData[item.fieldName]"
                        :class="{'none_disabled': mapData[item.fieldName]}"
                        class="selectInput">
                      </el-input>
                      <span v-if="mapData[item.fieldName]" class="el-input__suffix closebtn" @click="inputTap2(item, index)">
                        <span class="el-input__suffix-inner">
                          <i class="el-input__icon el-icon-circle-close"></i>
                        </span>
                        <i class="el-input__icon el-input__validateIcon el-icon-circle-close"></i>
                      </span>
                    </div>
                  </el-tooltip>
                </el-form-item>
              </template>
              <template v-else-if="item.formSubmitType === 'AUTO_COMPLETE'">
                <el-form-item :prop="item.fieldName"
                              :rules="rulesMate(item)">
                  <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                    <div class="nowrap">
                      <span v-if="item.irequired" class="required-asterisk-box">*</span>
                      {{item.fieldExplain}}
                    </div>
                  </el-tooltip>
                  <el-autocomplete :readonly="!item.iupdate"
                                  class="autocomplete_width100"
                                  v-model="mapData[item.fieldName]"
                                  :fetch-suggestions="((queryString, cb)=>{querySearchAsync(queryString, cb, item)})"
                                  clearable
                                  :placeholder="item.tipsMessage || '请输入'"
                                  autocomplete="off" />
                </el-form-item>
              </template>
              <template v-else-if="item.formSubmitType === 'SEARCH_AUTOMATIC'">
                <el-form-item :prop="item.fieldName"
                              class="search-automatic-box"
                              :rules="rulesMate(item)">
                  <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                    <div class="nowrap">
                      <span v-if="item.irequired" class="required-asterisk-box">*</span>
                      {{item.fieldExplain}}
                    </div>
                  </el-tooltip>
                  <el-autocomplete :readonly="!item.iupdate"
                                  @select="autocompleteChange"
                                  :debounce="500"
                                  class="autocomplete_width100"
                                  v-model="mapData[item.fieldName]"
                                  :fetch-suggestions="((queryString, cb)=>{querySearchAsync(queryString, cb, item, true)})"
                                  clearable
                                  :popper-append-to-body="false"
                                  :placeholder="item.tipsMessage || '请输入'"
                                  autocomplete="off">
                    <div slot-scope="scope">
                      <span v-for="(obj, key) in scope.item.showData" :key="key">{{obj}}&emsp;</span>
                    </div>
                  </el-autocomplete>
                </el-form-item>
              </template>
              <template v-else-if="item.formSubmitType === 'SELECT'"> <!-- 下拉菜单 -->
                <el-form-item :prop="item.fieldName"
                              :rules="rulesMate(item)">
                  <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                    <div class="nowrap">
                      <span v-if="item.irequired" class="required-asterisk-box">*</span>
                      {{item.fieldExplain}}
                    </div>
                  </el-tooltip>
                  <el-select v-model="mapData[item.fieldName]" filterable clearable :disabled="!item.iupdate" :placeholder="item.tipsMessage || '请选择'">
                    <el-option v-for="(data, i) in item.options" :key="i" @click.native="selectChange(data, item)" :label="data.label" :value="data.value"/>
                  </el-select>
                </el-form-item>
              </template>
              <template v-else-if="item.formSubmitType === 'SINGLE_ELECTION'"> <!-- 单选框 -->
                <el-form-item :prop="item.fieldName"
                              :rules="rulesMate(item)">
                  <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                    <div class="nowrap">
                      <span v-if="item.irequired" class="required-asterisk-box">*</span>
                      {{item.fieldExplain}}
                    </div>
                  </el-tooltip>
                  <el-select v-model="mapData[item.fieldName]" placeholder="请选择">
                    <el-option
                      v-for="(data, i) in item.options"
                      :key="i"
                      :label="data.label"
                      :value="data.value">
                    </el-option>
                  </el-select>
                  <!-- <el-radio v-for="(data, i) in item.options" :key="i" :disabled="!item.iupdate" :label="data.value" v-model="mapData[item.fieldName]">
                    {{data.label}}
                  </el-radio> -->
                </el-form-item>
              </template>
              <template v-else-if="item.formSubmitType === 'BOOLEAN'"> <!--单选按钮 -->
                <el-form-item :prop="item.fieldName"
                              :rules="rulesMate(item)">
                  <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                    <div class="nowrap">
                      <span v-if="item.irequired" class="required-asterisk-box">*</span>
                      {{item.fieldExplain}}
                    </div>
                  </el-tooltip>
                  <el-radio-group v-model="mapData[item.fieldName]">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </template>
              <template v-else-if="item.formSubmitType === 'MULTIPLE_SELECTION'"> <!-- 复选框 -->
                <el-form-item :prop="item.fieldName"
                              :rules="rulesMate(item)">
                  <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                    <div class="nowrap">
                      <span v-if="item.irequired" class="required-asterisk-box">*</span>
                      {{item.fieldExplain}}
                    </div>
                  </el-tooltip>
                  <el-checkbox v-for="(data, i) in item.options" :key="i" :disabled="!item.iupdate" :label="data.value" v-model="mapData[item.fieldName]">
                    {{data.label}}
                  </el-checkbox>
                </el-form-item>
              </template>
              <template v-else-if="item.formSubmitType === 'DATA_BOX_TIM' || item.formSubmitType === 'DATA_RANGE_BOX'"> <!-- 日期选择框、日期范围选择框 -->
                <el-form-item :prop="item.fieldName"
                              :rules="rulesMate(item)">
                  <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                    <div class="nowrap">
                      <span v-if="item.irequired" class="required-asterisk-box">*</span>
                      {{item.fieldExplain}}
                    </div>
                  </el-tooltip>
                  <el-tooltip v-if="item.formSubmitType === 'DATA_BOX_TIM'" :disabled="!item.tipsMessage && !mapData[item.fieldName]" class="item" effect="dark" :enterable="false" :content="mapData[item.fieldName] || item.tipsMessage" placement="top">
                    <el-date-picker v-model="mapData[item.fieldName]"
                                    type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :disabled="!item.iupdate"
                                    :placeholder="item.tipsMessage || '请选择'"/>
                  </el-tooltip>
                  <el-tooltip v-if="item.formSubmitType === 'DATA_RANGE_BOX'" :disabled="!item.tipsMessage.start && item.tipsMessage.end && !mapData[item.fieldName]" class="item" effect="dark" :enterable="false" :content="mapData[item.fieldName] || `${item.tipsMessage.start}-${item.tipsMessage.end}`" placement="top">
                    <el-date-picker v-model="mapData[item.fieldName]"
                                    type="datetimerange"
                                    range-separator="至"
                                    :start-placeholder="item.tipsMessage.start"
                                    :end-placeholder="item.tipsMessage.end"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :disabled="!item.iupdate" />
                  </el-tooltip>
                </el-form-item>
              </template>
              <template v-else-if="item.formSubmitType === 'TIME_BOX_TIM'"> <!-- 时间选择框 -->
                <el-form-item :prop="item.fieldName"
                              :rules="rulesMate(item)">
                  <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                    <div class="nowrap">
                      <span v-if="item.irequired" class="required-asterisk-box">*</span>
                      {{item.fieldExplain}}
                    </div>
                  </el-tooltip>
                     <el-time-picker
                     :disabled="!item.iupdate"
                      v-model="mapData[item.fieldName]"
                      type="datetime"
                      placeholder="选择时间"
                      value-format="HH:mm:ss">
                    </el-time-picker>
                </el-form-item>
              </template>
            </el-col>
          </template>
        </el-row>
        <el-form-item v-if="isShowBut" class="m-b-n">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <slot></slot>
    </div>
    <global-popup
      :dataDetail="dataDetail"
      @visibleSync="visibleSync"
      @confirm="confirm"></global-popup>
  </div>
</template>

<script>
import { GlobalPopup } from 'components/base/index'
import { formatDate, infixExpPostfixRxp, calcExp } from 'util/common-methods.js'
import XEUtils from 'xe-utils'
import Ajax from '_router/ajax'
import Config from 'config'
import GlobalService from 'service/modules/popup/global-service'
import CustomType from 'service/source/custom-type'

export default {
  name: 'four-column',
  props: {
    publicData: {
      type: Object
    },
    maxHeight: {
      type: [String, Number],
      default: 1067
    },
    width: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 5
    },
    butLoading: {
      type: Boolean,
      default: false
    },
    btnGroup: { // 按钮组
      type: Array,
      default () {
        return []
      }
    },
    columnNum: {
      type: Number,
      default: 4
    },
    labelWidth: {
      type: Number,
      default: 100
    },
    formRef: { // form表单唯一标识
      type: String,
      default: 'ruleForm'
    },
    fieldData: { // 模板资源数据
      type: Object,
      required: true
    },
    modelData: { // 表单数据
      type: Object,
      required: true
    },
    isShowBut: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      globalData: {},
      mapData: {},
      dataDetail: {
        mapData: null,
        data: null,
        index: null
      }
      // validators: { // 必填字段：irequired 即可
      // LETTER (rule, value, callback, data) { // 字母正则验证
      //   if (/^[a-zA-Z]+$/.test(value) || value === '') {
      //     callback()
      //   } else {
      //     callback(new Error(`${data.tipsMessage}必须是由字母组成！`))
      //   }
      // },
      // NUMBER (rule, value, callback, data) { // 数字正则验证
      //   if (/^[0-9]*$/.test(value) || value === '') {
      //     callback()
      //   } else {
      //     callback(new Error(`${data.tipsMessage}必须是由数字组成！`))
      //   }
      // },
      // MAILBOX (rule, value, callback, data) { // 邮箱验证
      //   if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || value === '') { // eslint-disable-line
      //     callback()
      //   } else {
      //     callback(new Error(`${data.tipsMessage}必须是邮箱格式！`))
      //   }
      // },
      // PHONE_NUMBER (rule, value, callback, data) { // 手机号码
      //   if (/^(13[0-9]|14[5-9]|15[012356789]|166|17[0135678]|18[0-9]|198|199)[0-9]{8}$/.test(value) || value === '') {
      //     callback()
      //   } else {
      //     callback(new Error(`${data.tipsMessage}必须是手机号码格式！`))
      //   }
      // },
      // POSTAL_CODE (rule, value, callback, data) { // 邮政编码
      //   if (/^[0-9]{6}$/.test(value) || value === '') {
      //     callback()
      //   } else {
      //     callback(new Error(`${data.tipsMessage}必须是邮政编码格式！`))
      //   }
      // },
      // ID_CARD_NO (rule, value, callback, data) { // 身份证号码
      //   if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) || value === '') {
      //     callback()
      //   } else {
      //     callback(new Error(`${data.tipsMessage}必须是身份证号码格式！`))
      //   }
      // }
      // }
    }
  },
  watch: {
    mapDatas: {
      handler: 'getModelData',
      deep: true, // 深度监听
      immediate: true // 首次进入也监听
    }
  },
  created () {
  },
  methods: {
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
      if (resourceList && resourceList.length > 0 && fatherData.formSubmitType !== 'RESOURCE_CONTROLS_MORE') {
        resourceList.forEach(item => {
          this.setData(item.fieldSub1.fieldName, selectedsData[0][item.fieldSub2.fieldName])
        })
      }
    },
    autocompleteChange (data) {
      if (this.globalData[data.key] && this.globalData[data.key].resource && this.globalData[data.key].resource.length > 0) {
        this.globalData[data.key].resource.forEach(item => {
          this.setData(item.fieldSub1.fieldName, data.data[item.fieldSub2.fieldName], true)
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
    querySearchAsync (queryString, cb, data, isAsync = false) {
      if (isAsync) {
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
      } else {
        let obj = []
        if (data.options && data.options.length > 0) {
          obj = !queryString || queryString.indexOf('@') >= 0 ? [] : data.options.map(item => {
            return { value: queryString + item.value }
          })
        }
        cb(obj)
      }
    },
    setData (key, val, voluation = false) {
      if (this.mapData[key] !== undefined || voluation) {
        this.$set(this.mapData, key, val)
      }
    },
    rulesMate (data) {
      let obj = []
      if (data.irequired) {
        // let requireds = {
        //   required: true, message: `必须填写${data.fieldExplain}`, trigger: 'change'
        // }
        // if (data.formSubmitType === 'DATA_BOX_TIM' || data.formSubmitType === 'DATA_RANGE_BOX') {
        //   obj.type = 'date'
        // }
        // obj.push(requireds)
        obj.push({ required: data.irequired, message: `必须填写${data.fieldExplain}`, trigger: 'change' })
      }
      if (data.cgValidate) {
        obj.push({
          validator: (rule, value, callback) => {
            let validator = data.cgValidate.validateTitle
            if (validator[0] === '/') {
              validator = validator.substr(1)
            }
            if (validator[validator.length - 1] === '/') {
              validator = validator.substr(0, validator.length - 1)
            }
            if (new RegExp(validator).test(value) || value === '') {
              callback()
            } else {
              callback(new Error(data.cgValidate.validateMethod))
            }
          },
          trigger: 'change'
        })
      }
      return obj
    },
    inputTap (data, index) {
      this.dataDetail = {
        mapData: this.mapData,
        data: data,
        index: index
      }
    },
    inputTap2 (data, index) {
      this.mapData[data.fieldName] = ''
      if (/Name$/.test(data.fieldName)) {
        var str = data.fieldName.slice(0, data.fieldName.length - 4) + 'Id'
        if (this.mapData[str]) {
          this.mapData[str] = ''
        }
      }
    },
    getData () { // 千万别去掉
      this.fieldData.formSubList.forEach(item => {
        if (this.mapData[item.fieldName] === '' || this.mapData[item.fieldName] === undefined || this.mapData[item.fieldName] === null) {
          this.mapData[item.fieldName] = null
        }
      })
      return this.mapData
    },
    submitForm () {
      this.$refs[this.formRef].validate((valid) => {
        for (let ele in this.mapData) { // 空字符串处理null
          if (!this.mapData[ele] && this.mapData[ele] !== false) {
            this.mapData[ele] = null
          }
        }
        if (valid) {
          this.$emit('submit', true, this.mapData)
        } else {
          this.$emit('submit', false, this.mapData)
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[this.formRef].resetFields()
      this.$emit('reset', this.mapData)
    },
    pad (num, n) {
      return Array(n > num ? (n - ('' + num).length + 1) : 0).join(0) + num
    },
    selectChange (val, data) {
      this.$emit('select-change', val, data)
    },
    getModelData (val) {
      let mapData = Object.assign({}, val)
      this.fieldData.formSubList.forEach(item => {
        if (item.formSubmitType === 'DATA_BOX_TIM' && item.defaultValue) {
          let nowDate = new Date()
          let obj = JSON.parse(item.defaultValue)
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
          mapData[item.fieldName] = formatDate(new Date(timeDate), 4)
        } else if (item.formSubmitType === 'BOOLEAN') {
          if (mapData[item.fieldName] !== false && mapData[item.fieldName] !== true) {
            mapData[item.fieldName] = item.defaultValue === 'true'
          }
        }
        if (mapData[item.fieldName] === '' || mapData[item.fieldName] === undefined || mapData[item.fieldName] === null) {
          mapData[item.fieldName] = null
        }
      })
      this.$emit('update-data', mapData)
      this.mapData = mapData
    },
    butMonitor (type, data) { // 按钮组触发
      this.$emit('but-receipt', type)
    },
    uniqueKey (scope, value) { // 更新主子表公用数据
      this.$emit('update-data', this.mapData)
    }
  },
  computed: {
    calculateData () {
      let formSubList = {}
      XEUtils.clone(this.fieldData.formSubList, true).filter(item => {
        return XEUtils.isArray(item.calculate) || XEUtils.isPlainObject(item.calculate)
      }).forEach(item => {
        if (XEUtils.isArray(item.calculate)) { // 是否为数组
          let infixExp = []
          item.calculate.forEach(data => {
            if (data.customTable) {
              if (data.mode) {
                infixExp.push(XEUtils.sum(this.publicData[data.customTable], data.fieldName))
              } else {
                infixExp.push(this.publicData[data.customTable][data.fieldName])
              }
            } else if (data.fieldName) {
              infixExp.push(data.fieldName)
            }
          })
          this.setData(item.fieldName, calcExp(infixExpPostfixRxp(infixExp)), true)
          formSubList[item.fieldName] = calcExp(infixExpPostfixRxp(infixExp))
        } else if (XEUtils.isPlainObject(item.calculate) && this.publicData[item.calculate.customTable]) { // 是否为对象
          let sumData = XEUtils.clone(this.publicData[item.calculate.customTable], true).map(data => {
            let infixExp = []
            item.calculate.fieldName.forEach(exp => {
              if (exp.customTable) {
                infixExp.push(data[exp.fieldName])
              } else if (data.fieldName) {
                infixExp.push(exp.fieldName)
              }
            })
            return calcExp(infixExpPostfixRxp(infixExp))
          })
          this.setData(item.fieldName, XEUtils.sum(sumData), true)
          formSubList[item.fieldName] = XEUtils.sum(sumData)
        }
      })
      return formSubList
    },
    mapDatas () {
      return this.modelData
    },
    formSubList () {
      let data = this.fieldData.formSubList
      return data.sort((a, b) => {
        return a.seq - b.seq
      })
    }
  },
  components: { GlobalPopup }
}
</script>

<style lang="scss">
  .none_disabled{
    .el-input__inner{
      background-color: #fff !important;
      color: #606266 !important;
      padding-right: 30px !important;
    }
    &:hover{
      &+.closebtn {
        opacity: 1 !important;
      }
    }
  }
  .closebtn {
    opacity: 0;
    .el-input__icon{
      line-height: 35px !important;
    }
    &:hover{
      opacity: 1;
    }
  }
  .el-input-group__append{
    border-left: none !important;
    padding: 0 !important;
  }
  .selectInput {
    &>.el-input__inner[disabled="disabled"]{
      cursor: pointer !important;
    }
  }
  .el-autocomplete.autocomplete_width100{
    width: 100% !important;
  }
  .required-asterisk-box{
    padding: 0 2px;
    color: #F56C6C;
  }
  .search-automatic-box{
    .el-autocomplete-suggestion{
      width: auto !important;
      min-width: 100%;
    }
  }
</style>
