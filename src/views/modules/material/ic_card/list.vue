<template>
  <div :style="{height: `${maxHeight}px`}" v-loading="loading">
    <component
      :is="currentView"
      :tips="tips"
      ref="custom"
      :max-height="maxHeight"
      :btnGroup="btnGroup"
      :fieldData="fieldData"
      :modelData="modelData"
      :options="options"
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
import IcCardService from 'service/modules/material/ic_card/ic-card-service'
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
      fieldData: {},
      modelData: {},
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
    this.getMaterialList()
  },
  methods: {
    getMould () { // 获取当前菜单配置
      IcCardService.optimusPrime({
        formatType: 'LIST',
        menuId: this.$route.meta.other.id
      }).then(res => {
        if (res.success) {
          this.formatStyle = res.data.formatStyle
          this.fieldData = res.data
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
    getMaterialList () {
      IcCardService.list({
        limit: {
          ps: this.options.ps,
          pn: this.options.pn
        }
      }).then(res => {
        if (res.success) {
          this.options.total = res.data.total
          this.modelData = res.data.list
        }
      })
    },
    butEvent (e) {
      let getList = this.$refs.custom.$refs.custom.$refs.editable.getSelecteds()
      let result = []
      if (getList.length > 0) {
        getList.map(item => {
          result.push(item.id)
        })
      }
      switch (e) {
        case 'create':
          this.$router.push({
            path: this.butResource[e].urlPath,
            query: {
              id: this.butResource[e].id
            }
          })
          break
        case 'update':
          if (getList.length > 1) {
            this.$message.error('只能修改一条信息')
            return
          }
          if (getList.length < 1) {
            this.$message.error('请选择一条要修改的信息')
            return
          }
          this.$router.push({
            path: this.butResource[e].urlPath,
            query: {
              id: this.butResource[e].id,
              detail: getList[0]
            }
          })
          break
        case 'delete':
          if (getList.length < 1) {
            this.$message.error('请选择要删除的数据')
            return
          }
          IcCardService.delete(result).then(res => {
            this.$message.success('删除成功')
          })
          break
        case 'loss':
          if (getList.length < 1) {
            this.$message.error('请选择要挂失的卡')
            return
          }
          IcCardService.loss(result).then(res => {
            this.$message.success('操作成功')
          })
          break
        case 'reuse':
          if (getList.length < 1) {
            this.$message.error('请选择要复用的卡')
            return
          }
          IcCardService.reuse(result).then(res => {
            this.$message.success('操作成功')
          })
          break
        case 'enable':
          if (getList.length < 1) {
            this.$message.error('请选择要启用的数据')
            return
          }
          IcCardService.enable({
            ids: result
          }).then(res => {
            this.$message.success('操作成功')
          })
          break
        case 'disable':
          if (getList.length < 1) {
            this.$message.error('请选择要禁用的数据')
            return
          }
          IcCardService.disable({
            ids: result
          }).then(res => {
            this.$message.success('操作成功')
          })
          break
      }
      // if (this.butResource[e]) {
      //   this.$router.push({
      //     path: this.butResource[e].urlPath,
      //     query: {
      //       id: this.butResource[e].id
      //     }
      //   })
      // }
    },
    sizeChange (ps) {
      this.options.pn = 1
      this.options.ps = ps
      this.getMaterialList()
    },
    currentChange (pn) {
      this.options.pn = pn
      this.getMaterialList()
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
