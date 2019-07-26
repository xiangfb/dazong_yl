<template>
  <div>
    <CustomBtnGroup v-if="btnGroup.length > 0" class="p-10 bg-white" @on-click="butMonitor" :limit="limit" :butLoading="butLoading" :btn-group="btnGroup"></CustomBtnGroup>
    <div :style="{'max-height': `${maxHeight - 70}px`, 'overflow-y': 'auto'}" class="p-b-n m-b-10">
      <form-column
        class="p-b-n p-t-10"
        ref="formColumn"
        formRef="formRef"
        :fieldData="puNotice"
        :modelData="puNoticeData"
        :columnNum="8"
        :isShowBut="false"
        :publicData="publicData"
        @popup-confirm="((data, fatherData, index, resourceList) => {popupConfirm(data, fatherData, index, resourceList, 'main')})"
        @update-data="((data) => {updateData(data, fieldData.opations.main)})"></form-column>
      <div class="bg-white">
        <CustomBtnGroup class="p-10 p-b-n" @on-click="butMonitor" :limit="limit" :btn-group="tableBut"></CustomBtnGroup>
        <custom-edit-table
          class="p-10"
          ref="custom"
          :loading="isLoading"
          :table-header="puNoticeSub"
          :data="puNoticeSubData"
          :publicData="publicData"
          @popup-confirm="((data, fatherData, index, resourceList) => {popupConfirm(data, fatherData, index, resourceList, 'son')})"
          @update-data="((data) => {updateData(data, fieldData.opations.son)})"
          border
          select></custom-edit-table>
      </div>
    </div>
  </div>
</template>

<script>
import FormColumn from './column.vue'
export default {
  name: 'master-child-form',
  data () {
    return {
      isLoading: true,
      puNotice: {},
      puNoticeSub: [],
      puNoticeData: {},
      puNoticeSubData: [],
      publicData: {},
      tableBut: [
        this.sonDefaultButs && {
          icon: 'el-icon-circle-plus-outline',
          btnType: 'primary',
          permision: '',
          name: 'add',
          label: '新增',
          type: 'btn'
        },
        this.sonDefaultButs && {
          icon: 'el-icon-remove-outline',
          btnType: 'primary',
          permision: '',
          name: 'delete',
          label: '删除',
          type: 'btn'
        },
        this.isCopy && {
          icon: 'el-icon-document-copy',
          btnType: 'primary',
          permision: '',
          name: 'copy',
          label: '复制',
          type: 'btn'
        },
        ...this.tableButs
      ]
    }
  },
  props: {
    isManyCopy: {
      type: Boolean,
      default: false
    },
    isCopy: {
      type: Boolean,
      default: false
    },
    sonDefaultButs: {
      type: Boolean,
      default: true
    },
    tableButs: {
      type: Array,
      default: () => {
        return []
      }
    },
    limit: {
      type: Number,
      default: 5
    },
    butLoading: {
      type: Boolean,
      default: false
    },
    btnGroup: { // 按钮组
      type: Array,
      default () {
        return [
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
        ]
      }
    },
    maxHeight: {
      type: [String, Number],
      default: 1067
    },
    fieldData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    modelData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {

  },
  mounted () {

  },
  watch: {
    fieldData: {
      handler: 'getPuNoticeData',
      deep: true, // 深度监听
      immediate: true // 首次进入也监听
    },
    modelData: {
      handler: 'getModelData',
      deep: true, // 深度监听
      immediate: true // 首次进入也监听
    }
  },
  methods: {
    popupConfirm (data, fatherData, index, resourceList, surface) {
      if (surface === 'son') {
        resourceList.forEach(item => {
          if (item.fieldSub1.masterTable === this.fieldData.opations.main) {
            this.$refs.formColumn.setData(item.fieldSub1.fieldName, data[0][item.fieldSub2.fieldName], true)
          }
        })
      }
      this.$emit('popup-confirm', data, fatherData, index, resourceList)
    },
    setData (key, val) {
      this.$set(this.modelData[this.fieldData.opations.main], key, val)
    },
    // this.$refs.custom.$refs.editable.getRecords() // 获取表格数据，也可以指定索引获取某条数据
    butMonitor (type) { // 按钮组触发
      switch (type) {
        case 'save':
          this.$refs.formColumn.$refs.formRef.validate((valid) => {
            this.$refs.custom.$refs.editable.validate(tableValid => { // 可编辑表单验证
              let tableData = this.$refs.custom.$refs.editable.getRecords()
              tableData = tableData.map(item => {
                this.puNoticeSub.forEach(header => {
                  if (item[header.fieldName] === '' || item[header.fieldName] === undefined || item[header.fieldName] === null) {
                    item[header.fieldName] = null
                  }
                })
                return item
              })
              if (valid && tableValid) {
                this.$emit('submit', true, this.$refs.formColumn.getData(), tableData)
              } else {
                this.$emit('submit', false, this.$refs.formColumn.getData(), tableData)
              }
            })
          })
          break
        case 'add':
          this.$refs.custom.insertEvent()
          break
        case 'copy':
          if (this.$refs.custom.$refs.editable.getSelecteds().length) {
            if (this.isManyCopy) {
              this.$refs.custom.$refs.editable.getSelecteds().forEach(item => {
                this.$refs.custom.insertEvent(item, -1)
              })
            } else {
              if (this.$refs.custom.$refs.editable.getSelecteds().length > 1) {
                this.$message({
                  type: 'error',
                  message: '最多选择一条数据！'
                })
              } else {
                this.$refs.custom.insertEvent(this.$refs.custom.$refs.editable.getSelecteds()[0], -1)
              }
            }
          } else {
            this.$message({
              type: 'error',
              message: '请至少选择一条数据！'
            })
          }
          break
        case 'delete':
          if (this.$refs.custom.$refs.editable.getSelecteds().length) {
            this.$confirm('确定删除吗?', '温馨提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$refs.custom.$refs.editable.removeSelecteds()
            }).catch(e => e)
          } else {
            this.$message({
              type: 'error',
              message: '请至少选择一条数据！'
            })
          }
          break
        default:
          this.$emit('but-monitor', type)
          break
      }
    },
    butFun (e) {
      this.$emit('table-but-receipt', e)
    },
    getPuNoticeData (val) {
      let puNotice = JSON.parse(JSON.stringify(val))
      if (puNotice.formSubList) {
        let puNoticeSub = puNotice.formSubList
        puNotice.formSubList = puNotice.formSubList.filter(item => {
          if (item.calculate && item.customTable === puNotice.opations.main) {
            item.calculate = JSON.parse(item.calculate)
          }
          return item.customTable === puNotice.opations.main
        })
        this.puNotice = puNotice
        puNoticeSub = puNoticeSub.filter(item => {
          if (item.calculate && item.customTable === puNotice.opations.son) {
            item.calculate = JSON.parse(item.calculate)
          }
          return item.customTable === puNotice.opations.son
        })
        this.puNoticeSub = puNoticeSub
        this.isLoading = false
      }
    },
    getModelData (val) {
      let modelData = JSON.parse(JSON.stringify(val))
      if (modelData && this.fieldData.opations && modelData[this.fieldData.opations.main]) {
        this.puNoticeData = modelData[this.fieldData.opations.main]
        this.puNoticeSubData = modelData[this.fieldData.opations.son]
      }
    },
    updateData (data, type) {
      this.$set(this.publicData, type, data)
    }
  },
  computed: {},
  components: {
    FormColumn
  }
}
</script>

<style scoped>

</style>
