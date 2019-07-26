<template>
  <el-row :gutter="5">
    <el-col :span="6">
      <div :style="{'max-height': `363px`, 'overflow-y': 'auto'}">
        <el-tree
          :data="treeData"
          ref="elTree"
          class="p-10"
          highlight-current
          node-key="id"
          @node-click="nodeClick">
          <div slot-scope="data">
            {{setDefaultProps(data)}}
          </div>
        </el-tree>
      </div>
    </el-col>
    <el-col :span="18">
      <div class="bg-white p-10">
        <table-search
          v-if="searchList.length > 0"
          :fieldData="searchList"
          :modelData="searchListData"
          @submit="submit"
          @reset="reset"></table-search>
        <custom-edit-table
          class="m-b-15"
          ref="custom"
          :loading="isLoading"
          :table-header="tableHeader"
          @sort-change="sortChange"
          :data="data"
          border
          select
          @selection-change="handleSelectionChange"
          :max-height="250"></custom-edit-table>
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
    </el-col>
  </el-row>
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
      cgFormatParamId: null,
      paramSearch: [],
      manualSearch: [],
      searchKey: undefined,
      searchList: [],
      searchListData: {},
      isLoading: true,
      searchVal: '',
      treeData: [],
      tableHeader: [],
      sort: null,
      data: [],
      pn: 1,
      ps: 10,
      pageSizes: [10, 20, 40, 80, 100],
      total: 0,
      searchId: null
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
    defaultProps: { // 配置选项
      type: Object,
      default () {
        return {
          searchKey: '',
          label: ''
        }
      }
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
    setDefaultProps (data) {
      let ary = this.defaultProps.label.split(',')
      let str = ''
      for (let item in data.data) {
        if (ary.indexOf(item) > -1) {
          str += data.data[item] + ' '
        }
      }
      return str
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
    nodeClick (data, node, event) { // 点击节点触发
      this.searchVal = data.jsonObject[this.defaultProps.searchKey]
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
          'limit': { 'pn': this.pn, 'ps': this.ps }
        }
        let searchList = {}
        this.searchList.forEach(item => {
          searchList[item.id] = item.fieldName
        })
        if (searchList[this.cgFormatParamId] && this.searchVal) {
          params.search = [
            { key: searchList[this.cgFormatParamId], op: 'eq', val: this.searchVal }
          ].concat(this.paramSearch, this.manualSearch)
        } else if (this.searchId) {
          params.search = [{ key: 'defdocClassId', op: 'eq', val: this.searchId }]
          console.log(params)
        } else {
          params.search = this.paramSearch.concat(this.manualSearch)
        }
        if (this.sort) {
          params['sort'] = this.sort
        }
        console.log(params)
        Ajax[this.fieldData.resMethod.toLowerCase()]({
          url: Config.service.api + this.fieldData.resUrl,
          data: params
        }).then(res => {
          if (res.success) {
            this.data = res.data.list
            this.total = res.data.total
            this.isLoading = false
          }
        })
      }
    },
    getFieldData (val) {
      let fieldData = JSON.parse(JSON.stringify(val))
      if (fieldData.treeResUrl) {
        let promises = [
          new Promise((resolve, reject) => {
            CustomType.searchList(fieldData.id).then(res => {
              if (res.success) {
                this.cgFormatParamId = res.data.cgFormatParamId
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
            Ajax[fieldData.treeResMethod.toLowerCase()]({
              url: Config.service.api + fieldData.treeResUrl
            }).then(res => {
              let loopData = []
              if (Array.prototype.isPrototypeOf(res)) { // 从原型入手判断是否数组
                loopData = res
              } else {
                if (res.success) {
                  loopData = res.data
                } else {
                  return false
                }
              }
              this.treeData = this.mapLoop(loopData)
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
          console.log(this.manualSearch)
          console.log(this.treeData)
          this.searchId = this.treeData[0].id
          this.getData()
        }).catch((err) => {
          console.error(err)
        })
      }
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
    mapLoop (data) {
      return data.map(item => {
        if (item.children) {
          item.children = this.mapLoop(item.children)
        }
        return {
          ...item,
          ...item.jsonObject,
          id: item.jsonObject.id
        }
      })
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
