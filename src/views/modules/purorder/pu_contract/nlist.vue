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
      @submit="submitForm"
      @but-receipt="butEvent"
      @reset="resetForm"
      @size-change="sizeChange"
      @current-change="currentChange"></component>
      <common-popup
      :dataDetail="dataDetail"
      @visibleSync="cancel"
      @confirm="confirm"></common-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { CommonPopup, RoutineList, TreeTable, PopupList } from 'components/base/index' // getMaterialList
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import PuContractService from 'service/modules/purorder/pu_contract/pu-contract-service'
export default {
  name: 'dynamic',
  data () {
    return {
      tips: '',
      loading: true,
      formatStyle: 'loading', // 模板类型
      mould: {
        '404': Vue.extend(NonExistent), // 404页面
        'FORMAT_LIST_BASE': Vue.extend(RoutineList), // 常规列表
        'FORMAT_TREE_LIST': Vue.extend(TreeTable) // 树形+列表
      },
      fieldData: {},
      modelData: [],
      searchAdvanced: null, // 高级查询需要
      searchTerm: null, // 快捷查询需要
      options: {
        pageSizes: [10, 20, 40, 80, 100],
        pn: 1,
        ps: 10,
        total: 0
      },
      butResource: {},
      btnGroup: [],
      mapData: {},
      dataDetail: {
        mapData: null,
        data: null,
        index: null
      },
      contractId: null, // 由上一页面传入的合同ID
      contractCode: null // 由上一页面传入的合同编号
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
    cancel () {
      this.dataDetail = {
        mapData: null,
        data: null,
        index: null
      }
    },
    confirm (selectedsData, fatherData, index, resourceList) {
      this.cancel()
      let conractNotices = []
      selectedsData.map(item => {
        let conractNotice = {}
        conractNotice.noticeId = item.pkNoticeOrder
        conractNotice.noticeSubId = item.id
        conractNotice.noticeCode = item.notoCode
        conractNotice.contractId = this.contractId
        conractNotice.contractCode = this.contractCode
        conractNotices.push(conractNotice)
      })
      console.log(conractNotices)
      PuContractService.insert({
        'entity': conractNotices
      }).then(res => {
        console.log(res.data)
        this.getMaterialList()
      })
    },
    setData (key, val) {
      if (this.mapData[key] !== undefined) {
        this.$set(this.mapData, key, val)
      }
    },
    inputTap (data, index) {
      this.dataDetail = {
        mapData: this.mapData,
        data: data,
        index: index
      }
    },
    cancelPopup () {
      this.visibleSync = false
      // this.$bus.$emit('tags/del', this.$route.path)
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
        menuId: (this.$route.query && this.$route.query.id) || this.$route.meta.other.id
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
    getMaterialList () {
      let params = {
        limit: {
          ps: this.options.ps,
          pn: this.options.pn
        },
        search: [] // 快捷查询需要
      }
      if (this.searchAdvanced) { // 高级查询
        params.search = params.search.concat(this.searchAdvanced)
      }
      if (this.searchTerm) { // 快捷查询需要
        params.search[params.search.length] = this.searchTerm
      }
      this.contractId = this.contractId || this.$route.query.contractId // 将页面传入的ID付给页面定义的变量，供之后使用
      this.contractCode = this.contractCode || this.$route.query.contractCode // 将页面传入的ID付给页面定义的变量，供之后使用
      console.log(this.contractId)
      params.search.push({ key: 'contractId', op: 'eq', val: this.contractId })
      params.search.push({ key: 'contractCode', op: 'eq', val: this.contractCode })
      console.log(params.search)
      PuContractService.plist(params).then(res => {
        if (res.success) {
          this.options.total = res.data.total
          this.modelData = res.data.list
        }
      })
    },
    butEvent (e) {
      let result = []
      let getList = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()
      switch (e) {
        case 'delete':
          if (getList.length < 1) {
            this.$message.error('请选择要删除的数据')
            return
          }
          this.$refs.com.$refs.custom.$refs.editable.getSelecteds().map(item => {
            result.push(item.id)
          })
          PuContractService.pdelList({
            ids: result
          }).then(res => {
            if (res.success) {
              this.$message.success('删除成功')
              this.getMaterialList()
            } else {
              this.$message.error(res.msg)
            }
          })
          break
        case 'create':
          console.log(this.butResource[e].id)
          console.log('create')
          let data = {
            cgFormatResId: 270
          }
          this.inputTap(data, null)
          break
        case 'back':
          this.$router.replace('/modules/purorder/pu_contract/list')
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
    PopupList,
    CommonPopup
  }
}

</script>
