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
  </div>
</template>

<script>
import Vue from 'vue'
import Ajax from '_router/ajax'
import Config from 'config'
import { RoutineList, TreeTable, PopupList } from 'components/base/index' // getMaterialList
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import AlRegistryService from 'service/modules/allot/al_registry/al-registry-service'
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
  methods: {
    popupConfirm () { // 弹窗资源点击确定触发  data为已选跨页数据
      this.visibleSync = false
      let getList = this.$refs.custom.$refs.editable.getSelecteds()
      if (getList.length > 1) {
        this.$message.error('只能选择一条订单信息')
        return
      }
      let noticeId = getList[0].id
      AlRegistryService.updateWeighsByNotice({
        noticeId: noticeId,
        regIds: this.weighIds
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
      AlRegistryService.list(params).then(res => {
        if (res.success) {
          this.options.total = res.data.total
          this.modelData = res.data.list
          this.$nextTick(() => {
            this.loading = false
          })
        }
      })
    },
    // 读卡查询登记单
    getReg (code) {
      let params = {
        limit: {
          ps: this.options.ps,
          pn: this.options.pn
        },
        sort: this.idefinedSort,
        search: [{ key: 'cardCode', op: 'like', val: code }] // 快捷查询需要
      }
      AlRegistryService.list(params).then(res => {
        if (res.success) {
          this.options.total = res.data.total
          this.modelData = res.data.list
          this.$nextTick(() => {
            this.loading = false
          })
        }
      })
    },
    // 登记单补卡
    supplementCard (code, id) {
      AlRegistryService.supplementCard({
        id: id,
        cardCode: code
      }).then(res => {
        if (res.success) {
          let params = {
            limit: {
              ps: this.options.ps,
              pn: this.options.pn
            },
            sort: this.idefinedSort,
            search: [{ key: 'cardCode', op: 'like', val: code }] // 快捷查询需要
          }
          AlRegistryService.list(params).then(res => {
            if (res.success) {
              this.options.total = res.data.total
              this.modelData = res.data.list
              this.$nextTick(() => {
                this.loading = false
              })
            }
          })
        }
      })
      console.log('ok')
      console.log(id)
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
          AlRegistryService.delete({
            ids: result
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
          })
          break
        case 'againMatch':
          if (getList.length < 1) {
            this.$message.error('请选择要操作的数据')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能操作一条信息')
            return
          }
          AlRegistryService.againMatch(getList[0].id).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
          })
          break
        case 'updateNotice':
          console.log(this.butResource[e])
          if (getList.length < 1) {
            this.$message.error('请选择要修改的信息')
            return
          }
          for (var a = 0; a < getList.length; a++) {
            if (getList[a]['iupload']) {
              this.$message.error('选中项有不是本地单据，不允许修改订单')
              return
            }
          }
          this.$refs.com.$refs.custom.$refs.editable.getSelecteds().map(item => {
            this.weighIds.push(item.id)
          })
          this.visibleSync = true
          GlobalService.optimusPrimePopup('346').then(res => {
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
          if (getList[0].icheck) {
            this.$message.error('数据已审核，不允许编辑！')
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
          for (var i = 0; i < getList.length; i++) {
            if (getList[i]['ienabled']) {
              this.$message.error('选中项有启用项')
              return
            }
          }
          getList.map(item => {
            result.push(item.id)
          })
          AlRegistryService.enable({
            ids: result
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
          })
          break
        case 'disable':
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
          AlRegistryService.disable({
            ids: result
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
          })
          break
        case 'audit':
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
          AlRegistryService.audit({
            ids: result,
            check: true
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
          })
          break
        case 'disaudit':
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
          AlRegistryService.audit({
            ids: result,
            check: false
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
          })
          break
        case 'obsolete':
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
          AlRegistryService.obsolete({
            ids: result
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
          })
          break
        case 'recover':
          if (getList.length < 1) {
            this.$message.error('请选择要恢复的数据')
            return
          }
          for (var n = 0; n < getList.length; n++) {
            if (!getList[n]['iobsolete']) {
              this.$message.error('选中项有未废弃项')
              return
            }
          }
          getList.map(item => {
            result.push(item.id)
          })
          AlRegistryService.recover({
            ids: result
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
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
          AlRegistryService.copy(id).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
          })
          break
        case 'supplement_card':
          if (getList.length < 1) {
            this.$message.error('请选择要操作的数据')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能选择一条信息')
            return
          }
          this.readCard(this, getList[0].id)
          break
        case 'check_card':
          if (getList.length < 1) {
            this.$message.error('请选择要操作的数据')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能选择一条信息')
            return
          }
          console.log(getList[0])
          AlRegistryService.checkCard({
            id: getList[0].id,
            check: getList[0].icheck,
            num: 1,
            shipmentsMode: getList[0].shipmentsMode
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功')
              this.getMaterialList()
            }
          })
          break
        case 'read_card':
          this.readCard(this)
          break
        case 'letin':
          if (getList.length < 1) {
            this.$message.error('请选择要操作的数据')
            return
          }
          getList.map(item => {
            result.push(item.id)
          })
          console.log(getList[0])
          AlRegistryService.letin({
            ids: result
          }).then(res => {
            this.$message.success(res.data)
            this.getMaterialList()
          })
          break
        case 'letout':
          if (getList.length < 1) {
            this.$message.error('请选择要操作的数据')
            return
          }
          getList.map(item => {
            result.push(item.id)
          })
          console.log(getList[0])
          AlRegistryService.letout({
            ids: result
          }).then(res => {
            this.$message.success(res.data)
            this.getMaterialList()
          })
          break
        case 'upControlPoint':
          if (getList.length < 1) {
            this.$message.error('请选择要操作的数据')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能选择一条信息')
            return
          }
          console.log(getList[0])
          AlRegistryService.upControlPoint({
            id: getList[0].id,
            upOrDowControlPoint: false
          }).then(res => {
            this.$message.success(res.data)
            this.getMaterialList()
          })
          break
        case 'downControlPoint':
          if (getList.length < 1) {
            this.$message.error('请选择要操作的数据')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能选择一条信息')
            return
          }
          console.log(getList[0])
          AlRegistryService.downControlPoint({
            id: getList[0].id,
            upOrDowControlPoint: true
          }).then(res => {
            this.$message.success(res.data)
            this.getMaterialList()
          })
          break
        case 'safeUpdate':
          if (getList.length < 1) {
            this.$message.error('请选择要修改的数据')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能选择一条信息')
            return
          }
          currentId = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()[0].id
          AlRegistryService.getSub(getList[0].id).then(res => {
            if (res.data[0].deWeigh01 === null || res.data[0].deWeigh01 === '') {
              this.$message.error('该数据没有磅单信息，请使用普通修改')
              return
            }
            if (res.data[0].deWeigh02 != null && res.data[0].deWeigh02 !== '') {
              this.$message.error('对应磅单中有二次过磅记录，不允许修改登记单')
              return
            }
            this.$router.push({
              path: this.butResource[e].urlPath,
              query: {
                id: this.butResource[e].id,
                currentId: currentId,
                type: e
              }
            })
          })
          break
        case 'picture':
          if (getList.length < 1) {
            this.$message.error('请选择要操作的数据')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能选择一条信息')
            return
          }
          console.log(getList[0])
          AlRegistryService.picture(getList[0].id).then(res => {
            this.$message.success(res.data)
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
    },
    strReplace (str) {
      let strs = '0000000'
      if (str != null) {
        strs = strs.substring(0, strs.length - (str + '').length) + str
      }
      console.log(strs)
      return strs
    },
    // 读卡，支持读身份证号、身份证ID号、IC卡号
    readCard (obj, id) {
      // 点击读卡后精纶和明华都读一遍
      let cardReadServiceid = 'minghua_m1_read,routon_m1_read,routon_info_read'
      let cardWriteServiceid = 'minghua_m1_write,routon_m1_write'
      let WsImpl = window.WebSocket || window.MozWebSocket
      window.ws = new WsImpl('ws://127.0.0.1:61214/')
      let message = {// 默认明华
        // 明华读卡器
        serviceid: 'minghua_m1_read',
        blocks: ['24']
      }
      // eslint-disable-next-line no-array-constructor
      let serviceidRead = new Array()
      let i = 0
      let bol = false
      // 创建块
      let block = new Array(0)
      // 创建每个块对应的值
      let dataes = new Array(0)
      let main = null
      let child = null
      let cardCode = ''
      if (id !== undefined) {
        AlRegistryService.detail(id).then(res => {
          main = res.data.tr_registry
          child = res.data.tr_registry_sub
          console.log(child)
        })
      }
      if (cardReadServiceid !== '' && cardReadServiceid !== undefined) {
        serviceidRead = cardReadServiceid.split(',')
        message = {
          serviceid: serviceidRead[0],
          blocks: ['24']
        }
        message = JSON.stringify(message)
        setTimeout(function t () {
          window.ws.send(message)
          console.log(message)
        }, 500)
        window.ws.onclose = function () {
          console.log('读卡器硬件服务连接异常！')
        }
      } else {
        window.ws.send(message)// 无配置默认读明华读卡器
        window.ws.onclose = function () {
          console.log('读卡器硬件服务连接异常！')
        }
      }
      window.ws.onmessage = function (evt) {
        if (evt.data) {
          let data = JSON.parse(evt.data)
          if (data.id) {
            cardCode = JSON.parse(evt.data).id
            if (!cardCode) {
              this.$message.success(JSON.parse(evt.data).message)
              return
            }
            if (data.data) {
              let dataT = JSON.parse(evt.data).data
              let CardNo = dataT.CardNo
              console.log(CardNo)
            }
            let k = 0
            if (id !== undefined) {
              obj.supplementCard(cardCode, id)
            } else {
              obj.getReg(cardCode)
            }
            if (cardWriteServiceid !== '' && cardWriteServiceid !== undefined) {
              let serviceidWrite = cardWriteServiceid.split(',')
              // 循环写卡
              setTimeout(function t () {
                if (k < serviceidWrite.length) {
                  if (id !== undefined) {
                    // 开始写入值
                    // 判断发货、收货（是否有过磅记录）
                    let deWeigh02 = child[0].deWeigh02
                    console.log(deWeigh02)
                    if (deWeigh02 === null) {
                      block.push('4')
                      dataes.push('0000000000000002') // 卡型  1
                      block.push('10')
                      dataes.push('0000000000000001') // 派车单类型(0-收货/1-发货/4-调拨)
                      block.push('12')
                      dataes.push(child[0].preQuantity === null ? '0' : child[0].preQuantity) // 预装数
                      block.push('18')
                      dataes.push(child[0].preNums === null ? '0' : child[0].preNums) // 件数
                      block.push('28')
                      dataes.push('1' + obj.strReplace(child[0].preNums) + (child[0].preQuantity) + '0') // 行号+预装件数+预装吨数+装货标志
                      block.push('56')
                      dataes.push('') // 扣罚原因
                      block.push('57')
                      dataes.push('') // 磅前扣水
                      block.push('58')
                      dataes.push('') // 过磅单号
                    } else {
                      block.push('4')
                      dataes.push('0000000000000001') // 卡型  2-采样
                      block.push('10')
                      dataes.push('0000000000000000') // 派车单类型(0-收货/1-发货/4-调拨)
                      block.push('12')
                      dataes.push('0') // 扣杂数
                      block.push('18')
                      dataes.push('0') // 扣水
                      block.push('28')
                      dataes.push('1' + obj.strReplace(child[0].deNums) + obj.strReplace(child[0].deSuttleReal) + '0') // 行号+原发件数+原发吨数+装货标志
                      block.push('56')
                      dataes.push('') // 多品种装货行号
                      block.push('57')
                      dataes.push('') // 多品种装货件数
                    }

                    block.push('5')
                    dataes.push('sdxwwcsv20071210') // 系统标示
                    block.push('6')
                    dataes.push(main.plateNumber === null ? '0' : main.plateNumber) // 车号
                    block.push('8')
                    dataes.push('') // 入场登记单号
                    block.push('9')
                    let invName = child[0].invName
                    if (invName === null) {
                      invName = ''
                    }
                    if (invName.length > 8) {
                      invName = invName.substring(0, 8)
                    }
                    dataes.push(invName) // 品种名称

                    block.push('13')
                    dataes.push('0000000000000000') // 现采标志(0-采样 1-不采)+混样标志(0-单样 1-组样)
                    block.push('14')
                    dataes.push('0000000000000000') // 过磅标志(1 过磅 0-未过磅)+退货标志（1-退货 0 正常）
                    block.push('16')
                    dataes.push('') // 操作员
                    block.push('17')
                    dataes.push('') // 仓库编号

                    block.push('20')
                    dataes.push('') // 客户/供应商前8字
                    block.push('21')
                    dataes.push('') // 客户/供应商后8字
                    block.push('22')
                    dataes.push('') // 规格型号
                    block.push('24')
                    dataes.push('') // 服务器名称
                    block.push('25')
                    dataes.push('') // 车型
                    block.push('29')
                    dataes.push(child[0].invCode === null ? '' : child[0].invCode) // 存货编号
                    block.push('30')
                    dataes.push('') // 备用
                    block.push('48')
                    dataes.push('') // 确认时间
                    block.push('49')
                    dataes.push('') // 确认手持机号
                    block.push('50')
                    dataes.push('') // 数据库名称

                    block.push('60')
                    dataes.push('') // 卡型(1)+派车单类型(1)+派车单号(14)
                    block.push('61')
                    dataes.push('') // 混样标志(1)+退货标志(1)+用户编号(7)+仓库(7)
                    block.push('62')
                    dataes.push('') // 件数(8)+扣重(8)/
                  }
                  message = {// 默认明华
                    // 明华读卡器
                    serviceid: serviceidWrite[k],
                    blocks: block,
                    data: dataes
                  }
                  console.log(message)
                  message = JSON.stringify(message)
                  window.ws.send(message)
                  k = k + 1
                  setTimeout(t(), 500)
                }
              }, 500)
              window.ws.onclose = function () {
                console.log('读卡器硬件服务连接异常！')
              }
            }
            console.log('读卡成功！')
          } else {
            if (data.code === 'SA000001') {
              i = serviceidRead.length
              bol = true
            }
            // 如果读失败，继续循环读
            if (data.code === 'ER000001' && i < serviceidRead.length) {
              console.info(serviceidRead.length)
              message = {
                serviceid: serviceidRead[i],
                blocks: ['24']
              }
              message = JSON.stringify(message)
              setTimeout(function t () {
                window.ws.send(message)
              }, 500)
              window.ws.onclose = function () {
                console.log('读卡器硬件服务连接异常！')
              }
              i = i + 1
            } else if (bol === false) {
              console.log(data.message)
            }
          }
        } else {
          console.log('读卡失败，请确认已连接读卡器！')
        }
      }
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
