<template>
  <div id="custom_btngroup">
    <el-button-group>
      <template v-for="(item, index) in group">
        <el-dropdown
          v-if="item.children && item.children.length > 0"
          :key="index"
          split-button
          @click="emitName(item.buttonCode)"
          @command="emitName"
          class="f-l dropdown_but_group"
          type="common"
          size="small">
          {{item.label}}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(data, i) in item.children" :key="i" :command="data.buttonCode">{{data.title}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button v-else size="small" type="common" @click="emitName(item.name)" :loading="butLoading" :key="index">
          <i :class="[item.icon, 'icon_font_size']"></i> {{item.label}}
        </el-button>
      </template>
      <el-dropdown v-if="options.length" @command="emitName">
        <el-button type="common" size="small" style="height:32px;">
        <!-- <el-button type="primary" size="small" style="height:32px;"> -->
          <div class="flex">
            <div>
              更多
            </div>
            <div class="el-icon-arrow-down el-icon--right"></div>
          </div>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
          :key="item.name"
          :command="item.name"
          v-for="item in options"
          >
              {{item.label}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-button-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'custom-button-group',
  data () {
    return {
      group: [],
      options: [],
      value: ''
    }
  },
  computed: {
    ...mapGetters([
      'permissions'
    ])
  },
  props: {
    butLoading: {
      type: Boolean,
      default: false
    },
    btnGroup: {
      type: Array,
      default () {
        return []
      }
    },
    limit: {
      type: [Number, String],
      default: 5
    }
  },
  watch: {
    btnGroup () {
      this.filterBtn()
    }
  },
  methods: {
    bu (e) {
      console.log(e)
    },
    filterBtn () {
      /**
     * 根据limit决定更多要不要展示
    */
      let btnGroup = this.btnGroup.filter(v => {
        return this.permissions[v.permision] || v.permision === ''
      })
      if (Number(this.limit) !== 0 && btnGroup.length > this.limit) {
        this.group = btnGroup.slice(0, this.limit)
        this.options = btnGroup.slice(this.limit)
      } else {
        this.group = btnGroup
      }
    },
    // 劫持点击事件,发射给父组件
    emitName (e) {
      this.$emit('on-click', e)
    }
  },
  mounted () {
    this.filterBtn()
  }

}
</script>

<style lang="scss" scoped>
.icon_font_size{
  font-size: 12px !important;
}
#custom_btngroup{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .el-button-group>*{
    height: 32px !important;
  }
}
.flex{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>

<style lang="scss">
  .dropdown_but_group{
    margin-right: -1px !important;
    .el-button--small{
      border-radius: 0px !important;
    }
    .el-dropdown__caret-button{
      height: 32px !important;
    }
  }
</style>
