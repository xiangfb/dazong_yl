<template>
  <div class="avue-contail"
       :class="{'avue--collapse':isCollapse}">
    <div class="avue-header">
      <!-- 顶部导航栏 -->
      <top/>
    </div>

    <div class="avue-layout">
      <div class="avue-left">
        <!-- 左侧导航栏 -->
        <sidebar/>
      </div>
      <div class="avue-main">
        <!-- 顶部标签卡 -->
        <tags/>
        <!-- 主体视图层 -->
        <!-- <el-scrollbar style="flex:1;" :style="{height: `${height}px`}" class="p-10 view_scrollbar"> -->
        <div class="p-5">
          <keep-alive>
            <router-view class="avue-view" :max-height="height"
                         v-if="$route.meta.$keepAlive"/>
          </keep-alive>
          <router-view class="avue-view" :max-height="height"
                       v-if="!$route.meta.$keepAlive"/>
        </div>
        <!-- </el-scrollbar> -->

      </div>
    </div>
    <div class="avue-shade" @click="showCollapse"></div>
    <popup-list-mould></popup-list-mould>
  </div>
</template>

<script>
import { PopupListMould } from 'components/base/index'
import { mapGetters } from 'vuex'
import tags from './tags'
import top from './top/'
import sidebar from './sidebar/'
import admin from '@/util/admin'
import { validatenull } from '@/util/validate'
// import { calcDate } from '@/util/date.js'
import { getStore } from '@/util/store.js'

export default {
  components: {
    PopupListMould,
    top,
    tags,
    sidebar
  },
  name: 'index',
  data () {
    return {
      // 刷新token锁
      refreshLock: false,
      // 刷新token的时间
      refreshTime: '',
      height: 0
    }
  },
  created () {
    // 实时检测刷新token
    this.refreshToken()
  },
  destroyed () {
    console.log('销毁')
    clearInterval(this.refreshTime)
  },
  mounted () {
    this.init()
    this.height = document.documentElement.clientHeight - 97
  },
  computed: mapGetters(['isLock', 'isCollapse', 'website', 'expires_in']),
  props: [],
  methods: {
    showCollapse () {
      this.$store.commit('SET_COLLAPSE')
    },
    // 屏幕检测
    init () {
      this.$store.commit('SET_SCREEN', admin.getScreen())
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit('SET_SCREEN', admin.getScreen())
        }, 0)
      }
    },
    // 实时检测刷新token
    refreshToken () {
      this.refreshTime = setInterval(() => {
        const token = getStore({
          name: 'access_token',
          debug: true
        })
        if (validatenull(token)) {
          return
        }
        if (this.expires_in <= 11 && !this.refreshLock) {
          this.refreshLock = true
          this.$store.dispatch('RefreshToken').catch(() => {
            clearInterval(this.refreshTime)
            this.$store.dispatch('FedLogOut')
            this.$router.replace({ path: '/login' })
          })
          this.refreshLock = false
        }
        this.$store.commit('SET_EXPIRES_IN', this.expires_in - 10)
      }, 10000)
    }
  }
}
</script>
