<template>
    <el-table
      :id="id"
      ref="componentTable"
      :data="list"
      :border="border"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :size="size"
      :fit="fit"
      :row-key="rowKey"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :empty-text="emptyText"
      :row-class-name="rowClassName"
      :header-row-class-name="headerRowClassName"
      :cell-class-name="cellClassName"
      :header-cell-class-name="headerCellClassName"
      :row-style="rowStyle"
      :header-row-style="headerRowStyle"
      :cell-style="cellStyle"
      :header-cell-style="headerCellStyle"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :select-on-indeterminate="selectOnIndeterminate"
      @select="select"
      @select-all="selectAll"
      @selection-change="selectionChange"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
      @cell-click="cellClick"
      @cell-dblclick="cellDblClick"
      @row-click="rowClick"
      @row-contextmenu="rowContextmenu"
      @row-dblclick="rowDblClick"
      @header-click="headerClick"
      @header-contextmenu="headerContextmenu"
      @sort-change="sortChange"
      @filter-change="filterChange"
      @current-change="currentChange"
      @header-dragend="headerDragEnd"
      @expand-change="expandChange"
      style="width: 100%"
    >
      <div class="p-20" slot="empty"> <!-- 空数据展示 -->
        <avue-empty></avue-empty>
      </div>
      <el-table-column type="index" fixed v-if="showIndex" :label="label"></el-table-column> <!-- 显示序号 -->
      <el-table-column type="selection" fixed v-if="Showselection" :selectable="selectable" :reserve-selection="reserveSelection"></el-table-column> <!-- 显示选择框 -->
      <el-table-column type="expand" v-if="showExpand"> <!-- 是否支持展开 -->
        <template slot-scope="scope">
          <el-table :id="childId" :data="childData(scope.row)">
            <el-table-column
              v-for="(v, i) in childTableHeader"
              :key="i"
              :label="v.fieldExplain"
              :prop="v.fieldName"
              :min-width="v.minWidth"
              :resizable="v.resizable"
            >
            <template slot-scope="prop">
              <template v-if="v.fieldType === 'TEXT'">
                {{formatName(prop.row, v.fieldName, v)}}
              </template>
              <template v-else-if="v.fieldType === 'DATE'">
                {{formatName(prop.row, v.fieldName) | formatDate(2)}}
              </template>
              <template v-else-if="v.fieldType === 'TIME'">
                {{formatName(prop.row, v.fieldName) | formatDate}}
              </template>
              <template v-else-if="v.fieldType === 'LINK'">
                <div style="color: #3c5fbd;cursor:pointer;" @click="onClick(prop.row, v)" href="javascript:viod(0);">
                  {{formatName(prop.row, v.fieldName, v)}}
                </div>
              </template>
              <template v-else-if="v.fieldType === 'BUTTON'">
                <el-button :disabled="v.disabled" @click="clickBtn(prop.row, v)" :size="v.btnSize || 'mini'" :color="v.btnType || formatBtnType(prop.row, v.fieldName ,v)">
                  {{formatName(prop.row, v.fieldName, v)}}
                </el-button>
              </template>
              <template v-else-if="v.fieldType === 'TAG'">
                <el-tag   :size="v.btnSize || 'mini'" :color="v.btnType || formatBtnType(prop.row, v.fieldName ,v)">
                  {{formatName(prop.row, v.fieldName, v)}}
                </el-tag>
              </template>
              <template v-else-if="v.fieldType === 'BOOLEAN'">
                <el-tag   :size="v.btnSize || 'mini'" :color="v.btnType || formatBtnType(prop.row, v.fieldName ,v)">
                  {{formatName(prop.row, v.fieldName, v)}}
                </el-tag>
              </template>
              <template v-else-if="v.fieldType === 'ENUM'">
                <el-tag   :size="v.btnSize || 'mini'" :color="v.btnType || formatBtnType(prop.row, v.fieldName ,v)">
                  {{formatName(prop.row, v.fieldName, v)}}
                </el-tag>
              </template>
              <template v-else>
                {{formatName(prop.row, v.fieldName, v)}}
              </template>
            </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        :index="item.index"
        v-for="(item, index) in tableHeaders"
        :key="index"
        :label="item.fieldExplain"
        :prop="item.fieldName"
        :sortable="item.sortField"
        :sort-by="item.sortBy"
        :column-key="item.fieldName"
        :width="item.columnWidth"
        :min-width="(item.fieldExplain.length + 1) * 18"
        :fixed="item.fixed"
        :sort-method="item.sortMethod"
        :sort-orders="item.sortOrders"
        :resizable="item.resizable"
        :formatter="item.formatter"
        :show-overflow-tooltip="item.showOverflowTooltip || true"
        :align="item.align"
        :header-align="item.headerAlign"
        :class-name="item.className"
        :label-class-name="item.labelClassName"
        :filters="item.filters"
        :filter-placement="item.filterPlacement"
        :filter-multiple="item.filterMultiple"
        :filter-method="item.filterMethod"
        :filtered-value="item.filteredValue"> <!-- 数据 -->
        <template slot-scope="scope">
          <template v-if="item.fieldType === 'TEXT'">
            {{formatName(scope.row, item.fieldName, item)}}
          </template>
          <template v-else-if="item.fieldType === 'DATE'">
            {{formatName(scope.row, item.fieldName, item) | formatDate}}
          </template>
          <template v-else-if="item.fieldType === 'TIME'">
            {{formatName(scope.row, item.fieldName, item) | formatDate}}
          </template>
          <template v-else-if="item.fieldType === 'LINK'">
            <div style="color: #3c5fbd;cursor:pointer;" @click="onClick(scope.row, item)" href="javascript:viod(0);">
              {{formatName(scope.row, item.fieldName, item)}}
            </div>
          </template>
          <template v-else-if="item.fieldType === 'BUTTON'">
            <el-button :disabled="item.disabled" @click="clickBtn(scope.row, item)" :size="item.btnSize || 'mini'" :color="item.btnType || formatBtnType(scope.row, item.fieldName ,item)">
              {{formatName(scope.row, item.fieldName, item)}}
            </el-button>
          </template>
          <template v-else-if="item.fieldType === 'TAG' && row[name]">
            <el-tag  @click="clickBtn(scope.row, item)" :size="item.btnSize || 'mini'" :color="item.btnType || formatBtnType(scope.row, item.fieldName ,item)">
              {{formatName(scope.row, item.fieldName, item)}}
            </el-tag>
          </template>
          <template v-else-if="item.fieldType === 'BOOLEAN'">
            <el-tag  :size="item.btnSize || 'mini'" :color="item.btnType || formatBtnType(scope.row, item.fieldName ,item)">
              {{formatName(scope.row, item.fieldName, item)}}
            </el-tag>
          </template>
          <template v-else-if="item.fieldType === 'ENUM'">
            <el-tag   :size="item.btnSize || 'mini'" :color="item.btnType || formatBtnType(scope.row, item.fieldName ,item)">
              {{formatName(scope.row, item.fieldName, item)}}
            </el-tag>
          </template>
          <template v-else>
            {{formatName(scope.row, item.fieldName, item)}}
          </template>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'custom-table',
  data () {
    return {
      list: []
    }
  },
  watch: {
    data: function () {
      this.list = this.data
    }
  },
  methods: {
    labelHead (h, { column, index }) {
      let l = column.label.length
      let f = 18 // 每个字大小，其实是每个字的比例值，大概会比字体大小差不多大一点，
      column.minWidth = f * (l + 1) // 字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度
      // 然后将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
      return h('span', [column.label])
    },
    childData (row) {
      return [row]
    },

    // 处理点击事件
    clickBtn (row, item) {
      this.$emit('on-btnclick', row, item)
      event.stopPropagation()
      event.preventDefault()
    },
    onClick (row, item) {
      this.$emit('on-urlclick', row, item)
      event.stopPropagation()
      event.preventDefault()
    },
    // 解析按钮颜色
    formatBtnType (row, name, item) {
      let val = '#3c5fbd1a'
      if (!item.options) return val
      item.options.map(v => {
        if (v.value === row[name]) {
          val = v.color || '#3c5fbd1a'
        }
      })
      return val
    },
    // 解析复杂属性
    formatName (row, name, item) {
      if (!name) return item.fieldExplain
      let arr = name.split('.')
      if (arr.length === 1) {
        if (['BOOLEAN', 'ENUM'].includes(item.fieldType)) {
          let val = item.fieldExplain
          if (!item.options) item.options = [{ label: '是', value: true, color: '#67c23a' }, { label: '否', value: false, color: '#f56c6c' }]
          item.options.map(v => {
            if (v.value === row[name]) {
              val = v.label
            }
          })
          if (val === item.fieldExplain) {
            val = '否'
          }
          return val
        } else {
          return row[name]
        }
      } else {
        let prop = row
        for (let i = 0; i < arr.length; i++) {
          prop = prop[arr[i]]
        }
        return prop
      }
    },
    select (selection, row) {
      this.$emit('select', selection, row)
    },
    selectAll (selection) {
      this.$emit('select-all', selection)
    },
    toggleRowSelection (row, selected) {
      this.$refs.componentTable.toggleRowSelection(row)
    },
    selectionChange (selection) {
      this.$emit('selection-change', selection)
    },
    cellMouseEnter (row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
    },
    cellMouseLeave (row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event)
    },
    cellClick (row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    cellDblClick (row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    },
    rowClick (row, column, event) {
      this.$emit('row-click', row, event, column)
    },
    rowContextmenu (row, event) {
      this.$emit('row-contextmenu', row, event)
    },
    rowDblClick (row, event) {
      this.$emit('row-dblclick', row, event)
    },
    headerClick (column, event) {
      this.$emit('header-click', column, event)
    },
    headerContextmenu (column, event) {
      this.$emit('header-contextmenu', column, event)
    },
    sortChange (sort) {
      this.$emit('sort-change', sort)
    },
    filterChange (filters) {
      this.$emit('filter-change', filters)
    },
    currentChange (currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow)
    },
    headerDragEnd (newWidth, oldWidth, column, event) {
      this.$emit('header-dragend', newWidth, oldWidth, column, event)
    },
    expandChange (row, expandedRows) {
      this.$emit('expand-change', row, expandedRows)
    },
    headerRowClassName () {
      return 'tableheadercss'
    },
    rowClassName () {
      return 'tablerowcss'
    }
  },
  props: {
    // 表单验证规则
    rules: {
      type: Object
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: true
    },
    childId: {
      type: String,
      default: 'custom_child_table'
    },
    // 是否显示多选框
    Showselection: {
      type: Boolean,
      default: false
    },
    // 多选是否可勾选
    selectable: {
      type: Function
    },
    // 是否保留之前数据
    reserveSelection: {
      type: Boolean
    },
    // 是否展示表头
    showHeader: {
      type: Boolean,
      default: true
    },
    // 是否展示斑马纹
    stripe: {
      type: Boolean,
      default: true
    },
    // 是否高亮当前行
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    // 行class
    // rowClassName: {
    //   type: [Function, String]
    // },
    // 表头行class
    // headerRowClassName: {
    //   type: [Function, String]
    // },
    // 单元格class
    cellClassName: {
      type: [Function, String]
    },
    // 表头单元格class
    headerCellClassName: {
      type: [Function, String]
    },
    // 行样式
    rowStyle: {
      type: [Function, Object]
    },
    // 表头行样式
    headerRowStyle: {
      type: [Function, Object]
    },
    // 单元格样式
    cellStyle: {
      type: [Function, Object]
    },
    // 表头单元格样式
    headerCellStyle: {
      type: [Function, Object]
    },
    // 展开哪些行
    expandRowKeys: {
      type: Array
    },
    tooltipEffect: {
      type: String,
      default: 'dark'
    },
    // 表头多选框默认行为
    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },
    // 是否自动撑开列宽
    fit: {
      type: Boolean,
      default: true
    },
    // 是否自动展开所有，存在expand列时有效
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 表格大小
    size: {
      type: String,
      default: 'mini'
    },
    // 表格高度，加上之后自动就有固定表头的效果
    height: {
      type: [String, Number]
    },
    // 表格最大高度
    maxHeight: {
      type: [String, Number]
    },
    // 排序必须要加的基础规则字段
    rowKey: {
      type: String
    },
    // 空数据提示
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 表头
    tableHeader: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    // 展开表头
    childTableHeader: {
      type: Array,
      default () {
        return []
      }
    },
    // 是否支持展开
    showExpand: {
      type: Boolean,
      default: false
    },
    // 是否展示序号
    showIndex: {
      type: Boolean,
      default: false
    },
    // 序号列title
    label: {
      type: String,
      default: '序号'
    },
    // 默认排序
    defaultSort: {
      type: Object
    },
    // 表格数据源
    data: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    // 表格id
    id: {
      type: String,
      default: 'customTable',
      required: true
    }
  },
  mounted () {
  },
  created () {
    this.list = this.data
  },
  computed: {
    tableHeaders () {
      return this.tableHeader.filter(item => {
        return item.ishow
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
<style lang="scss">
  .tableheadercss {
    color: #333;
    th{
      text-align: center !important;
    }
  }
  .tablerowcss {
    td{
      text-align: center !important;
    }
  }
</style>
