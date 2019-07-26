<template>
  <div class="table">
    <basic-container>
       <CustomBtnGroup @on-click="compile1" :limit="5" :btnGroup="btnGroup1" class="m-b-10"></CustomBtnGroup>
      <CustomTable :rules="rules" id="multipleTable" ref="multipleTable" tooltipEffect="dark" :showSelection="true" @selection-change="handleSelectionChange" :tableHeader="tableHeader" :data="tableData"></CustomTable>
    </basic-container>
  </div>
</template>

<script>
// import subJson from 'service/sub1.js'
// import subJson1 from 'service/sub2.js'
export default {
  name: 'add-table',
  data () {
    return {
      tableData: [],
      tableHeader: [],
      item: {},
      rules: {},
      selection: [],
      list: [],
      btnGroup1: [
        {
          btnType: '',
          permision: 'sys_menu_add',
          name: 'add',
          label: '增行',
          type: 'btn'
        },
        {
          btnType: '',
          permision: 'sys_menu_edit',
          name: 'delete',
          label: '删除',
          type: 'btn'
        }
      ]
    }
  },
  watch: {
    type: function (n) {
      // if (n) {
      //   this.list = subJson.body.list
      // } else {
      //   this.list = subJson1.body.list
      // }
      this.list.map(v => {
        if (v.formSubmitType === 'MULTIPLE_SELECTION') {
          v.defaultValue = []
        } else {
          v.defaultValue = 0
        }
        v.fieldExplain = v.fieldExplain ? v.fieldExplain.substr(0, 5) : '默认项'
        this.$set(this.item, v.cgCustomTableSub.fieldName, v.defaultValue)
      })
      this.list.sort((a, b) => {
        return b.seq - a.seq
      })
    }
  },
  props: ['type'],
  methods: {
    compile1 (e) {
      switch (e) {
        case 'add':
          this.add()
          break
        case 'delete':
          this.remove()
          break
      }
      this.$message.info(e)
    },
    add () {
      let obj = {}
      for (let i in this.item) {
        obj[i] = this.item[i]
      }
      this.tableData.push(obj)
    },
    remove () {
      this.tableData.pop()
    },
    handleSelectionChange (e) {
      console.log(e)
    }
  },
  created () {
    this.list.map(v => {
      if (v.formSubmitType === 'MULTIPLE_SELECTION') {
        v.defaultValue = []
      } else {
        v.defaultValue = 0
      }
      v.fieldExplain = v.fieldExplain ? v.fieldExplain.substr(0, 5) : '默认项'
      this.tableHeader.push({
        fieldName: v.cgCustomTableSub.fieldName,
        fieldExplain: v.fieldExplain,
        edit: true
      })
      this.$set(this.item, v.cgCustomTableSub.fieldName, v.defaultValue)
    })
    for (let i in this.item) {
      this.rules[i] = [
        { required: true, message: '字段为必填字段', trigger: 'blur' }
      ]
    }
    this.list.sort((a, b) => {
      return b.seq - a.seq
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
