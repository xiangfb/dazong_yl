<template>
  <div class="p-b-n float-hidden">
    <div class="f-l-tree bg-white">
      <div v-loading="isLoading" :style="{'height': `${maxHeight - 15}px`, 'overflow-y': 'auto'}">
        <el-tree
          class="p-10"
          ref="treeData"
          show-checkbox
          node-key="id"
          :default-checked-keys="defaultChecked"
          :props="treeProps"
          :data="treeData"
          @check="handleCheck"/>
      </div>
    </div>
    <div class="f-l-list bg-white">
      <edit-table :butLoading="butLoading" :btnGroup="btnGroup" ref="editTable" autoSort :table-header="formAllout" :loading="isLoading" :table-data="formAlloutData" :max-height="maxHeight + 25" @but-receipt="butFun"></edit-table>
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
      butLoading: true,
      defaultChecked: [], // 默认选中数据
      treeProps: {
        children: 'children',
        label: 'fieldExplain'
      },
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

  },
  mounted () {
    this.formAllout = tableHead[this.$route.query.type]
    this.getCustomTables()
  },
  methods: {
    getCustomTables () { // 获取表数据
      this.isLoading = true
      this.butLoading = true
      CustomType.factor({
        cgFormatId: this.$route.query.id
      }).then(res => {
        if (res.success) {
          this.treeData = res.data
          this.formAlloutData = res.data.filter(item => {
            if (item.ishow) {
              this.defaultChecked.push(item.id)
            }
            if (item.cgCustomTableSub) {
              item.fieldDbName = item.cgCustomTableSub.fieldDbName
              item.fieldName = item.cgCustomTableSub.fieldName
              item.customTable = item.cgCustomTableSub.masterTable
            }
            return item.ishow
          })
          this.isLoading = false
          this.butLoading = false
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
          CustomType.addFactor({
            entity: {
              paramSubList: tableData
            }
          }).then(res => {
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

<style scoped>

</style>
