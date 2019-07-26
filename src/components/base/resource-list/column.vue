<template>
  <div>
    <el-form v-if="name !== 'as_line_sub'" style="overflow-x: hidden;" label-position="right" label-width="100px" hide-required-asterisk>
      <el-row :gutter="20" v-if="fieldData && mapData">
        <template v-for="(item, index) in fieldData">
          <el-col v-if="item.ishow && !item.ihidden" :span="48 / columnNum" :key="index">
            <template v-if="item.calculate || item.formSubmitType === 'ONE_TXT' || item.formSubmitType === 'MORE_TXT' || item.formSubmitType === 'AUTO_COMPLETE'"> <!-- 多行或者单行输入框 -->
              <el-form-item :prop="item.fieldName">
                <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                  <div class="nowrap">
                    {{item.fieldExplain}}:
                  </div>
                </el-tooltip>
                <el-tooltip effect="dark" :enterable="false" :content="mapData[item.fieldName] || item.defaultValue" placement="top">
                  <div class="nowrap">
                    {{mapData[item.fieldName] || item.defaultValue}}
                  </div>
                </el-tooltip>
                <!-- <el-input readonly
                          :type="item.formSubmitType === 'MORE_TXT' ? 'textarea' : 'text'"
                          :rows="1"
                          :placeholder="item.tipsMessage || '请输入'"
                          autocomplete="off"
                          :value="mapData[item.fieldName] || item.defaultValue" /> -->
              </el-form-item>
            </template>
            <template v-else-if="item.formSubmitType === 'RESOURCE_CONTROLS' || item.formSubmitType === 'RESOURCE_CONTROLS_MORE'"> <!-- 弹窗资源 -->
              <el-form-item :prop="item.fieldName">
                <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                  <div class="nowrap">
                    {{item.fieldExplain}}:
                  </div>
                </el-tooltip>
                <el-tooltip effect="dark" :enterable="false" :content="mapData[item.fieldName] || item.defaultValue" placement="top">
                  <div class="nowrap">
                    {{mapData[item.fieldName] || item.defaultValue}}
                  </div>
                </el-tooltip>
                <!-- <el-input disabled
                          type="text"
                          :placeholder="item.tipsMessage || '请输入'"
                          autocomplete="off"
                          :value="mapData[item.fieldName] || item.defaultValue" /> -->
              </el-form-item>
            </template>
            <template v-else-if="item.formSubmitType === 'AUTO_COMPLETE'">
              <el-form-item :prop="item.fieldName">
                <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                  <div class="nowrap">
                    {{item.fieldExplain}}:
                  </div>
                </el-tooltip>
                <el-tooltip effect="dark" :enterable="false" :content="mapData[item.fieldName] || item.defaultValue" placement="top">
                  <div class="nowrap">
                    {{mapData[item.fieldName] || item.defaultValue}}
                  </div>
                </el-tooltip>
                <!-- <el-autocomplete readonly
                                class="autocomplete_width100"
                                :value="mapData[item.fieldName] || item.defaultValue"
                                :placeholder="item.tipsMessage || '请输入'"
                                autocomplete="off" /> -->
              </el-form-item>
            </template>
            <template v-else-if="item.formSubmitType === 'SELECT' || item.formSubmitType === 'SINGLE_ELECTION'"> <!-- 下拉菜单 -->
              <el-form-item :prop="item.fieldName">
                <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                  <div class="nowrap">
                    {{item.fieldExplain}}:
                  </div>
                </el-tooltip>
                <el-select class="no-disabled-select" :value="mapData[item.fieldName] || item.defaultValue" disabled :placeholder="item.tipsMessage || '请选择'">
                  <el-option v-for="(data, i) in item.options" :key="i" :label="data.label" :value="data.value"/>
                </el-select>
              </el-form-item>
            </template>
            <template v-else-if="item.formSubmitType === 'BOOLEAN'"> <!--单选按钮 -->
              <el-form-item :prop="item.fieldName">
                <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                  <div class="nowrap">
                    {{item.fieldExplain}}:
                  </div>
                </el-tooltip>
                <el-radio-group :value="radioFun(mapData[item.fieldName], item.defaultValue)">
                  <el-radio disabled :label="true">是</el-radio>
                  <el-radio disabled :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
            <template v-else-if="item.formSubmitType === 'MULTIPLE_SELECTION'"> <!-- 复选框 -->
              <el-form-item :prop="item.fieldName">
                <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                  <div class="nowrap">
                    {{item.fieldExplain}}:
                  </div>
                </el-tooltip>
                <el-checkbox v-for="(data, i) in item.options" :key="i" disabled :label="data.value" :value="mapData[item.fieldName] || item.defaultValue">
                  {{data.label}}
                </el-checkbox>
              </el-form-item>
            </template>
            <template v-else-if="item.formSubmitType === 'DATA_BOX_TIM' || item.formSubmitType === 'DATA_RANGE_BOX'"> <!-- 日期选择框、日期范围选择框 -->
              <el-form-item :prop="item.fieldName">
                <el-tooltip slot="label" class="item" effect="dark" :enterable="false" :content="item.fieldExplain" placement="top">
                  <div class="nowrap">
                    {{item.fieldExplain}}:
                  </div>
                </el-tooltip>
                <el-tooltip effect="dark" :enterable="false" :content="mapData[item.fieldName] || item.defaultValue" placement="top">
                  <div class="nowrap">
                    {{mapData[item.fieldName] || item.defaultValue}}
                  </div>
                </el-tooltip>
                <!-- <el-date-picker v-if="item.formSubmitType === 'DATA_BOX_TIM'"
                                :value="mapData[item.fieldName] || item.defaultValue"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                readonly
                                :placeholder="item.tipsMessage || '请选择'"/>
                <el-date-picker v-else
                                :value="mapData[item.fieldName] || item.defaultValue"
                                type="datetimerange"
                                range-separator="至"
                                :start-placeholder="item.tipsMessage.start"
                                :end-placeholder="item.tipsMessage.end"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                readonly /> -->
              </el-form-item>
            </template>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div v-if="name === 'as_line_inventory'">
      <el-tag
        v-for="(tag, t) in mapData"
        :key="t"
        size="medium"
        class="m-r-10"
        closable
        :disable-transitions="true">
        {{tag.invName}}【{{tag.invCode}}】
      </el-tag>
    </div>
    <div v-if="name === 'as_line_sub'">
      <form-edit
        border
        class="p-t-10"
        ref="custom"
        :loading="fieldData.length <= 0"
        :table-header="fieldData"
        :data="mapData"></form-edit>
    </div>
  </div>
</template>

<script>
import FormEdit from './edit.vue'
export default {
  data () {
    return {
      mapData: null
    }
  },
  props: {
    name: {
      type: String,
      default: 'auto'
    },
    columnNum: {
      type: Number,
      default: 4
    },
    fieldData: { // 模板资源数据
      required: true
    },
    modelData: { // 表单数据
      required: true
    }
  },
  watch: {
    modelData: {
      handler (val) {
        this.mapData = val
      },
      deep: true, // 深度监听
      immediate: true // 首次进入也监听
    }
  },
  methods: {
    radioFun (value, defaultValue) {
      if (value === null || value === undefined || value === '') {
        return defaultValue
      } else {
        return value
      }
    }
  },
  components: {
    FormEdit
  }
}
</script>

<style lang="scss">
  .el-autocomplete.autocomplete_width100{
    width: 100% !important;
  }
  .required-asterisk-box{
    padding: 0 2px;
    color: #F56C6C;
  }
  .no-disabled-select{
    .el-input.is-disabled .el-input__inner {
      background-color: #fff !important;
      border-color: #DCDFE6 !important;
      color: #606266 !important;
      cursor: text !important;
    }
  }
</style>
