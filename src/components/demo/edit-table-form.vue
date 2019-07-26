<template>
  <div style="position:relative;height:100%;">
    <basic-container>
    <optionalForm :id="'source_optional'" :tableHeader="option"   v-model="list" @on-change="saveForm">
    </optionalForm>
    </basic-container>
    <div class="fixbottom">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit-table-form',
  data () {
    return {
      currentPage: 1,
      list: [],
      option: [
        {
          label: '列名',
          name: 'fieldName',
          type: 'plain'
        },
        {
          label: '类型',
          name: 'fieldType',
          type: 'plain'
        },
        {
          label: '列名说明',
          name: 'fieldExplain',
          type: 'text'
        },
        {
          label: '允许补录',
          name: 'isSupplement',
          type: 'checkbox'
        },
        {
          label: '允许编辑',
          name: 'isUpdate',
          type: 'checkbox'
        },
        {
          label: '数据精度',
          name: 'accuracy',
          type: 'select'
        },
        {
          label: '是否显示',
          name: 'isShow',
          type: 'checkbox'
        },
        {
          label: '显示顺序',
          name: 'seq',
          type: 'plain'
        },
        {
          label: '操作',
          type: 'operation',
          list: [
            {
              label: '编辑',
              type: 'edit'
            },
            {
              label: '删除',
              type: 'delete'
            }

          ]
        }
      ]
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$message.info(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.$message.info(`当前页: ${val}`)
    },
    saveForm (data) {
      this.list = data
    }
  },
  watch: {
    list: function () {
      console.log(this.list)
    }
  },
  mounted () {
    let list = [
      {
        id: 1,
        fieldName: 'billno',
        fieldType: '字符',
        fieldExplain: '化验单号',
        isSupplement: true,
        isUpdate: true,
        accuracy: '',
        isShow: true,
        seq: 0
      },
      {
        id: 2,
        fieldName: 'customer_name',
        fieldType: '字符',
        fieldExplain: '送样单位名称',
        isSupplement: true,
        isUpdate: true,
        accuracy: '',
        isShow: true,
        seq: 1
      },
      {
        id: 3,
        fieldName: 'nums',
        fieldType: '数字',
        fieldExplain: '样品数量',
        isSupplement: true,
        isUpdate: true,
        accuracy: 'INTEGER',
        isShow: true,
        seq: 2
      },
      {
        id: 4,
        fieldName: 'sampling_time',
        fieldType: '时间',
        fieldExplain: '采样时间',
        isSupplement: true,
        isUpdate: true,
        accuracy: '',
        isShow: true,
        seq: 3
      }
    ]
    list.map((v) => {
      this.list.push(v)
    })
  }
}
</script>

<style lang="scss" scoped>
.fixbottom{
  width: 100%;
  padding: 5px;
  background: #fff;
  position: absolute;
  bottom: 44px;
  left: 0;
}
</style>
