<template>
  <div>
    <basic-container>
      <h3>分页组件</h3>
      <div>
        <span class="span">第 {{currentPage}}/{{total}} 页，</span>
        <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total">
        </el-pagination>
      </div>
    </basic-container>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  data () {
    return {
      total: 4, // 总条数
      pageSizes: [1, 2, 3, 4], // 每页显示条数
      pageSize: 1, // 默认每页显示条数
      currentPage: 1 // 当前显示第几页
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$message.success(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.$message.success(`当前页: ${val}`)
    }
  },
  computed: {
  }

}
</script>

<style lang="scss" scoped>
.span {
  font-weight: 400;
  color: #606266;
  display: inline-block;
  font-size: 13px;
  height: 32px;
  line-height: 32px;
  padding: 2px, 0;
  vertical-align: top;
  box-sizing: border-box;
}
.el-pagination {
  display: inline-block
}
</style>
