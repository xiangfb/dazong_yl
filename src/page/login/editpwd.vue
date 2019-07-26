<template>
  <div class="forget-container">
    <div class="top-bar">
      <div class="w1140 h120 flex">
        <img src="~assets/logo.png" alt="" class="logo">
        <div class="fs26 free">免费咨询热线： 400-0351-001</div>
      </div>
    </div>
    <div class="content">
      <div class="form-wraper">
        <div class="title">修改密码</div>
        <el-form ref="form" :model="form"  :rules="rule" :status-icon="true">
          <el-form-item prop="oldPassWord">
            <el-input
              size="big"
              type="password"
              autocomplete="off"
              placeholder="请输入旧密码"
              v-model="form.oldPassWord">
            </el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input
              size="big"
              type="password"
              autocomplete="off"
              placeholder="请输入新密码"
              v-model="form.passWord">
            </el-input>
          </el-form-item>
          <el-form-item prop="repeatPassWord">
            <el-input
              type="password"
              size="big"
              autocomplete="off"
              placeholder="请再次新密码"
              v-model="form.repeatPassWord">
            </el-input>
          </el-form-item>
          <el-button @click="resetpwd" class="m-b-25" type="primary" size="big" style="width:100%">确认修改</el-button>
        </el-form>
      </div>
    </div>
    <div class="footer-bar">
    </div>
  </div>
</template>

<script>
import UserService from 'service/user-service'
export default {
  data () {
    let validrepwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.passWord) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPassWord: '',
        passWord: '',
        repeatPassWord: ''
      },
      disabled: false,
      rule: {
        oldPassWord: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 3, message: '密码至少长度为6位', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码至少长度为6位', trigger: 'blur' }
        ],
        repeatPassWord: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { min: 6, message: '密码至少长度为6位', trigger: 'blur' },
          { validator: validrepwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetpwd () {
      UserService.editpwd(this.form).then(res => {
        if (res.success) {
          this.$message.success('修改成功')
          this.$nextTick(() => {
            this.loading = false
          })
          this.$router.back()
        } else {
          this.$message.error(res.msg)
          this.loading = false
        }
      })
    }
  },
  created () {

  }

}
</script>

<style lang="scss">
.forget-container{
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .top-bar{
    width: 100%;
    background: #fff;
    flex: none;
    .flex{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo{
      display: block;
      width: 239px;
    }
    .free{
      line-height: 63px;
    }
  }
  .content{
    width: 100%;
    height: 100%;
    background-image: url('~assets/pwd.png');
    background-size: cover;
    background-position: center;
    position: relative;
    .form-wraper{
      width: 380px;
      height: 490px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      .title{
        font-size: 30px;
        text-align: center;
        margin-bottom: 40px;
      }
      .login-code-img{
        display: block;
        width: 100%;
        height: 40px;
      }
       .op{
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 35px;
      }
      .forget{
        cursor: pointer;
        color: #464545;
      }
      .sep{
        color: #333;
      }
      .register{
        color: #f81c1c;
        cursor: pointer;
      }
    }
  }
  .footer-bar{
    width: 100%;
    height: 250px;
    flex: none;
  }
}
</style>
