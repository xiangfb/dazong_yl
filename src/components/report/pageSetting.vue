<template>
  <el-dialog @close='close'  width="55%" title="页面设置" :visible.sync="show">
      <div class="pageFlex">
        <div style="display:flex;width:100%">
          <span style="flex:1">报表格式：</span>
          <el-select v-model="checkTem" style="margin-right:15px;flex:3" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="tableStatus = true">修改</el-button>
        <el-dialog fullscreen title="格式设置" width="80%"  :visible.sync="tableStatus" append-to-body>
          <el-button  type="primary" @click="add">新增</el-button>
          <dragTreeTable :data="treeData" :onDrag="onTreeDataChange" :isdraggable="true"></dragTreeTable>

          <div slot="footer" class="dialog-footer">
            <el-button  @click="tableStatus=false">取消</el-button>
            <el-button type="primary" @click="subTab">确认</el-button>
            <el-button type="primary" disabled @click="temNameShow=true">另存为</el-button>
          </div>
        </el-dialog>
        <el-dialog title="另存为" width="50%" :visible.sync="temNameShow" append-to-body>
          <el-input placeholder="请出入新模板名称" v-model="temName">
            <template slot="prepend">模板名称</template>
          </el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="temNameShow=false">取消</el-button>
            <el-button type="primary" @click="subName">确认</el-button>
          </div>
        </el-dialog>
        <treeTableOperation
        v-model="treeinputShow"
        :id='checkTem'
        @inputShow='inputShow' />
        <treeTableEdit
        v-model="treeEditShow"
        :id='checkTem'
        :result='editObj'
        @treeEdit='treeEdit' />
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button  @click="close">取消</el-button>
        <el-button @click="sub" type="primary">完成</el-button>
      </div>
    </el-dialog>
</template>

<script>
import { format } from './data.js'
import ReportService from '@/service/report-service'
import dragTreeTable from 'drag-tree-table'
import treeTableOperation from './treeTableOperation'
import treeTableEdit from './treeTableEdit'
export default {
  components: {
    dragTreeTable,
    treeTableEdit,
    treeTableOperation
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String],
      default: 1
    }
  },
  data () {
    return {
      listM: [],
      treeDataHead: [],
      editObj: {}, // 用于编辑Tree表格
      treeinputShow: false,
      treeEditShow: false,
      type: [], // 合计方式选项
      show: this.value, // 页面设置模块显示状态
      temNameShow: false, // 另存为显示状态
      tableStatus: false, // 页面配置表格显示状态
      checkTem: '', // 当前模板
      temName: '', // 另存为模板名称
      gridData: format.data, // 表格数据
      options: [],
      treeData: {
        lists: [
          {
            id: 11,
            parent_id: 0,
            'code': 's1',
            'field': 'field1',
            'fieldName': '列1',
            'width': '100',
            'method': 'avg',
            'fieldType': 'string',
            'show': true,
            'order': true,
            'col': '',
            'twa': '加权因子',
            open: !0,
            lists: [
              {
                id: 187,
                parent_id: 11,
                'code': 's2',
                'field': 'field1',
                'fieldName': '列12',
                'width': '100',
                'method': 'avg',
                'fieldType': 'string',
                'show': true,
                'order': true,
                'col': '',
                'twa': '加权因子'
              }
            ] },
          {
            id: 12,
            parent_id: 0,
            'code': 's3',
            'field': 'field1',
            'fieldName': '列2',
            'width': '300',
            'method': 'avg',
            'fieldType': 'string',
            'show': true,
            'order': true,
            'col': '',
            'twa': '加权因子',
            open: !0,
            lists: [
              {
                id: 186,
                parent_id: 12,
                'code': 's4',
                'field': 'field1',
                'fieldName': '列12',
                'width': '100',
                'method': 'avg',
                'fieldType': 'string',
                'show': true,
                'order': true,
                'col': '',
                'twa': '加权因子'
              }
            ] }
        ],
        custom_field: {
          id: 'id',
          lists: 'lists',
          parent_id: 'parent_id'
        },
        columns: [
          {
            type: 'selection',
            title: '编号',
            field: 'id',
            width: 200,
            align: 'center',
            formatter: (item) => {
              return '<a>' + item.id + '</a>'
            }
          },
          {
            title: '列名',
            field: 'field',
            width: 200,
            align: 'center'
          },
          {
            title: '显示项目',
            field: 'fieldName',
            width: 200,
            align: 'center'
          },
          {
            title: '宽度',
            field: 'width',
            width: 200,
            align: 'center'
          },
          {
            title: '合计方式',
            field: 'method',
            width: 200,
            align: 'center'
          },
          {
            title: '项目类型',
            field: 'fieldType',
            width: 200,
            align: 'center'
          },
          {
            title: '是否显示',
            field: 'ishow',
            width: 200,
            align: 'center',
            formatter: (item) => {
              let text = item.ishow * 1 ? '是' : '否'
              return '<a>' + text + '</a>'
            }
          },
          {
            title: '是否排序',
            field: 'iorder',
            width: 200,
            align: 'center',
            formatter: (item) => {
              let text = item.iorder * 1 ? '是' : '否'
              return '<a>' + text + '</a>'
            }
          },
          {
            title: '自定义列',
            field: 'col',
            width: 200,
            align: 'center'
          },
          {
            title: '加权因子',
            field: 'twa',
            width: 200,
            align: 'center'
          },
          {
            title: '操作',
            type: 'action',
            width: 350,
            align: 'center',
            actions: [
              {
                text: '编辑',
                onclick: this.edit,
                formatter: (item) => {
                  return '<i>编辑</i>'
                }
              },
              {
                text: '删除',
                onclick: this.delete,
                formatter: (item) => {
                  return ' <i>删除</i>'
                }
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    getData () {
      ReportService.reportStyleList(this.id).then(res => {
        this.options = res.data
        this.checkTem = (res.data.filter(item => item.currentFlag === '1'))[0].id
      })
    },
    getBody () {
      ReportService.styleTable(this.checkTem).then(res => {
        this.$set(this.treeData, 'lists', res.data.bodys)
        this.treeDataHead = res.data.head
        // this.treeData.lists = res.data.bodys
      })
    },
    inputShow (e) {
      this.treeinputShow = false
      console.log(e)
      if (e) {
        this.getBody()
      }
    },
    treeEdit (e) {
      this.treeEditShow = false
      console.log(e)
      if (e) {
        this.getBody()
      }
    },
    // 新增
    add () {
      this.treeinputShow = true
    },
    // 编辑
    edit (row) {
      this.editObj = row
      console.log(this.editObj)
      this.treeEditShow = true
      console.log('编辑按钮')
      console.log(row)
    },
    // 删除
    delete (row, data = this.treeData.lists) {
      for (var i in data) {
        if (row.id === data[i].id) {
          console.log('查询成功：id=' + row.id)
          if (data[i].field) {
            this.$message.error('默认字段不能删除')
          } else {
            data.splice(i, 1)
          }
          break
        } else {
          this.delete(row, data[i].lists)
        }
      }

      // console.log(e)
    },
    onTreeDataChange (list) {
      this.treeData.lists = list
      console.log(list)
      // custom_field.list === 'children'
      // 自定义lists相应的回传数据也用相同字段
      // this.treeData.children = list
    },
    close () {
      this.show = false
      this.$emit('colosePageSetting')
    },
    sub () {
      console.log('选择当前的模板样式')
      ReportService.styleHeadSet(this.checkTem).then(res => {
        this.$message('选择成功')
        this.show = false
        this.$emit('colosePageSetting', true)
      })
    },
    restList (data) {
      data.map(item => {
        this.listM.push(item)
        if (item.lists.length > 0) {
          this.restList(item.lists)
        }
      })
    },
    // 提交自定义表头
    subTab () {
      this.restList(this.treeData.lists.map((item, index) => {
        item.sn = index
        return item
      }))
      this.treeData.lists = this.listM
      console.log(this.listM)
      ReportService.styleHeadUpdate({
        head: this.treeDataHead,
        bodys: this.treeData.lists
      })
      console.log(this.treeData)
      this.tableStatus = false
    },
    // 提交另存为模板名称
    subName () {
      delete this.treeDataHead.id
      this.treeDataHead.name = this.temName
      console.log(this.treeDataHead)
      ReportService.styleHeadCreate({
        head: this.treeDataHead,
        bodys: this.treeData.lists
      }).then(res => {
        this.temNameShow = false
        this.tableStatus = false
        this.getData()
      })
    }
  },
  watch: {
    value (n) {
      this.show = n
      if (n) {
        this.getData()
      }
    },
    tableStatus (n) {
      if (n) {
        this.getBody()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.pageFlex {
  display: flex;
}
</style>
