<template>
  <div>
    <basic-container>
      <h3>自定义弹窗组件</h3>
      <el-button type="text" @click="show">点击打开 Dialog</el-button>
      <el-dialog
        :fullscreen="true"
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        :show-close="false"
        @open="getopen"
        >
        <div slot="title">
          <el-button @click="centerDialogVisible = false">
            保存
          </el-button>
          <el-button @click="centerDialogVisible = false">
            删除
          </el-button>
        </div>
        <CustomTable  @on-urlclick="click" ref="table" id="modal_table" :data="tableData" :tableHeader="tableHeader"></CustomTable>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      centerDialogVisible: false,
      tableData: [
        {
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
          action: {
            name: {
              value: '李二狗'
            }
          }
        }
      ],
      tableHeader: [
        {
          type: 'url',
          fieldExplain: 'id',
          fieldName: 'id'
        },
        {
          type: 'plain',
          fieldExplain: '测试',
          fieldName: 'action.name.value'
        },
        {
          type: 'button',
          fieldExplain: '测试1',
          btnType: 'success',
          fieldName: 'action.name.value'
        }
      ]
    }
  },
  methods: {
    click (row, item) {
      this.$message.info(item.name)
    },
    show () {
      this.centerDialogVisible = true
    },
    getopen () {
      console.log(this.$refs)
    },
    cellMouseEnter (row, column, cell, event) {
      // console.log(row, column, cell, event)
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
</style>
