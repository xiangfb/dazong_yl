<template>
  <div :style="{height: `${maxHeight}px`}" class="bg-white p-10 mauto" style="width: calc(50% + 30px);min-width: 880px;" v-loading="loading">
    <CustomBtnGroup @on-click="butMonitor" :btn-group="submitBut"></CustomBtnGroup>
    <el-tabs v-model="activeName" tab-position="top">
      <el-tab-pane v-for="(item, index) in tabOptions" :key="index" :name="item.name" :label="item.label">
        <div :style="{'height': `${maxHeight - 120}px`, 'overflow-y': 'auto'}" v-if="item.name === 'as_line' && item.formSubList.length > 0">
          <form-column
            class="p-r-n p-l-n"
            width="100%"
            :isShowBut="false"
            :fieldData="item"
            :ref="item.name"
            :formRef="item.name"
            :modelData="item.modelData"
            @select-change="selectChange">
          </form-column>
        </div>
        <div v-else-if="item.name === 'as_line_inventory'" :style="{'height': `${maxHeight - 120}px`, 'overflow-y': 'auto'}">
          <form-column
            v-if="item.formSubList.length > 0"
            class="p-r-n p-l-n"
            width="100%"
            :isShowBut="false"
            :fieldData="item"
            :ref="item.name"
            :formRef="item.name"
            :modelData="item.modelData"
            @popup-confirm="popupConfirm">
            <div class="m-t-10">
              <el-tag
                v-for="(tag, t) in invTags"
                :key="t"
                size="medium"
                class="m-r-10"
                closable
                :disable-transitions="true"
                @close="handleClose(t)">
                {{tag.invName}}【{{tag.invCode}}】
              </el-tag>
            </div>
          </form-column>
        </div>
        <div v-else-if="item.name === 'as_line_sub'">
          <CustomBtnGroup @on-click="butMonitor" :btn-group="tableBut"></CustomBtnGroup>
          <div :style="{'height': `${maxHeight - 155}px`, 'overflow-y': 'auto'}">
            <custom-edit-table
              border
              class="p-t-10"
              ref="custom"
              :loading="item.formSubList.length <= 0"
              :table-header="item.formSubList"
              :data="item.modelData"
              select
              @selection-change="selectionChange"></custom-edit-table>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LineService from 'service/modules/material/line/line-service'
import { FormColumn } from 'components/base/index'
export default {
  data () {
    return {
      loading: true,
      activeName: '',
      controlpointEnumOptions: [],
      tabOptions: [ // 可切换表单必须
        {
          label: '基础属性',
          name: 'as_line',
          formSubList: [],
          modelData: {}
        },
        {
          label: '对应物料',
          name: 'as_line_inventory',
          formSubList: [],
          modelData: {}
        },
        {
          label: '线路地点',
          name: 'as_line_sub',
          formSubList: [],
          modelData: []
        }
      ],
      enteredData: undefined,
      endData: undefined,
      invTags: [],
      submitBut: [
        {
          permision: '',
          name: 'submit',
          label: '提交',
          type: 'btn'
        },
        {
          permision: '',
          name: 'cancel',
          label: '返回',
          type: 'btn'
        }
      ],
      tableBut: [
        {
          permision: '',
          name: 'addRow',
          label: '增行',
          type: 'btn'
        },
        {
          permision: '',
          name: 'insertRow',
          label: '插行',
          type: 'btn'
        },
        {
          permision: '',
          name: 'deleteRow',
          label: '删除',
          type: 'btn'
        }
      ],
      selectionData: []
    }
  },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  created () {
    this.activeName = this.tabOptions[0].name
    this.getMould()
  },
  methods: {
    getMould () { // 获取当前菜单配置
      LineService.optimusPrime({
        formatType: 'FORM',
        menuId: (this.$route.query && this.$route.query.id) || this.$route.meta.other.id
      }).then(res => {
        if (res.success) {
          res.data.formSubList.forEach((item, index) => {
            this.tabOptions.forEach((data, i) => {
              if (item.customTable === data.name) {
                if (item.customTable === 'as_line_sub' && item.fieldName === 'controlpointEnum') {
                  item.enumOptions = {}
                  item.options.map(option => {
                    item.enumOptions[option.value] = option.label
                    if (option.value === 'ENTERED' || option.value === 'END') {
                      option.disabled = true
                    }
                    return option
                  })
                  this.controlpointEnumOptions = item.options
                }
                this.tabOptions[i]['formSubList'].push(item)
                if (item.customTable !== 'as_line_sub') {
                  this.$set(this.tabOptions[i]['modelData'], item.fieldName, item.defaultValue)
                }
              }
            })
          })
          if (this.$route.query.detailId) {
            this.getInfo(this.$route.query.detailId)
          }
          this.loading = false
        }
      })
    },
    getInfo (id) {
      LineService.detail(id).then(res => {
        if (res.success) {
          this.tabOptions[0].modelData = res.data.entity
          this.invTags = res.data.entityex
          this.tabOptions[2].modelData = res.data.entitysub.filter(item => {
            if (item.controlpointEnum === 'ENTERED') {
              this.enteredData = item
            }
            if (item.controlpointEnum === 'END') {
              this.endData = item
            }
            return item.controlpointEnum !== 'ENTERED' && item.controlpointEnum !== 'END'
          })
          this.tabOptions[2].formSubList = this.tabOptions[2].formSubList.map(item => {
            if (item.fieldName === 'controlpointEnum') {
              if (res.data.entity.typeof === 'SA' || res.data.entity.typeof === 'SB') {
                item.options = [
                  {
                    'label': '发货签到',
                    'value': 'FH_SIGN_IN'
                  },
                  {
                    'label': '发货叫号',
                    'value': 'FH_CALL'
                  },
                  {
                    'label': '发货入厂',
                    'value': 'FH_IN_DOOR'
                  },
                  {
                    'label': '发货过皮重',
                    'value': 'FH_TARE_WEIGH'
                  },
                  {
                    'label': '发货过磅取皮',
                    'value': 'FH_GRANDTR_WEIGH'
                  },
                  {
                    'label': '发货现场确认',
                    'value': 'FH_SCENE_CONFIRM'
                  },
                  {
                    'label': '发货过毛重',
                    'value': 'FH_GROSS_WEIGH'
                  },
                  {
                    'label': '发货净重',
                    'value': 'FH_SUTTLE_CALCULATE'
                  },
                  {
                    'label': '发货出厂',
                    'value': 'FH_OUT_DOOR'
                  }
                ]
              } else if (res.data.entity.typeof === 'PU' || res.data.entity.typeof === 'PB') {
                item.options = [
                  {
                    'label': '收货签到',
                    'value': 'SH_SIGN_IN'
                  },
                  {
                    'label': '收货叫号',
                    'value': 'SH_CALL'
                  },
                  {
                    'label': '收货入厂',
                    'value': 'SH_IN_DOOR'
                  },
                  {
                    'label': '收货过毛重',
                    'value': 'SH_GROSS_WEIGH'
                  },
                  {
                    'label': '收货取皮',
                    'value': 'SH_GRANDTR_WEIGH'
                  },
                  {
                    'label': '收货现场确认',
                    'value': 'SH_SCENE_CONFIRM'
                  },
                  {
                    'label': '收货过皮重',
                    'value': 'SH_TARE_WEIGH'
                  },
                  {
                    'label': '收货净重',
                    'value': 'SH_SUTTLE_CALCULATE'
                  },
                  {
                    'label': '收货出厂',
                    'value': 'SH_OUT_DOOR'
                  }
                ]
              } else {
                item.options = this.controlpointEnumOptions
              }
            }
            return item
          })
        }
      })
    },
    selectChange (val, data) {
      this.tabOptions[2].formSubList = this.tabOptions[2].formSubList.map(item => {
        if (item.fieldName === 'controlpointEnum') {
          if (val.value === 'SA' || val.value === 'SB') {
            item.options = [
              {
                'label': '发货签到',
                'value': 'FH_SIGN_IN'
              },
              {
                'label': '发货叫号',
                'value': 'FH_CALL'
              },
              {
                'label': '发货入厂',
                'value': 'FH_IN_DOOR'
              },
              {
                'label': '发货过皮重',
                'value': 'FH_TARE_WEIGH'
              },
              {
                'label': '发货过磅取皮',
                'value': 'FH_GRANDTR_WEIGH'
              },
              {
                'label': '发货现场确认',
                'value': 'FH_SCENE_CONFIRM'
              },
              {
                'label': '发货过毛重',
                'value': 'FH_GROSS_WEIGH'
              },
              {
                'label': '发货净重',
                'value': 'FH_SUTTLE_CALCULATE'
              },
              {
                'label': '发货出厂',
                'value': 'FH_OUT_DOOR'
              }
            ]
          } else if (val.value === 'PU' || val.value === 'PB') {
            item.options = [
              {
                'label': '收货签到',
                'value': 'SH_SIGN_IN'
              },
              {
                'label': '收货叫号',
                'value': 'SH_CALL'
              },
              {
                'label': '收货入厂',
                'value': 'SH_IN_DOOR'
              },
              {
                'label': '收货过毛重',
                'value': 'SH_GROSS_WEIGH'
              },
              {
                'label': '收货取皮',
                'value': 'SH_GRANDTR_WEIGH'
              },
              {
                'label': '收货现场确认',
                'value': 'SH_SCENE_CONFIRM'
              },
              {
                'label': '收货过皮重',
                'value': 'SH_TARE_WEIGH'
              },
              {
                'label': '收货净重',
                'value': 'SH_SUTTLE_CALCULATE'
              },
              {
                'label': '收货出厂',
                'value': 'SH_OUT_DOOR'
              }
            ]
          } else {
            item.options = this.controlpointEnumOptions
          }
        }
        return item
      })
    },
    popupConfirm (data) {
      let ids = this.invTags.map(item => {
        return item.id
      })
      for (var i = 0; i < data.length; i++) {
        if (ids.indexOf(data[i].id) < 0) {
          this.invTags.push(data[i])
        }
      }
    },
    butMonitor (e) {
      switch (e) {
        case 'submit':
          this.$refs['as_line'][0].$refs['as_line'].validate((valid) => {
            if (valid) {
              if (this.$route.query.detailId) {
                let entitysub = this.$refs.custom[0].tableData
                if (this.enteredData) {
                  entitysub = [this.enteredData, ...entitysub]
                }
                if (this.endData) {
                  entitysub = [...entitysub, this.endData]
                }
                LineService.update({
                  entity: this.$refs['as_line'][0].getData(),
                  entitysub: entitysub,
                  entityex: this.invTags.map(item => {
                    return {
                      invId: item.id
                    }
                  })
                }).then(res => {
                  if (res.success) {
                    this.$message.success('修改成功')
                    this.$router.go(-1)
                  }
                })
              } else {
                LineService.create({
                  entity: this.$refs['as_line'][0].getData(),
                  entitysub: this.$refs.custom[0].tableData,
                  entityex: this.invTags.map(item => {
                    return {
                      invId: item.id
                    }
                  })
                }).then(res => {
                  if (res.success) {
                    this.$message.success('保存成功')
                    this.$router.go(-1)
                  }
                })
              }
            } else {
              this.$message.error('请完善表单！')
            }
          })
          break
        case 'addRow':
          this.$refs.custom[0].insertEvent(null, -1)
          break
        case 'insertRow':
          if (this.selectionData.length < 1) {
            this.$message.error('最少要选择一条数据！')
          } else if (this.selectionData.length > 1) {
            this.$message.error('最多要选择一条数据！')
          } else {
            this.$refs.custom[0].insertEvent(null, this.selectionData[0].rowKey)
          }
          break
        case 'deleteRow':
          let removeRecords = this.$refs.custom[0].$refs.editable.getSelecteds()
          if (removeRecords.length) {
            this.$confirm('确定删除吗?', '温馨提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$refs.custom[0].$refs.editable.removeSelecteds()
            }).catch(e => e)
          } else {
            this.$message({
              type: 'info',
              message: '请至少选择一条数据！'
            })
          }
          break
        case 'cancel':
          this.$router.go(-1)
          break
      }
    },
    selectionChange (data) {
      this.selectionData = data
    },
    handleClose (index) {
      this.invTags.splice(index, 1)
    }
  },
  computed: {},
  watch: {},
  components: {
    FormColumn
    // EditTable
  }
}
</script>

<style lang="scss">
</style>
