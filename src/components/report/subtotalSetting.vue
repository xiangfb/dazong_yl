<template>
  <el-dialog width="55%" title="小计设置" @close='close' :visible.sync="show">
      <div>
        <el-form :inline="true"  :model="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="小计名称">
                <el-input v-model="formInline.title" placeholder="小计名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="小计类型">
                <el-radio v-model="countType" label="list">列表</el-radio>
                <el-radio v-model="countType" label="tree">层级</el-radio>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-form-item label="小计级次">
            <el-select v-model="formInline.level" placeholder="小计级次">
              <el-option
                v-for="(item,index) in levels"
                :key="index"
                :label="item"
                :value="index+1"
              ></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <el-transfer
          v-model="smallArr"
          :data="smallResult"
          @left-check-change='leftCheck'
          @change="trans"
          :props="{
          key: 'key',
          label: 'fieldName'
        }"
        >
        <span slot-scope="{ option }">
          <el-tag>{{ option.level }}级  {{ option.fieldName }}  ({{option.title}})</el-tag>
        </span>
        </el-transfer>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button @click="sub" type="primary">完成</el-button>
      </div>
    </el-dialog>
</template>

<script>
import ReportService from '@/service/report-service'
import { restArr } from './data.js'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      show: this.value,
      formInline: {
        level: '',
        title: ''
      },
      countType: 'list',
      smallArr: [], // 小计设置选中项
      smallResult: [], // 小计设置数据体
      subList: [],
      levels: []
    }
  },
  methods: {
    trans (a, o, k) {
      console.log(o)
      if (o === 'right') {
        let arr = []
        this.smallArr.map(item => {
          // this.smallResult[k].level = this.formInline.level
          k.map(i => {
            this.smallResult[i].title = this.formInline.title
          })
          arr.push(this.smallResult[item])
        })
        this.subList = arr
        console.log(98998)
        console.log(this.smallResult)
        console.log(this.smallArr)
        console.log(k)
      } else {
        let arr = []
        this.smallArr.map(item => {
          // this.smallResult[k].level = this.formInline.level
          k.map(i => {
            this.smallResult[i].title = this.formInline.title
          })
          arr.push(this.smallResult[item])
        })
        this.subList = arr
      }
    },
    leftCheck (key) {
      // this.formInline.level = this.smallResult[key[0]].level
      this.formInline.title = this.smallResult[key[0]].title
    },
    close () {
      this.show = false
      this.$emit('closeSubtotalSetting')
    },
    sub () {
      this.show = false
      console.log(this.subList)
      ReportService.subtotal({
        templateId: this.id,
        countInfo: this.subList,
        countType: this.countType
      }).then(res => {
        this.$emit('closeSubtotalSetting', true)
      })
    }
  },
  watch: {
    value (n) {
      this.show = n
      if (n) {
        ReportService.getSubtotal(this.id).then(res => {
          this.levels = res.data.levels
          this.countType = res.data.countType
          restArr(this,
            'smallResult',
            'smallArr',
            res.data.leftResult,
            res.data.rightResult
          )
          console.log(this.smallResult)
        })
      } else {
        this.formInline = {
          level: '',
          title: ''
        }
        this.smallArr = [] // 小计设置选中项
        this.smallResult = [] // 小计设置数据体
        this.levels = []
      }
    }
  }
}
</script>
