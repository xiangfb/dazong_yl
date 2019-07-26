<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import OSS from 'util/ali-oss'
// import storage from 'util/storage'
export default {
  name: 'app',
  data () {
    return {}
  },
  watch: {},
  created () {
    // OSS.getToken().then(res => {
    //   console.log(res)
    // })
    // storage.set('routerPermision', {
    //   '/system/base/group': ['/system/a/b', '/system/a/c']
    // })
  },
  methods: {
  },
  computed: {},
  components: {}
}
</script>
<style lang="scss">
  // ali-iconfont
  // @import url('//at.alicdn.com/t/font_1081266_lipapf8qzj8.css');
  @import url('//at.alicdn.com/t/font_1172754_eqn2nrvuv4b.css');
  // @import url('//at.alicdn.com/t/font_567566_qo5lxgtishg.css');
  body{
    overflow-y: hidden;
  }
  .elx-editable.el-table--small .elx-editable-column {
    height: 38px !important;
  }
  .el-tooltip__popper.elx-valid_tooltip {
    z-index: 300 !important;
    background: #f56c6c !important;
  }
  .el-radio{
    margin-right: 10px !important;
    .el-radio__label{
      padding-left: 5px !important;
    }
  }
  #app *:not(.el-table__body-wrapper){
    box-sizing: border-box;
    &::-webkit-scrollbar-track-piece {
        background-color: transparent;
    }
    &::-webkit-scrollbar {
      width: 7px;
      height: 7px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: hsla(220, 4%, 58%, .3);
    }
  }
  .avue-crud__pagination{
    box-sizing: content-box !important;
    .el-input{
      width: auto !important;
    }
  }
  img{
    backface-visibility: hidden;
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
  }
  html,body{
    width: 100%;
    height: 100%;
  }
  body .el-table th.gutter{
    display: table-cell!important;
  }
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
