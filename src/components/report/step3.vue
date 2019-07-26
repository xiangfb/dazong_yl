<template>
  <div>
    <my-table :col="tabHeader"
      :total='total'
      :select='select'
      @selectionFn='selectionFn'
      @current-change='currentChange'
      @size-change = 'sizeChange'
      :data="tabBody">
    </my-table>

  </div>
</template>

<script>
import MyTable from '../headTable/MyTable'
export default {
  components: {
    MyTable
  },
  props: {
    select: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    tabHeader: {
      type: Array
    },
    tabBody: {
      type: Array
    }
  },
  data () {
    return {
      currentPage: 1,
      col: [
        {
          prop: 'date',
          label: '日期'
        },
        {
          label: '配送信息',
          children: [
            {
              prop: 'name',
              label: '姓名'
            },
            {
              label: '地址',
              children: [
                {
                  prop: 'province',
                  label: '省份'
                },
                {
                  prop: 'city',
                  label: '市区'
                },
                {
                  prop: 'address',
                  label: '地址'
                }
              ]
            }
          ]
        }
      ],
      data: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ]
    }
  },

  methods: {
    selectionFn (e) {
      this.$emit('selectionFn', e)
    },
    sizeChange (val) {
      console.log(`每页 ${val} 条`)

      this.$emit('changeData', { ps: val })
    },
    currentChange (val) {
      console.log(`当前页: ${val}`)
      this.$emit('changeData', { pn: val })
    }
  },
  watch: {
    tabHeader (n) {
      console.log('我变了')
      console.log(n)
      this.tabHeader = n
    }
  }
}
</script>
<style>
.foot{
  padding-top: 10px;
  padding-right: 5%;
  display: flex;
  justify-content: flex-end;
}
</style>
