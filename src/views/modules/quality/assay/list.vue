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
       <common-popup
      :dataDetail="dataDetail"
      @visibleSync="visibleSync"
      @confirm="confirm"></common-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { CommonPopup, RoutineList, TreeTable, PopupList } from 'components/base/index' // getMaterialList
import NonExistent from '@/components/error-page/404'
import AssayType from 'service/modules/quality/assay-type'
import CustomType from 'service/source/custom-type'
import AssayService from 'service/modules/quality/assay/assay-service'
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
      idefinedSort: [], // 列表默认排序
      fieldData: {},
      modelData: [],
      formatId: null,
      searchAdvanced: null, // 高级查询需要
      searchTerm: null, // 快捷查询需要
      options: {
        pageSizes: [10, 20, 40, 80, 100],
        pn: 1,
        ps: 10,
        total: 0
      },
      butResource: {},
      btnGroup: [],
      cgFormatResId: 1, // 弹窗模板id
      mapData: {},
      dataDetail: {
        mapData: null,
        data: null,
        index: null
      }
      // visibleSync: true // 按钮点击触发的弹窗需要
    }
  },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  created () {
    // 获取化验单档案弹窗弹窗
    this.getResAssayFormatId()
  },
  methods: {
    cancel () {
      this.dataDetail = {
        mapData: null,
        data: null,
        index: null
      }
    },
    visibleSync () {
      this.cancel()
      this.$bus.$emit('tags/del', this.$route.path)
    },
    confirm (selectedsData, fatherData, index, resourceList) {
      if (selectedsData.length === 1) {
        this.cancel()
        this.formatId = selectedsData[0].id
        this.getMould()
        this.getMaterialList()
      } else {
        this.$message.error('请选择一条数据！')
      }
    },
    setData (key, val) {
      if (this.mapData[key] !== undefined) {
        this.$set(this.mapData, key, val)
      }
    },
    inputTap (data, index) {
      if (this.formatId === null) {
        this.dataDetail = {
          mapData: this.mapData,
          data: data,
          index: index
        }
      }
    },
    getResAssayFormatId () {
      CustomType.getFormatByCode({ code: 'res_assay_format' }, 'format').then(res => {
        if (res.success) {
          if (res.data) {
            this.cgFormatResId = res.data.id
            let data = {
              cgFormatResId: this.cgFormatResId
            }
            this.inputTap(data, null)// 调起弹窗
          }
        }
      })
    },
    cancelPopup () {
      this.visibleSync = false
      this.$bus.$emit('tags/del', this.$route.path)
    },
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
      AssayType.getAssayFormatSub({
        formatType: 'LIST',
        formatStyle: 'FORMAT_LIST_BASE',
        menuId: this.$route.meta.other.id,
        formatId: this.formatId
      }, 'assayformat').then(res => {
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
      AssayService.getListByFormatId(params, this.formatId).then(res => {
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
          console.log(result)
          AssayService.delete({
            ids: result
          }).then(res => {
            if (res.success) {
              this.$message.success(res.msg)
            }
            this.getMaterialList()
          })
          break
        case 'refresh': // 涮新按钮（字段名称与菜单中配置的名称对应）
          this.getMaterialList()
          break
        case 'create': // 新增按钮（字段名称与菜单中配置的名称对应）
          this.$router.push({
            path: this.butResource[e].urlPath,
            query: {
              id: this.butResource[e].id,
              type: e,
              formatId: this.formatId
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
          this.$router.push({
            path: this.butResource[e].urlPath,
            query: {
              id: this.butResource[e].id,
              currentId: currentId,
              type: e,
              formatId: this.formatId
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
        case 'audit': // 审核按钮（字段名称与菜单中配置的名称对应）
          if (getList.length < 1) {
            this.$message.error('请选择要审批的数据')
            return
          }
          getList.map(item => {
            result.push(item.id)
          })
          AssayService.audit({
            ids: result,
            check: true
          }).then(res => {
            if (res.success) {
              this.$message.success(res.msg)
            }
            this.getMaterialList()
          })
          break
        case 'disaudit': // 弃审按钮（字段名称与菜单中配置的名称对应）
          if (getList.length < 1) {
            this.$message.error('请选择要弃审的数据')
            return
          }
          getList.map(item => {
            result.push(item.id)
          })
          AssayService.audit({
            ids: result,
            check: false
          }).then(res => {
            if (res.success) {
              this.$message.success(res.msg)
            }
            this.getMaterialList()
          })
          break
        case 'addFormatSub': // 化验项目定义（字段名称与菜单中配置的名称对应）
          if (getList.length < 1) {
            this.$message.error('请选择化验单档案！')
            return
          } else if (getList.length > 1) {
            this.$message.error('请选择一条  化验单档案！')
            return
          }
          getList.map(item => {
            result.push(item.id)
          })
          let formatId = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()[0].id
          this.$router.push({
            path: this.butResource[e].urlPath,
            query: {
              id: this.butResource[e].id,
              formatId: formatId,
              type: e
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
          AssayService.copy(id).then(res => {
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
    TreeTable,
    PopupList,
    CommonPopup
  }
}

</script>
