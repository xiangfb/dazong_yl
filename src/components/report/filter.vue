<template>
  <div>
    <el-dialog @close="close" width="75%" title="条件筛选" :visible.sync="show">
      <el-table :data="tableData" style="width: 100%">
         <!-- <el-table-column label="序号">
          <template slot-scope="scope">
            {{scope.row.sn}}
          </template>
        </el-table-column> -->
        <el-table-column label="左(">
          <template slot-scope="scope">
            <el-select clearable v-model="scope.row.leftSymbol"  placeholder="请选择">
              <el-option
                v-for="item in leftOtions"
                :key="item.value"
                :label="item.label"
                :value="{value:item.value,label:item.label}"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="查询项目">
          <template slot-scope="scope">
            <el-select clearable v-model="scope.row.field"  placeholder="请选择">
              <el-option
                v-for="item in fieldList"
                :key="item.field"
                :label="item.fieldName"
                :value="{value:item.field,label:item.fieldName}"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="比较符">
          <template slot-scope="scope">
            <el-select clearable v-model="scope.row.op"  placeholder="请选择">
              <el-option
                v-for="item in compare"
                :key="item.key"
                :label="item.value"
                :value="{value:item.key,label:item.value}"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="查询值">
          <template slot-scope="scope">
            <el-input v-model="scope.row.value" :placeholder="scope.row.value"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="右)">
          <template slot-scope="scope">
            <el-select clearable v-model="scope.row.rightSymbol"  placeholder="请选择">
              <el-option
                v-for="item in rightOtions"
                :key="item.value"
                :label="item.label"
                :value="{value:item.value,label:item.label}"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="连接符">
          <template slot-scope="scope">
            <el-select clearable v-model="scope.row.linkChar"  placeholder="请选择">
              <el-option
                v-for="item in link"
                :key="item.value"
                :label="item.value===''?'空':item.value"
                :value="{value:item.key,label:item.value}"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="addRow">添加</el-button>
            <el-button
              size="mini"
              type="text"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="sub">查询</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ReportService from '@/service/report-service'
import { operator } from './data.js'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false,
      num: 1,
      operator,
      fieldList: [],
      compare: [], // 比较符
      link: [], // 连接符
      tableData: [
        {
          sn: 1,
          leftSymbol: '',
          field: '',
          op: '',
          value: '',
          rightSymbol: '',
          linkChar: ''
        }
      ],
      leftOtions: [{ value: '(', label: '(' }],
      rightOtions: [{ value: ')', label: ')' }]
    }
  },
  methods: {
    addRow () {
      this.tableData.push({
        sn: ++this.num,
        leftSymbol: '',
        field: '',
        op: '',
        value: '',
        rightSymbol: '',
        linkChar: ''
      })
    },
    deleteRow (index, rows) {
      if (this.tableData.length <= 1) {
        this.$message('至少保留一条筛选条件')
        return false
      }
      rows.splice(index, 1)
    },
    // 关闭的回调
    close () {
      this.show = false
      this.$emit('closeFilter')
    },
    // 提交事件
    sub () {
      this.show = false

      this.$emit('closeFilter', this.tableData)
    }
  },
  mounted () {
  },
  watch: {
    value (n, o) {
      this.show = n
      if (n === true) {
        this.tableData = [
          {
            sn: 1,
            leftSymbol: '',
            field: '',
            op: '',
            value: '',
            rightSymbol: '',
            linkChar: ''
          }
        ]
        ReportService.queryCompareChar().then(res => {
          this.compare = res.data
        })
        ReportService.queryLinkChar().then(res => {
          this.link = res.data
          console.log(this.link)
        })
        ReportService.getTemData({
          search: 0,
          templateType: 'pu_weight'
        }).then((res) => {
          this.fieldList = res.data
          console.log(res.data)
          // this.$router.push('/')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
