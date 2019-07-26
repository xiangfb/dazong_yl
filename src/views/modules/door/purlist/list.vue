<template> <!-- 常规列表 代表 -->
  <div :style="{height: `${maxHeight}px`}" v-loading="loading">
    <component
      :is="currentView"
      :tips="tips"
      ref='com'
      :max-height="maxHeight"
      :btnGroup="btnGroup"
      :fieldData="fieldData"
      :modelData="modelData"
      :options="options"
      @search="search"
      @sort-change="sortChange"
      @submit="submitForm"
      @but-receipt="butEvent"
      @reset="resetForm"
      @size-change="sizeChange"
      @current-change="currentChange"></component>
    <popup-list width="70%" :visibleSync="visibleSync" title="选择叫号规则"> <!-- 按钮点击触发的弹窗需要 -->
      <el-form :inline="true" :model="searchs" class="p-10 p-b-n popup_list_box">
      </el-form>
      <div class="p-10">
        <custom-edit-table
                class="m-b-10"
                ref="custom"
                :loading="isLoading"
                :table-header="tableHeader"
                :data="tableData"
                border
                select
                @selection-change="handleSelectionChange"
                :max-height="350"></custom-edit-table>
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pn"
                :page-sizes="pageSizes"
                :page-size="ps"
                class="align-right p-n"
                layout="total, sizes, prev, pager, next"
                :total="total">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleSync = false">取 消</el-button>
        <el-button @click="popupConfirm" type="primary">确 定</el-button>
      </span>
    </popup-list>
  </div>
</template>

<script>
import Vue from 'vue'
import { RoutineList, TreeTable, PopupList } from 'components/base/index' // getMaterialList
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import PurlistService from 'service/modules/door/purlist/purlist-service'
import GlobalService from 'service/modules/popup/global-service'
export default {
  // name: 'dynamic',
  data () {
    return {
      tips: '',
      loading: true,
      formatStyle: 'loading', // 模板类型
      isLoading: true,
      mould: {
        '404': Vue.extend(NonExistent), // 404页面
        'FORMAT_LIST_BASE': Vue.extend(RoutineList), // 常规列表
        'FORMAT_TREE_LIST': Vue.extend(TreeTable) // 树形+列表
      },
      fieldData: {},
      modelData: [],
      idefinedSort: [], // 列表默认排序
      searchAdvanced: null, // 高级查询需要
      searchTerm: null, // 快捷查询需要
      options: {
        pageSizes: [10, 20, 40, 80, 100],
        pn: 1,
        ps: 10,
        total: 0
      },
      visibleSync: false,
      butResource: {},
      registryid: null,
      searchs: {},
      btnGroup: [],
      tableHeader: [],
      tableData: [],
      selectionList: {},
      pn: 1,
      ps: 10,
      pageSizes: [10, 20, 40, 80, 100],
      total: 0
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
    this.getMaterialList()
  },
  methods: {
    popupConfirm () { // 弹窗资源点击确定触发  data为已选跨页数据
      console.log(this.$refs.column)
      console.log(this.uuID)
      this.visibleSync = false
      let getList = this.$refs.custom.$refs.editable.getSelecteds()
      if (getList.length > 1) {
        this.$message.error('只能选择一条信息')
        return
      }
      let disid = getList[0].id
      PurlistService.getOneUpdate({
        disid: disid,
        id: this.registryid
      }).then(res => {
        if (res.data.status === '0') {
          this.$message.error('当前单据不支持要车')
        }
        if (res.data.status === '1') {
          this.$message.success('直接要号成功')
        }
      })
    },
    sortChange (key, dir) {
      this.loading = true
      if (key) {
        this.idefinedSort = [{
          key: key,
          dir: dir
        }]
      } else {
        this.idefinedSort = []
      }
      this.getMaterialList()
    },
    search (searchList, type) { // 快捷/高级查询需要
      if (type === 'advanced') { // 高级查询
        this.searchAdvanced = searchList
      }
      if (type === 'quick') { // 快捷查询
        this.searchTerm = searchList
      }
      this.getMaterialList()
    },
    getMould () { // 获取当前菜单配置
      OptimusPrimeService.optimusPrime({
        formatType: 'LIST',
        menuId: this.$route.meta.other.id
      }).then(res => {
        if (res.success) {
          this.formatStyle = res.data.formatStyle
          this.fieldData = res.data
          this.btnGroup = res.data.menuList.map(item => {
            this.butResource[item.buttonCode] = item
            item.btnType = 'primary'
            item.permision = ''
            item.name = item.buttonCode
            item.label = item.title
            item.type = 'btn'
            return item
          })
          res.data.listSubList.forEach(item => {
            if (item.idefinedSort) { // 列表默认排序
              this.idefinedSort.push({
                key: item.fieldName,
                dir: 'desc'
              })
            }
          })
          this.getMaterialList()
        } else {
          this.tips = res.msg
          this.formatStyle = ''
          this.loading = false
        }
      })
    },
    getMaterialList () {
      let params = {
        limit: {
          ps: this.options.ps,
          pn: this.options.pn
        },
        sort: this.idefinedSort,
        search: [] // 快捷查询需要
      }
      if (this.searchAdvanced) { // 高级查询
        params.search = params.search.concat(this.searchAdvanced)
      }
      if (this.searchTerm) { // 快捷查询需要
        params.search[params.search.length] = this.searchTerm
      }
      PurlistService.list(params).then(res => {
        if (res.success) {
          this.options.total = res.data.total
          this.modelData = res.data.list
          this.$nextTick(() => {
            this.loading = false
          })
        }
      })
    },
    butEvent (e) {
      let getList = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()
      switch (e) {
        case 'update':
          console.log(this.butResource[e])
          if (getList.length > 1) {
            this.$message.error('只能选择一条信息')
            return
          }
          if (getList.length < 1) {
            this.$message.error('请选择一条要叫号的信息')
            return
          }
          PurlistService.update(this.$refs.com.$refs.custom.$refs.editable.getSelecteds()[0].id).then(res => {
            // 处理匹配情况
            console.log(res)
            if (res.data.status === '0') {
              this.$message.error('当前单据不支持要车')
              return
            }
            if (res.data.status === '3') {
              this.$message.error('没有可使用的叫号规则')
              return
            }
            if (res.data.status === '1') {
              this.$message.success('要号成功')
            }
            if (res.data.status === '2') {
              this.registryid = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()[0].id
              let list = res.data.values
              this.visibleSync = true
              GlobalService.optimusPrimePopup('409').then(res => {
                if (res.success) {
                  console.log(res.data)
                  this.tableHeader = res.data.resSubList.map(item => {
                    // if (item.fieldType === 'ENUM') {
                    //   item.enumOptions = {}
                    //   item.options.forEach(data => {
                    //     item.enumOptions[data.value] = data.label
                    //   })
                    // }
                    return item
                  })
                  this.tableData = list
                  this.isLoading = false
                }
              })
            }
            // this.getMaterialList()
          })
          break
      }
    },
    sizeChange (ps) {
      this.options.pn = 1
      this.options.ps = ps
      this.getMaterialList()
    },
    currentChange (pn) {
      this.options.pn = pn
      this.getMaterialList()
    },
    handleSelectionChange (data) {
      this.$set(this.selectionList, this.pn, data)
    },
    handleSizeChange (ps) {
      this.ps = ps
      this.getPoundList()
    },
    handleCurrentChange (pn) {
      this.pn = pn
      this.getPoundList()
    },
    submitForm (state, modelData) {
      if (state) { // 提交成功
        this.$message({
          message: '提交成功！',
          type: 'success'
        })
      } else {
        this.$message.error('请完善表单！')
      }
      console.log(modelData)
    },
    resetForm (modelData) {
      console.log(modelData)
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
    RoutineList,
    TreeTable,
    PopupList
  }
}

</script>
