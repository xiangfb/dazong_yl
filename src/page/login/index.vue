<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
    <div class='login-logoImg'>
     <!-- <img src="~assets/logo.png" alt="">-->
    </div>
    <div class="login-homePage w100 h80">
      <div class="login-home w100 h100">
        <div class="login-wraper">
          <!-- <img src="~assets/login_logo.png" alt="" class="logo"> -->
          <div class="align-center fs30 logoText">数字化纯中医病房管理系统</div>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" :status-icon="true">
            <el-form-item prop="username">
              <el-input
                placeholder="手机号"
                prefix-icon="iconfont icon-avatar"
                v-model="loginForm.username">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                autocomplete="off"
                placeholder="请输入密码"
                prefix-icon="iconfont icon-lock"
                v-model="loginForm.password">
                <i class="el-icon-view el-input__icon"
                   slot="suffix"
                   @click="showPassword"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-row>
                <el-col :span="16">
                  <el-input

                    autocomplete="off"
                    placeholder="验证码"
                    prefix-icon="iconfont icon-yanzhengma"
                    v-model="loginForm.code">
                  </el-input>
                </el-col>
                <el-col :span="8" class="relative code_image_box">
                  <div class="login-code">
                    <span class="login-code-img"
                      @click="refreshCode"
                      v-if="code.type == 'text'">{{code.value}}</span>
                        <img :src="code.src"
                             class="login-code-img"
                             @click="refreshCode"
                             v-else/>
                  </div>
                </el-col>
              </el-row>
              </el-form-item>
              <el-checkbox class="m-b-25" v-model="autoLogin">记住密码</el-checkbox>
            </el-form>
            <el-button @click="handleLogin" class="m-b-25" type="primary" size="big" style="width:100%">立即登录</el-button>
            <!-- <div class="op">
              <span class="forget" @click="go('/forgetpwd')">忘记密码?</span>
              <span class="sep">|</span>
              <span class="register" @click="go('/register')">还未注册?</span>
            </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import color from '@/mixins/color'
import { randomLenNum } from '@/util/util'

import { setStore } from '@/util/store'
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  mixins: [color()],
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',

        redomStr: ''
      },
      checked: false,
      showDialog: false,
      code: {
        src: '/code',
        value: '',
        len: 4,
        type: 'image'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
        ]
      },
      passwordType: 'password'
    }
  },
  watch: {
    autoLogin (n) {
      setStore({ name: 'autoLogin', content: n })
    }
  },
  created () {
    this.refreshCode()
  },
  mounted () {
  },
  computed: {
    ...mapGetters(['website', 'is_token_invalid', 'tagWel'])
  },
  props: [],
  methods: {
    refreshCode () {
      this.loginForm.code = ''
      this.loginForm.randomStr = randomLenNum(this.code.len, true)
      this.code.type === 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `http://47.104.104.82:9999/code?randomStr=${this.loginForm.randomStr}`)
    },
    showPassword () {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.$router.push({ path: this.tagWel.value })
          }).catch(() => {
            this.refreshCode()
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .login-container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    // background-image: url('~assets/login_bg.png');
    background-size: cover;
    background-position: center;
    .code_image_box{
      height: 32px;
      .code_image{
        cursor: pointer;
        height: 28px;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .login-logoImg{
      height:110px;
      max-width:1920px;
      margin:0 auto;
      padding-left:25px;
      box-sizing: border-box;
      position: relative;
      // max-height:82px;
      img{
        height:80px;
        width:auto;
        position:absolute;
        top:0;bottom:0;
        margin:auto;
      }
    }
    .login-homePage{
      max-height:730px;
      background-image: url("~assets/login_bg1.png");
      .login-home{
        max-width:1920px;
        max-height:730px;
        background-image: url("~assets/login_bg.png");
        background-repeat: no-repeat;
        background-size:100% 100%;
        margin:0 auto;
        position:relative;
        .login-wraper{
          padding: 25px 50px;
          padding-top: 45px;
          background: #fff;
          border-radius: 8px;
          position: absolute;
          width: 420px;
          height: 420px;
          position: absolute;
          top:0;right:10%;bottom:0;
          margin:auto;
          .logo{
            display: block;
            width: 127px;
            height: 96px;
            margin: 0 auto;
            margin-bottom: 35px;
          }
          .logoText{
            margin-bottom: 25px;
            color: #4980d8;
            font-size: 25px;
          }
          .op{
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            line-height: 20px;
            padding: 0  80px;
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
    }
    @media screen and (max-width:'820px'){
      .login-wraper{
        left: 0;
        right: 0;
      }
    }
    // @media screen and (min-width:'1366px'){
    //   .login-home{
    //     background-size:1366px 534px;
    //   }
    // }
    // @media screen and (min-width:'1440px'){
    //   .login-home{
    //     background-size:1440px 563px;
    //   }
    // }
    // @media screen and (min-width:'1680px'){
    //   .login-home{
    //     background-size:1680px 656px;
    //   }
    // }
    // @media screen and (min-width:'1920px'){
    //   .login-home{
    //     background-size:1920px 750px;
    //   }
    // }
    // @media screen and (min-width:'2560px'){
    //   .login-home{
    //     background-size:2560px 1000px;
    //   }
    // }
  }
</style>
