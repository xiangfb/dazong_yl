<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container bg-white p-15">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handlerAdd">
          添加
        </el-button>
        <!-- <el-button type="primary" icon="plus" @click="handlerAddRoot">
          添加根菜单
        </el-button> -->
        <el-button type="primary" icon="edit" @click="handlerEdit">
          编辑
        </el-button>
        <el-button type="primary" icon="delete" @click="handleDelete">
          删除
        </el-button>
      </el-button-group>
    </div>
    <el-row class="bg-white">
      <el-col :span="8" class="tree_table_box">
        <el-scrollbar class="p-n m-r-10 view_scrollbar_box" ref="elscrollbar" :style="{'height': `${maxHeight - 90}px`}">
          <el-tree class="filter-tree"
                  v-loading="loading"
                  :empty-text="treeEmptyText"
                  ref="menuTree"
                  node-key="id"
                  highlight-current
                  :data="treeData"
                  :filter-node-method="filterNode"
                  :props="defaultProps"
                  @node-click="getNodeData"
                  @node-expand="nodeExpand"
                  @node-collapse="nodeCollapse">
          </el-tree>
        </el-scrollbar>
      </el-col>
      <el-col :span="16" class="p-r-15">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本配置" name="page">
            <el-card class="box-card" shadow="never" :style="{'max-height': `${maxHeight - 160}px`, 'overflow-y': 'auto'}">
              <el-form label-position="right" label-width="80px" :model="form" ref="form">
                <el-form-item label="父级节点" prop="parentId">
                  <el-select v-model="form.parentId" filterable :disabled="formEdit" placeholder="请选择父级节点" clearable>
                    <el-option v-for="(item, index) in parentIds" :key="index" @click.native="selectChange(item)" :label="item.title" :value="item.id" :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                  <el-input v-model="form.title" :disabled="formEdit" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                  <el-select v-model="form.icon" filterable :disabled="formEdit" placeholder="请选择图标" clearable>
                    <el-option v-for="(item, index) in icons" :key="index" :label="item.title" :value="item.icon" :disabled="item.disabled">
                      <span style="float: left">{{ item.title }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px"><i :class="item.icon"></i></span>
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="类型" prop="menuType">
                  <el-select v-model="form.menuType" :disabled="formEdit" placeholder="请选择">
                    <el-option label="菜单" :value="'0'"></el-option>
                    <el-option label="按钮" :value="'1'"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="form.menuType === '1'" label="按钮code" prop="buttonCode">
                  <el-input v-model="form.buttonCode" :disabled="formEdit" placeholder="请输入按钮code"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                  <el-input v-model="form.sort" type="number" min="0" :disabled="formEdit" placeholder="请输入前端地址"></el-input>
                </el-form-item>
                <el-form-item label="前端组件" prop="component">
                  <el-input v-model="form.component" :disabled="formEdit" placeholder="请输入使用组件"></el-input>
                </el-form-item>
                <el-form-item label="前端地址" prop="urlPath">
                  <el-input v-model="form.urlPath" :disabled="formEdit" placeholder="请输入前端地址"></el-input>
                </el-form-item>
                <el-form-item label="资源配置" prop="urlPath">
                  <CustomEditTable class="m-b-15 bg-white"
                    @click.native="resourceDispose"
                    border
                    ref="regionComponent"
                    :loading="loading"
                    :data="resourceData"
                    id="region-component"
                    :max-height="300"
                    :tableHeader="resourceHeader">
                  </CustomEditTable>
                </el-form-item>
                <el-form-item label="路由缓冲" prop="keepAlive">
                  <el-switch v-model="form.keepAlive" :disabled="formEdit" active-color="#13ce66" inactive-color="#ff4949" :active-value='"1"' :inactive-value='"0"'>
                  </el-switch>
                </el-form-item>
                <el-form-item v-if="formStatus == 'update'" class="m-b-n">
                  <el-button :loading="butLoading" type="primary" @click="update">
                    更新
                  </el-button>
                  <el-button @click="onCancel">取消</el-button>
                </el-form-item>
                <el-form-item v-if="formStatus == 'create'" class="m-b-n">
                  <el-button :loading="butLoading" type="primary" @click="create">
                    保存
                  </el-button>
                  <el-button @click="onCancel">取消</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="模板配置" name="mould">
            <el-card class="box-card" shadow="never" :style="{'max-height': `${maxHeight - 160}px`, 'overflow-y': 'auto'}">
              <el-form label-position="right" label-width="80px" ref="mouldForm">
                <el-form-item label="模板配置" prop="urlPath">
                  <el-cascader
                    clearable
                    filterable
                    v-model="mouldData"
                    :disabled="formEdit"
                    :options="mouldList"
                    :props="mouldProps"></el-cascader>
                </el-form-item>
                <el-form-item v-if="formStatus !== ''" class="m-b-n">
                  <el-button :loading="butLoading" type="primary" @click="mouldUpdate">
                    更新
                  </el-button>
                  <el-button @click="onCancel">取消</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog title="请选择" :visible.sync="dialogVisible" width="500px" class="dialog_visible">
      <el-input class="m-b-15" placeholder="输入关键字进行过滤!" v-model="filterText"></el-input>
      <el-scrollbar class="p-n m-r-10 view_scrollbar_box dialog_visible_scrollbar" ref="dialogVisible" :style="{'height': `${maxHeight / 3 * 2}px`}">
        <el-tree
          class="filter-tree"
          :empty-text="treeEmptyText"
          :data="dialogData"
          :props="dialogProps"
          show-checkbox
          :filter-node-method="filterNode"
          @node-click="getDialogData"
          @node-expand="dialogExpand"
          @node-collapse="dialogCollapse"
          @check="handleCheck"
          ref="dialogTree">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <el-tooltip class="item" effect="dark" :content="node.label" placement="top">
              <span class="custom-tree-node_left nowrap">{{ node.label }}</span>
            </el-tooltip>
            <!-- <span class="p-r-15 custom-tree-node_right" v-if="!(data.list && data.list.length > 0)"> -->
            <span class="p-r-15 custom-tree-node_right" style="display: none;">
              <el-button type="text" size="mini" @click="() => append(data)">
                修改
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import $json from '@/const/basic/index'
import Layout from '@/page/index/'
import AdminService from 'service/admin-service'
export default {
  data () {
    return {
      loading: true, // 树加载
      butLoading: false, // 按钮是否加载
      treeEmptyText: '', // 数控数据提示
      treeData: [], // 树数据
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      activeName: 'page', // 菜单选择
      parentIds: [], // 所有可选的父级
      icons: $json.icons, // 所有icon集合
      formEdit: true,
      formStatus: '',
      form: {
        treeCode: undefined,
        permission: undefined,
        name: undefined,
        id: null,
        menuType: null,
        buttonCode: null,
        parentId: undefined,
        icon: undefined,
        sort: undefined,
        component: undefined,
        type: undefined,
        path: undefined
      }, // 表单
      resourceHeader: [
        {
          'columnWidth': '200',
          'fieldExplain': '描述',
          'fieldName': 'desc',
          'iupdate': false,
          'ishow': true
        },
        {
          'fieldExplain': '权限',
          'fieldName': 'permissions',
          'iupdate': false,
          'ishow': true
        },
        {
          'columnWidth': '200',
          'fieldExplain': '请求方法',
          'fieldName': 'methods',
          'iupdate': false,
          'ishow': true
        }
      ],
      resourceData: [],
      dialogVisible: false, // 资源弹窗
      filterText: '', // 搜索树
      dialogData: [],
      dialogProps: {
        children: 'list',
        label: 'desc'
      },
      mouldProps: {
        label: 'formatName',
        value: 'id',
        children: 'children'
      },
      mouldData: [],
      mouldList: [ // 模板配置
        {
          id: 'FORM',
          formatName: '表单',
          children: []
        },
        {
          id: 'LIST',
          formatName: '列表',
          children: []
        },
        {
          id: 'SEARCH',
          formatName: '查询',
          children: []
        },
        {
          id: 'RESOURCE',
          formatName: '弹窗资源',
          children: []
        }
      ]
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    this.getMouldAll()
  },
  props: {
    maxHeight: {
      type: Number,
      default: 1067
    }
  },
  methods: {
    selectChange (data) {
      this.form.treeCode = data.treeCode
    },
    update () { // 更新节点信息
      this.butLoading = true
      AdminService.updateMenuById({
        entity: this.form,
        entitysub: this.resourceData.map(item => {
          return {
            permission: item.permission,
            methods: item.methods
          }
        })
      }).then((res) => {
        if (res.success) {
          this.updateResource(this.nodeSwitch())
          this.getList()
          this.$notify({
            title: '成功提示',
            message: '更新成功！',
            type: 'success',
            duration: 2000
          })
          this.resetForm()
          this.onCancel()
        }
      }).catch(() => {
        this.butLoading = false
      })
    },
    create () { // 新增节点
      AdminService.createMenu({
        entity: this.form,
        entitysub: []
      }).then(res => {
        if (res.success) {
          // this.updateResource(this.nodeSwitch())
          this.getList()
          this.$notify({
            title: '成功提示',
            message: '更新成功！',
            type: 'success',
            duration: 2000
          })
          this.resetForm()
          this.onCancel()
        }
      }).catch(() => {
        this.butLoading = false
      })
    },
    onCancel () {
      this.formEdit = true
      this.formStatus = ''
    },
    handlerAdd () { // 添加菜单
      this.resetForm()
      this.formEdit = false
      this.formStatus = 'create'
    },
    handlerEdit () { // 编辑
      if (this.form.id) {
        this.formEdit = false
        this.formStatus = 'update'
      } else {
        this.$notify({
          title: '失败提示',
          message: '请先选择需要编辑的节点！',
          type: 'error',
          duration: 2000
        })
      }
    },
    handleDelete () { // 删除
      if (this.form.id !== null) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          AdminService.deleteMenu(this.form.id).then(res => {
            if (res.success) {
              this.getList()
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              this.resetForm()
              this.onCancel()
            }
          })
        }).catch(() => {
          this.$notify({
            title: '操作提示',
            message: '取消删除！',
            type: 'error',
            duration: 1500
          })
        })
      } else {
        this.$notify({
          title: '失败提示',
          message: '请选择需要删除的节点！',
          type: 'error',
          duration: 1500
        })
      }
    },
    getList () { // 获取菜单
      AdminService.menuManageList({ // 树形菜单
        type: 'tree'
      }).then((res) => {
        this.treeData = res
        this.$nextTick(() => {
          this.butLoading = false
          this.loading = false
          this.treeEmptyText = '暂无数据'
        })
      })
      AdminService.menuManageList().then((res) => { // 数组菜单
        this.parentIds = res
      })
      AdminService.sysInfoList().then(res => {
        this.dialogData = res.map(item => {
          if (item.list && item.list.length > 0) {
            item.disabled = true
          }
          return item
        })
        this.treeUpData()
      })
    },
    resourceDispose () { // 资源配置
      if (!this.formEdit) {
        this.dialogVisible = true
      }
    },
    handleClick (tab) { // 切换tabs
      this.formEdit = true
      this.formStatus = ''
      if (tab.name === 'mould' && this.form.id) {
        this.getFormatAllotDetail(this.form.id)
      }
    },
    getFormatAllotDetail (sysMenuId) { // 获取当前菜单资源
      AdminService.formatAllotDetail({
        sysMenuId: sysMenuId
      }).then(res => {
        if (res.length > 0) {
          this.mouldData = [res[0].formatType, res[0].cgFormatId]
        }
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getNodeData (data) { // 点击tree节点后触发
      this.treeUpData()
      this.onCancel()
      console.log('获取当前数据', data)
      this.parentIds = this.parentIds.map(item => {
        if (item.id === data.id) {
          item.disabled = true
        } else {
          item.disabled = false
        }
        return item
      })
      AdminService.getMenuById(data.id).then(res => {
        if (res.success) {
          if (res.data.entity.parentId === 0) {
            delete res.data.entity.parentId
          }
          this.form = res.data.entity
          this.resourceData = res.data.entitysub.map(item => {
            item.permissions = item.permission
            return item
          })
        }
      })
      if (this.activeName === 'mould') {
        this.getFormatAllotDetail(data.id)
      }
    },
    nodeExpand (data) { // 节点被展开时触发的事件
      this.treeUpData()
    },
    nodeCollapse (data) { // 节点被关闭时触发的事件
      this.treeUpData()
    },
    getDialogData (data) { // 资源树点击节点触发
      this.treeUpData()
    },
    dialogExpand (data) { // 资源树节点被展开触发
      this.treeUpData()
    },
    dialogCollapse (data) { // 资源树节点被关闭触发
      this.treeUpData()
    },
    handleCheck () { // 资源树选择触发
      this.resourceData = this.$refs.dialogTree.getCheckedNodes(true).map(item => {
        if (Array.isArray(item.permissions)) {
          item.permission = item.permissions.join(';')
        }
        if (Array.isArray(item.methods)) {
          item.methods = item.methods.join(';')
        }
        item.ishow = true
        return item
      })
    },
    mouldUpdate () { // 模块修改
      AdminService.createFormatAllot({
        entity: {
          sysMenuId: this.form.id,
          formatType: this.mouldData[0],
          cgFormatId: this.mouldData[1]
        }
      }).then((res) => {
        if (res.success) {
          this.getList()
          this.updateResource()
          this.$notify({
            title: '成功提示',
            message: '更新成功！',
            type: 'success',
            duration: 2000
          })
          this.resetForm()
          this.onCancel()
        }
      }).catch(() => {
        this.butLoading = false
      })
    },
    getMouldAll () { // 获取所有资源列表
      let promise = []
      this.mouldList.forEach((item, index) => {
        promise.push(this.getMouldList(item.id, index))
      })
      Promise.all(promise).then((res) => {
      }).catch((err) => {
        console.error(err)
      })
    },
    getMouldList (formatType, index) { // 获取对应模板类型的列表
      return new Promise((resolve, reject) => {
        AdminService.getMouldList({
          search: [{ key: 'formatType', op: 'eq', val: formatType }]
        }).then(res => {
          if (res.success) {
            this.mouldList[index].children = res.data
            resolve(res)
          } else {
            reject(res)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    treeUpData () { // 刷新滚动的滚动条
      setTimeout(() => {
        if (this.$refs['elscrollbar']) {
          this.$refs['elscrollbar'].update()
        }
        if (this.$refs['dialogVisible']) {
          this.$refs['dialogVisible'].update()
        }
      }, 500)
    },
    nodeSwitch () {
      let form = JSON.parse(JSON.stringify(this.form))
      let data = [
        {
          path: (this.form.id).toString(),
          component: Layout,
          children: [
            {
              ...form,
              name: form.title,
              meta: {
                keepAlive: form.keepAlive,
                isTab: true,
                isAuth: true
              },
              path: this.form.urlPath,
              component (resolve) {
                require([`src/${form.component}.vue`], resolve).catch(() => {
                  require([`@/page/template-free.vue`], resolve)
                })
              }
            }
          ]
        }
      ]
      return data
    },
    updateResource (path) {
      this.$store.dispatch('GetMenuButList').then(res => {
        if (res.length === 0) return
        let data = res.map(item => {
          return {
            path: (item.id).toString(),
            component: Layout,
            children: [
              {
                ...item,
                path: item.urlPath,
                component (resolve) {
                  require([`src/${item.component}.vue`], resolve).catch(() => {
                    require([`@/page/template-free.vue`], resolve)
                  })
                }
              }
            ]
          }
        })
        this.$router.addRoutes(data)
      })
      this.$store.dispatch('GetMenu').then(data => {
        if (data.length === 0) return
        this.$router.$avueRouter.formatRoutes(data, true, path)
        this.treeUpData()
      })
    },
    resetForm () {
      this.mouldData = []
      this.resourceData = []
      this.form = {
        treeCode: undefined,
        permission: undefined,
        name: undefined,
        id: null,
        menuType: null,
        buttonCode: null,
        parentId: undefined,
        icon: undefined,
        sort: undefined,
        component: undefined,
        type: undefined,
        path: undefined
      }
    }
  },
  computed: {},
  watch: {},
  components: {}
}
</script>

<style lang="scss" scoped>
  .tree_table_box .view_scrollbar_box .el-scrollbar__view{
    background: white !important;
  }
  $node_right_width: 0px;
  .custom-tree-node {
    width: calc(100% - 70px);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    .custom-tree-node_left{
      width: calc(100% - #{$node_right_width});
    }
    .custom-tree-node_right{
      width: $node_right_width;
    }
  }
</style>
<style lang="scss">
  .dialog_visible{
    .el-dialog__body{
      padding-top: 5px !important;
      padding-bottom: 15px !important;
    }
  }
  // .dialog_visible_scrollbar {
  //   .el-scrollbar__wrap{
  //     overflow-x: hidden !important;
  //   }
  //   .el-scrollbar__bar.is-horizontal{
  //     height: 16px !important;
  //     border-radius: 8px !important;
  //   }
  // }
</style>
