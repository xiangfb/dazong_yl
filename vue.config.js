// const url = 'http://10.10.1.91:9999'
const url = 'http://47.104.104.82:9999'
// const api = 'https://preview.pro.ant.design'
const ossUrl = 'http://10.10.1.153:6000'
// const url = 'http://preview.pig4cloud.com/'
const localUrl = 'http://localhost:8001/'
// const url = 'http://dzwl.admin.transnal.com'
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  productionSourceMap: false, // 在构建生产环境版本时是否开启source map
  chainWebpack: config => {
    process.env.NODE_ENV === 'production' && config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  configureWebpack: {
    externals: { // 左边代表要引入资源包的名字，右边代表该模块在外面使用引用的名字 ==> 禁止打包以下依赖，cdn方式引入
      jquery: '$',
      axios: 'axios',
      echarts: 'echarts',
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      'xlsx': 'XLSX',
      'ali-oss': 'OSS'
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'src': resolve('src'),
        'public': resolve('public'),
        'assets': resolve('src/assets'),
        'config': resolve('src/config/config.js'),
        'service': resolve('src/service'),
        'apiUrl': resolve('src/config/api-url.js'),
        'components': resolve('src/components'),
        'base-components': resolve('src/base-components'),
        'constant': resolve('src/const'),
        'mixins': resolve('src/mixins'),
        'page': resolve('src/page'),
        'store': resolve('src/store'),
        'util': resolve('src/util'),
        '_router': resolve('src/router'),
        '_store': resolve('src/store'),
        'styles': resolve('src/styles'),
        'views': resolve('src/views')
      }
    }
  },
  // 配置转发代理
  devServer: {
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    disableHostCheck: true,
    port: 9090,
    proxy: {
      '/auth': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      '/admin': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      },
      '/code': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/code': '/code'
        }
      },
      '/gen': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/gen': '/gen'
        }
      }
    }
  }
}
