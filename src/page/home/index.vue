<template>
  <div class="full">
    <div class="welcome">
      <div class="contain flexbox top_bar">
        <div>地磅称重统一管控平台欢迎您！</div>
        <div class="icons">
          <div class="iconfont icon-vx"></div>
          <div class="iconfont icon-vb"></div>
          <div></div>
        </div>
      </div>
    </div>
    <header class="header_wrap">
      <div class="header-site flexbox contain bg-white">
        <div class="logo"></div>
        <div class="contact">
          <div class="widget widget_anpstext">
            <span class="iconfont icon-phone" style="color: #4ab9cf"></span>
            <span class="important">联系我们</span>
            <br>
            1-234-567-8900
          </div>
          <div class="widget widget_anpstext">
            <span class="iconfont icon-email" style="color: #4ab9cf"></span>
            <span class="important">工作邮箱</span>
            <br>
            bussiness@qianyun.com
          </div>
          <div class="widget widget_anpstext">
            <span class="iconfont icon-time" style="color: #4ab9cf"></span>
            <span class="important">工作时间</span>
            <br>
            早 9:00 - 晚 6:00
          </div>
          <div>
            <div class="contact-number-text">客服电话</div>
            <div class="contact-number-number">080 - 888 - 357</div>
          </div>
        </div>
      </div>
      <div class="menu_bar">
        <div class="contain">
          <el-menu
            router
            :default-active="activeIndex"
            class="menubar"
            mode="horizontal"
            background-color="#3c5fbd"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="/home">首页</el-menu-item>
            <el-submenu index="product">
              <template slot="title">产品中心</template>
              <el-menu-item index="/product/web">web版</el-menu-item>
              <el-menu-item index="/product/app">App版</el-menu-item>
            </el-submenu>
            <el-submenu index="support">
              <template slot="title">服务支持</template>
              <el-menu-item index="/support/doc">服务政策</el-menu-item>
              <el-menu-item index="/support/refer">方案咨询</el-menu-item>
              <el-menu-item index="/support/sale">售后服务</el-menu-item>
              <el-menu-item index="/support/apply">试用申请</el-menu-item>
            </el-submenu>
            <el-submenu index="about">
              <template slot="title">关于我们</template>
              <el-menu-item index="/about/intro">公司简介</el-menu-item>
              <el-menu-item index="/about/culture">企业文化</el-menu-item>
              <el-menu-item index="/about/qualification">公司资质</el-menu-item>
              <el-menu-item index="/about/structure">组织架构</el-menu-item>
              <el-menu-item index="/about/contact">联系方式</el-menu-item>
            </el-submenu>
            <el-submenu index="join">
              <template slot="title">加入我们</template>
              <el-menu-item index="/join/salary">公司待遇</el-menu-item>
              <el-menu-item index="/join/employment">招聘理念</el-menu-item>
              <el-menu-item index="/join/job">招聘岗位</el-menu-item>
            </el-submenu>
            <el-menu-item class="login" index="/login">
              登录 / 注册
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </header>
    <div class="content" >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    activeIndex () {
      return this.$route.path
    }
  },
  methods: {
    handleSelect (key, keyPath) {}
  }
}
</script>

<style lang="scss" scoped>
.contain {
  width: 1140px;
  height: 100%;
  margin: auto;
}
.flexbox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.full {
  width: 100%;
  height: auto;
  .welcome {
    width: 100%;
    height: 40px;
    background: #eaeef1;
    line-height: 40px;
    .top_bar {
      font-size: 12px;
      color: #8f9ba7;
      height: 100%;
    }
    .top_bar > div:first-child {
      height: 100%;
      padding: 0 25px;
      border-left: 2px solid #dde1e4;
      border-right: 2px solid #dde1e4;
    }
    .icons {
      height: 100%;
      padding: 0 25px;
      border-left: 2px solid #dde1e4;
      border-right: 2px solid #dde1e4;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 200px;
      & > div {
        width: 12px;
        height: 12px;
        line-height: 12px;
      }
    }
  }
  .header_wrap{
    height: 120px;
    .logo{
      width: 212px;
      height: 56px;
      background-image: url('~assets/logo.png');
      background-size: cover;
      background-position: center;
    }
    .contact{
      &>div{
        height: 64px;
        float: left;
        font-size: 14px;

      }
      .widget{
        padding: 10px 0;
        padding-right: 40px;
        line-height: 1.6em;
        color: #727272;
        .iconfont{
          margin-right: 5px;
          font-size: 16px;
        }
        .important{
          font-size: 14px;
          color: #292929;
        }
      }
      &>div:last-child{
        background: #fe7062;
        border-radius: 3px;
        min-height: 64px;
        text-align: center;
        padding: 14px 27px 10px;
        text-transform: uppercase;
        .contact-number-text{
          font-size: 15px;
          line-height: 1em;
          color: #d63c2c;
          font-weight: 500;
        }
        .contact-number-number{
          font-size: 15px;
          margin-top: 5px;
          color: #fff;
          font-weight: 500;
        }
      }
    }
    .menu_bar{
      width: 100%;
      height: 61px;
      .menubar{
        background: #3c5fbd !important;
      }
      .login{
        float: right;
        background: #597cdc !important;
        color: #fff;
      }
    }
  }
}
</style>
