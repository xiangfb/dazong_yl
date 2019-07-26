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
import MmAlWeighService from 'service/modules/measure/mm_al_weigh/mm-al-weigh-service'

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
  watch: {
    $route () {
      console.log()
      if (this.modelData) {
        this.getMaterialList()
      }
    }
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
      MmAlWeighService.list(params).then(res => {
        if (res.success) {
          this.options.total = res.data.total
          this.modelData = res.data.list
          this.$nextTick(() => {
            this.loading = false
          })
        }
      })
    },
    // 读卡查询磅单
    getReg (code) {
      let params = {
        limit: {
          ps: this.options.ps,
          pn: this.options.pn
        },
        sort: this.idefinedSort,
        search: [{ key: 'cardCode', op: 'like', val: code }] // 快捷查询需要
      }
      MmAlWeighService.list(params).then(res => {
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
          MmAlWeighService.delete({
            ids: result
          }).then(res => {
            this.$message.success('删除成功')
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
        case 'read':
          this.readCard(this)
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
        case 'synchronization':
          MmAlWeighService.syn({
            update_date: '2018-06-01 00:00:00'
          }).then(res => {
            if (res.success) {
              this.$message.success(res.msg)
              this.getMaterialList()
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
        case 'down':
          if (getList.length < 1) {
            this.$message.error('请选择要冲减的数据')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能冲减一条数据')
            return
          }
          MmAlWeighService.down(getList[0].id).then(res => {
            if (res.success) {
              this.$message.success(res.msg)
            }
          })
          break
        case 'reversedown':
          if (getList.length < 1) {
            this.$message.error('请选择要反冲减的数据')
            return
          }
          if (getList.length > 1) {
            this.$message.error('只能反冲减一条数据')
            return
          }
          MmAlWeighService.reversedown(getList[0].id).then(res => {
            if (res.success) {
              this.$message.success(res.msg)
            }
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
      let cardCode = ''
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
            // code.setData('cardCode', cardCode, true)
            console.log(id)
            if (id !== undefined) {
              obj.supplementCard(cardCode, id)
            } else {
              obj.getReg(cardCode)
            }
            if (cardWriteServiceid !== '' && cardWriteServiceid !== undefined) {
              let serviceidWrite = cardWriteServiceid.split(',')
              // 循环写卡
              let k = 0
              setTimeout(function t () {
                if (k < serviceidWrite.length) {
                  message = {// 默认明华
                    // 明华读卡器
                    serviceid: serviceidWrite[k],
                    blocks: ['24']
                  }
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
    TreeTable
  }
}

</script>
