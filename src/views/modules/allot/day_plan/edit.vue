<template> <!-- 主子表 代表 -->
  <div :style="{height: `${maxHeight}px`}" v-loading="loading">
    <input type="file" @change="getImportFile" id="imFile" style="display: none"
           accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
    <component :is="currentView" ref="componentRef" :tips="tips" :max-height="maxHeight" :fieldData="fieldData" :modelData="modelData" :btnGroup="btnGroup" @submit="submitForm" @reset="resetForm" @but-monitor="butMonitor"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import { FormColumn, MasterChildForm, TabForm, EditTable, TreeForm } from 'components/base/index'
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import DayPlanService from 'service/modules/material/day_plan/day-plan-service'
import { downloadExl, importFile } from 'util/excl'
export default {
  name: 'dynamic',
  data () {
    return {
      tips: '',
      loading: true,
      formatStyle: 'loading', // 模板类型
      mould: {
        '404': Vue.extend(NonExistent), // 404页面
        'FORMAT_FOUR_COLUMN_FROM': Vue.extend(FormColumn), // 四列表单
        'FORMAT_EIGHT_COLUMN_FROM': Vue.extend(FormColumn), // 八列表单
        'FORMAT_MASTER_CHILD_FROM': Vue.extend(MasterChildForm), // 主子表-表单
        'FORMAT_TAB_FROM': Vue.extend(TabForm), // 选项卡切换表单
        'FORMAT_EDIT_FROM': Vue.extend(EditTable), // 可编辑TABLE表单
        'FORMAT_TREE_FROM': Vue.extend(TreeForm) // 树形+表单
      },
      btnGroup: [
        {
          icon: 'el-icon-circle-check-outline',
          btnType: 'primary',
          permision: '',
          name: 'save',
          label: '保存',
          type: 'btn'
        },
        {
          icon: 'el-icon-upload',
          btnType: 'primary',
          permision: '',
          name: 'upload',
          label: 'Excel导入',
          type: 'btn'
        },
        {
          icon: 'el-icon-download',
          btnType: 'primary',
          permision: '',
          name: 'download',
          label: '下载导入模板',
          type: 'btn'
        }
      ],
      fieldData: {},
      modelData: { // 默認主子表必須為空對象/空數組
        'day_plan': {},
        'day_plan_sub': []
      },
      imFile: ''
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
  mounted () {
    this.imFile = document.getElementById('imFile')
  },
  methods: {
    downloadExl,
    importFile,
    getMould () { // 获取当前菜单配置
      OptimusPrimeService.optimusPrime({
        formatType: 'FORM',
        menuId: (this.$route.query && this.$route.query.id) || this.$route.meta.other.id
      }).then(res => {
        if (res.success) {
          this.formatStyle = res.data.formatStyle
          this.fieldData = res.data
          this.fieldData.opations = { // 需要注明哪个是主表，哪个是子表（主子表需要）
            main: 'day_plan',
            son: 'day_plan_sub'
          }
          res.data.formSubList.forEach((item, index) => { // 处理表单默认值（通用）
            if (item.customTable === this.fieldData.opations.main) {
              this.modelData[item.customTable][item.fieldName] = item.defaultValue
            }
          })
          if (this.$route.query.currentId) {
            this.getInfo(this.$route.query.currentId)
          }
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
    butMonitor (type) {
      switch (type) {
        case 'download':
          let template = {
            plateNumber: '',
            vehcCode: '',
            vehcName: '',
            alexsCode: '',
            alexsName: '',
            preNums: '',
            preQuantity: '',
            driverName: '',
            idNumber: '',
            mobile: '',
            carrId: '',
            carrName: ''
          }
          this.downloadFile(template)
          break
        case 'upload':
          this.uploadFile()
          break
      }
    },
    submitForm (state, modelData, child) {
      if (state) { // 提交成功.
        DayPlanService.create({
          entity: modelData,
          entitysub: child
        }).then(res => {
          this.$message.success('保存成功')
          this.resetForm()
          console.log(res)
        })
      } else {
        this.$message.error('请完善表单！')
      }
    },
    resetForm (modelData) {
      console.log(modelData)
    },
    downloadFile (rs) { // 点击导出按钮
      let data = [{}]
      let th2Chinese = {
        plateNumber: '车牌号',
        vehcCode: '车辆类型编号',
        vehcName: '车辆类型',
        alexsCode: '车辆轴数编号',
        alexsName: '车辆轴数',
        preNums: '件数',
        preQuantity: '数量',
        driverName: '司机姓名',
        idNumber: '身份证号',
        mobile: '手机号',
        carrId: '承运商ID',
        carrName: '承运商名称'
      }
      for (let k in rs) {
        data[0][k] = th2Chinese[k]
      }
      data = data.concat(rs)
      this.downloadExl(data, '日计划导入模板')
    },
    uploadFile: function () { // 点击导入按钮
      this.imFile.click()
    },
    getImportFile: function (e) { // 获取导入文件内容
      this.importFile(this, this.imFile, (json) => {
        this.dealFile(json)
      })
    },
    dealFile: function (data) { // 处理导入的数据
      this.imFile.value = ''
      if (data.length <= 0) {
        this.$message.error('表格内容不能为空，请重新导入文件!', { icon: 2 })
        return false
      } else {
        let arr = []
        let obj = {
          '车牌号': 'plateNumber',
          '车辆类型编号': 'vehcCode',
          '车辆类型': 'vehcName',
          '车辆轴数编号': 'alexsCode',
          '车辆轴数': 'alexsName',
          '件数': 'preNums',
          '数量': 'preQuantity',
          '司机姓名': 'driverName',
          '身份证号': 'idNumber',
          '手机号': 'mobile',
          '承运商ID': 'carrId',
          '承运商名称': 'carrName'
        }
        data.map(v => {
          let o = {}
          for (let i in v) {
            o[obj[i]] = v[i]
          }
          arr.push(o)
        })
        arr.map(v => {
          this.modelData.day_plan_sub.push(v)
        })
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
    FormColumn,
    MasterChildForm,
    TabForm,
    EditTable,
    TreeForm
  }
}

</script>
