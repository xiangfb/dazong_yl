<template>
  <div :style="{height: `${maxHeight}px`}" class="bg-white" v-loading="loading">
    <form-column
      v-if="!loading"
      ref="column"
      :columnNum="8"
      :btnGroup="btnGroup"
      :butLoading="butLoading"
      :fieldData="fieldData"
      :modelData="modelData['assaySub']"
      :isShowBut="false"
      @but-receipt="butReceipt">
    </form-column>
    <div class="p-10">
      <custom-edit-table
          class="m-b-10"
          :loading="loading"
          :table-header="assayWeighSubs"
          :data="modelData['weightSubList']"
          border></custom-edit-table>
    </div>
       <common-popup
      :dataDetail="dataDetail"
      @visibleSync="visibleSync"
      @confirm="confirm"></common-popup>
  </div>
</template>

<script>
import { FormColumn, CommonPopup } from 'components/base/index'
import AssayType from 'service/modules/quality/assay-type'
import CustomType from 'service/source/custom-type'
import AssayService from 'service/modules/quality/assay/assay-service'
export default {
  data () {
    return {
      loading: true,
      butLoading: true,
      isLoading: true,
      btnGroup: [
        {
          icon: 'icon-add',
          permision: '',
          name: 'save',
          label: '保存',
          type: 'btn'
        },
        {
          icon: 'icon-search2',
          permision: '',
          name: 'poundList',
          label: '选择磅单',
          type: 'btn'
        },
        {
          icon: 'el-icon-arrow-left',
          permision: '',
          name: 'cancel',
          label: '取消',
          type: 'btn'
        }
      ],
      fieldData: {},
      assayWeighSubs: [],
      modelData: {
        'assaySub': {},
        'weightSubList': []
      },
      tableHeader: [],
      tableData: [],
      selectionList: {},
      pn: 1,
      ps: 10,
      pageSizes: [10, 20, 40, 80, 100],
      total: 0,
      cgFormatResId: -1, // 弹窗模板id
      mapData: {},
      dataDetail: {
        mapData: null,
        data: null,
        index: null
      }
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
    this.getResAssayFormatId()
  },
  mounted () {

  },
  methods: {
    butReceipt (e) {
      switch (e) {
        case 'poundList':
          this.getWeigh()
          break
        case 'cancel':
          this.$router.go(-1)
          break
        case 'save':
          this.saveGroupAssay()
          break
      }
    },
    saveGroupAssay () { // 保存组样单
      if (this.modelData['weightSubList'] && this.modelData['weightSubList'].length > 0) {
        let entity = this.$refs.column.getData()
        let ids = []
        entity['flag'] = this.$route.query.flag
        this.modelData['weightSubList'].forEach((item, index) => {
          if (item.id) {
            ids.push(item.id)
          }
        })
        entity['weighSubIdList'] = ids
        entity['entryFormat'] = this.$route.query.formatId
        AssayService.saveGroupAssay({
          entity: entity
        }).then(res => {
          if (res.success) {
            this.$message.success('保存成功')
            this.$router.go(-1)
          }
        })
      } else {
        this.$message.error('请选择过磅单！')
      }
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
    cancel () {
      this.dataDetail = {
        mapData: null,
        data: null,
        index: null
      }
    },
    visibleSync () {
      this.cancel()// 关闭弹窗
    },
    confirm (selectedsData, fatherData, index, resourceList) {
      this.modelData['weightSubList'] = selectedsData
      this.cancel()// 关闭弹窗
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
    ckeckList (list) { // 检查选择的过磅单数据（同物料、同供应商）

    },
    getResAssayFormatId () { // 获取弹窗模板id
      let flag = this.$route.query.flag
      let code = 'assay_pu_weigh'
      if (flag === 'PURCHASE_ASSAY_FORMATE') { // 采购
        code = 'assay_pu_weigh'
      }
      if (flag === 'SALE_ASSAY_FORMATE') { // 销售
        code = 'assay_sa_weigh'
      }
      if (flag === 'ALLOCATION_ASSAY_FORMATE') { // 调拨
        code = 'assay_al_weigh'
      }
      CustomType.getFormatByCode({ code: code }, 'format').then(res => {
        if (res.success) {
          if (res.data) {
            this.cgFormatResId = res.data.id
          }
        }
      })
    },
    getWeigh () { // 选择过磅单
      let data = {// 调起弹窗
        cgFormatResId: this.cgFormatResId
      }
      this.inputTap(data, null)
    },
    getAssayWeighHead (code) { // 获取过磅单的header
      CustomType.getSubsByCode(code).then(res => {
        if (res.success) {
          this.assayWeighSubs = res.data.listSubList
        }
      })
    },
    getMould () { // 获取当前菜单配置
      AssayType.getAssayFormatSub({
        formatType: 'FORM',
        formatStyle: 'FORMAT_FOUR_COLUMN_FROM',
        menuId: this.$route.query.id,
        formatId: this.$route.query.formatId
      }, 'assayformat').then(res => {
        if (res.success) {
          this.fieldData = JSON.parse(JSON.stringify(res.data))
          this.getAssayWeighHead('assay_weigh')// 获取过磅单的header
          res.data.formSubList.forEach((item, index) => { // 处理表单默认值（通用）
            if (item.defaultValue) {
              this.$set(this.modelData[item.customTable], item.fieldName, item.defaultValue)
            }
          })
          this.$nextTick(() => {
            this.loading = false
          })
        } else {
          this.loading = false
        }
      })
    }
  },
  computed: {},
  watch: {},
  components: {
    FormColumn,
    CommonPopup
  }
}
</script>

<style lang="scss">
  .popup_list_box{
    .el-form-item.el-form-item--small{
      margin-bottom: 10px !important;
    }
  }
</style>
