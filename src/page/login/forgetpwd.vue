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
        <div class="title">重置密码</div>
        <el-form ref="form" :model="form"  :rules="rule" :status-icon="true">
          <el-form-item prop="email">
            <el-input
              size="big"
              autocomplete="off"
              placeholder="请输入邮箱"
              v-model="form.email">
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row :span="24">
              <el-col :span="16">
                <el-input size="big"
                  :maxlength="code.len"
                  v-model="form.code"
                  auto-complete="off"
                  class="code"
                  placeholder="请输入图形验证码">
                </el-input>
              </el-col>
              <el-col :span="8">
                <div class="login-code">
                  <span class="login-code-img"
                        @click="refreshCode"
                        v-if="code.type == 'text'">{{code.value}}</span>
                  <img :src="code.src"
                      class="login-code-img"
                      @click="refreshCode"
                      v-else/>
                  <!-- <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i> -->
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-row :span="24" :gutter="20">
              <el-col :span="16">
                <el-input size="big"
                  :maxlength="code.len"
                  v-model="form.captcha"
                  auto-complete="off"
                  class="code"
                  placeholder="请输入验证码">
                </el-input>
              </el-col>
              <el-col :span="8">
                <div class="login-code-img">
                  <el-button style="float:right;" @click="send" :disabled="disabled" size="big" type="primary">{{text}}</el-button>
                </div>
              </el-col>

            </el-row>
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
          <div class="op">
            <div class="forget" >想起密码?<span @click="go('/login')" class="register">直接登录</span></div>
            <div>长时间收不到验证码?<span class="register"> 发送语音验证码。</span></div>
          </div>
          <el-button @click="resetpwd" class="m-b-25" type="primary" size="big" style="width:100%">立即登录</el-button>
        </el-form>
      </div>
    </div>
    <div class="footer-bar">
    </div>
  </div>
</template>

<script>
import { randomLenNum } from '@/util/util'
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
    return {
      form: {
        email: '',
        randomStr: '',
        code: '',
        captcha: '',
        pwd: '',
        repwd: ''
      },
      codeUrl: '/code',
      code: {
        src: '/code',
        value: '',
        len: 4,
        type: 'image'
      },
      text: '发送验证码',
      disabled: false,
      rule: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
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
    },
    refreshCode () {
      this.form.code = ''
      this.form.randomStr = randomLenNum(this.code.len, true)
      this.code.type === 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${this.codeUrl}?randomStr=${this.form.randomStr}`)
    }
  },
  created () {
    this.refreshCode()
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
