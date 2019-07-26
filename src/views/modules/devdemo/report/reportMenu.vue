/* eslint-disable no-sequences */
<template>
  <div class="bg-white p-20">
    <el-button-group class="m-b-20">
  <el-button v-for="(item,index) in nav" :key="index" @click="operate(item.type)" type="primary" :icon="item.icon">
    {{item.text}}
  </el-button>
</el-button-group>

    <!-- 页面设置 -->
    <pageSetting
    v-model="navStatus.page"
    :id='template.id'
    @colosePageSetting='colosePageSetting'
    />

    <!-- 小计设置 -->
    <subtotalSetting
     v-model="navStatus.subtotal"
     :id='template.id'
     @closeSubtotalSetting = 'closeSubtotalSetting'
     />

     <!-- 过滤条件 -->
     <filters @closeFilter='closeFilter' v-model="navStatus.filters"/>

    <!-- 第一步  条件筛选 -->
    <step1 @closeStep1="closeStep1" />

    <!-- 第二步  模板列表 -->
    <step2 @getList='setId' v-model="temListShow" :changeNum='changeNum' :max-height="maxHeight - 60" @add="add" @edit="edit" />

    <!-- 第三步  模板显示 -->
    <step3
    @changeData = 'changeData'
    :select='true'
    @selectionFn='selectionFn'
     :tabHeader='dataStep3.style'
     :total='dataStep3.data.total'
     :tabBody='dataStep3.data.list' />
    <!-- 添加模板 -->
    <add v-model="addStatus" :id='id' @propAdd="propAdd" />
  </div>
</template>

<script>
import ReportService from '@/service/report-service'

import step1 from '@/components/report/step1'
import step2 from '@/components/report/step2'
import step3 from '@/components/report/step3'
import add from '@/components/report/add'
import pageSetting from '@/components/report/pageSetting'
import subtotalSetting from '@/components/report/subtotalSetting'
import filters from '@/components/report/filter'
export default {
  components: {
    step1,
    step2,
    step3,
    pageSetting,
    subtotalSetting,
    filters,
    add
  },
  data () {
    return {
      id: 0,
      template: {}, // 模板信息
      dataStep3: {
        style: [],
        data: { list: [], total: 0 }
      },
      subObj: {// 条件查询列表
        limit: {
          pn: 1,
          ps: 10
        },
        // sort: {
        //   key: '',
        //   dir: 'desc'
        // },
        startTime: '',
        endTime: ''
        // searchItems: {
        //   sn: '',
        //   leftSymbol: '',
        //   field: '',
        //   op: '',
        //   value: '',
        //   rightSymbol: '',
        //   linkChar: ''
        // }
      },
      changeNum: 1,
      nav: [
        { icon: 'el-icon-menu', type: 'page', text: '页面设置' },
        { icon: 'el-icon-setting', type: 'subtotal', text: '小计设置' },
        { icon: 'el-icon-setting', type: 'filter', text: '过滤条件' }
      ],
      navStatus: {
        page: false,
        subtotal: false,
        filters: false
      },
      time: {
        startTime: '',
        endTime: ''
      },
      temListShow: false, // 模板列表显示状态
      addStatus: false, // 添加模块显示状态
      active: 1 // 步骤进度

    }
  },
  props: {
    maxHeight: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {
    // 获取选中的数据
    selectionFn (e) {
      console.log('选中的数据', e)
    },
    // 根据条件筛选模板
    getList () {
      // if (!this.template.id) {
      //   this.$message.error('暂无模板ID,请选择模板')
      //   return false
      // }
      let url = ''
      console.log('地址数据', this.$route.query.id)
      url = `${this.$route.query.id}`
      ReportService.temResult(this.subObj, url).then(res => {
        if (res.data) {
          this.dataStep3 = res.data
        }
        this.$message(res.msg)
      })
    },
    setId (e) {
      this.template = e
      this.getList()
    },
    // 页面设置模块显示状态
    colosePageSetting (e) {
      this.navStatus.page = false
      if (e) {
        this.getList()
      }
    },
    // 小计设置状态显示
    closeSubtotalSetting (e) {
      this.navStatus.subtotal = false
      if (e) {
        this.getList()
      }
    },
    changeData (e) {
      let key = Object.keys(e)[0]
      if (key === 'ps') {
        this.subObj.limit.pn = 1
      }
      this.subObj.limit[key] = e[key]
      this.getList()
      console.log(e)
    },
    // 过滤条件状态显示
    closeFilter (e) {
      this.navStatus.filters = false
      if (e) {
        e.map(item => {
          item.leftSymbol = item.leftSymbol === null || item.leftSymbol === undefined || item.leftSymbol === '' ? '' : item.leftSymbol.value
          item.field = item.field === null || item.field === undefined || item.field === '' ? '' : item.field.value
          item.op = item.op === null || item.op === undefined || item.op === '' ? '' : item.op.value
          item.value = item.value === null || item.value === undefined || item.value === '' ? '' : item.value
          item.rightSymbol = item.rightSymbol === null || item.rightSymbol === undefined || item.rightSymbol === '' ? '' : item.rightSymbol.value
          item.linkChar = item.linkChar === null || item.linkChar === undefined || item.linkChar === '' ? 'empty' : item.linkChar.value
        })
        this.subObj['searchItems'] = e
        this.getList()
      }
    },
    // 导航操作按钮
    operate (key) {
      switch (key) {
        case 'page':
          this.navStatus.page = true
          break
        case 'subtotal':
          this.navStatus.subtotal = true
          break
        case 'filter':
          this.navStatus.filters = true
          break
      }
    },
    // 显示模板列表模块
    closeStep1 (e) {
      // this.temListShow = true
      this.subObj.startTime = e.startTime
      this.subObj.endTime = e.endTime
      this.getList()
    },
    // 添加模块显示状态
    propAdd (e) {
      this.addStatus = false
      if (e) {
        if (e.id) {
          console.log(e)
          ReportService.updateTem({ entity: e }).then(res => {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.changeNum++
          })
          console.log('这是编辑的接口')
        } else {
          ReportService.addTem({ entity: e }).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.changeNum++
          })
          console.log('这是添加的接口')
        }
      }
    },
    // 模板列表操作（增删改）
    add (e) {
      console.log('这是添加按钮')
      this.id = 0
      this.addStatus = true
    },
    edit (e) {
      console.log('这是编辑按钮')
      this.id = e.id
      console.log(e.id)
      this.addStatus = true
    }
  },
  mounted () {
    console.log('........')
    // if (this.$route.query.id) {
    //   this.id
    // }
    // console.log(this.$route.query.id)
    console.log('........')
  }
}
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.nav {
  margin-right: 30px;
  font-size: 16px;
  cursor: pointer;
}

</style>
