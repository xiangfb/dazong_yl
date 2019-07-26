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
    :tableBut="tableBut"
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
      modelData: {},
      btnGroup: [
        {
          icon: 'el-icon-circle-check-outline',
          btnType: 'primary',
          permision: '',
          name: 'readCard',
          label: '读卡',
          type: 'btn'
        },
        {
          icon: 'el-icon-circle-close-outline',
          btnType: 'primary',
          permision: '',
          name: 'pass',
          label: '通过',
          type: 'btn'
        },
        {
          icon: 'el-icon-circle-close-outline',
          btnType: 'primary',
          permision: '',
          name: 'noPass',
          label: '不通过',
          type: 'btn'
        },
        {
          icon: 'el-icon-circle-check-outline',
          btnType: 'primary',
          permision: '',
          name: 'print',
          label: '打印过磅单',
          type: 'btn'
        },
        {
          icon: 'el-icon-circle-close-outline',
          btnType: 'primary',
          permision: '',
          name: 'bprint',
          label: '补打',
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
      ],
      tableBut: []
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
          // if (this.$route.query.currentId) {
          //   this.getInfo(this.$route.query.currentId)
          // }
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
      if (type === 'readCard') {
        // let code = this.$refs.componentRef.$refs.formColumn
        this.readCard(this)
        return
      }
      if (type === 'pass') {
        let id = this.modelData.id
        console.log(id)
        SaRegistryService.checkCard({
          id: id,
          check: true
        }).then(res => {
          if (res.success) {
            this.$message.success(res.data)
          }
        })
      }
      if (type === 'noPass') {
        let id = this.modelData.id
        console.log(id)
        SaRegistryService.checkCard({
          id: id,
          check: false
        }).then(res => {
          if (res.success) {
            this.$message.success(res.data)
          }
        })
      }
      this.$router.go(-1)
    },
    getInfo (code) {
      SaRegistryService.readCard({
        cardCode: code
      }).then(res => {
        if (res.success) {
          this.modelData = res.data
          let obj = this.$refs.componentRef.$refs.formColumn
          for (let key in res.data) {
            obj.setData(key, res.data[key], true)
          }
          let cobj = this.$refs.componentRef.$refs.custom
          console.log(cobj)
          console.log(res.data)
          // 子表信息未加载，需要补充子表信息
        }
      })
    },
    submitForm (state, modelData, child) {
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
        }
      } else {
        this.$message.error('请完善表单！')
      }
    },
    resetForm (modelData) {
      console.log(modelData)
    },
    // 新增读卡，支持读身份证号、身份证ID号、IC卡号
    readCard (obj) {
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
            console.log(cardCode)
            obj.getInfo(cardCode)
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
    FormColumn,
    MasterChildForm,
    TabForm,
    EditTable,
    TreeForm
  }
}
</script>
