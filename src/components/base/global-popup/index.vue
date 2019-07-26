<template>
  <div class="resource_box" @click.stop.prevent>
    <el-dialog :visible.sync="visibleSync" :width="formatStyle === 'FORMAT_RESOURCE_TREE' ? '35%' : '75%'">
      <div slot="title">
        {{fieldData.formatName || '加载中'}}
      </div>
      <div class="resource_dialog_content" v-loading="loading">
        <component
          ref="popupRef"
          :is="currentView"
          :defaultProps="defaultProps"
          :fieldData="fieldData"
          :modelData="modelData"
          :options="options"></component>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button :loading="butLoading" type="primary" @click.prevent="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { ResourceTable, ResourceTree, ResourceTreeTable } from 'components/base/index'
import GlobalService from 'service/modules/popup/global-service'
import CustomType from 'service/source/custom-type'
export default {
  name: 'dynamic',
  data () {
    return {
      loading: true,
      butLoading: true,
      visibleSync: false,
      fatherData: {}, // 父数据
      index: null, // 父下标
      defaultProps: {
        searchKey: '',
        label: ''
      },
      resourceList: [], // 出参
      fieldData: {},
      modelData: [],
      options: {},
      formatStyle: 'loading', // 模板类型
      mould: {
        'FORMAT_RESOURCE_QUERY_DATALIST': Vue.extend(ResourceTable), // 弹窗选择（查询+数据列表）
        'FORMAT_RESOURCE_TREE': Vue.extend(ResourceTree), // 弹窗选择（树形）
        'FORMAT_RESOURCE_TREE_QUERY_DATALIST': Vue.extend(ResourceTreeTable) // 弹窗选择（树形+查询+数据列表）
      }
    }
  },
  props: {
    dataDetail: {
      type: Object,
      default () {
        return {
          mapData: null,
          data: null,
          index: null
        }
      }
    }
  },
  watch: {
    visibleSync (val) {
      this.$emit('visibleSync')
      this.butLoading = true
      this.formatStyle = 'loading'
      this.loading = true
      this.fatherData = {}
      this.fieldData = {}
      this.modelData = []
      this.options = {}
      this.index = null
    },
    dataDetail: {
      handler: 'getDataDetail',
      deep: true, // 深度监听
      immediate: true // 首次进入也监听
    }
  },
  methods: {
    getDataDetail (val) {
      if (!val.data) {
        return false
      }
      if (val.data && val.data.cgFormatResId) {
        this.visibleSync = true
        // 模板请求
        GlobalService.optimusPrimePopup(val.data.cgFormatResId).then(res => {
          if (res.success) {
            this.fatherData = val.data
            this.index = val.index
            this.fieldData = res.data
            this.fieldData.detail_id = val.data.id
            this.fieldData.mapData = val.mapData
            this.defaultProps = {
              searchKey: res.data.valueResourceSubName,
              label: res.data.viewResourceSubName
            }
            this.formatStyle = res.data.formatStyle
            this.loading = false
            this.butLoading = false
          } else {
            this.visibleSync = false
          }
        })
        this.getParamResource(val.data.id)
      } else {
        this.$notify.error({
          title: '温馨提示',
          message: '暂无配置的弹窗资源模板，请配置！'
        })
      }
    },
    getParamResource (id) { // 请求出传参 TODO: 传参search
      CustomType.resource({ // 请求出参
        resFormatSubId: id
      }).then(res => {
        if (res.success) {
          this.resourceList = res.data
        }
      })
    },
    cancel () {
      this.visibleSync = false
    },
    confirm () {
      let selectedsData = this.$refs.popupRef.getSelectionList()
      if (selectedsData.length < 1) {
        this.$message.error('最少要选择一条数据！')
      } else {
        this.$emit('confirm', selectedsData, this.fatherData, this.index, this.resourceList)
        this.cancel()
      }
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
    ResourceTable,
    ResourceTree,
    ResourceTreeTable
  }
}

</script>

<style lang="scss">
  .resource_box{
    .el-dialog__header, .el-dialog__footer{
      padding: 20px 10px !important;
    }
    .el-dialog__body{
      padding: 5px !important;
    }
    .el-dialog__body{
      background: #f5f5f5;
    }
    .resource_dialog_content{
      min-height: 60px;
    }
  }
</style>
