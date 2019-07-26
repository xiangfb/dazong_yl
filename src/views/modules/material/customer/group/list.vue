<template> <!-- 树+列表 代表 -->
  <div :style="{height: `${maxHeight}px`}" v-loading="loading">
    <component
      :is="currentView"
      :tips="tips"
      ref='com'
      :max-height="maxHeight"
      :btnGroup="btnGroup"
      :treeData="treeData"
      :fieldData="fieldData"
      :modelData="modelData"
      :options="options"
      @search="search"
      @node-click="nodeClick"
      @submit="submitForm"
      @but-receipt="butEvent"
      @reset="resetForm"
      @size-change="sizeChange"
      @current-change="currentChange"></component>
      <popup-list width="35%" :visibleSync="visibleSync" title="分配列表"> <!-- 按钮点击触发的弹窗需要 -->
        <el-tree
          ref="popupTree"
          :data="popupTreeData"
          :props="{children: 'children'}"
          show-checkbox>
          <div slot-scope="data">
            {{`${data.data.jsonObject.orgName}`}}
          </div>
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visibleSync = false">取 消</el-button>
          <el-button type="primary" @click="popupSubmit">确 定</el-button>
        </span>
      </popup-list>
      <popup-list width="35%" :visibleSync="ivisible" title="分配列表"> <!-- 按钮点击触发的弹窗需要 -->
        <custom-edit-table
          class="m-b-10"
          ref="custom"
          :loading="loading"
          :table-header="tableHeader"
          :data="tableData"
          border
          select
        :max-height="350"></custom-edit-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ivisible = false">取 消</el-button>
          <el-button type="primary" @click="ivisible = false">确 定</el-button>
        </span>
      </popup-list>
  </div>
</template>

<script>
import Vue from 'vue'
import { RoutineList, TreeTable, PopupList } from 'components/base/index' // getMaterialList
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import CustomerGroupService from 'service/modules/material/customer/group/customer-group-service'
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
      treeData: [],
      fieldData: {},
      modelData: [],
      searchId: null,
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
      visibleSync: false, // 按钮点击触发的弹窗需要
      popupTreeData: [], // 按钮点击触发的弹窗需要
      flag: null, // 判断弹窗是分配还是取消分配
      ivisible: false,
      tableHeader: [
        {
          'id': 1,
          'columnWidth': '200',
          'fieldExplain': '公司编号',
          'fieldName': 'orgCode',
          'ihidden': false,
          'ishow': true
        },
        {
          'id': 1,
          'columnWidth': '300',
          'fieldExplain': '公司名称',
          'fieldName': 'orgName',
          'ihidden': false,
          'ishow': true
        }
      ],
      tableData: []
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
  },
  methods: {
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
          this.getMaterialList()
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
    getMaterialList (one) {
      if (this.formatStyle === 'FORMAT_TREE_LIST') {
        CustomerGroupService.trees().then(tree => {
          if (tree.success) {
            this.treeData = this.treeHandle(tree.data)
            this.getData(this.treeData && this.treeData[0] && this.treeData[0].id)
          } else {
            this.getData()
          }
        })
      } else {
        this.getData()
      }
    },
    nodeClick (data) {
      this.getData(data.id)
    },
    treeHandle (data) {
      data.forEach(ele => {
        ele.name = ele.jsonObject.cuscName
        if (ele.children && ele.children.length > 0) {
          this.treeHandle(ele.children)
        }
      })
      return data
    },
    getData (id) {
      let params = {
        limit: {
          ps: this.options.ps,
          pn: this.options.pn
        },
        search: [] // 快捷查询需要
      }
      if (id) {
        this.searchId = id
      }
      if (this.searchId) {
        params.search = [{ key: 'cuscId', op: 'eq', val: this.searchId }]
      }
      if (this.searchAdvanced) { // 高级查询
        params.search = params.search.concat(this.searchAdvanced)
      }
      if (this.searchTerm) { // 快捷查询需要
        params.search[params.search.length] = this.searchTerm
      }
      CustomerGroupService.formData(params).then(res => {
        if (res.success) {
          this.options.total = res.data.total
          this.modelData = res.data.list
        }
      })
    },
    butEvent (e) {
      console.log(e)
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
          CustomerGroupService.delete(result).then(res => {
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
          this.$router.push({
            path: this.butResource[e].urlPath,
            query: {
              id: this.butResource[e].id,
              type: e
            }
          })
          break
        case 'update':
          console.log(this.butResource[e])
          if (getList.length > 1) {
            this.$message.error('只能修改一条信息')
            return
          }
          if (getList.length < 1) {
            this.$message.error('请选择一条要修改的信息')
            return
          }
          let currentId = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()[0].id
          console.log(currentId)
          this.$router.push({
            path: this.butResource[e].urlPath,
            query: {
              id: this.butResource[e].id,
              currentId: currentId,
              type: e
            }
          })
          break
        case 'detail':
          if (getList.length > 1) {
            this.$message.error('只能查看一条信息')
            return
          }
          if (getList.length < 1) {
            this.$message.error('请选择一条要查看的信息')
            return
          }
          console.log(this.butResource[e])
          if (this.$refs.com.$refs.custom.$refs.editable.getSelecteds()) {

          }
          let curd = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()[0].id
          console.log(curd)
          this.$router.push({
            path: this.butResource[e].urlPath,
            query: {
              id: this.butResource[e].id,
              currentId: curd,
              type: e
            }
          })
          break
        case 'enable':
          if (getList.length < 1) {
            this.$message.error('请选择要启用的数据')
            return
          }
          this.$refs.com.$refs.custom.$refs.editable.getSelecteds().map(item => {
            result.push(item.id)
          })
          CustomerGroupService.enable({
            ids: result
          }).then(res => {
            this.$message.success('启用成功')
          })
          break
        case 'disable':
          if (getList.length < 1) {
            this.$message.error('请选择要禁用的数据')
            return
          }
          this.$refs.com.$refs.custom.$refs.editable.getSelecteds().map(item => {
            result.push(item.id)
          })
          CustomerGroupService.disable({
            ids: result
          }).then(res => {
            this.$message.success('禁用成功')
          })
          break
        case 'synchronization':
          CustomerGroupService.syn({
            update_date: '2018-06-01 00:00:00'
          }).then(res => {
            if (res.success) {
              this.$message.success(res.msg)
              this.getMaterialList()
            }
          })
          break
        case 'distribute':
          if (getList.length < 1) {
            this.$message.error('请选择档案')
            return false
          }
          CustomerGroupService.organizationTrees().then(res => {
            if (res.success) {
              this.visibleSync = true
              this.popupTreeData = res.data
              this.flag = 'fp' // 分配弹窗
            }
          })
          break
        case 'cancelDistribute':
          if (getList.length < 1) {
            this.$message.error('请选择档案')
            return false
          }
          CustomerGroupService.organizationTrees().then(res => {
            if (res.success) {
              this.visibleSync = true
              this.popupTreeData = res.data
              this.flag = 'cfp' // 取消分配弹窗
            }
          })
          break
        case 'cancelAllDistribute':
          if (getList.length < 1) {
            this.$message.error('请选择档案')
            return false
          }
          getList.map(item => {
            result.push(item.id)
          })
          CustomerGroupService.cancelAll({
            entity: {
              'archivesIds': result
            }
          }).then(res => {
            if (res.success) {
              this.$message.success('取消分配成功')
              this.getMaterialList()
            }
          })
          break
        case 'distributeSearch':
          if (getList.length < 1) {
            this.$message.error('请选择档案')
            return false
          }
          if (getList.length > 1) {
            this.$message.error('只能查看一条信息')
            return false
          }
          this.ivisible = true
          console.log(getList[0])
          CustomerGroupService.findAllocate(getList[0].id).then(res => {
            if (res.success) {
              console.log(res)
              this.tableData = res.data
              // this.getMaterialList()
            }
          })
          break
      }
      // if (this.butResource[e]) {
      //   this.$router.push({
      //     path: this.butResource[e].urlPath,
      //     query: {
      //       id: this.butResource[e].id
      //     }
      //   })
      // }
    },
    popupSubmit () { // 按钮点击触发的弹窗需要
      this.visibleSync = false
      console.log(this.$refs.com.getSelectionList()) // 获取树+列表选中的数据
      let venList = []
      this.$refs.com.getSelectionList().map(item => {
        venList.push(item.id)
      })
      console.log(venList)
      console.log(this.$refs.popupTree.getCheckedNodes(true, true)) // 获取选中的树节点
      let orgList = []
      this.$refs.popupTree.getCheckedNodes(true, true).map(item => {
        orgList.push(item.id)
      })
      console.log(orgList)
      if (this.flag === 'fp') {
        CustomerGroupService.allocate({
          entity: {
            archivesIds: venList,
            orgIds: orgList
          }
        }).then(res => {
          if (res.success) {
            this.$message.success('分配成功')
            this.getMaterialList()
          } else {
            this.$message.error('分配失败')
          }
        })
      }
      if (this.flag === 'cfp') {
        CustomerGroupService.cancelAllocate({
          entity: {
            archivesIds: venList,
            orgIds: orgList
          }
        }).then(res => {
          if (res.success) {
            this.$message.success('取消分配成功')
            this.getMaterialList()
          } else {
            this.$message.error('取消分配失败')
          }
        })
      }
    },
    sizeChange (ps) {
      this.options.pn = 1
      this.options.ps = ps
      this.getData()
    },
    currentChange (pn) {
      this.options.pn = pn
      this.getData()
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
