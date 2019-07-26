<template>
  <el-dialog title="格式设置" width="60%" @close="close" :visible.sync="show" append-to-body>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="项目名称" prop="fieldName">
        <el-input v-model="ruleForm.fieldName"></el-input>
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="ruleForm.width"></el-input>
      </el-form-item>
      <el-form-item label="合计方式">
        <el-select v-model="ruleForm.method" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <div style="display:flex;">
        <el-form-item label="是否显示">
          <el-switch :active-value="'1'" :inactive-value="'0'" v-model="ruleForm.ishow"></el-switch>
        </el-form-item>
        <el-form-item label="是否排序">
          <el-switch :active-value="'1'" :inactive-value="'0'" v-model="ruleForm.iorder"></el-switch>
        </el-form-item>
      </div>
      <el-form-item label="自定义列">
        <el-input v-model="ruleForm.col"></el-input>
      </el-form-item>
      <el-form-item label="加权因子">
        <el-input v-model="ruleForm.twa"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ReportService from '@/service/report-service'

export default {
  props: {
    result: {
      type: Object
    },
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      default: ''
    }
  },

  data () {
    return {
      show: this.value,
      ruleForm: {
        headId: '',
        col: '',
        fieldName: '磅单子表id',
        fieldType: 'number',
        id: 37,
        iorder: 0,
        ishow: 0,
        method: 'sum',
        twa: '',
        width: 180
      },
      rules: {
        fieldName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close () {
      this.show = false
      this.$emit('treeEdit')
      // this.$refs['ruleForm'].resetFields()
    },
    submitForm (formName) {
      console.log(this.id)
      console.log(this.ruleForm)

      this.$refs[formName].validate(valid => {
        if (valid) {
          ReportService.editItemHead(this.ruleForm).then(res => {
            this.$message('编辑成功')
            console.log('当前ID' + this.id)
            console.log(this.ruleForm)
            this.show = false
            // this.$refs['ruleForm'].resetFields()
            this.$emit('treeEdit', true)
          })
        } else {
          this.$message.error('内容填写不正确')
          return false
        }
      })
    },
    resetForm () {
      // this.$refs['ruleForm'].resetFields()
    },
    sub () {
      this.show = false
      this.$emit('treeEdit')
    }
  },
  watch: {
    width (n) {
      this.ruleForm.width = n
    },
    value (n) {
      this.show = n
      if (n) {
        console.log('编辑内容信息')
        console.log(this.result)
        this.ruleForm = {
          headId: this.id,
          col: this.result.col,
          fieldName: this.result.fieldName,
          fieldType: this.result.fieldType,
          id: this.result.id,
          iorder: this.result.iorder,
          ishow: this.result.ishow,
          method: this.result.method,
          twa: this.result.twa,
          width: this.result.width
        }
      }
    }
  }
}
</script>
