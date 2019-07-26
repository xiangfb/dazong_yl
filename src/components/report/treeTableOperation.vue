<template>
  <el-dialog title="格式设置" width="60%" @close="close" :visible.sync="show" append-to-body>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
     <el-form-item label="项目名称" prop="fieldName">
        <el-input v-model="ruleForm.fieldName"></el-input>
      </el-form-item>
      <el-form-item label="宽度" prop="width">
        <el-input v-model="ruleForm.width"></el-input>
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
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      default: ''
    },
    fieldName: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: this.value,
      ruleForm: {
        headId: '',
        fieldName: this.fieldName,
        width: this.width
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
      this.$emit('inputShow')
      // this.$refs['ruleForm'].resetFields()
    },
    submitForm (formName) {
      console.log(this.id)
      console.log(this.ruleForm)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid)
          this.ruleForm.headId = this.id
          ReportService.addItemHead(this.ruleForm).then(res => {
            this.$message('添加数据成功')
            console.log(this.ruleForm)
            this.show = false
            // this.$refs['ruleForm'].resetFields()
            this.$emit('inputShow', true)
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
      this.$emit('inputShow')
    }
  },
  watch: {
    width (n) {
      this.ruleForm.width = n
    },
    value (n) {
      this.show = n
    }
  }
}
</script>
