<template> <!-- 可切换表单 代表 -->
  <div :style="{height: `${maxHeight}px`}" v-loading="loading">
    <component :is="currentView" ref="componentRef" :tips="tips" :btnGroup="btnGroup" :max-height="maxHeight" :fieldData="fieldData" :modelData="modelData" @but-receipt="butEvent" @popup-confirm="popupConfirm" @submit="submitForm" @reset="resetForm"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import { FormColumn, MasterChildForm, TabForm, EditTable, TreeForm } from 'components/base/index'
import NonExistent from '@/components/error-page/404'
import OptimusPrimeService from 'service/optimus-prime-service'
import InventoryGroupService from 'service/modules/material/inventory/group/inventory-group-service'
export default {
  name: 'dynamic',
  data () {
    return {
      tips: '',
      loading: true,
      btnGroup: [
        {
          btnType: 'primary',
          permision: '',
          name: 'back',
          label: '返回',
          type: 'btn'
        }
      ],
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
      fieldData: {},
      modelData: {
        'as_inventory': {},
        'as_inventory_ex_weigh': {}
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
  },
  methods: {
    popupConfirm (data, fatherData, index) { // 弹窗资源点击确定触发  data为已选跨页数据
      console.log(data)
    },
    getMould () { // 获取当前菜单配置
      OptimusPrimeService.optimusPrime({
        formatType: 'FORM',
        menuId: (this.$route.query && this.$route.query.id) || this.$route.meta.other.id
      }).then(res => {
        if (res.success) {
          this.formatStyle = res.data.formatStyle
          res.data.formSubList.forEach((item, index) => {
            this.modelData['as_inventory'][item.fieldName] = item.defaultValue
            this.modelData['as_inventory_ex_weigh'][item.fieldName] = item.defaultValue
          })
          if (this.$route.query.currentId) {
            this.getInfo(this.$route.query.currentId)
          }
          this.fieldData = res.data
          this.fieldData.tabOptions = [ // 可切换表单必须
            {
              label: '基础属性',
              name: 'as_inventory',
              fieldData: {},
              modelData: {}
            },
            {
              label: '扩展属性',
              name: 'as_inventory_ex_weigh'
            }
          ]
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
    getInfo (id) {
      InventoryGroupService.detail(id).then(res => {
        if (res.success) {
          this.modelData = {
            'as_inventory': res.data.entity, // 要与tabOptions的name一一对应
            'as_inventory_ex_weigh': res.data.entitysub
          }
        }
      })
    },
    submitForm (state, modelData) {
      console.log(this.$route.query.type)
      if (state) { // 提交成功.
        switch (this.$route.query.type) {
          case 'create':
            InventoryGroupService.create({
              entity: modelData.as_inventory,
              entitysub: modelData.as_inventory_ex_weigh
            }).then(res => {
              console.log(res)
              if (res.success) {
                this.$message.success('保存成功!')
                this.$router.go(-1)
              }
            })
            break
          case 'update':
            InventoryGroupService.update({
              entity: modelData.as_inventory,
              entitysub: modelData.as_inventory_ex_weigh
            }).then(res => {
              console.log(res)
              if (res.success) {
                this.$message.success('修改成功!')
                this.$router.go(-1)
              }
            })
            break
        }
      } else {
        this.$message.error('请完善表单！')
      }
    },
    resetForm (modelData) {
      console.log(modelData)
    },
    butEvent (type) {
      switch (type) {
        case 'back':
          this.$router.replace('/modules/material/inventory/group/list')
          break
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
