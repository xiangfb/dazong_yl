<template>
  <div>
    <edit-table :btnGroup="btnGroup" ref="editTable" :table-header="tableHeader" :loading="isLoading" :table-data="tableData" :max-height="maxHeight" @but-receipt="butFun"></edit-table>
  </div>
</template>

<script>
import { EditTable } from 'components/base/index'
export default {
  data () {
    return {
      isLoading: true,
      btnGroup: [
        {
          icon: 'el-icon-plus',
          btnType: 'primary',
          permision: '',
          name: 'add',
          label: '新增',
          type: 'btn'
        },
        {
          icon: 'el-icon-delete',
          btnType: 'primary',
          permision: '',
          name: 'save',
          label: '保存',
          type: 'btn'
        }
      ],
      tableHeader: [],
      tableData: []
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
    this.tableHeader = require('assets/test-json/table_inv.json').body.list
    setTimeout(() => {
      this.tableData = require('assets/test-json/table_inv_data.json')
      this.$nextTick(() => {
        this.isLoading = false
      })
    }, 500)
  },
  methods: {
    butFun (type) {
      switch (type) {
        case 'add':
          this.$refs.editTable.$refs.custom.insertEvent()
          break
        case 'save':
          console.log(this.$refs.editTable.$refs.custom.$refs.editable.getAllRecords())
          break
      }
    }
  },
  computed: {},
  watch: {},
  components: {
    EditTable
  }
}
</script>

<style scoped>

</style>
