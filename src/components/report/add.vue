<template>
  <div class="add-edit-data">
    <el-dialog width="70%" title="模板操作" @close='close' :visible.sync="show">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="报表编号">
          <el-input :disabled="true" v-model="formInline.code" placeholder="报表编号"></el-input>
        </el-form-item>
        <el-form-item label="报表名称">
          <el-input v-model="formInline.title" placeholder="报表名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="(active === 1 && rightData.length > 0) ? false : true" @click="edit">统计修改</el-button>
        </el-form-item>
      </el-form>
      <div class="addMain">
        <div>
          <el-steps direction="vertical" :active="active">
            <el-step title="统计依据"></el-step>
            <el-step title="统计内容"></el-step>
            <el-step title="统计排序"></el-step>
            <el-step title="自定义配置"></el-step>
          </el-steps>
        </div>
        <div class="searchBox" v-if="active >= 3">
          <el-button type="primary" @click="filterShow=true">自定义条件</el-button>
          <div style='text-align:center'>
            <el-card shadow="hover" style="margin-top:15px">
              {{entity && entity.template && entity.template.search && entity.template.search.searchName || '暂无筛选条件'}}
            </el-card>
          </div>
        </div>
        <el-transfer v-else
          ref='transfer'
          v-loading="loading"
          target-order="push"
          @right-check-change='rightList'
          @change='transfer'
          :titles="titles"
          v-model="value1"
          :render-content="renderFunc"
          :props="{
            key: 'index',
            label: 'name'
          }"
          :data="data">
        </el-transfer>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="prev" :disabled="active < 1">上一步</el-button>
        <el-button v-if="active >= 3" type="primary" @click="addSub">完成</el-button>
        <el-button v-else @click="next">下一步</el-button>
      </div>
    </el-dialog>
    <projectEdit v-model="projectStatus" :keyR='rightData[0]' @propStatus="propStatus"></projectEdit>
     <filters @closeFilter='closeFilter' v-model="filterShow"/>
  </div>
</template>

<script>
import projectEdit from './projectEdit'
import ReportService from '@/service/report-service'
import filters from '@/components/report/filter'
export default {
  components: {
    projectEdit, filters
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String],
      default: 0
    },
    upDataList: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      renderFunc (h, option) {
        return h('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between'
          }
        }, [
          h('div', {
            class: ['nowrap', 'flex'],
            style: {
              minWidth: '0px',
              justifyContent: 'space-between'
            }
          }, option.name),
          option.oldName && option.oldName !== option.name &&
          h('i', {
            class: ['icon-paixu-shengxu'],
            style: {
              cursor: 'pointer'
            },
            on: {
              click: e => {
                e.stopPropagation()
                e.preventDefault()
                console.log(this)
              }
            }
          })
        ])
      },
      editArr: [],
      loading: false,
      projectStatus: false,
      filterMsg: '',
      titles: ['待选列', '已选列'],
      active: 0,
      filterShow: false, // 筛选条件状态
      filterArr: [], // 筛选条件内容
      show: false,
      entity: {
        template: {
          countFields: [],
          groupFields: [],
          orderFields: [],
          search: { searchItems: [], searchName: '' }
        },
        templateType: 'pu_weight',
        title: ''
      }, // 添加模块提交结果
      key: {
        countFieldsK: [],
        groupFieldsK: [],
        orderFieldsK: []
      },
      formInline: {
        code: '',
        title: ''
      },
      data: [],
      value1: [],
      rightData: []
    }
  },
  methods: {
    closeFilter (e) {
      if (e === undefined) {
        return false
      }
      this.filterShow = false
      this.filterArr = e
      this.entity.template.search.searchName = ''
      e.map(item => {
        this.entity.template.search.searchName += `${item.leftSymbol === null || item.leftSymbol === undefined || item.leftSymbol === '' ? '' : item.leftSymbol.label}${item.field === null || item.field === undefined || item.field === '' ? '' : item.field.label}${item.op === null || item.op === undefined || item.op === '' ? '' : item.op.label}${item === null || item.value === undefined || item.value === '' ? '' : item.value}${item.rightSymbol === null || item.rightSymbol === undefined || item.rightSymbol === '' ? '' : item.rightSymbol.label}${item.linkChar === null || item.linkChar === undefined || item.linkChar === '' ? '' : item.linkChar.label}`
      })
      this.filterArr.map(item => {
        item.leftSymbol = item.leftSymbol === null || item.leftSymbol === undefined || item.leftSymbol === '' ? '' : item.leftSymbol.value
        item.field = item.field === null || item.field === undefined || item.field === '' ? '' : item.field.value
        item.op = item.op === null || item.op === undefined || item.op === '' ? '' : item.op.value
        item.value = item.value === null || item.value === undefined || item.value === '' ? '' : item.value
        item.rightSymbol = item.rightSymbol === null || item.rightSymbol === undefined || item.rightSymbol === '' ? '' : item.rightSymbol.value
        item.linkChar = item.linkChar === null || item.linkChar === undefined || item.linkChar === '' ? 'empty' : item.linkChar.value
      })
      this.entity.template.search.searchItems = this.filterArr
    },
    init () {
      this.data.map(item => {
        if (item.oldName) {
          item.name = item.oldName
        }
      })
    },
    edit () {
      if (this.rightData.length > 1) {
        this.$message('请选择一项做修改')
        return false
      }
      this.projectStatus = true
    },
    transfer (e, w, a) {
      if (w === 'right') {
        a.forEach(item => {
          this.data[item].oldField = this.data[item].field
          if (this.active === 1 && this.data[item].field.indexOf('(') < 0) {
            this.data[item].field = `sum(${this.data[item].field})`
            this.data[item].fieldName = `求和(${this.data[item].fieldName})`
          }
          this.data[item].oldName = this.data[item].name
          this.data[item].name = `${this.data[item].oldName}=${this.data[item].fieldName}`
        })
        this.resultData()
      } else {
        a.forEach(item => {
          this.data[item].name = this.data[item].oldName
        })
        this.resultData()
      }
    },
    resultData () {
      let sub = []
      switch (this.active) {
        case 0:
          this.key.groupFieldsK = this.value1
          this.key.groupFieldsK.map((item, index) => {
            sub.push({
              key: item,
              source: this.data[item].field,
              sourceName: this.data[item].oldName,
              field: this.data[item].field,
              fieldName: this.data[item].oldName,
              method: ''
            })
          })
          this.entity.template.groupFields = sub

          break
        case 1:
          this.key.countFieldsK = this.value1
          this.key.countFieldsK.map((item, index) => {
            sub.push({
              key: item,
              source: this.data[item].oldField,
              sourceName: this.data[item].oldName,
              field: this.data[item].field,
              fieldName: this.data[item].fieldName,
              method: 'sum'
            })
          })
          this.entity.template.countFields = sub
          break
        case 2:
          this.key.orderFieldsK = this.value1
          this.key.orderFieldsK.map((item, index) => {
            sub.push({
              key: item,
              source: this.data[item].source,
              sourceName: this.data[item].sourceName,
              field: this.data[item].field,
              fieldName: this.data[item].fieldName,
              method: this.data[item].method,
              order: 'desc'

            })
          })
          this.entity.template.orderFields = sub
          break
      }
    },
    rightList (e) {
      this.rightData = e
    },
    propStatus (e) {
      if (e) {
        let updata = this.data[this.rightData[0]]
        updata.name = `${updata.oldName}=${e.ch}`
        switch (this.active) {
          case 1:
            this.entity.template.groupFields.map(item => {
              if (item.key === this.rightData[0]) {
                item.fieldName = e.ch
                item.field = e.en
                item.method = e.method
              }
            })

            break

          case 2:
            this.entity.template.countFields.map(item => {
              if (item.key === this.rightData[0]) {
                item.fieldName = e.ch
                item.field = e.en
                item.method = e.method
              }
            })

            break
          case 3:
            this.entity.template.orderFields.map(item => {
              if (item.key === this.rightData[0]) {
                item.fieldName = e.ch
                item.field = e.en
                item.method = e.method
              }
            })
            break
        }
      }
      this.projectStatus = e.show
    },
    close () {
      this.show = false
      this.$emit('propAdd')
    },
    propAdd () {
      this.show = false
      this.$emit('propAdd')
    },
    prev () {
      this.active--
    },
    next () {
      this.active++
    },
    // 显示模板列表
    addSub () {
      this.entity.title = this.formInline.title
      if (this.entity.title === '') {
        this.$message('请输入模板名称')
        return false
      }
      if (this.id !== 0) {
        this.entity.id = this.id
      }
      this.show = false

      this.$emit('propAdd', this.entity)
    },
    editData () {
      ReportService.checkTem(this.id).then(res => {
        this.editArr = res.data.template
        this.formInline.title = res.data.title
        this.formInline.code = res.data.code
        this.getData('group', 'groupFields')
      })
    },
    getData (type, arr) {
      this.loading = true
      ReportService.getTemData({
        templateType: 'pu_weight',
        [type]: 1
      }).then((res) => {
        this.data = res.data.map((item, index) => {
          item['index'] = index
          item['name'] = item.fieldName
          return item
        })
        if (this.id !== 0) {
          this.entity.template[arr] = this.editArr[arr]
          let key = this.entity.template[arr].map((keyItem, ketIndex) => {
            this.data.forEach((item, i) => {
              if (this.entity.template[arr][ketIndex].sourceName === this.data[i].name) {
                this.entity.template[arr][ketIndex].key = i
                this.data[i].oldField = this.entity.template[arr][ketIndex].source
                this.data[i].oldName = this.entity.template[arr][ketIndex].sourceName
                this.data[i].field = this.entity.template[arr][ketIndex].field
                this.data[i].fieldName = this.entity.template[arr][ketIndex].fieldName
                keyItem = i
              }
            })
            return keyItem
          })
          this.key[arr + 'K'] = key
          if (arr) {
            this.entity.template[arr].map(item => {
              if (item.key || item.key === 0) {
                this.data[item.key].name = `${item.sourceName}=${item.fieldName}`
              }
            })
          }
          this.value1 = key
          console.log(this.value1)
        } else {
          if (arr) {
            this.entity.template[arr].map(item => {
              if (item.key || item.key === 0) {
                this.data[item.key].name = `${item.sourceName}=${item.fieldName}`
              }
            })
          }
        }

        this.loading = false
      })
    }
  },
  watch: {
    value (n, o) {
      this.show = n
      if (n) {
        if (this.id !== 0) {
          this.editData()
        } else {
          this.getData('group', 'groupFields')
        }
      } else {
        this.active = 0
        this.entity = {
          template: {
            countFields: [],
            groupFields: [],
            orderFields: []
          },
          templateType: 'pu_weight',
          title: ''
        } // 添加模块提交结果
        this.key = {
          countFieldsK: [],
          groupFieldsK: [],
          orderFieldsK: []
        }
        this.formInline = {
          code: '',
          title: ''
        }
        this.data = []
        this.value1 = []
        this.rightData = []
      }
    },
    active (n) {
      this.init()
      this.rightData = []
      if (n === 0) {
        this.getData('group', 'groupFields')
        this.value1 = this.key.groupFieldsK
      } else if (n === 1) {
        this.getData('count', 'countFields')
        this.value1 = this.key.countFieldsK
      } else if (n === 2) {
        this.loading = true
        let data = JSON.stringify(this.entity.template.groupFields.concat(this.entity.template.countFields))
        this.data = JSON.parse(data).map((item, index) => {
          item.index = index
          item.field = item.source
          item.fieldName = item.sourceName
          item.name = item.sourceName
          item.order = 'desc'
          return item
        })
        this.value1 = this.orderFieldsK
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
.addMain {
  display: flex;
  justify-content: space-around;
}
.el-transfer-panel {
  width: 260px!important;
}
.searchBox{
  height:300px;width:600px;
  border: 1px solid #ccc;
  padding: 15px;
}
.add-edit-data{
  .el-transfer-panel__item{
    margin-right: 15px !important;
  }
}
</style>
