<template>
  <div class="content bg-white w100 p-10">
    <h3>文件及文件夹命名命名规范</h3>
    <div class="fs16">文件名全小写，以连字符连接 例如 my-company</div>
    <h3>变量命名规范</h3>
    <div class="fs16"> 命名以pascalCase的形式   例如 routeMap</div>
    <h3>常量命名规范</h3>
    <div class="fs16">全大写，以下划线连接 例如 USER_INFO , LOGIN_BY_SOCIAL</div>
    <h3>service引入命名规范</h3>
    <div class="fs16">驼峰命名  例如  AdminService</div>
    <h3>iconfont使用命名规范</h3>
    <div class="fs16">iconfont全部维护在阿里iconfont字体库clouds1000项目</div>
    <div class="fs16">命名规范 最终应为形如icon-color格式</div>
    <h3>CSS Class命名规范</h3>
    <div class="fs16">全小写，以连字符连接  例如  info-container</div>
    <h3>CSS id命名规范</h3>
    <div class="fs16">全小写，以连字符连接  例如  info-container</div>
    <div class="fs16">动词应加上namespace(命名空间) 例如 material-search 而不是 search</div>
    <h3>公共组件命名规范</h3>
    <div class="fs16">文件夹命名为全小写字母加连字符，组件命名为驼峰命名 例如  FormCard</div>
    <h3>路由命名规范</h3>
    <div class="fs16 fw600">因权限处理需要，应尽量避免params路由，转为拼query方式传递参数</div>
    <div class="fs16 m-b-10">命名以pascalCase的形式   例如 factoryRouteList</div>

    <avue-crud :data="data" :option="option" v-model="user">
      <template slot-scope="scope" slot="name">
        <el-tag>{{scope.row.name}}</el-tag>
      </template>
    </avue-crud>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      data: [
        {
          name: '张三',
          sex: '男'
        }, {
          name: '李四',
          sex: '女'
        }
      ],
      option: {
        column: [{
          label: '姓名',
          prop: 'name',
          slot: true
        }, {
          label: '性别',
          prop: 'sex'
        }]
      }
    }
  }
}
</script>
