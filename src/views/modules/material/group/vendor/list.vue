<template> <!-- 树+列表 代表 -->
  <div :style="{height: `${maxHeight}px`}" v-loading="loading">
    <component
      :is="currentView"
      :tips="tips"
      :max-height="maxHeight"
      :btnGroup="btnGroup"
      :treeData="treeData"
      :fieldData="fieldData"
      :modelData="modelData"
      :options="options"
      @node-click="nodeClick"
      @submit="submitForm"
      @but-receipt="butEvent"
      @reset="resetForm"
      @size-change="sizeChange"
      @current-change="currentChange"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import { RoutineList, TreeTable } from 'components/base/index' // getMaterialList
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import TreeService from 'service/tree-service'
export default {
  name: 'dynamic',
  data () {
    return {
      tips: '',
      loading: true,
      formatStyle: 'loading', // 模板类型
      mould: {
        '404': Vue.extend(NonExistent), // 404页面
        'FORMAT_LIST_BASE': Vue.extend(RoutineList), // 常规列表
        'FORMAT_TREE_LIST': Vue.extend(TreeTable) // 树形+列表
      },
      treeData: [],
      fieldData: {},
      modelData: [],
      searchId: null,
      options: {
        pageSizes: [10, 20, 40, 80, 100],
        pn: 1,
        ps: 10,
        total: 0
      },
      butResource: {},
      btnGroup: []
    }
  },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  created () {
    this.getMould()
  },
  methods: {
    getMould () { // 获取当前菜单配置
      OptimusPrimeService.optimusPrime({
        formatType: 'LIST',
        menuId: this.$route.meta.other.id
      }).then(res => {
        if (res.success) {
          this.formatStyle = res.data.formatStyle
          this.fieldData = res.data
          this.getMaterialList()
          this.btnGroup = res.data.menuList.map(item => {
            this.butResource[item.buttonCode] = item
            item.btnType = 'primary'
            item.permision = ''
            item.name = item.buttonCode
            item.label = item.title
            item.type = 'btn'
            return item
          })
          this.$nextTick(() => {
            this.loading = false
          })
        } else {
          this.tips = res.msg
          this.formatStyle = ''
          this.loading = false
        }
      })
    },
    getMaterialList (one) {
      if (this.formatStyle === 'FORMAT_TREE_LIST') {
        TreeService.trees().then(tree => {
          if (tree.success) {
            this.treeData = this.treeHandle(tree.data)
            this.getData(this.treeData && this.treeData[0] && this.treeData[0].id)
          } else {
            this.getData()
          }
        })
      } else {
        this.getData()
      }
    },
    nodeClick (data) {
      this.getData(data.id)
    },
    treeHandle (data) {
      data.forEach(ele => {
        ele.name = ele.jsonObject.groupName
        if (ele.children && ele.children.length > 0) {
          this.treeHandle(ele.children)
        }
      })
      return data
    },
    getData (id) {
      let params = {
        limit: {
          ps: this.options.ps,
          pn: this.options.pn
        }
      }
      if (id) {
        this.searchId = id
      }
      if (this.searchId) {
        params.search = [{ key: 'id', op: 'eq', val: this.searchId }]
      }
      OptimusPrimeService.getMaterialList(params).then(res => {
        if (res.success) {
          this.options.total = res.data.total
          this.modelData = res.data.list
        }
      })
    },
    butEvent (e) {
      console.log(this.butResource)
      if (this.butResource[e]) {
        this.$router.push({
          path: this.butResource[e].urlPath,
          query: {
            id: this.butResource[e].id
          }
        })
      }
    },
    sizeChange (ps) {
      this.options.pn = 1
      this.options.ps = ps
      this.getData()
    },
    currentChange (pn) {
      this.options.pn = pn
      this.getData()
    },
    submitForm (state, modelData) {
      if (state) { // 提交成功
        this.$message({
          message: '提交成功！',
          type: 'success'
        })
      } else {
        this.$message.error('请完善表单！')
      }
      console.log(modelData)
    },
    resetForm (modelData) {
      console.log(modelData)
    }
  },
  computed: {
    currentView () {
      if (this.formatStyle) {
        return this.mould[this.formatStyle]
      } else {
        return this.mould['404']
      }
    }
  },
  components: {
    RoutineList,
    TreeTable
  }
}

</script>
