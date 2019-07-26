<template>
  <div :style="{height: `${maxHeight}px`}" class="bg-white p-10 mauto" style="width: calc(50% + 30px);min-width: 880px;" v-loading="loading">
    <CustomBtnGroup @on-click="butMonitor" :btn-group="submitBut"></CustomBtnGroup>
    <el-tabs v-model="activeName" tab-position="top">
      <el-tab-pane v-for="(item, index) in tabOptions" :key="index" :name="item.name" :label="item.label">
        <div :style="{'height': `${maxHeight - 120}px`, 'overflow-y': 'auto'}" v-if="item.name === 'as_dischargeaddress' && item.formSubList.length > 0">
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
        <div v-else-if="item.name === 'as_dischargeaddress_queue'" :style="{'height': `${maxHeight - 120}px`, 'overflow-y': 'auto'}">
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
                【{{tag.sort}}】{{tag.title}}【{{tag.code}}】
              </el-tag>
            </div>
          </form-column>
        </div>
        <div v-else-if="item.name === 'as_dischargeaddress_time'">
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
import DischargeaddressService from 'service/modules/door/dischargeaddress/dischargeaddress-service'
import { FormColumn } from 'components/base/index'
import OptimusPrimeService from 'service/optimus-prime-service'
export default {
  data () {
    return {
      loading: true,
      activeName: '',
      tabOptions: [ // 可切换表单必须
        {
          label: '基础属性',
          name: 'as_dischargeaddress',
          formSubList: [],
          modelData: {}
        },
        {
          label: '排队规则',
          name: 'as_dischargeaddress_queue',
          formSubList: [],
          modelData: {}
        },
        {
          label: '排队时间',
          name: 'as_dischargeaddress_time',
          formSubList: [],
          modelData: []
        }
      ],
      enteredData: undefined,
      endData: undefined,
      invTags: [],
      invTagids: [],
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
      OptimusPrimeService.optimusPrime({
        formatType: 'FORM',
        menuId: (this.$route.query && this.$route.query.id) || this.$route.meta.other.id
      }).then(res => {
        if (res.success) {
          res.data.formSubList.forEach((item, index) => {
            this.tabOptions.forEach((data, i) => {
              if (item.customTable === data.name) {
                this.tabOptions[i]['formSubList'].push(item)
                this.$set(this.tabOptions[i]['modelData'], item.fieldName, item.defaultValue)
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
      DischargeaddressService.detail(id).then(res => {
        if (res.success) {
          this.tabOptions[0].modelData = res.data.entity
          this.invTags = res.data.entityex
          res.data.entityex.map(item => {
            this.invTagids.push(item)
          })
          this.tabOptions[2].formSubList = this.tabOptions[2].formSubList.map(item => {
            return item
          })
          this.tabOptions[2].modelData = res.data.entitysub
        }
      })
    },
    selectChange (val, data) {
      this.tabOptions[2].formSubList = this.tabOptions[2].formSubList.map(item => {
        return item
      })
    },
    popupConfirm (data) {
      let ids = this.invTagids.map(item => {
        return item.pkQueue
      })
      for (var i = 0; i < data.length; i++) {
        if (ids.indexOf(data[i].id) < 0) {
          this.invTags.push(data[i])
          let inv = { pkQueue: data[i].id }
          this.invTagids.push(inv)
        }
      }
    },
    butMonitor (e) {
      switch (e) {
        case 'submit':
          this.$refs['as_dischargeaddress'][0].$refs['as_dischargeaddress'].validate((valid) => {
            if (valid) {
              if (this.$route.query.detailId) {
                let entitysub = this.$refs.custom[0].tableData
                if (this.enteredData) {
                  entitysub = [this.enteredData, ...entitysub]
                }
                if (this.endData) {
                  entitysub = [...entitysub, this.endData]
                }
                DischargeaddressService.update({
                  entity: this.$refs['as_dischargeaddress'][0].getData(),
                  entitysub: entitysub,
                  entityex: this.invTagids
                }).then(res => {
                  if (res.success) {
                    this.$message.success('修改成功')
                    this.$router.go(-1)
                  }
                })
              } else {
                DischargeaddressService.create({
                  entity: this.$refs['as_dischargeaddress'][0].getData(),
                  entitysub: this.$refs.custom[0].tableData,
                  entityex: this.invTags.map(item => {
                    return {
                      pkQueue: item.id
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
      this.invTagids.splice(index, 1)
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
