<template> <!-- 主子表 代表 -->
  <div :style="{height: `${maxHeight}px`}" v-loading="loading">
    <component
    :is="currentView"
    :tips="tips"
    ref="componentRef"
    :max-height="maxHeight"
    :fieldData="fieldData"
    :modelData="modelData"
    :btnGroup="btnGroup"
    isCopy
    @submit="submitForm"
    @reset="resetForm"
    @but-monitor="butMonitor">
    </component>
  </div>
</template>

<script>
import Vue from 'vue'
import { FormColumn, MasterChildForm, TabForm, EditTable, TreeForm } from 'components/base/index'
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import SaRegistryService from 'service/modules/sale/sa_registry/sa-registry-service'
import dateUtil from '@/util/date.js'
export default {
  name: 'dynamic',
  data () {
    return {
      tips: '',
      loading: true,
      formatStyle: 'loading', // 模板类型
      mould: {
        '404': Vue.extend(NonExistent), // 404页面
        'FORMAT_FOUR_COLUMN_FROM': Vue.extend(FormColumn), // 四列表单
        'FORMAT_EIGHT_COLUMN_FROM': Vue.extend(FormColumn), // 八列表单
        'FORMAT_MASTER_CHILD_FROM': Vue.extend(MasterChildForm), // 主子表-表单
        'FORMAT_TAB_FROM': Vue.extend(TabForm), // 选项卡切换表单
        'FORMAT_EDIT_FROM': Vue.extend(EditTable), // 可编辑TABLE表单
        'FORMAT_TREE_FROM': Vue.extend(TreeForm) // 树形+表单
      },
      fieldData: {},
      modelData: {}
      // btnGroup: [
      //   {
      //     icon: 'el-icon-circle-check-outline',
      //     btnType: 'primary',
      //     permision: '',
      //     name: 'save',
      //     label: '保存',
      //     type: 'btn'
      //   },
      //   {
      //     icon: 'el-icon-circle-close-outline',
      //     btnType: 'primary',
      //     permision: '',
      //     name: 'cancel',
      //     label: '取消',
      //     type: 'btn'
      //   },
      //   {
      //     icon: 'el-icon-circle-close-outline',
      //     btnType: 'primary',
      //     permision: '',
      //     name: 'read_card',
      //     label: '读卡',
      //     type: 'btn'
      //   }
      // ]
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
        formatType: 'FORM',
        menuId: (this.$route.query && this.$route.query.id) || this.$route.meta.other.id
      }).then(res => {
        if (res.success) {
          this.formatStyle = res.data.formatStyle
          res.data.formSubList.forEach((item, index) => { // 处理表单默认值（通用）
            this.modelData[item.fieldName] = item.defaultValue
          })
          if (this.$route.query.currentId) {
            this.getInfo(this.$route.query.currentId)
          }
          this.fieldData = res.data
          this.fieldData.opations = { // 需要注明哪个是主表，哪个是子表（主子表需要）
            main: 'tr_registry',
            son: 'tr_registry_sub'
          }
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
    butMonitor (type) {
      console.log(type)
      if (type === 'read_card') {
        let code = this.$refs.componentRef
        this.readCard(code)
        return
      }
      this.$router.go(-1)
    },
    getInfo (id) {
      SaRegistryService.detail(id).then(res => {
        if (res.success) {
          this.modelData = res.data
        }
      })
    },
    submitForm (state, modelData, child) {
      console.log(this.$refs.componentRef.$refs.custom.$refs.editable.getAllRecords())
      if (state) { // 提交成功.
        switch (this.$route.query.type) {
          case 'create':
            SaRegistryService.save({
              entity: modelData,
              entitysub: child
            }).then(res => {
              if (res.success) {
                this.$message.success('保存成功')
                this.$router.go(-1)
              }
              console.log(res)
            })
            break
          case 'update':
            // this.readCard(0)
            SaRegistryService.update({
              entity: modelData,
              entitysub: child
            }).then(res => {
              console.log(res)
              if (res.success) {
                this.$message.success('修改成功')
                this.$router.go(-1)
              }
            })
            break
          case 'safeUpdate':
            this.checkPostDate(state, modelData, child)
            break
        }
      } else {
        this.$message.error('请完善表单！')
      }
    },
    resetForm (modelData) {
      console.log(modelData)
    },
    // 新增读卡，支持读身份证号、身份证ID号、IC卡号
    readCard (code) {
      console.log(code.$refs.custom.$refs.editable.getAllRecords())
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
      // let writecard = {// 默认写明华
      //   serviceid: 'minghua_m1_write',
      //   blocks: ['24'], // 24块 目前是为了给硬件区别一下 该调什么接口
      //   data: [config.card.card_write.data ? config.card.card_write.data : '0']
      // }
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
          console.log(data)
          if (data.id) {
            cardCode = JSON.parse(evt.data).id
            if (!cardCode) {
              this.$message.success(JSON.parse(evt.data).message)
              return
            }
            if (data.data) {
              let dataT = JSON.parse(evt.data).data
              let CardNo = dataT.CardNo
              code.$refs.formColumn.setData('idNumber', CardNo, true)
            }
            code.$refs.formColumn.setData('cardCode', cardCode, true)
            if (cardWriteServiceid !== '' && cardWriteServiceid !== undefined) {
              let serviceidWrite = cardWriteServiceid.split(',')
              // 循环写卡
              let k = 0
              // 创建块
              let block = new Array(0)
              // 创建每个块对应的值
              let dataes = new Array(0)
              console.log(dataes)
              setTimeout(function t () {
                if (k < serviceidWrite.length) {
                  // 开始写入值
                  block.push('4')
                  dataes.push('0000000000000001') // 卡型   1-排队()
                  block.push('5')
                  dataes.push('sdxwwcsv20071210') // 系统标示
                  block.push('6')
                  dataes.push('晋A98198') // 车号
                  block.push('8')
                  dataes.push('011404080001') // 入场登记单号
                  block.push('9')
                  dataes.push('原煤') // 品种名称
                  block.push('10')
                  dataes.push('0000000000000000') // 派车单类型(0-收货/1-发货/4-调拨)
                  block.push('12')
                  dataes.push('53') // 扣杂数
                  block.push('13')
                  dataes.push('0000000000000001') // 现采标志(0-采样 1-不采)+混样标志(0-单样 1-组样)
                  block.push('14')
                  dataes.push('1000000000000001') // 过磅标志(1 过磅 0-未过磅)+退货标志（1-退货 0 正常）
                  block.push('16')
                  dataes.push('000001') // 操作员
                  block.push('17')
                  dataes.push('0101') // 仓库编号
                  block.push('18')
                  dataes.push('45') // 扣水
                  block.push('20')
                  dataes.push('山西山大新网科技') // 供应商前8字
                  block.push('21')
                  dataes.push('有限公司') // 供应商后8字
                  block.push('22')
                  dataes.push('灰分《20%') // 规格型号
                  block.push('24')
                  dataes.push('192.168.0.1') // 服务器名称
                  block.push('25')
                  dataes.push('6轴') // 车型
                  block.push('28')
                  dataes.push('1000003000000000') // 行号+预装件数+预装吨数+装货标志
                  block.push('29')
                  dataes.push('') // 存货编号
                  block.push('30')
                  dataes.push('') // 备用
                  block.push('48')
                  dataes.push('48.56') // 确认时间
                  block.push('49')
                  dataes.push('20140408171400') // 确认手持机号
                  block.push('50')
                  dataes.push('bfgl_001_2012') // 数据库名称
                  block.push('56')
                  dataes.push('') // 扣罚原因
                  block.push('57')
                  dataes.push('') // 磅前扣水
                  block.push('58')
                  dataes.push('') // 过磅单号
                  block.push('60')
                  dataes.push('10011404080001') // 卡型(1)+派车单类型(1)+派车单号(14)
                  block.push('61')
                  dataes.push('10000001 0101') // 混样标志(1)+退货标志(1)+用户编号(7)+仓库(7)
                  block.push('62')
                  dataes.push('00001.0200000.76') // 扣水(8)+扣杂(8)
                  message = {// 默认明华
                    // 明华读卡器
                    serviceid: serviceidWrite[k],
                    blocks: block,
                    data: dataes
                  }
                  message = JSON.stringify(message)
                  console.log(message)
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
    },
    // 高级修改保存
    safeUpdate (state, modelData, child) {
      SaRegistryService.noSafeUpdate({
        entity: modelData,
        entitysub: child
      }).then(res => {
        if (res.success) {
          this.$message.success('修改成功')
          this.$router.go(-1)
        }
      })
    },
    // 验证过账日期并且修改
    checkPostDate (state, modelData, child) {
      if (modelData.iuploadPosting && modelData.iuploadPosting === 1) {
        let todayVar = dateUtil.getDay()
        this.$prompt('请输入过账日期', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          inputValue: todayVar,
          // inputType: 'date',
          inputPattern: /^[1-2]{1}[0-9]{3}[0-1][0-9]{1}[0-3]{1}[0-9]{1}$/,
          inputErrorMessage: '日期格式不正确'
        }).then(({ value }) => {
          modelData.postDate = value
          console.log(modelData.postDate)
          this.safeUpdate(state, modelData, child)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '过账日期必须输入'
          })
        })
      } else {
        this.safeUpdate(state, modelData, child)
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
    FormColumn,
    MasterChildForm,
    TabForm,
    EditTable,
    TreeForm
  }
}
</script>
