<template>
<div>
  <!-- <el-button type="text" @click="open3">点击打开 Message Box</el-button> -->
<!-- <el-button type="text" @click="dialogFormVisible = true">条件筛选</el-button> -->

<el-dialog title="条件筛选"
width="40%"
:close-on-click-modal='false'
:close-on-press-escape='false'
:show-close = 'false'
 :visible.sync="dialogFormVisible">
  <el-form>
    <el-form-item label="开始日期" :label-width="formLabelWidth">
      <div class="block">
        <el-date-picker
          v-model="startTime"
          @change='currentTime=false'
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </el-form-item>
    <el-form-item label="结束日期" :label-width="formLabelWidth">
      <div class="block">
        <el-date-picker
          v-model="endTime"
          @change='currentTime=false'
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <!-- <el-checkbox @change='checkToday' v-model="currentTime" label="当前日期" border></el-checkbox> -->
    <el-button type="primary" @click="sub">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
export default {
  data () {
    function getNowFormatDate (str) {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + str
      return currentdate
    }
    return {
      dialogFormVisible: true,
      startTime: getNowFormatDate('00:00:00'),
      endTime: getNowFormatDate('23:59:00'),
      currentTime: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    // 选择当前时间
    checkToday () {
      // if (this.currentTime) {
      //   this.startTime = ''
      //   this.endTime = ''
      //   this.$message('选择了当天')
      // }
    },
    // 显示模板列表
    sub () {
      if ((this.startTime === '' || this.startTime === null || this.endTime === '' || this.endTime === null) && this.currentTime === false) {
        this.$message('筛选条件不满足')
        return
      }
      console.log(this.startTime)
      console.log(this.endTime)
      console.log(this.currentTime)
      let time = { startTime: this.startTime, endTime: this.endTime }
      this.dialogFormVisible = false
      this.$emit('closeStep1', time)
      // this.$emit('nextStep', true)
      // console.log('这是提交按钮')
    }
  },
  mounted () {
  }
}
</script>
