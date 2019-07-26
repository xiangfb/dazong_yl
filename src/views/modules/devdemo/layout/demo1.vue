<template>
  <el-container height="100%" class="p-10 p-t-0">
    <!-- <el-header>
      <div class="float-left">
        <CustomBtnGroup @on-click="compile" :limit="5" :btnGroup="btnGroup"></CustomBtnGroup>
      </div>
      <div class="float-right">
        <el-input :size="'medium'" placeholder="快速搜索。。" v-model="input">
          <el-button :size="'medium'" type="primary" slot="append"><i class="el-icon-search"></i></el-button>
        </el-input>
      </div>
    </el-header> -->
    <el-main>
      <el-card class="box-card">
        <CustomTable @on-btnclick="btnclick" :Showselection="true" :data="data" id="demo3" rowKey="id" :tableHeader="tableHeader"></CustomTable>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'devdemo4',
  data () {
    return {
      tableHeader: [
        {
          fieldName: 'code',
          fieldExplain: '登记单号',
          sortable: true,
          sortOrders: ['ascending']
        },
        {
          fieldName: 'carId',
          fieldExplain: '车牌号'
        },
        {
          fieldName: 'idCard',
          fieldExplain: '卡号'
        },
        {
          fieldName: 'busitype',
          fieldExplain: '业务类型',
          formatType: 'ENUM',
          mapper: [
            {
              label: '销售',
              value: 'sell',
              color: '#67c23a'
            },
            {
              label: '采购',
              value: 'buy',
              color: '#f56c6c'
            }
          ]
        },
        {
          fieldName: 'codestatus',
          fieldExplain: '登记单状态',
          type: 'tag',
          sortable: true,
          formatType: 'BOOLEAN',
          mapper: [
            {
              label: '已审核',
              value: true,
              color: '#67c23a'
            },
            {
              label: '未审核',
              value: false,
              color: '#f56c6c'
            }
          ]

        },
        {
          fieldExplain: '去验证信息',
          formatType: 'BUTTON',
          btnType: 'primary',
          eventType: 'on-click'
        }

      ],
      data: [
        {
          id: 1,
          code: 'DJD35777891',
          carId: '晋A03556',
          idCard: '9664dad56',
          busitype: 'buy',
          codestatus: false
        },
        {
          id: 2,
          code: 'DJD35777892',
          carId: '晋A05756',
          idCard: '9664dad56',
          codestatus: false,
          busitype: 'sell'
        },
        {
          id: 3,
          code: 'DJD35777893',
          carId: '晋A03657',
          codestatus: false,
          busitype: 'buy'
        },
        {
          id: 4,
          codestatus: false,
          code: 'DJD35777894',
          busitype: 'sell',
          carId: '晋A56678'
        },
        {
          id: 5,
          codestatus: false,
          code: 'DJD35777895',
          busitype: 'sell',
          carId: '晋A58876'
        },
        {
          id: 6,
          codestatus: false,
          code: 'DJD35777896',
          busitype: 'sell',
          carId: '晋A09964'
        },
        {
          id: 7,
          codestatus: true,
          code: 'DJD35777898',
          busitype: 'buy',
          idCard: '9664dad56',
          carId: '晋A03336'
        },
        {
          id: 8,
          codestatus: false,
          code: 'DJD35777897',
          busitype: 'buy',
          carId: '晋A03758'
        },
        {
          id: 9,
          code: 'DJD35777898',
          codestatus: false,
          busitype: 'buy',
          carId: '晋A05468'
        },
        {
          id: 10,
          codestatus: false,
          code: 'DJD35777899',
          busitype: 'buy',
          carId: '晋A37755'
        },
        {
          id: 11,

          codestatus: false,
          code: 'DJD35777811',
          busitype: 'buy',
          carId: '晋A56678'
        }
      ],
      input: '',
      btnGroup: [
        {
          btnType: 'primary',
          permision: 'sys_menu_add',
          name: 'add',
          label: '新增',
          type: 'btn'
        },
        {
          btnType: 'primary',
          permision: 'sys_menu_edit',
          name: 'edit',
          label: '修改',
          type: 'btn'
        },
        {
          btnType: 'primary',
          name: 'delete',
          permision: 'sys_menu_del',
          label: '删除',
          type: 'btn'
        },
        {
          btnType: 'primary',
          permision: 'sys_menu_del',
          name: 'import',
          label: '导入',
          type: 'btn'
        },
        {
          btnType: 'primary',
          name: 'refresh',
          permision: 'sys_menu_del',
          label: '刷新',
          type: 'btn'
        },
        {
          btnType: 'primary',
          permision: 'sys_menu_del',
          name: 'export',
          label: '导出',
          type: 'btn'
        }
      ]
    }
  },
  methods: {
    btnclick (row, item) {
      this.$message.info(item.label)
    },
    compile (e) {
      this.$message.info(e)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
