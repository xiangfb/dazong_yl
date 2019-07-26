<template>
  <div class="p-b-n float-hidden">
    <div class="f-l-tree bg-white">
      <div v-loading="isLoading" :style="{'height': `${maxHeight - 15}px`, 'overflow-y': 'auto'}">
        <el-tree
          class="p-10"
          ref="treeData"
          show-checkbox
          node-key="ids"
          :default-checked-keys="defaultChecked"
          :props="treeProps"
          :data="treeData"
          @check="handleCheck"/>
      </div>
    </div>
    <div class="f-l-list bg-white">
      <edit-table :butLoading="butLoading" :btnGroup="btnGroup" ref="editTable" autoSort :table-header="formAllout" :loading="isLoading" :table-data="formAlloutData" :max-height="maxHeight + 25" :master-obj="masterObj" @but-receipt="butFun"></edit-table>
    </div>
  </div>
</template>

<script>
import tableHead from '@/const/basic/formatHead'
import CustomType from 'service/source/custom-type'
import EditTable from 'components/custom-components/custom-table/form-format-sub-table.vue'
export default {
  data () {
    return {
      masterObj: [],
      butLoading: true,
      treeProps: {
        children: 'children',
        label: 'fieldExplain'
      },
      subName: '',
      service: '',
      defaultChecked: [], // 默认选中数据
      treeDatas: [], // 过度树数据
      treeData: [], // 右边数数据
      btnGroup: [
        {
          btnType: 'primary',
          permision: '',
          name: 'save',
          label: '保存',
          type: 'btn'
        },
        {
          btnType: 'danger',
          permision: '',
          name: 'default',
          label: '默认',
          type: 'btn'
        },
        {
          btnType: 'info',
          permision: '',
          name: 'cancel',
          label: '返回',
          type: 'btn'
        }
      ], // 按钮列表
      isLoading: true, // 表格loading动画
      formAllout: [],
      formAlloutData: [] // 表格数据
    }
  },
  props: {
    maxHeight: {
      type: Number,
      default: 1067
    }
  },
  created () {
    switch (this.$route.query.type) {
      case 'form':
        this.getValidates()
        this.getAlert()
        this.service = 'formFormat'
        this.subName = 'formSubList'
        break
      case 'list':
        this.service = 'cgListFormatSub'
        this.subName = 'listSubList'
        break
      case 'dialog':
        this.service = 'cgDialogFormatSub'
        this.subName = 'resSubList'
        break
    }
    this.formAllout = tableHead[this.$route.query.type]
  },
  mounted () {
    this.getCustomTables({ id: this.$route.query.id }, 'format')
  },
  methods: {
    // 获取枚举列表
    getAlert () {
      CustomType.select({
      }, 'customEnum').then(res => {
        this.formAllout.map(item => {
          if (item.fieldName === 'cgCustomEnumId') {
            item.options = res.data.map(data => {
              data.label = data.enumDescribe
              data.value = data.id
              return data
            })
          }
        })
      })
    },
    // 获取验证列表
    getValidates () {
      CustomType.select({
      }, 'cgValidate').then(res => {
        this.formAllout.map(item => {
          if (item.fieldName === 'cgValidateId') {
            item.options = res.data.map(data => {
              data.label = data.validateName
              data.value = data.id
              return data
            })
          }
        })
      })
    },
    getCustomTables (param, type) { // 获取表数据
      this.isLoading = true
      this.butLoading = true
      CustomType.getCustomTables(param, type).then(res => {
        if (res.success) {
          this.masterObj = res.data.map(item => {
            return {
              value: item.customTable,
              label: `${item.name}（${item.customTable}）`
            }
          })
          let promises = []
          for (let item of res.data) {
            promises.push(this.getFormSubsByFormatAndTable({ cgFormatId: this.$route.query.id, cgCustomTableId: item.id }, this.service, item))
          }
          Promise.all(promises).then((res) => {
            this.treeData = this.treeDatas
            this.formAlloutData.sort((a, b) => {
              if (a.seq < b.seq) {
                return -1
              }
              if (a.seq > b.seq) {
                return 1
              }
              return 0
            })
            this.isLoading = false
            this.butLoading = false
          }).catch((err) => {
            console.error(err)
          })
        }
      })
    },
    butFun (type) { // 表格按钮触发
      switch (type) {
        case 'save':
          this.butLoading = true
          let tableData = this.$refs.editTable.getData()
          tableData = tableData.map((item, index) => { // 空字符串处理null
            for (let ele in item) {
              if (!item[ele] && item[ele] !== false) {
                item[ele] = null
              }
            }
            item.seq = index
            return item
          })
          CustomType.saveListData({ entity: { [this.subName]: tableData } }, this.service).then(res => {
            if (res.success) {
              this.$notify({
                showClose: true,
                message: '保存成功',
                type: 'success'
              })
              this.$router.go(-1)
            }
            this.butLoading = false
          })
          break
        case 'cancel':
          this.$router.go(-1)
          break
      }
    },
    getFormSubsByFormatAndTable (param, type, data) {
      return new Promise((resolve, reject) => {
        CustomType.getFormSubsByFormatAndTable(param, type).then(res => {
          if (res.success) {
            this.treeDatas.push({
              data,
              ids: data.name,
              value: data.customTable,
              label: `${data.name}（${data.customTable}）`,
              fieldExplain: data.name,
              children: res.data.map(item => {
                if (item.cgCustomEnum) {
                  item.cgCustomEnumId = item.cgCustomEnum.id
                }
                if (item.ishow) {
                  this.defaultChecked.push(data.name + item.id)
                  this.formAlloutData.push(item)
                }
                if (item.cgCustomTableSub) {
                  item.fieldDbName = item.cgCustomTableSub.fieldDbName
                  item.fieldName = item.cgCustomTableSub.fieldName
                }
                item.ids = data.name + item.id
                item.value = item.fieldName
                item.label = `${item.fieldExplain}（${item.fieldName}）`
                item.tableName = data.name
                item.tableCode = data.customTable
                return item
              })
            })
            resolve(res)
          } else {
            reject(res.message)
          }
        })
      })
    },
    handleCheck () { // 获取已选节点
      this.formAlloutData = this.$refs.treeData.getCheckedNodes(true).map(item => {
        item.ishow = true
        return item
      }).sort((a, b) => {
        if (a.seq < b.seq) {
          return -1
        }
        if (a.seq > b.seq) {
          return 1
        }
        return 0
      })
    }
  },
  computed: {},
  watch: {},
  components: { EditTable }
}
</script>
