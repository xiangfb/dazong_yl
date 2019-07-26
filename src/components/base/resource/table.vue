<template>
  <div class="bg-white p-10">
    <table-search
      v-if="searchList.length > 0"
      :fieldData="searchList"
      :modelData="searchListData"
      @submit="submit"
      @reset="reset"></table-search>
    <custom-edit-table
        class="m-b-10"
        ref="custom"
        :loading="isLoading"
        :table-header="tableHeader"
        :data="data"
        border
        select
        @sort-change="sortChange"
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
</template>

<script>
import Ajax from '_router/ajax'
import Config from 'config'
import XEUtils from 'xe-utils'
import TableSearch from './search.vue'
import CustomType from 'service/source/custom-type'
export default {
  data () {
    return {
      selectionList: {},
      paramSearch: [],
      manualSearch: [],
      searchList: [],
      searchListData: {},
      isLoading: true,
      tableHeader: [],
      data: [],
      sort: null,
      pn: 1,
      ps: 10,
      pageSizes: [10, 20, 40, 80, 100],
      total: 0
    }
  },
  props: {
    fieldData: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    },
    modelData: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    },
    options: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    },
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  watch: {
    fieldData: {
      handler: 'getFieldData',
      deep: true, // 深度监听
      immediate: true // 首次进入也监听
    },
    modelData: {
      handler: 'getModelData',
      deep: true,
      immediate: true
    },
    options: {
      handler: 'getOptions',
      deep: true,
      immediate: true
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    sortChange (key, dir) {
      this.loading = true
      if (key) {
        this.sort = [{
          key: key,
          dir: dir
        }]
      } else {
        this.sort = []
      }
      this.getData()
    },
    handleSelectionChange (data) {
      this.$set(this.selectionList, this.pn, data)
    },
    getSelectionList () { // 获取跨页已选
      let selectionList = []
      for (let item in this.selectionList) {
        selectionList = selectionList.concat(this.selectionList[item])
      }
      return selectionList
    },
    submit (valid, data) {
      if (valid) {
        this.pn = 1
        this.manualSearch = []
        this.searchList.forEach(item => {
          if (data[item.fieldName]) {
            this.manualSearch.push({
              key: item.fieldName,
              op: item.op || 'like',
              val: data[item.fieldName]
            })
          }
        })
        this.getData()
      }
    },
    reset (data) {
      this.pn = 1
      this.manualSearch = []
      this.searchList.forEach(item => {
        if (data[item.fieldName]) {
          this.manualSearch.push({
            key: item.fieldName,
            op: item.op || 'like',
            val: data[item.fieldName]
          })
        }
      })
      this.getData()
    },
    handleSizeChange (ps) {
      this.ps = ps
      this.getData()
    },
    handleCurrentChange (pn) {
      this.pn = pn
      this.getData()
    },
    getData () {
      if (this.fieldData.resUrl) {
        this.isLoading = true
        let params = {
          search: this.paramSearch.concat(this.manualSearch),
          'limit': { 'pn': this.pn, 'ps': this.ps }
        }
        if (this.sort) {
          params['sort'] = this.sort
        }
        Ajax[this.fieldData.resMethod.toLowerCase()]({
          url: Config.service.api + this.fieldData.resUrl,
          data: params
        }).then(res => {
          if (res.success) {
            this.data = res.data.list
            console.log(this.data)
            this.total = res.data.total
            this.isLoading = false
          }
        })
      }
    },
    getSearchList (id) {
      CustomType.searchList(id).then(res => {
        if (res.success) {
          this.searchList = res.data.paramList.map(item => {
            this.searchListData[item.fieldName] = item.defaultValue
            return item
          })
        }
      })
    },
    getFieldData (val) {
      let fieldData = JSON.parse(JSON.stringify(val))
      let promises = [
        new Promise((resolve, reject) => {
          CustomType.searchList(fieldData.id).then(res => {
            if (res.success) {
              this.searchList = res.data.paramList.map(item => {
                if (item.defaultValue) {
                  this.searchListData[item.fieldName] = item.defaultValue
                }
                return item
              })
              resolve(res)
            } else {
              reject(res.message)
            }
          })
        }),
        new Promise((resolve, reject) => {
          CustomType.param({
            resFormatSubId: fieldData.detail_id
          }).then(res => {
            if (res.success) {
              this.paramSearch = []
              res.data.forEach(item => {
                if (fieldData.mapData[item.fieldSub1.masterTable]) {
                  if (XEUtils.isArray(fieldData.mapData[item.fieldSub1.masterTable]) && fieldData.mapData[item.fieldSub1.masterTable][0][item.fieldSub1.fieldName]) { // 是否为数组
                    this.paramSearch.push({
                      key: item.fieldSub2.fieldName,
                      op: 'eq',
                      val: fieldData.mapData[item.fieldSub1.masterTable][0][item.fieldSub1.fieldName]
                    })
                  } else if (XEUtils.isPlainObject(fieldData.mapData[item.fieldSub1.masterTable]) && fieldData.mapData[item.fieldSub1.masterTable][item.fieldSub1.fieldName]) { // 是否为对象
                    this.paramSearch.push({
                      key: item.fieldSub2.fieldName,
                      op: 'eq',
                      val: fieldData.mapData[item.fieldSub1.masterTable][item.fieldSub1.fieldName]
                    })
                  }
                } else if (fieldData.mapData[item.fieldSub1.fieldName]) {
                  this.paramSearch.push({
                    key: item.fieldSub2.fieldName,
                    op: 'eq',
                    val: fieldData.mapData[item.fieldSub1.fieldName]
                  })
                }
              })
              resolve(res)
            } else {
              reject(res.message)
            }
          })
        })
      ]
      Promise.all(promises).then((res) => {
        let searchList = this.searchList.map(item => {
          return item.fieldName
        })
        let paramSearch = JSON.parse(JSON.stringify(this.paramSearch))
        paramSearch.forEach((item, index) => {
          if (searchList.indexOf(item.key) > -1 && !this.searchList[searchList.indexOf(item.key)].ihidden) {
            this.$set(this.searchListData, this.searchList[searchList.indexOf(item.key)].fieldName, item.val)
            this.paramSearch.splice(index, 1)
          }
        })
        this.manualSearch = []
        this.searchList.forEach(item => {
          if (this.searchListData[item.fieldName]) {
            this.manualSearch.push({
              key: item.fieldName,
              op: item.op || 'like',
              val: this.searchListData[item.fieldName]
            })
          }
          // if (item.idefinedSort) {
          //   this.sort.push({
          //     key: item.fieldName,
          //     dir: 'desc'
          //   })
          // }
        })
        this.getData()
      }).catch((err) => {
        console.error(err)
      })
      if (fieldData.resSubList) {
        this.tableHeader = fieldData.resSubList.map(item => {
          if (item.fieldType === 'ENUM') {
            item.enumOptions = {}
            item.options.forEach(data => {
              item.enumOptions[data.value] = data.label
            })
          }
          return item
        })
      }
    },
    getModelData (val) {
      this.data = JSON.parse(JSON.stringify(val)).map(item => {
        if (this.selectionList[this.pn]) {
          this.selectionList[this.pn].forEach(d => {
            if (d.id === item.id) {
              item._checked = true
            }
          })
        }
        return item
      })
    },
    getOptions (val) {
      let options = JSON.parse(JSON.stringify(val))
      this.pn = options.pn || 1
      this.ps = options.ps || 10
      this.pageSizes = options.pageSizes || [10, 20, 40, 80, 100]
    }
  },
  computed: {},
  components: { TableSearch }
}
</script>

<style scoped>

</style>
