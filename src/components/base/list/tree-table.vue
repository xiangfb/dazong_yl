<template>
  <div class="p-b-n float-hidden">
    <div class="f-l-tree bg-white">
      <div :style="{'height': `${maxHeight - 25}px`, 'overflow-y': 'auto'}" class="p-b-n m-b-10">
        <el-tree
          ref="elTree"
          class="p-10"
          highlight-current
          node-key="id"
          @node-click="nodeClick"
          :data="treeData"
          :props="treeProps" />
      </div>
    </div>
    <div class="f-l-list bg-white">
      <div class="bg-white p-10">
        <div class="m-b-10 op flex flex-between">
          <div class="btn-group">
            <CustomBtnGroup @on-click="butMonitor" :limit="limit" :btn-group="btnGroups"></CustomBtnGroup>
          </div>
          <div style="width: 250px">
            <CustomSearch class="w100" @change="searchEvent" v-if="searchShow && iallowQueryList.length > 0"/>
          </div>
        </div>
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
            :max-height="maxHeight - 120"></custom-edit-table>
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
    </div>
    <el-dialog
      title="高级查询"
      :visible.sync="advancedQueryVisible"
      width="650px">
      <div style="max-height: 500px;overflow-y: auto;">
        <el-form label-position="left" label-width="120px" :model="iallowAdvanceQueryData">
          <el-form-item :label="item.fieldExplain" v-for="(item, index) in iallowAdvanceQueryList" :key="index">
            <el-row>
              <el-col :span="8">
                <el-select v-model="item.controlValue" placeholder="请选择">
                  <el-option
                    v-for="(op, i) in item.controlOpations"
                    :key="i"
                    :label="op.label"
                    :value="op.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="16">
                <el-input v-model="iallowAdvanceQueryData[item.fieldName]"></el-input>
              </el-col>
            </el-row>

          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="advancedQueryVisible = false">取 消</el-button>
        <el-button type="primary" @click="advancedQueryEvent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectionList: {},
      advancedQueryVisible: false, // 高级搜索弹窗控制
      iallowAdvanceQueryList: [], // 高级查询列表
      iallowAdvanceQueryData: {}, // 高级查询val列表
      btnGroups: [],
      isLoading: false,
      limit: 5,
      tableHeader: [],
      iallowQueryList: [],
      data: [],
      pn: 1,
      ps: 10,
      pageSizes: [10, 20, 40, 80, 100],
      total: 0,
      treeProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  props: {
    searchShow: {
      type: Boolean,
      default: true
    },
    btnGroup: { // 按钮组
      type: Array,
      default () {
        return []
      }
    },
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
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
    treeData: {
      handler: 'getTreeData',
      deep: true, // 深度监听
      immediate: true // 首次进入也监听
    },
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
    sortChange (key, dir) {
      this.$emit('sort-change', key, dir)
    },
    butMonitor (e) {
      if (e === 'advancedQuery') { // 高级查询事件处理
        this.advancedQueryVisible = true
      }
      this.$emit('but-receipt', e)
    },
    handleSizeChange (ps) {
      this.$emit('size-change', ps)
    },
    handleCurrentChange (pn) {
      this.$emit('current-change', pn)
    },
    nodeClick (data, node, event) { // 点击节点触发
      this.$emit('node-click', data, node, event)
    },
    advancedQueryEvent () { // 高级查询
      let search = this.iallowAdvanceQueryList.filter(item => {
        return this.iallowAdvanceQueryData[item.fieldName]
      }).map(item => {
        return {
          key: item.fieldName,
          op: item.controlValue,
          val: this.iallowAdvanceQueryData[item.fieldName]
        }
      })
      this.$emit('search', search, 'advanced')
      this.advancedQueryVisible = false
    },
    searchEvent (val) { // 快捷查询
      let searchList = null
      if (this.iallowQueryList.length > 0 && val !== null && val !== undefined && val !== '') {
        searchList = {
          conj: 'or',
          search: this.iallowQueryList.map(item => {
            return {
              key: item.fieldName,
              op: 'like',
              val: val
            }
          })
        }
      } else {
        searchList = null
      }
      this.$emit('search', searchList, 'quick')
      this.advancedQueryVisible = false
    },
    getFieldData (val) {
      let fieldData = JSON.parse(JSON.stringify(val))
      this.iallowAdvanceQueryList = fieldData.listSubList.filter(item => {
        if (item.iallowAdvanceQuery) {
          item.controlType = 'text'
          item.controlValue = 'like'
          item.controlOpations = [{
            value: 'like',
            label: '模糊查询'
          }, {
            value: 'eq',
            label: '等于'
          }]
        }
        return item.iallowAdvanceQuery
      })
      let btnGroup = JSON.parse(JSON.stringify(this.btnGroup))
      if (btnGroup && this.iallowAdvanceQueryList.length > 0) { // 添加高级查询按钮
        if (btnGroup.length > 4) {
          btnGroup.splice(4, 0, {
            icon: 'el-icon-search',
            btnType: 'primary',
            permision: '',
            name: 'advancedQuery',
            label: '高级查询',
            type: 'btn'
          })
        } else {
          btnGroup[btnGroup.length] = {
            icon: 'el-icon-search',
            btnType: 'primary',
            permision: '',
            name: 'advancedQuery',
            label: '高级查询',
            type: 'btn'
          }
        }
        this.btnGroups = btnGroup
      } else {
        this.btnGroups = btnGroup
      }
      if (fieldData.listSubList) {
        this.iallowQueryList = fieldData.listSubList.filter(item => {
          return item.iallowQuery
        })
        this.tableHeader = fieldData.listSubList.map(item => {
          if (item.fieldType === 'ENUM') {
            item.enumOptions = {}
            item.options.forEach(data => {
              item.enumOptions[data.value] = data.label
            })
          }
          return item
        })
        this.tableHeader = fieldData.listSubList
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
    getTreeData (e) {
      let timer = setInterval(() => {
        if (this.$refs.elTree) {
          clearInterval(timer)
          this.$refs.elTree.setCurrentKey(e && e[0] && e[0].id)
        }
      }, 500)
    },
    getOptions (val) {
      let options = JSON.parse(JSON.stringify(val))
      this.limit = options.limit || 5
      this.pn = options.pn
      this.ps = options.ps
      this.pageSizes = options.pageSizes
      this.total = options.total
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
