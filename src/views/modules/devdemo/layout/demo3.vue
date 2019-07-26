<template>
<div class="p-10">
  <div class="p-20 bg-white">
    <div class="p-b-30 fs20">
      货源单信息
    </div>
    <div>
      <el-form ref="form" :model="form" label-width="160px">
        <el-row :span='24'>
          <el-col :span='8'>
            <el-form-item label="用户姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="权限组别">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="权限状态">
              <el-input v-model="form.enable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span='24'>
          <el-col :span='8'>
            <el-form-item label="联系电话">
              <el-input v-model="form.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="电子邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="备注">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
  <div class="p-10 bg-white relative">
    <hr style="opacity:0.2;"/>
    <span style="padding:5px;background:#fff;display:inline-block; left:20px;top:0px;display:inline-block;" class="bg-white absolute fs20">车辆信息</span>
  </div>
  <div class="p-20 bg-white" v-if="op === 'list'">
    <div class="m-b-10 op">
      <div class="btn-group">
        <CustomBtnGroup @on-click="compile" :limit="3" :btnGroup="btnGroup"></CustomBtnGroup>
      </div>
      <div>
        <CustomSearch/>
      </div>
    </div>
    <CustomTable
      class="m-b-25"
      ref="goodsOrder"
      :Showselection="true"
      :data="data1"
      id="userInfo"
      rowKey="id"
      @row-click="rowClick"
      @selection-change="selectionChange"
      :tableHeader="tableHeader"
      @on-urlclick="urlAddress"
    ></CustomTable>
    <div style="text-align:right;">
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next"
      :total="total">
      </el-pagination>
    </div>
  </div>
  <div class="p-20 bg-white" v-else>

  </div>
  <el-dialog
    title="订单查询"
    :visible.sync="orderQueryVisible"
    width="60%"
    append-to-body
    :before-close="handleClose">
    <el-row :gutter="20">
      <el-col :span="8" class="h-full">
        <div class="queryBox">
          <div v-for="(item, index) in queryProgramList" :key="index"></div>
        </div>
      </el-col>
      <el-col :span="16">
        <el-form :model="queryOrderForm" :rules="queryOrderRules" ref="queryOrderForm" label-width="100px">
          <el-form-item label="订单类型" prop="orderType">
            <el-select v-model="queryOrderForm.orderType" placeholder="请选择">
              <el-option
                v-for="item in queryOrderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客商名称" prop="merchantsName">
            <div class="mo-input"  @click="chooseMerchantsName"></div>
          </el-form-item>
          <el-form-item label="订单编号" prop="orderNo">
            <el-input v-model="queryOrderForm.orderNo"></el-input>
          </el-form-item>
          <el-form-item label="物料分类" prop="materielCategory">
            <div class="mo-input" @click="chooseMaterielCategory"/>
          </el-form-item>
          <el-form-item label="物料名称" prop="materielName">
            <div class="mo-input"  @click="chooseMaterielName"/>
          </el-form-item>
          <el-form-item label="物料编号" prop="materielCode">
            <div class="mo-input" @click="chooseMaterielName"/>
          </el-form-item>
          <el-form-item label="收货公司" prop="receivingCompanyName">
            <el-input v-model="queryOrderForm.receivingCompanyName" ></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="receivingAddr">
            <el-input v-model="queryOrderForm.receivingAddr"></el-input>
          </el-form-item>
          <el-form-item label="发货公司" prop="deliveryCompanyName">
            <el-input v-model="queryOrderForm.deliveryCompanyName"></el-input>
          </el-form-item>
          <el-form-item label="发货地址" prop="deliveryAddr">
            <el-input v-model="queryOrderForm.deliveryAddr"></el-input>
          </el-form-item>
          <el-form-item label="订单日期" prop="orderDate">
            <el-date-picker
              v-model="orderDate"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="queryOrder">查询</el-button>
      <el-button type="primary" @click="saveProgram">保存方案</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="选择订单"
    :visible.sync="orderVisible"
    width="60%"
    append-to-body
    :before-close="handleOrderClose">
    <div>
      <OrderComponent/>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelOrder">取 消</el-button>
      <el-button type="primary" @click="createGoodsOrder">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    fullscreen
    title="货源单详情"
    append-to-body
    width="90%"
    :visible.sync="createGoodsOrderVisible"
    :before-close="cancelCreate">
      <div class="title align-left m-b-10">货源单号:{{goodsOrder}}</div>
      <CreateGoodsOrder :editable="editable" :type.sync="opType"></CreateGoodsOrder>
  </el-dialog>
  <div class="align-center p-30 bg-white"><el-button class="btn-lg" type="primary">保存</el-button><el-button class="btn-lg">取消</el-button></div>
</div>
</template>

<script>
import TestService from 'service/test-service'
import { OrderComponent, CreateGoodsOrder } from 'components/bussiness/index'
export default {
  components: {
    OrderComponent,
    CreateGoodsOrder
  },
  data () {
    return {
      form: {
        name: '1212',
        roleName: '管理员',
        enable: '启用',
        mobile: '13754961234',
        email: '1234567@qq.com',
        remark: '这是备注信息'
      },
      op: 'list', // 要展示的页面 list 列表  add/edit/view 新增/修改/查看
      opType: 'normal', // 按钮类型 [normal, special] normal代表需要展示操作按钮，special 代表需要展示保存和取消按钮
      editable: true, // 表单是否可编辑
      goodsOrder: 'TYTC031154678', // 货源单编号
      createGoodsOrderVisible: false, // 创建货源单抽屉显示隐藏
      orderVisible: false, // 订单列表显示隐藏
      orderQueryVisible: false, // 订单查询显示隐藏
      currentPage: 1, // 当前显示第几页
      total: 5, // 共几页
      pageSizes: [1, 2, 3, 4, 5], // 每页显示条数
      pageSize: 1, // 默认每页显示条数
      multipleSelection: [],
      queryProgramList: [],
      btnGroup: [
        {
          icon: 'el-icon-plus',
          btnType: 'primary',
          permision: '',
          name: 'add',
          label: '生成货源单',
          type: 'btn'
        },
        {
          icon: 'el-icon-edit',
          btnType: '',
          permision: '',
          name: 'edit',
          label: '修改',
          type: 'btn'
        },
        {
          icon: 'el-icon-delete',
          btnType: '',
          permision: '',
          name: 'delete',
          label: '删除',
          type: 'btn'
        },
        {
          icon: 'el-icon-tickets',
          btnType: '',
          permision: '',
          name: 'approval',
          label: '审批',
          type: 'btn'
        },
        {
          btnType: '',
          permision: '',
          name: 'reject',
          label: '驳回',
          type: 'btn'
        },
        {
          btnType: '',
          permision: '',
          name: 'search',
          label: '查询',
          type: 'btn'
        },
        {
          btnType: '',
          permision: '',
          name: 'drop',
          label: '作废',
          type: 'btn'
        }
      ],
      tableHeader: [
        {
          fieldName: 'goodsSupplyNo',
          fieldExplain: '货源单号'
        },
        {
          fieldName: 'beginDate',
          fieldExplain: '开始时间'
        },
        {
          fieldName: 'endDate',
          fieldExplain: '结束时间'
        },
        {
          fieldName: 'businessType',
          fieldExplain: '业务类型'
        },
        {
          fieldName: 'sourceNo',
          fieldExplain: '来源单号'
        },
        {
          fieldName: 'deliveryCompanyName',
          fieldExplain: '发货公司'
        },
        {
          fieldName: 'receivingCompanyName',
          fieldExplain: '收货公司'
        },
        {
          fieldName: 'receivingPlace',
          fieldExplain: '收货地点'
        },
        {
          fieldName: 'receivingAddr',
          fieldExplain: '收货地址'
        },
        {
          fieldName: 'orderStatus',
          fieldExplain: '进度'
        },
        {
          fieldName: 'orderStatus',
          fieldExplain: '订单状态'
        },
        {
          fieldName: 'orderStatus',
          fieldExplain: '总车数'
        },
        {
          fieldName: 'orderStatus',
          fieldExplain: '是否完善'
        }
      ],
      formLabelWidth: '200px',
      labelPosition: 'left',
      fileList2: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      selectList: [],
      goodsSearch: '',
      title: '',
      queryOrderForm: {
        orderType: null,
        merchantsName: null,
        orderNo: null,
        materielCategory: null,
        materielName: null,
        materielCode: null,
        receivingAddr: null,
        receivingCompanyName: null,
        deliveryCompanyName: null,
        deliveryAddr: null,
        orderDateStart: null,
        orderDateEnd: null
      },
      orderDate: [],
      queryOrderRules: {},
      queryOrderOptions: [
        {
          label: '销售单',
          value: 0
        }
      ]
    }
  },
  watch: {
    orderDate (n) {
      if (n) {
        this.queryOrderForm.orderDateStart = n[0]
        this.queryOrderForm.orderDateEnd = n[1]
      } else {
        this.queryOrderForm.orderDateStart = null
        this.queryOrderForm.orderDateEnd = null
      }
    }
  },
  methods: {
    rowClick (row) {
      this.$refs.goodsOrder.toggleRowSelection(row)
    },
    cancelCreate (done) {
      done()
    },
    cancelOrder () {
      this.orderVisible = false
    },
    handleOrderClose (done) {
      done()
    },
    createGoodsOrder () {
      this.createGoodsOrderVisible = true
    },
    chooseReceivingAddr () {},
    chooseMaterielName () {},
    chooseMaterielCategory () {},
    chooseMerchantsName () {
      console.log('mate')
    },
    queryOrder () {
      this.orderVisible = true
    },
    saveProgram () {
      this.queryOrder()
    },
    handleClose (done) {
      done()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.$message.success(`当前页: ${val}`)
    },
    handleSizeChange (val) {
      this.$message.success(`每页 ${val} 条`)
    },
    compile (e) {
      switch (e) {
        case 'add':
          this.opType = 'special'
          this.orderQueryVisible = true
          // this.$router.push('mycar/addcar')
          break
        case 'delete':
          this.open()
          break
        case 'edit':
          this.opType = 'special'
          this.createGoodsOrderVisible = true
          break
      }
    },
    // 选择
    selectionChange (list) {
      this.selectList = list
    },
    // 删除
    open () {
      if (this.selectList.length) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '请选择要删除的信息'
        })
      }
    },
    handleSearch () {},
    urlAddress () {
      this.$router.push('mycar/details/1')
    }
  },
  created () {
    TestService.api().then(res => {})
    this.data1 = [
      {
        date: '2016-05-03',
        name: '111',
        carType: '车辆类型',
        plateNumber: '厂A603HJ',
        isDangerousChemicals: '是',
        isSelfDump: '是',
        status: '正常',
        approveStatus: '已认证',
        qualifications: '危化品资质',
        carOwner: '企业',
        relateNum: '1',
        remark: '备注',
        id: 1
      }, {
        date: '2016-05-03',
        name: '222',
        carType: '车辆类型',
        plateNumber: '厂A603HJ',
        isDangerousChemicals: '是',
        isSelfDump: '是',
        status: '正常',
        approveStatus: '已认证',
        qualifications: '危化品资质',
        carOwner: '企业',
        relateNum: '1',
        remark: '备注',
        id: 2
      }
    ]
  }
}
</script>
<style lang="scss" scoped>
.span {
  font-weight: 400;
  color: #606266;
  display: inline-block;
  font-size: 13px;
  height: 32px;
  line-height: 32px;
  padding: 2px, 0;
  vertical-align: top;
  box-sizing: border-box;
}
.el-pagination {
  display: inline-block
}
.op{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn-group{
    flex: 1;
  }
}
.queryBox{
  height: 100%;
  min-height: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid #f1f1f1;
  overflow: hidden;
  overflow-y: auto;
  padding: 0 5px;
}
.mo-input{
  height: 32px;
  border: 1px solid #DCDFE6;
  border-radius: 3px;
  background: #f5f7fa;
  cursor: pointer;
}
</style>
