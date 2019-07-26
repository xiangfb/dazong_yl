<template>
  <elx-editable
    class="edit-table-box p-n"
    style="width: 100%"
    :data.sync="tableData"
    @sort-change="sortChangeEvent"
    border
    fit
    show-header
    size="mini">
    <div class="p-20" slot="empty"> <!-- 空数据展示 -->
      <avue-empty></avue-empty>
    </div>
    <template v-for="(item, index) in headerList">
      <template v-if="item.ishow && !item.ihidden">
        <elx-editable-column
          v-if="item.formSubmitType === 'RESOURCE_CONTROLS'"
          :sortable="item.isortField ? 'custom' : false"
          :width="item.columnWidth"
          v-bind="item"
          :key="index"
          :label="item.fieldExplain"
          :prop="item.fieldName">
          <template v-slot="scope">
            <el-tooltip effect="dark" :enterable="false" :content="scope.row[item.fieldName] || item.defaultValue" placement="top">
              <div class="nowrap">
                {{scope.row[item.fieldName] || item.defaultValue}}
              </div>
            </el-tooltip>
          </template>
        </elx-editable-column>
        <elx-editable-column
          v-else
          :sortable="item.isortField ? 'custom' : false"
          showOverflowTooltip
          :width="item.columnWidth || 200"
          v-bind="item"
          :key="index"
          :label="item.fieldExplain"
          :prop="item.fieldName">
          <template v-slot="scope">
            <el-tooltip v-if="item.formSubmitType === 'SELECT'" effect="dark" :enterable="false" :content="optionsFilter(item.options, scope.row[item.fieldName]) || item.defaultValue" placement="top">
              <div class="nowrap">
                {{optionsFilter(item.options, scope.row[item.fieldName]) || item.defaultValue}}
              </div>
            </el-tooltip>
            <div style="text-align:center" v-else-if="item.fieldType === 'BOOLEAN'">
              <el-tag
                disable-transitions
                :type="scope.row[item.fieldName] ? 'success' : 'danger'">
                {{scope.row[item.fieldName] ? '是' : '否'}}
              </el-tag>
            </div>
            <div style="text-align:center" v-else-if="item.fieldType === 'ENUM' && (scope.row[item.fieldName] || item.defaultValue)">
              <el-tag disable-transitions>
                {{item.enumOptions[scope.row[item.fieldName] || item.defaultValue]}}
              </el-tag>
            </div>
            <!-- <div v-else-if="item.cgFormatResId">
              <el-link class="nowrap" @click="linkFun(item, scope.row)" style="font-size: 12px;font-weight: 400;display: block;line-height: 1;" type="primary">
                {{scope.row[item.fieldName]}}
              </el-link>
            </div> -->
            <el-tooltip v-else effect="dark" :enterable="false" :content="scope.row[item.fieldName] || item.defaultValue" placement="top">
              <div class="nowrap">
                {{scope.row[item.fieldName] || item.defaultValue}}
              </div>
            </el-tooltip>
          </template>
        </elx-editable-column>
      </template>
    </template>
  </elx-editable>
</template>

<script>
import XEUtils from 'xe-utils'
import { Editable, EditableColumn } from 'vue-element-extends'
export default {
  data () {
    return {
      headerList: [],
      tableData: []
    }
  },
  props: {
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
    }
  },
  watch: {
    tableHeader: {
      handler (data) {
        this.headerList = XEUtils.clone(data, true).map(item => {
          if (item.fieldType === 'ENUM') {
            item.enumOptions = {}
            item.options.forEach(data => {
              item.enumOptions[data.value] = data.label
            })
          }
          return item
        })
      },
      deep: true,
      immediate: true
    },
    data: {
      handler (data) {
        this.tableData = XEUtils.clone(data, true)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    optionsFilter (options, data) {
      let option = {}
      options.forEach(item => {
        option[item.value] = item.label
      })
      if (data && option[data]) {
        return option[data]
      } else {
        return ''
      }
    },
    sortChangeEvent ({ column, prop, order }) {
      /**
       * 正序('asc')
       * 逆序('desc')
       */
      this.$emit('sort-change', prop, order === 'ascending' ? 'asc' : 'desc')
    }
  },
  computed: {},
  components: {
    ElxEditable: Editable,
    ElxEditableColumn: EditableColumn
  }
}
</script>

<style scoped>

</style>
