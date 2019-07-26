<template> <!-- 常规列表 代表 -->
  <div :style="{height: `${maxHeight}px`}" v-loading="loading">
    <component
      :is="currentView"
      :tips="tips"
      ref='com'
      :max-height="maxHeight"
      :btnGroup="btnGroup"
      :fieldData="fieldData"
      :modelData="modelData"
      :options="options"
      @search="search"
      @sort-change="sortChange"
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
import TrNoticeService from 'service/modules/transfer/tr_notice/tr-notice-service'
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
      modelData: [],
      idefinedSort: [], // 列表默认排序
      searchAdvanced: null, // 高级查询需要
      searchTerm: null, // 快捷查询需要
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
    sortChange (key, dir) {
      this.loading = true
      if (key) {
        this.idefinedSort = [{
          key: key,
          dir: dir
        }]
      } else {
        this.idefinedSort = []
      }
      this.getMaterialList()
    },
    search (searchList, type) { // 快捷/高级查询需要
      if (type === 'advanced') { // 高级查询
        this.searchAdvanced = searchList
      }
      if (type === 'quick') { // 快捷查询
        this.searchTerm = searchList
      }
      this.getMaterialList()
    },
    getMould () { // 获取当前菜单配置
      OptimusPrimeService.optimusPrime({
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
          res.data.listSubList.forEach(item => {
            if (item.idefinedSort) { // 列表默认排序
              this.idefinedSort.push({
                key: item.fieldName,
                dir: 'desc'
              })
            }
          })
          this.getMaterialList()
        } else {
          this.tips = res.msg
          this.formatStyle = ''
          this.loading = false
        }
      })
    },
    getMaterialList () {
      let params = {
        limit: {
          ps: this.options.ps,
          pn: this.options.pn
        },
        sort: this.idefinedSort,
        search: [] // 快捷查询需要
      }
      if (this.searchAdvanced) { // 高级查询
        params.search = params.search.concat(this.searchAdvanced)
      }
      if (this.searchTerm) { // 快捷查询需要
        params.search[params.search.length] = this.searchTerm
      }
      TrNoticeService.list(params).then(res => {
        if (res.success) {
          this.options.total = res.data.total
          this.modelData = res.data.list
          this.$nextTick(() => {
            this.loading = false
          })
        }
      })
    },
    butEvent (e) {
      let result = []
      let getList = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()
      switch (e) {
        case 'delete': // 删除按钮（字段名称与菜单中配置的名称对应）
          if (getList.length < 1) {
            this.$message.error('请选择要删除的数据')
            return
          }
          this.$refs.com.$refs.custom.$refs.editable.getSelecteds().map(item => {
            result.push(item.id)
          })
          TrNoticeService.delete({
            ids: result
          }).then(res => {
            if (res.success) {
              this.$message.success(res.msg)
              this.getMaterialList()
            }
          })
          console.log('==')
          break
        case 'create': // 新增按钮（字段名称与菜单中配置的名称对应）
          console.log(this.butResource[e].id)
          this.$router.push({
            path: this.butResource[e].urlPath,
            query: {
              id: this.butResource[e].id,
              type: e
            }
          })
          break
        case 'update': // 修改按钮（字段名称与菜单中配置的名称对应）
          console.log(this.butResource[e])
          if (getList.length > 1) {
            this.$message.error('只能修改一条信息')
            return
          }
          if (getList.length < 1) {
            this.$message.error('请选择一条要修改的信息')
            return
          }
          let currentId = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()[0].id
          console.log(currentId)
          this.$router.push({
            path: this.butResource[e].urlPath,
            query: {
              id: this.butResource[e].id,
              currentId: currentId,
              type: e
            }
          })
          break
        case 'detail': // 详情查看按钮（字段名称与菜单中配置的名称对应）
          if (getList.length > 1) {
            this.$message.error('只能查看一条信息')
            return
          }
          if (getList.length < 1) {
            this.$message.error('请选择一条要查看的信息')
            return
          }
          console.log(this.butResource[e])
          if (this.$refs.com.$refs.custom.$refs.editable.getSelecteds()) {

          }
          let curd = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()[0].id
          console.log(curd)
          this.$router.push({
            path: this.butResource[e].urlPath,
            query: {
              id: this.butResource[e].id,
              currentId: curd,
              type: e
            }
          })
          break
        case 'synchronization':
          TrNoticeService.syn({
            update_date: '2018-06-01 00:00:00'
          }).then(res => {
            if (res.success) {
              this.$message.success(res.msg)
              this.getMaterialList()
            }
          })
          break
        case 'enable': // 启用按钮（字段名称与菜单中配置的名称对应）
          if (getList.length < 1) {
            this.$message.error('请选择要启用的数据')
            return
          }
          for (var i = 0; i < getList.length; i++) {
            if (getList[i]['ienabled']) {
              this.$message.error('选中项有启用项')
              return
            }
          }
          getList.map(item => {
            result.push(item.id)
          })
          TrNoticeService.enable({
            ids: result
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
          })
          break
        case 'disable': // 禁用按钮（字段名称与菜单中配置的名称对应）
          if (getList.length < 1) {
            this.$message.error('请选择要禁用的数据')
            return
          }
          for (var j = 0; j < getList.length; j++) {
            if (!getList[j]['ienabled']) {
              this.$message.error('选中项有禁用项')
              return
            }
          }
          getList.map(item => {
            result.push(item.id)
          })
          TrNoticeService.disable({
            ids: result
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
          })
          break
        case 'audit': // 审核按钮（字段名称与菜单中配置的名称对应）
          if (getList.length < 1) {
            this.$message.error('请选择要审批的数据')
            return
          }
          for (var k = 0; k < getList.length; k++) {
            if (getList[k]['icheck']) {
              this.$message.error('选中项有已审批项')
              return
            }
          }
          getList.map(item => {
            result.push(item.id)
          })
          TrNoticeService.audit({
            ids: result,
            check: true
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
          })
          break
        case 'disaudit': // 弃审按钮（字段名称与菜单中配置的名称对应）
          if (getList.length < 1) {
            this.$message.error('请选择要弃审的数据')
            return
          }
          for (var l = 0; l < getList.length; l++) {
            if (!getList[l]['icheck']) {
              this.$message.error('选中项有已弃审项')
              return
            }
          }
          getList.map(item => {
            result.push(item.id)
          })
          TrNoticeService.audit({
            ids: result,
            check: false
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
          })
          break
        case 'obsolete': // 废弃按钮（字段名称与菜单中配置的名称对应）
          if (getList.length < 1) {
            this.$message.error('请选择要废弃的数据')
            return
          }
          for (var m = 0; m < getList.length; m++) {
            if (getList[m]['iobsolete']) {
              this.$message.error('选中项有已废弃项')
              return
            }
          }
          getList.map(item => {
            result.push(item.id)
          })
          TrNoticeService.obsolete({
            ids: result,
            check: false
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
          })
          break
        case 'copy': // 复制一条信息按钮（字段名称与菜单中配置的名称对应）
          if (getList.length < 1) {
            this.$message.error('请选择要复制的数据')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能复制一条信息')
            return
          }
          let id = getList[0].id
          TrNoticeService.copy(id).then(res => {
            this.$message.success(res.msg)
          })
          break
      }
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
