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
        <div class="title">注册</div>
        <el-form ref="form" :model="form" :rules="rule" :status-icon="true">
          <el-form-item  prop="username">
            <el-input
              size="big"
              autocomplete="off"
              placeholder="请输入姓名"
              v-model="form.username">
            </el-input>
          </el-form-item>
          <el-form-item  prop="email">
            <el-row :span="24" :gutter="20">
              <el-col :span="16">
                <el-input size="big"
                  v-model="form.email"
                  auto-complete="off"
                  class="code"
                  placeholder="请输入邮箱">
                </el-input>
              </el-col>
              <el-col :span="8">
                <div class="login-code-img">
                  <el-button style="float:right;" @click="send" :disabled="disabled" size="big" type="primary">{{text}}</el-button>
                </div>
              </el-col>

            </el-row>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input
              size="big"
              autocomplete="off"
              placeholder="请输入验证码"
              v-model="form.captcha">
            </el-input>
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input
              size="big"
              autocomplete="off"
              placeholder="请输入手机号"
              v-model="form.mobile">
            </el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input
              size="big"
              type="password"
              autocomplete="off"
              placeholder="请输入新密码"
              v-model="form.pwd">
            </el-input>
          </el-form-item>
          <el-form-item prop="repwd">
            <el-input
              type="password"
              size="big"
              autocomplete="off"
              placeholder="请再次新密码"
              v-model="form.repwd">
            </el-input>
          </el-form-item>
          <el-button @click="resetpwd" class="m-b-25" type="primary" size="big" style="width:100%">注册</el-button>
          <div class="op">
            <div class="forget" >已有账号?<span @click="go('/login')" class="register">马上登录</span></div>

          </div>
        </el-form>
      </div>
    </div>
    <div class="footer-bar">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    let validrepwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let validEmail = (rule, value, callback) => {
      let reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
      if (value === '') {
        callback(new Error('请输入正确的邮箱格式'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的邮箱格式!'))
      } else {
        callback()
      }
    }
    let validMobile = (rule, value, callback) => {
      let reg = new RegExp('^1[3-9][0-9][0-9]{4,8}$')
      if (value === '') {
        callback(new Error('请输入正确的手机号'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号格式!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        email: '',
        mobile: '',
        captcha: '',
        pwd: '',
        repwd: ''
      },

      text: '发送验证码',
      disabled: false,
      rule: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validEmail, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validMobile, trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, message: '验证码长度为4位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '图形验证码长度为4位', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码至少长度为6位', trigger: 'blur' }
        ],
        repwd: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, message: '密码至少长度为6位', trigger: 'blur' },
          { validator: validrepwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    send () {
      let reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
      if (!reg.test(this.form.email)) {
        this.$message.info('请先输入正确的邮箱')
        return false
      }
      if (this.disabled) return
      let time = 60
      let t = setInterval(() => {
        time--
        if (time <= 0) {
          this.text = '发送验证码'
          clearInterval(t)
          return false
        }
        this.text = time + '秒'
      }, 1000)
    },
    resetpwd () {},
    go (path) {
      this.$router.push(path)
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
      width: 440px;
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
