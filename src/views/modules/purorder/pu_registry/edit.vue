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
    @submit="submitForm"
    @reset="resetForm"
    @but-monitor="butMonitor"
    @popup-confirm="popupConfirm">
    </component>
  </div>
</template>

<script>
import Vue from 'vue'
import { FormColumn, MasterChildForm, TabForm, EditTable, TreeForm, PopupList } from 'components/base/index'
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import PuRegistryService from 'service/modules/purorder/pu_registry/pu-registry-service'
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
      btnGroup: [
        {
          icon: 'el-icon-circle-check-outline',
          btnType: 'primary',
          permision: '',
          name: 'save',
          label: '保存',
          type: 'btn'
        },
        {
          icon: 'el-icon-circle-close-outline',
          btnType: 'primary',
          permision: '',
          name: 'cancel',
          label: '取消',
          type: 'btn'
        }
        // {
        //   icon: 'el-icon-circle-close-outline',
        //   btnType: 'primary',
        //   permision: '',
        //   name: 'billCode',
        //   label: '对方交货单号',
        //   type: 'btn'
        // }
      ],
      fieldData: {},
      modelData: { // 默認主子表必須為空對象/空數組
        'tr_registry': {},
        'tr_registry_sub': []
      }
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
    // popupConfirm () { // 弹窗资源点击确定触发  data为已选跨页数
    //   this.visibleSync = false
    //   let getList = this.$refs.com.$refs.editable.getSelecteds()
    //   console.log(getList)
    //   console.log(this.$refs.componentRef.$refs.formColumn.$refs.formRef.model.billFromCode)
    //   this.$refs.componentRef.$refs.formColumn.$refs.formRef.model.billFromCode = getList[0].billcode
    //   this.$refs.componentRef.$refs.custom.$refs.editable.clear()
    //   getList.forEach((item) => {
    //     this.$refs.componentRef.$refs.custom.insertEvent(item)
    //   })
    // },
    popupConfirm (data, fatherData, index) { // 弹窗资源点击确定触发  data为已选跨页数据
      console.log(fatherData)
      if (fatherData.fieldDbName === 'bill_from_code') {
        this.$refs.componentRef.$refs.custom.$refs.editable.clear()
        console.log('ok')
        data.forEach((item) => {
          this.$refs.componentRef.$refs.custom.insertEvent(item)
        })
      }
    },
    getMould () { // 获取当前菜单配置
      OptimusPrimeService.optimusPrime({
        formatType: 'FORM',
        menuId: (this.$route.query && this.$route.query.id) || this.$route.meta.other.id
      }).then(res => {
        if (res.success) {
          this.formatStyle = res.data.formatStyle
          this.fieldData = res.data
          this.fieldData.opations = { // 需要注明哪个是主表，哪个是子表（主子表需要）
            main: 'tr_registry',
            son: 'tr_registry_sub'
          }
          res.data.formSubList.forEach((item, index) => { // 处理表单默认值（通用） 先处理默认值再请求数据
            if (item.customTable === this.fieldData.opations.main) {
              if (item.fieldType === 'BOOLEAN') {
                this.modelData[item.customTable][item.fieldName] = item.defaultValue === 'true'
              } else {
                this.modelData[item.customTable][item.fieldName] = item.defaultValue
              }
            }
          })
          if (this.$route.query.currentId) {
            this.getInfo(this.$route.query.currentId)
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
        let code = this.$refs.componentRef.$refs.formColumn
        this.readCard(code)
        return
      }
      if (type === 'cancel') {
        this.$router.go(-1)
      }
    },
    getInfo (id) {
      PuRegistryService.detail(id).then(res => {
        if (res.success) {
          this.modelData = res.data
        }
      })
    },
    submitForm (state, modelData, child) {
      if (state) { // 提交成功.
        switch (this.$route.query.type) {
          case 'create':
            for (var i = 0; i < child.length; i++) {
              if (child[i]['deSuttleReal'] <= 0) {
                console.log(child[i])
                this.$message.error('请确认原发数量，必需大于零！')
                return
              }
            }
            PuRegistryService.save({
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
            PuRegistryService.update({
              entity: modelData,
              entitysub: child
            }).then(res => {
              if (res.success) {
                this.$message.success('修改成功')
                this.$router.go(-1)
              }
              console.log(res)
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
    readCard (code) {
      // $('#' + id).click(function () {
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
          if (data.id) {
            cardCode = JSON.parse(evt.data).id
            if (!cardCode) {
              this.$message.success(JSON.parse(evt.data).message)
              return
            }
            if (data.data) {
              let dataT = JSON.parse(evt.data).data
              let CardNo = dataT.CardNo
              // $('input[name=idNumber]').val(CardNo)
              console.log(CardNo)
            }
            // $('input[name=cardCode]').val(cardCode)
            code.setData('cardCode', cardCode, true)
            // console.log(modelData)
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
                    // data: [config.card.card_write.data ? config.card.card_write.data : '0']
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
    },
    resetForm (modelData) {
      console.log(modelData)
    },
    // 高级修改保存
    safeUpdate (state, modelData, child) {
      PuRegistryService.noSafeUpdate({
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
    TreeForm,
    PopupList
  }
}

</script>
