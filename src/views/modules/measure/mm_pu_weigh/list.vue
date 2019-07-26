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
    <popup-list width="70%" :visibleSync="visibleSync" title="选择订单"> <!-- 按钮点击触发的弹窗需要 -->
      <el-form :inline="true" :model="searchs" class="p-10 p-b-n popup_list_box">
      </el-form>
      <div class="p-10">
        <custom-edit-table
                class="m-b-10"
                ref="custom"
                :loading="isLoading"
                :table-header="tableHeader"
                :data="tableData"
                border
                select
                @selection-change="handleSelectionChange"
                :max-height="350"></custom-edit-table>
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pn"
                :page-sizes="pageSizes"
                :page-size="ps"
                class="align-right p-n"
                layout="total, sizes, prev, pager, next"
                :total="total">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleSync = false">取 消</el-button>
        <el-button @click="popupConfirm" type="primary">确 定</el-button>
      </span>
    </popup-list>
      <!-- 打印弹窗 -->
      <el-dialog title="打印" :visible.sync="dialogPrint" width="50%" :close-on-click-modal="false">
         <iframe id="reportFrame" width="100%" height="350px" :src="src"></iframe>
      </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import Ajax from '_router/ajax'
import Config from 'config'
import { RoutineList, TreeTable, PopupList } from 'components/base/index' // getMaterialList
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import MmPuWeighService from 'service/modules/measure/mm_pu_weigh/mm-pu-weigh-service'
import CommonService from 'service/common/common'
import GlobalService from 'service/modules/popup/global-service'

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
      dialogPrint: false, // 打印
      src: '', // 打印路由
      options: {
        pageSizes: [10, 20, 40, 80, 100],
        pn: 1,
        ps: 10,
        total: 0
      },
      butResource: {},
      btnGroup: [],
      weighIds: [],
      visibleSync: false,
      searchs: {},
      tableHeader: [],
      tableData: [],
      selectionList: {},
      pn: 1,
      ps: 10,
      pageSizes: [10, 20, 40, 80, 100],
      total: 0
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
  watch: {
    $route () {
      console.log()
      if (this.modelData) {
        this.getMaterialList()
      }
    }
  },
  methods: {
    popupConfirm () { // 弹窗资源点击确定触发  data为已选跨页数据
      this.visibleSync = false
      let getList = this.$refs.custom.$refs.editable.getSelecteds()
      if (getList.length > 1) {
        this.$message.error('只能选择一条订单信息')
        return
      }
      let noticeId = getList[0].id
      MmPuWeighService.updateWeighsByNotice({
        noticeId: noticeId,
        weighIds: this.weighIds
      }).then(res => {
        if (res.success) {
          this.$message.success('操作成功')
          this.getMaterialList()
        }
      })
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
      MmPuWeighService.list(params).then(res => {
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
        case 'delete':
          if (getList.length < 1) {
            this.$message.error('请选择要删除的数据')
            return
          }
          this.$refs.com.$refs.custom.$refs.editable.getSelecteds().map(item => {
            result.push(item.id)
          })
          MmPuWeighService.delete({
            ids: result
          }).then(res => {
            this.$message.success(res.msg)
            this.getMaterialList()
          })
          console.log('==')
          break
        case 'create':
          console.log(this.butResource[e].id)
          this.$router.push({
            path: this.butResource[e].urlPath,
            query: {
              id: this.butResource[e].id,
              type: e
            }
          })
          break
        case 'update':
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
        case 'updateNotice':
          console.log(this.butResource[e])
          if (getList.length < 1) {
            this.$message.error('请选择要修改的信息')
            return
          }
          for (var i = 0; i < getList.length; i++) {
            if (getList[i]['iupload']) {
              this.$message.error('选中项有已上传项')
              return
            }
          }
          this.$refs.com.$refs.custom.$refs.editable.getSelecteds().map(item => {
            this.weighIds.push(item.id)
          })
          this.visibleSync = true
          GlobalService.optimusPrimePopup('270').then(res => {
            if (res.success) {
              this.tableHeader = res.data.resSubList.map(item => {
                if (item.fieldType === 'ENUM') {
                  item.enumOptions = {}
                  item.options.forEach(data => {
                    item.enumOptions[data.value] = data.label
                  })
                }
                return item
              })
              this.resUrl = res.data.resUrl
              this.getPoundList()
            }
          })
          break
        case 'detail':
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
        case 'enable':
          if (getList.length < 1) {
            this.$message.error('请选择要启用的数据')
            return
          }
          getList.map(item => {
            result.push(item.id)
          })
          MmPuWeighService.enable({
            ids: result
          }).then(res => {
            this.$message.success('启用成功')
          })
          break
        case 'disable':
          if (getList.length < 1) {
            this.$message.error('请选择要禁用的数据')
            return
          }
          getList.map(item => {
            result.push(item.id)
          })
          MmPuWeighService.disable({
            ids: result
          }).then(res => {
            this.$message.success('禁用成功')
          })
          break
        case 'audit':
          if (getList.length < 1) {
            this.$message.error('请选择要审批的数据')
            return
          }
          getList.map(item => {
            result.push(item.id)
          })
          MmPuWeighService.audit({
            ids: result,
            check: true
          }).then(res => {
            this.$message.success('操作成功')
          })
          break
        case 'disaudit':
          if (getList.length < 1) {
            this.$message.error('请选择要弃审的数据')
            return
          }
          getList.map(item => {
            result.push(item.id)
          })
          MmPuWeighService.audit({
            ids: result,
            check: false
          }).then(res => {
            this.$message.success('操作成功')
          })
          break
        case 'obsolete':
          if (getList.length < 1) {
            this.$message.error('请选择要废弃的数据')
            return
          }
          getList.map(item => {
            result.push(item.id)
          })
          MmPuWeighService.obsolete({
            ids: result,
            check: false
          }).then(res => {
            this.$message.success('操作成功')
          })
          break
        case 'copy':
          if (getList.length < 1) {
            this.$message.error('请选择要复制的数据')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能复制一条信息')
            return
          }
          let id = getList[0].id
          MmPuWeighService.copy(id).then(res => {
            this.$message.success('操作成功')
          })
          break
        case 'down':
          if (getList.length < 1) {
            this.$message.error('是否确认进行冲减操作？')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能冲减一条信息')
            return
          }
          this.$confirm('确定冲减吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            MmPuWeighService.down(getList[0].id).then(res => {
              if (res.success) {
                this.$message.success(res.msg)
              }
            })
          }).catch(() => {
          })
          break
        case 'reversedown':
          if (getList.length < 1) {
            this.$message.error('请选择要反冲减的数据')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能反冲减一条信息')
            return
          }
          this.$confirm('是否确认进行反冲减操作？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            MmPuWeighService.reversedown(getList[0].id).then(res => {
              if (res.success) {
                this.$message.success(res.msg)
              }
            })
          }).catch(() => {
          })
          break
        case 'synchronization':
          MmPuWeighService.syn({
            update_date: '2018-06-01 00:00:00'
          }).then(res => {
            if (res.success) {
              this.$message.success(res.msg)
              this.getMaterialList()
            }
          })
          break
        case 'out_door_edit':
          if (getList.length < 1) {
            this.$message.error('请选择要修改的数据')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能选择一条信息')
            return
          }
          let entityId = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()[0].id
          console.log(currentId)
          this.$router.push({
            path: this.butResource[e].urlPath,
            query: {
              id: this.butResource[e].id,
              currentId: entityId,
              type: e
            }
          })
          break
        case 'frprint':
          if (getList.length > 1) {
            this.$message.error('只能选择一条信息')
            return
          }
          if (getList.length < 1) {
            this.$message.error('请选择一条信息')
            return
          }
          let oData = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()[0]
          let printId = oData.id
          let printRegCode = oData.regCode
          console.log(printId)
          console.log(printRegCode)
          if (printId) {
            this.dialogPrint = true
            if (this.dialogPrint) {
              this.src = ''
              let printParams = {
                reportlet: 'print_pu_weigh',
                param: {
                  JSID: printId,
                  regCode: printRegCode
                }
              }
              CommonService.print(printParams).then(res => {
                if (res.success) {
                  console.log(res)
                  let frSrc = CommonService.getFrUrl(res.data)
                  console.log(frSrc)
                  this.src = frSrc
                }
              })
            }
          }
          break
        case 'returnGoods':
          if (getList.length < 1) {
            this.$message.error('请选择要废弃的数据')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能选择一条数据')
            return
          }
          this.$confirm('是否确认进行退货操作？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            MmPuWeighService.returnGoods({
              id: getList[0].id,
              type: 'PU'
            }).then(res => {
              this.$message.success('操作成功')
            })
          }).catch(() => {
          })
          break
      }
    },
    getPoundList () { // 获取通知单列表
      this.isLoading = false
      Ajax.post({
        url: Config.service.api + this.resUrl,
        data: {
          limit: { ps: this.ps, pn: this.pn },
          ...this.searchs
        }
      }).then(res => {
        if (res.success) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.isLoading = false
        }
      })
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
    handleSelectionChange (data) {
      this.$set(this.selectionList, this.pn, data)
    },
    handleSizeChange (ps) {
      this.ps = ps
      this.getPoundList()
    },
    handleCurrentChange (pn) {
      this.pn = pn
      this.getPoundList()
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
    TreeTable,
    PopupList
  }
}

</script>
