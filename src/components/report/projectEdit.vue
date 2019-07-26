<template>
  <div>
    <el-dialog :modal="false" @close="close" width="75%" title="项目修改" :visible.sync="show">
      <!-- <div>
        <el-input placeholder="请输入内容" v-model="input3">
          <template slot="prepend">项目名称：</template>
        </el-input>
      </div> -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="函数">
          <template slot-scope="scope">
            <el-select v-model="scope.row.type" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="左(">
          <template slot-scope="scope">
            <el-select v-model="scope.row.leftData" clearable placeholder="请选择">
              <el-option
                v-for="item in leftOtions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>

        <!-- <el-table-column label="左(" >
          <template slot-scope="scope">
            <el-input v-model="input" :placeholder="scope.row.leftData"></el-input>
          </template>
        </el-table-column>-->
        <el-table-column label="项目列">
          <template slot-scope="scope">
            <el-select v-model="scope.row.content" clearable placeholder="请选择">
              <el-option
                v-for="item in step"
                :key="item.field"
                :label="item.fieldName"
                :value="item.index"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="右)">
          <template slot-scope="scope">
            <el-select v-model="scope.row.rightData" clearable placeholder="请选择">
              <el-option
                v-for="item in rightOtions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作符">
          <template slot-scope="scope">
            <el-select v-model="scope.row.operator" clearable placeholder="请选择">
              <el-option
                v-for="item in operator"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="addRow">添加</el-button>
            <el-button size="mini" type="text" @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show=false">取消</el-button>
        <el-button type="primary" @click="sub">完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ReportService from '@/service/report-service'
import { options, operator } from './data.js'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    keyR: {
      type: Number
    }
  },
  data () {
    return {
      show: false,
      operator,
      options,
      input: '',
      type: '',
      step: [],
      tableData: [
        {
          type: 'sum',
          operator: '',
          leftData: '',
          rightData: '',
          content: ''
        }
      ],
      leftOtions: [{ value: '(', lable: '(' }],
      rightOtions: [{ value: ')', lable: ')' }],
      input3: ''
    }
  },
  methods: {
    addRow () {
      this.tableData.push({
        type: '',
        operator: '',
        leftData: '',
        rightData: '',
        content: ''
      })
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    // 关闭的回调
    close () {
      this.show = false
      this.$emit('propStatus', this.show)
    },
    // 提交事件
    sub () {
      console.log(this.step)
      // eslint-disable-next-line no-unused-vars
      var ch = ''
      // eslint-disable-next-line no-unused-vars
      var en = ''
      // eslint-disable-next-line no-unused-vars
      var dataObj = this.step
      console.log(this.tableData)
      this.show = false
      this.tableData.map(item => {
        item.type = item.type === null ? '' : item.type
        item.operator = item.operator === null ? '' : item.operator
        item.leftData = item.leftData === null ? '' : item.leftData
        item.rightData = item.rightData === null ? '' : item.rightData
        item.content = item.content === null ? '' : item.content
        if (item.type !== '') {
          var nowType = this.options.filter(val => val.value === item.type)
          en += nowType[0].value
        }
        en += item.leftData
        if (item.content !== '') {
          en += dataObj[item.content].field
        }
        en += item.rightData
        en += item.operator
        if (item.type !== '') {
          // eslint-disable-next-line no-redeclare
          var nowType = this.options.filter(val => val.value === item.type)
          ch += nowType[0].label
        }
        ch += item.leftData
        if (item.content !== '') {
          ch += dataObj[item.content].fieldName
        }
        ch += item.rightData
        ch += item.operator
      })
      console.log('ch=' + ch)
      console.log('en=' + en)
      let data = { ch, en, method: this.tableData[0].type, show: this.show }
      this.$emit('propStatus', data)
    }
  },
  mounted () {
  },
  watch: {
    value (n, o) {
      this.show = n
      if (n === true) {
        this.tableData = [
          { type: 'sum', operator: '', leftData: '(', rightData: ')', content: this.keyR }
        ]
        ReportService.getTemData({
          count: 1,
          templateType: 'pu_weight'
        }).then((res) => {
          this.step = res.data.map((item, index) => {
            item['index'] = index
            return item
          })
          console.log('=-=-=-=-=-=-=-==')
          console.log(this.data)
          // this.$router.push('/')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
