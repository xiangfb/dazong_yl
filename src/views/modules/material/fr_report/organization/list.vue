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
       <el-dialog title="上传" :visible.sync="dialogUploda" width="35%" :close-on-click-modal="false">
         <el-upload
              class="upload-demo"
              drag
              :action="action"
              :headers="headers"
              :file-list="fileList"
              :on-success="uploadSus"
              name="file"
              accept=".cpt"
              :limit="1">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传.cpt文件</div>
            </el-upload>
      </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { RoutineList, TreeTable } from 'components/base/index' // getMaterialList
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import ReportOrganizationService from 'service/modules/material/fr_report/report-organization-service'
import Config from 'config'
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
      dialogUploda: false, // 上传弹出
      action: '', // 上传地址
      headers: '', // 上传头部
      fileList: [], // 上传列表
      options: {
        pageSizes: [10, 20, 40, 80, 100],
        pn: 1,
        ps: 10,
        total: 0
      },
      butResource: {},
      btnGroup: []
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
      this.getData()
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
        ReportOrganizationService.trees().then(tree => {
          if (tree.success) {
            this.treeData = this.treeHandle(tree.data)
            // this.getData(this.treeData && this.treeData[0] && this.treeData[0].id)
            this.searchId = null
            this.getData()
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
        ele.name = ele.jsonObject.respcName
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
        params.search = [{ key: 'respcId', op: 'eq', val: this.searchId }]
      }
      if (this.searchAdvanced) { // 高级查询
        params.search = params.search.concat(this.searchAdvanced)
      }
      if (this.searchTerm) { // 快捷查询需要
        params.search[params.search.length] = this.searchTerm
      }
      ReportOrganizationService.formData(params).then(res => {
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
          ReportOrganizationService.delete(result).then(res => {
            this.getData()
            this.$message.success('删除成功')
          })
          break
        case 'create':
          this.$router.push({
            path: this.butResource[e].urlPath,
            query: {
              id: this.butResource[e].id,
              type: e
            }
          })
          break
        case 'default':
          if (getList.length > 1) {
            this.$message.error('只能选择一条信息')
            return
          }
          if (getList.length < 1) {
            this.$message.error('请选择一条信息')
            return
          }
          let frId = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()[0].id
          ReportOrganizationService.defaulted(frId).then(res => {
            this.getData()
            this.$message.success('设置成功')
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
        case 'refresh': // 涮新按钮（字段名称与菜单中配置的名称对应）
          this.getMaterialList()
          break
        case 'upload': // 上传
          if (getList.length > 1) {
            this.$message.error('只能选择一条信息')
            return
          }
          if (getList.length < 1) {
            this.$message.error('请选择一条信息')
            return
          }
          this.fileList = []
          let rId = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()[0].id
          let token = this.$store.getters.access_token
          this.headers = { Authorization: 'Bearer ' + token }
          this.action = Config.service.api + '/material/as-report-form-org/upload/template/' + rId
          this.dialogUploda = true
          break
        case 'download': // 下载
          if (getList.length > 1) {
            this.$message.error('只能选择一条信息')
            return
          }
          if (getList.length < 1) {
            this.$message.error('请选择一条信息')
            return
          }
          let eng = this.$refs.com.$refs.custom.$refs.editable.getSelecteds()[0]
          let downId = eng.id
          let upload = eng.iupload
          let fileName = eng.templateId
          if (!upload || !fileName) {
            this.$message.error('请上传模板，才可以下载！')
            return
          }
          ReportOrganizationService.downFile(downId).then(res => {
            console.log(res)
            let blob = new Blob([res])
            let a = document.createElement('a')
            a.download = fileName
            a.href = window.URL.createObjectURL(blob)
            a.click()
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
    },
    uploadSus () { // 上传成功
      this.fileList = []
      this.dialogUploda = false
      this.getData()
      this.$message({
        message: '上传成功！',
        type: 'success'
      })
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
    TreeTable
  }
}

</script>
