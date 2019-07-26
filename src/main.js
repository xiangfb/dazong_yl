import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './permission' // 权限
// import './error' // 日志 暂时注释
import * as filters from './filters' // 全局filter
import 'util/extends.js'
import basicContainer from './components/basic-container/main'
import VueClipboard from 'vue-clipboard2'
import { validatenull } from '@/util/validate'
import { deepClone } from '@/util/util'
import VCharts from 'v-charts'
import VueRouter from 'vue-router'
import CustomComponents from 'components/custom-components/index'
import ELEMENT from 'element-ui'
import bus from '@/util/bus'
import ElTreeGrid from 'element-tree-grid'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-element-extends/lib/index.css'
import 'styles/avue.css'
import 'styles/common.scss'
import { loadStyle } from './util/util'
import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env'
Object.keys(CustomComponents).forEach(key => {
  Vue.component(key, CustomComponents[key])
})
//加载icon图标
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})
Vue.use(VueRouter)
Vue.use(VCharts)
Vue.prototype.$bus = bus
Vue.prototype.$deepClone = deepClone
Vue.config.productionTip = false
window.$router = router
Vue.prototype.validatenull = validatenull
Vue.use(router)
Vue.use(VueClipboard)
Vue.use(window.AVUE, { menuType: 'text' })
// 注册全局容器
Vue.component('basicContainer', basicContainer)
Vue.component(ElTreeGrid.name, ElTreeGrid)
/*Vue.use(ELEMENT, { size: 'small' })*/
// 加载过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
