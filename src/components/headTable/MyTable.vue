<template>
  <div class="my-table">
    <el-table border class="m-b-20"
    @selection-change="selectionFn"
     show-overflow-tooltip
     :show-summary='showSummary'
     :data="data"
     :height="tableHeight">
      <el-table-column v-if="select"

      type="selection"
      align="center"
      width="55">
    </el-table-column>
      <my-column v-for="(item,index) in col" :key="index" :col="item"></my-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pn"
      :page-sizes="pageSizes"
      :page-size="ps"
      class="align-right p-n"
      layout="total, sizes, prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import MyColumn from './MyColumn'
export default {
  components: {
    MyColumn
  },
  props: {
    select: {
      type: Boolean,
      default: false
    },
    // 总计
    showSummary: {
      type: Boolean,
      default: false
    },
    col: {
      type: Array
    },
    data: {
      type: Array
    },
    maxHeight: {
      type: [String, Number]
    },
    ps: { // 每页显示条目个数 默认10
      type: Number
    },
    pn: { // 当前页数 默认1
      type: Number
    },
    total: { // 总条目数
      type: Number,
      required: true
    },
    pageSizes: { // 每页显示个数选择器的选项设置 number[]
      type: Array,
      default () {
        return [5, 10, 15, 20, 25, 30]
      }
    }
  },
  data () {
    return {
      tableHeight: 400
    }
  },
  methods: {
    selectionFn (e) {
      this.$emit('selectionFn', e)
    },
    handleSizeChange (ps) {
      this.pn = 1
      this.$emit('size-change', ps)
    },
    handleCurrentChange (pn) {
      this.$emit('current-change', pn)
    }
  },
  created () {
    this.tableHeight = window.screen.availHeight - 350
    console.log(window.screen.availHeight)
  }
}
</script>
<style scoped>
.my-table{
  background: #fff;
  padding-bottom:20px;
}
</style>
