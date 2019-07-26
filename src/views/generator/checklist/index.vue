<!-- 化验单
  -- 20190619
  -- xfb
 -->
<!--模板信息 -->
<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="180px" style="background-color: rgb(194, 204, 220)">
      <el-menu
        mode="vertical"
        default-active="1"
        active-text-color="#000"
        v-for="(menu,index) in navData2" :key="index">
        <el-menu-item :index="index+''" @click="settype(menu.id)" style="margin:0px;">
          {{menu.value}}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!--按钮 -->
    <el-container>
      <el-header direction="vertical">
        <div>
          <el-button id="getchecklist" style="float:left" type="primary" size="medium"  @click="getCheckList">添加化验单</el-button>
          <el-button  style="float:right"  type="primary" icon="el-icon-search" @click="getbulaboratoryLists"></el-button>
          <el-input style="width: 30% !important;float:right"  v-model="input" placeholder="请输入姓名"/>
        </div>
      </el-header>
      <!--表单 -->
      <el-main>
        <!--显示内容 -->
        <template>
          <el-table :data="tableData" height="550px" style="width: 100%;height: 100%;"  highlight-current-row
                    >
            <el-table-column width="100" prop="sysUser.name" align="center" label="姓名"></el-table-column>
            <el-table-column width="110" prop="baDossier.createDate" align="center" label="就诊时间"></el-table-column>
            <el-table-column width="100" prop="baDossier.diseaseType" align="center" label="病型"></el-table-column>
            <el-table-column width="150" prop="baDossier.dossierType" align="center" label="档案级别" :formatter="dossierytpe"></el-table-column>
            <el-table-column width="100" prop="baDossier.dossierStatus" align="center" label="档案状态"></el-table-column>
            <el-table-column width="100" prop="laboratoryType" align="center" label="化验单类型" :formatter="laboratoryTypeFormat"></el-table-column>
           <!-- <el-table-column width="100" prop="diagnoseType" align="center" label="诊断类型"></el-table-column>-->

            <el-table-column width="100" prop="isUnusual" align="center" label="是否异常" :formatter="isunusuals"></el-table-column>
            <el-table-column width="200" prop="inspectTime" align="center" label="送检时间"></el-table-column>
            <el-table-column width="200" prop="reportTime" align="center" label="报告时间"></el-table-column>
            <el-table-column width="100" prop="inspectName" align="center" label="检验人员"></el-table-column>
            <el-table-column width="100" prop="assessor" align="center" label="审核人员"></el-table-column>
            <el-table-column width="200"  label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click=" getCheckListView(scope.row)" type="primary" icon="el-icon-info" size="small">详情</el-button>
                <el-button @click=" getCheckListEdit(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template>
          <div style="width: 100%;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="page.current"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="page.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total" style="float: right;">
            </el-pagination>
          </div>
        </template>
      </el-main>

    </el-container>

    <!--打开对话框:化验单对话框 -->
    <el-dialog title="化验单项目" :visible.sync="dialogTableVisible" width="60%">
      <el-form ref="ruleForm" :model="ruleForm"    style="text-align:center;">
        <el-input style="display:none;"  id="ruleForm_sysUser_id"  v-model="ruleForm.dossierId"></el-input>
        <el-input style="display:none;" id="ruleForm_id"  v-model="ruleForm.id"></el-input>
        <!-- 页眉 -->
        <h3>广汗法专科中医院化验单</h3>
        <hr />
        <table style="width: 100%;">
          <tr>
            <td class="titname">姓  名:</td>
                 <td id="username" class="titcontent" style="width: 250px;">
                   <el-input id="usernameinput" :disabled="true" style="width: 58% !important;"  v-model="ruleForm.sysUser.name"></el-input>
                   <el-button v-show="chooseButton" type="primary" style="width: 42%" @click="setBadisiorList">选择患者</el-button>
                 </td>
            <td class="titname">性  别:</td>
            <td id="sex" class="titcontent">
              <el-radio-group v-model="ruleForm.sysUser.sex" :disabled="true">
                <el-radio  :label="1">男</el-radio>
                <el-radio  :label="0">女</el-radio>
              </el-radio-group>
            </td>
            <td class="titname">科  室:</td><td id="division" class="titcontent">
                  <el-input v-model="ruleForm.division"></el-input>
            </td>
            <td class="titname">病床号:</td><td id= "bed" class="titcontent">
                  <el-input v-model="ruleForm.bed"></el-input>
            </td>
          </tr>
          <tr>
            <td class="titname">样    本:</td><td id= "sample" class="titcontent">
                 <el-input v-model="ruleForm.sample"></el-input>
            </td>
            <td class="titname">是否异常:</td><td id= "sample_status" class="titcontent">
                <el-radio-group v-model="ruleForm.isUnusual">
                  <el-radio  :label="1">正常</el-radio>
                  <el-radio  :label="2">异常</el-radio>
                </el-radio-group>
            </td>
            <td class="titname">样 本 号:</td><td id= "sample_num" class="titcontent">
                <el-input v-model="ruleForm.sampleNum"></el-input>
            </td>
            <td class="titname">采样时间:</td><td id= "sample_time" class="titcontent">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="ruleForm.sampleTime"
              style="width: 80%;"
              value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
           </td>
          </tr>
        </table>
        <hr />
        <!-- 内容 -->
        <vxe-table
          border
          resizable
          height="500"
          highlight-current-row
          show-all-overflow
          @cell-mouseleave="cellMouseleaveEvent"
          :data.sync="ruleForm.buLaboratorySubList"
          :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}">
          <vxe-table-column  type="index" label="序号" width="60"></vxe-table-column>
          <vxe-table-column  prop="itemname" label="项目名称" ></vxe-table-column>
          <vxe-table-column  prop="findings" label="检查结果"  :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column  prop="hint" label="提示" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column  prop="referenceInterval" label="参考区间" ></vxe-table-column>
          <vxe-table-column  prop="unit" label="单位"></vxe-table-column>
        </vxe-table>
        <!-- 页脚 -->
        <hr />
        <table  style="width: 100%;">
          <tr>
            <td class="titname">送检时间：</td><td id="inspect_time" class="titcontent">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="ruleForm.inspectTime"
              style="width: 80%;"
              value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </td>
            <td class="titname">报告时间：</td><td id="report_time" class="titcontent">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="ruleForm.reportTime"
              style="width: 80%;"
              value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </td>
          <td class="titname">检验员：</td><td id="inspect_name" class="titcontent">
                    <el-input v-model="ruleForm.inspectName"></el-input>
            </td>
            <td class="titname">审核人员：</td><td id="assessor" class="titcontent">
                    <el-input v-model="ruleForm.assessor"></el-input>
            </td>
          </tr>
        </table>
        <hr />
        <!-- 按钮 -->
        <el-form-item>
          <el-button v-show="okButton" type="primary" @click="saveCheckList()">确 定</el-button>
          <el-button @click="dialogTableVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--打开弹框:患者对话框 -->
    <el-dialog title="患者列表" :visible.sync="popup" :modal-append-to-body="false" width="65%" >
      <el-form    style="text-align:center;">
        <el-form-item>
            <!--搜索框-->
            <el-button  style="float:right;"  type="primary" @click="getdossierList" icon="el-icon-search"></el-button>
            <!--搜索按钮-->
            <el-input style="width: 30% !important;float:right"  v-model="input" placeholder="患者名称/手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <span style="color: red">***点击表格行选择患者信息***</span>
        </el-form-item>
        <!-- 内容 -->
        <el-form-item>
            <vxe-table
              ref="openTable"
              border
              resizable
              height="500"
              highlight-current-row
              show-all-overflow
              :data.sync="badisiorList"
              :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}"
              @cell-click="cellClickEvent2">
              <vxe-table-column prop="num" type="index" label="序号" width="60"></vxe-table-column>
              <vxe-table-column prop="sysUser.name" label="姓名" ></vxe-table-column>
              <vxe-table-column prop="sysUser.sex" label="性别" :formatter="sexFormatterType_"></vxe-table-column>
              <vxe-table-column prop="sysUser.age" label="年龄" ></vxe-table-column>
              <vxe-table-column prop="diseaseType" label="病型" ></vxe-table-column>
              <vxe-table-column prop="sysUser.phone" label="手机号"></vxe-table-column>
              <vxe-table-column prop="medicareType" label="医保类型" :formatter="medicareList_"></vxe-table-column>
              <vxe-table-column prop="createDate" label="创建时间"></vxe-table-column>
              <vxe-table-column prop="dossierType" label="档案级别" :formatter="dossierType_"></vxe-table-column>
              <vxe-table-column prop="dossierStatus" label="档案状态"></vxe-table-column>
            </vxe-table>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button @click="popup = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>

</template>

<style>
  .titname{
    width: 70px;
    font-size: 12px;
    color: black;
    font-weight: bold;
    text-align:right;
  }
  .titcontent{
    width: 220px;
    text-align:left;
  }

</style>

<script>
  //引入后台方法
  import { remote} from '@/api/admin/dict';
  import { getbulaboratoryList,addbulaboratoryList,queryBuLaboratoryFrom} from '@/api/generator/bulaboratory';

  //患者信息:病例列表
  import {dossierList } from '@/api/generator/electroniccase'
  //导入插件
  import VXETable from 'vxe-table';
  import 'vxe-table/lib/index.css';
  Vue.use(VXETable);
  //当前时间
  var time = new Date();
  export default {
    //数据填充
    data() {
      return {
        id:'',
        input:'',
        currentRow:'',//当前行
        dialogVisible: false,
        dialogTableVisible: false,
        okButton :false,
        chooseButton :false,
        popup:false,
        activeName: 'second',
        tableData: [],
        buLaboratorySubList:  [],
        badisiorList:[],
        navData2: [],
        page:{
          current: 1,
          size: 10,
          total: 0
        },
        ruleForm: {
          id:'',
          dossierId:'',//档案主键id
          userId:'',
          idcard:'',
          birthplace:'',
          sex: '',
          imgUrl: '',
          name: '',
          address:'',
          phone:'',
          titles:'',
          researchDirection:'',
          sample_status:'',
          diagnoseType:'',//诊断类型
          isUnusual:'',//是否异常
          division:'', //科室
          bed:'',//病床号
          sampleStatus:'',//样本状态
          sample:'', //样本
          sampleNum:'',//样本号
          sampleTime:'', //采样时间
          password:'',
          confirm:'',
          createTime:'',
          baDossier:{
               id:"",
               createDate:"",
               diseaseType:"",
               dossierType:"",
               dossierStatus:""
          },
          sysUser: {
            id:'', //主键
            name:'',
            sex:'',
            laboratoryType:'',//化验单类型
            inspectTime:'',//送检时间
            reportTime:'', //报告时间
            inspectName:'',//检验人员
            assessor:'', //审核人员
            creater:'',//创建人
            createTime:'', //创建时间
            modifier:'',//修改人
            modifyTime:'', //修改时间
          },
          buLaboratorySubList:[
            {
              id:'', //主键
              num:'',//顺序
              laboratoryId:'', //化验单id
              itemname:'', //项目名称
              findings:'', //检查结果
              hint:'', //提示
              referenceInterval:'', //参考区间
              unit:'', //单位
              creater:'',//创建人
              createTime:'',//创建时间
              modifier:'',//修改人
              modifyTime:'',//修改时间
            }
          ]
        }
      }
    },
    created() {
      this.theList();
      this.menuListData();
    },
    //填充数据方法
    methods: {
      /**********************************************化验单页面***********************************************************************/
      //化验单模糊查询
      getbulaboratoryLists(){
        getbulaboratoryList(this.page,this.input,this.id).then(response => {
          this.tableData = response.data.data.records;
          this.page.size=response.data.data.size;
          this.page.current=response.data.data.current;
          this.page.total=response.data.data.total;
          this.input='';
        })
      },
      handleSizeChange(val) {
        this.page.size=val;
        this.theList();
      },
      handleCurrentChange(val) {
        this.page.current=val;
        this.theList();
      },
      theList(){
        getbulaboratoryList(this.page,this.input,this.id).then(response => {
          this.tableData=response.data.data.records;
          this.page.size=response.data.data.size;
          this.page.current=response.data.data.current;
          this.page.total=response.data.data.total;
          this.input='';
        })
      },
      //档案级别
      dossierytpe(row){
        if(row.baDossier.dossierType == '1'){
          return '红'
        }
        if(row.baDossier.dossierType == '2'){
          return '黄'
        }
        if(row.baDossier.dossierType == '3'){
          return '蓝'
        }
      },
      //填充化验单类型
      menuListData(){
        //jsl
        remote('jsl').then(response => {
          this.navData2 = response.data.data
        })
      },
      //详情
      getCheckListView(row) {
        this.dialogTableVisible=true;
        //根据化验单类型查询化验单项目列表
        queryBuLaboratoryFrom(row.id).then(response => {
          this.ruleForm = response.data.data;
          this.okButton = false ;
          this.chooseButton = false ;
        })
      },
      //编辑
      getCheckListEdit(row) {
        this.dialogTableVisible=true
        queryBuLaboratoryFrom(row.id).then(response => {
          this.ruleForm = response.data.data;
          this.okButton = true ;
          this.chooseButton = true ;
        })
      },
      //设置化验单类型
      settype(id) {
        //设置样式
        this.id = id;
        getbulaboratoryList(this.page,this.input,this.id).then(response => {
          this.tableData = response.data.data.records;
          this.page.size=response.data.data.size;
          this.page.current=response.data.data.current;
          this.page.total=response.data.data.total;
          this.input='';
        })
      },
      //是否
      isunusuals:function(row, column){
        let status = row.isUnusual;
        let statusW = "";
        if(status=='1'){
          statusW = "正常";
        }
        if(status=='2'){
          statusW = "异常";
        }
        return statusW;
      },
      //化验单类型处理
      laboratoryTypeFormat:function(row, column){
        let laboratoryType = row.laboratoryType;
        let statusW = "";
        if(laboratoryType=='3'){
          statusW = "血细胞分析";
        }else if(laboratoryType=='4'){
          statusW = "尿液分析";
        }else if(laboratoryType=='5'){
          statusW = "便常规";
        }else if(laboratoryType=='6'){
          statusW = "尿液分析";
        }else if(laboratoryType=='7'){
          statusW = "血生化";
        }else if(laboratoryType=='8'){
          statusW = "便常规";
        }else if(laboratoryType=='9'){
          statusW = "胰岛功能测定";
        }else if(laboratoryType=='10'){
          statusW = "糖化血红蛋白";
        }else if(laboratoryType=='11'){
          statusW = "OGTT";
        }else if(laboratoryType=='12'){
          statusW = "血脂四项";
        }else if(laboratoryType=='13'){
          statusW = "凝血系列";
        }else if(laboratoryType=='14'){
          statusW = "抗核抗体13项";
        }else if(laboratoryType=='15'){
          statusW = "类风湿三项";
        }else if(laboratoryType=='16'){
          statusW = "乙肝五项";
        }else if(laboratoryType=='17'){
          statusW = "血清六项";
        }else if(laboratoryType=='18'){
          statusW = "红细胞沉降量";
        }
        return statusW;
      },
      /**********************************************化验单项目页面***********************************************************************/
      //获取化验单表单(Form)
      getCheckList() {
        this.ruleForm = {
          id:'',
          dossierId:'',//档案主键id
          userId:'',
          idcard:'',
          birthplace:'',
          sex: '',
          imgUrl: '',
          name: '',
          address:'',
          phone:'',
          titles:'',
          researchDirection:'',
          sample_status:'',
          diagnoseType:'',//诊断类型
          isUnusual:'',//是否异常
          sample:'', //样本
          division:'', //科室
          bed:'',//病床号
          sampleStatus:'',//样本状态
          sampleNum:'',//样本号
          sampleTime:'', //采样时间
          password:'',
          confirm:'',
          createTime:'',
          baDossier:{
            id:"",
            createDate:"",
            diseaseType:"",
            dossierType:"",
            dossierStatus:""
          },
          sysUser: {
            id:'', //主键
            name:'',
            sex:'',
            laboratoryType:'',//化验单类型
            inspectTime:'',//送检时间
            reportTime:'', //报告时间
            inspectName:'',//检验人员
            assessor:'', //审核人员
            creater:'',//创建人
            createTime:'', //创建时间
            modifier:'',//修改人
            modifyTime:'', //修改时间
          },
          buLaboratorySubList:[
            {
              id:'', //主键
              num:'',//顺序
              laboratoryId:'', //化验单id
              itemname:'', //项目名称
              findings:'', //检查结果
              hint:'', //提示
              referenceInterval:'', //参考区间
              unit:'', //单位
              creater:'',//创建人
              createTime:'',//创建时间
              modifier:'',//修改人
              modifyTime:'',//修改时间
            }
          ]
        };
        if (this.id != '') {
          this.dialogTableVisible = true;
          if (this.id == '3') {
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList = [{
              id:"",
              num: 1,
              itemname: '★白细胞(WBC)',
              findings: '',
              hint: '',
              referenceInterval: '3.5-9.5',
              unit: '109/L'
            }, {
              id:"",
              num:2,
              itemname: '中性粒细胞数目(NEU＃)',
              findings: '',
              hint: '',
              referenceInterval: '1.8-6.3',
              unit: '109/L'
            }, {
              id:"",
              num: 3,
              itemname: '淋巴细胞(LY＃)',
              findings: '',
              hint: '',
              referenceInterval: '1.1-3.2',
              unit: '109/L'
            }, {
              id:"",
              num: 4,
              itemname: '单核细胞数目(MO＃)',
              findings: '',
              hint: '',
              referenceInterval: '0.1-0.6',
              unit: '109/L'
            }, {
              id:"",
              num: 5,
              itemname: '嗜酸性粒细胞(BA＃)',
              findings: '',
              hint: '',
              referenceInterval: '0.02-0.52',
              unit: '109/L'
            }, {
              id:"",
              num: 6,
              itemname: '嗜碱性粒细胞数目(EC＃)',
              findings: '',
              hint: '',
              referenceInterval: '0-0.06',
              unit: '109/L'
            }, {
              id:"",
              num: 7,
              itemname: '中性粒细胞百分比(NEU％)',
              findings: '',
              hint: '',
              referenceInterval: '40-75',
              unit: '%'
            }, {
              id:"",
              num: 8,
              itemname: '单核细胞百分比(MO％)',
              findings: '',
              hint: '',
              referenceInterval: '3-10',
              unit: '%'
            }, {
              id:"",
              num: 9,
              itemname: '酸性粒细胞百分比(EO％)',
              findings: '',
              hint: '',
              referenceInterval: '20-50',
              unit: '%'
            }, {
              id:"",
              num: 10,
              itemname: '淋巴细胞百分比(LYX)',
              findings: '',
              hint: '',
              referenceInterval: '0.4-8',
              unit: '%'
            }, {
              id:"",
              num: 11,
              itemname: '嗜碱性粒细胞百分比(BA％)',
              findings: '',
              hint: '',
              referenceInterval: '0-1',
              unit: '%'
            }, {
              id:"",
              num: 12,
              itemname: '红细胞分布宽度标准差(RDF-SD)',
              findings: '',
              hint: '',
              referenceInterval: '35.00-65.00',
              unit: '109/L'
            }, {
              id:"",
              num: 13,
              itemname: '红细胞分布宽度变异系数(RDW-CV)',
              findings: '',
              hint: '',
              referenceInterval: '3.5-9.5',
              unit: '109/L'
            }, {
              id:"",
              num: 14,
              itemname: '★红细胞(RBC)',
              findings: '',
              hint: '',
              referenceInterval: '4.3-5.8',
              unit: '1012/L'
            }, {
              id:"",
              num: 15,
              itemname: '★血红蛋白(HGB)',
              findings: '',
              hint: '',
              referenceInterval: '130-175',
              unit: 'g/L'
            }, {
              id:"",
              num: 16,
              itemname: '红细胞压积(HCT)',
              findings: '',
              hint: '',
              referenceInterval: '0.40-0.50',
              unit: 'L/L'
            }, {
              id:"",
              num: 17,
              itemname: '平均红细胞体积(MCV)',
              findings: '',
              hint: '',
              referenceInterval: '80-100',
              unit: 'fL'
            }, {
              id:"",
              num: 18,
              itemname: '平均红细胞血红蛋白量(MCH)',
              findings: '',
              hint: '',
              referenceInterval: '3.5-9.5',
              unit: '109/L'
            }, {
              id:"",
              num: 19,
              itemname: '平均红细胞血红蛋白浓度(MCHC)',
              findings: '',
              hint: '',
              referenceInterval: '27-34',
              unit: 'pg'
            }, {
              id:"",
              num: 20,
              itemname: '★血小板(PLT)',
              findings: '',
              hint: '',
              referenceInterval: '125-350',
              unit: '109/L'
            }, {
              id:"",
              num: 21,
              itemname: '血小板压积(PCT)',
              findings: '',
              hint: '',
              referenceInterval: '0.108-0.282',
              unit: '%'
            }, {
              id:"",
              num: 22,
              itemname: '平均血小板体积(MPV)',
              findings: '',
              hint: '',
              referenceInterval: '7-11',
              unit: 'fL'
            }, {
              id:"",
              num: 23,
              itemname: '血小板体积分布宽度(PDW)',
              findings: '',
              hint: '',
              referenceInterval: '9-17',
              unit: '%'
            }, {
              id:"",
              num: 24,
              itemname: '血小板p-1cc(o-1co)',
              findings: '',
              hint: '',
              referenceInterval: '30-90',
              unit: '109/L'
            }, {
              id:"",
              num: 25,
              itemname: '大血小板比积(p-1cR)',
              findings: '',
              hint: '',
              referenceInterval: '11.0-45.0',
              unit: '%'
            }];
          } else if (this.id == '4') {
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList = [{
              id:"",
              num: 1,
              itemname: '★亚硝酸盐',
              findings: '',
              hint: '',
              referenceInterval: '',
              unit: '阴性'
            }, {
              id:"",
              num: 2,
              itemname: '★酸碱度',
              findings: '',
              hint: '',
              referenceInterval: '5.4-8.4',
              unit: ''
            }, {
              id:"",
              num: 3,
              itemname: '维生素C',
              findings: '',
              hint: '',
              referenceInterval: '阴性',
              unit: ''
            }, {
              id:"",
              num: 4,
              itemname: '★尿比重',
              findings: '',
              hint: '',
              referenceInterval: '1.003-1.030',
              unit: ''
            }, {
              id:"",
              num:5,
              itemname: '★尿潜血',
              findings: '',
              hint: '',
              referenceInterval: '阴性',
              unit: 'Cell/u1'
            }, {
              id:"",
              num: 6,
              itemname: '★尿蛋白',
              findings: '',
              hint: '',
              referenceInterval: '阴性',
              unit: 'g/1'
            }, {
              id:"",
              num: 7,
              itemname: '★尿胆红素',
              findings: '',
              hint: '',
              referenceInterval: '阴性',
              unit: 'umoll'
            }, {
              id:"",
              num: 8,
              itemname: '★尿胆原',
              findings: '',
              hint: '',
              referenceInterval: '',
              unit: 'umol/l'
            }, {
              id:"",
              num: 9,
              itemname: '尿白细胞',
              findings: '',
              hint: '',
              referenceInterval: '阴性',
              unit: 'mol/l'
            }, {
              id:"",
              num: 10,
              itemname: '★尿糖测定',
              findings: '',
              hint: '',
              referenceInterval: '',
              unit: ''
            }, {
              id:"",
              num: 11,
              itemname: '★尿酮体',
              findings: '',
              hint: '',
              referenceInterval: '阴性',
              unit: 'mmol/l'
            }, {
              id:"",
              num: 12,
              itemname: '粘液丝',
              findings: '',
              hint: '',
              referenceInterval: '',
              unit: '个/ul'
            }];
          }else if (this.id == '5') {
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList =  [ {
              id:"",
              num: 1,
              itemname: '类便常规',
              findings: '',
              hint: '',
              referenceInterval: '',
              unit: ''
            }, {
              id:"",
              num: 2,
              itemname: '隐血试验(OB)',
              findings: '',
              hint: '',
              referenceInterval: '',
              unit: ''
            }];
          }else if (this.id == '7') {
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList = [ {
              id:"",
              num: 1,
              itemname: '丙氨酸氨基转移酶（ALT）',
              findings: '',
              hint: '',
              referenceInterval: '9-50',
              unit: 'U/L'
            },{
              id:"",
              num: 2,
              itemname: '总蛋白（TP）',
              findings: '',
              hint: '',
              referenceInterval: '65-85',
              unit: 'g/L'
            },{
              id:"",
              num: 3,
              itemname: '白蛋白（ALB）',
              findings: '',
              hint: '',
              referenceInterval: '40-55',
              unit: 'g/L'
            },{
              id:"",
              num: 4,
              itemname: '球蛋白（GLB）',
              findings: '',
              hint: '',
              referenceInterval: '20-40',
              unit: 'g/L'
            },{
              id:"",
              num: 5,
              itemname: '白球比（A/G）',
              findings: '',
              hint: '',
              referenceInterval: '1-2.4',
              unit: ''
            },{
              id:"",
              num: 6,
              itemname: '总胆红素（TBIL）',
              findings: '',
              hint: '',
              referenceInterval: '5-17',
              unit: 'umol/L'
            },{
              id:"",
              num: 7,
              itemname: '直接胆红素（DBIL）',
              findings: '',
              hint: '',
              referenceInterval: '0-4.3',
              unit: 'umol/L'
            },{
              id:"",
              num: 8,
              itemname: '间接胆红素（IBIL）',
              findings: '',
              hint: '',
              referenceInterval: '1.7-13.2',
              unit: 'umol/L'
            },{
              id:"",
              num: 9,
              itemname: '血清血清5＇核苷酸酶测定(5-NT)',
              findings: '',
              hint: '',
              referenceInterval: '0-10',
              unit: 'U/L'
            },{
              id:"",
              num: 10,
              itemname: '血清总胆汁酸测定(TBA)',
              findings: '',
              hint: '',
              referenceInterval: '0-10',
              unit: 'umol/L'
            },{
              id:"",
              num: 11,
              itemname: 'γ-谷氨酰转肽酶（GGT）',
              findings: '',
              hint: '',
              referenceInterval: '10-60',
              unit: 'U/L'
            },{
              id:"",
              num: 12,
              itemname: '碱性磷酸酶（ALP）',
              findings: '',
              hint: '',
              referenceInterval: '45-125',
              unit: 'U/L'
            },{
              id:"",
              num: 13,
              itemname: '血清前白蛋白测定(PA)',
              findings: '',
              hint: '',
              referenceInterval: '180-390',
              unit: 'mg/L'
            },{
              id:"",
              num: 14,
              itemname: '葡萄糖测定(GLU)',
              findings: '',
              hint: '',
              referenceInterval: '3.9-6.1',
              unit: 'mmol/L'
            },{
              id:"",
              num: 15,
              itemname: '果糖胺(FRU)',
              findings: '',
              hint: '',
              referenceInterval: '0-286',
              unit: 'umol/L'
            },{
              id:"",
              num: 16,
              itemname: '钾测定(K)',
              findings: '',
              hint: '',
              referenceInterval: '3.5-5.3',
              unit: 'mmol/L'
            },{
              id:"",
              num: 17,
              itemname: '钠测定(Na)',
              findings: '',
              hint: '',
              referenceInterval: '137-147',
              unit: 'mmol/L'
            },{
              id:"",
              num: 18,
              itemname: '氯测定(C1)',
              findings: '',
              hint: '',
              referenceInterval: '99-110',
              unit: 'mmol/L'
            },{
              id:"",
              num: 19,
              itemname: '血清碳酸盐测定(C02-CP)',
              findings: '',
              hint: '',
              referenceInterval: '20.2-29.2',
              unit: 'mmol/L'
            },{
              id:"",
              num: 20,
              itemname: '★尿素测定(BUN)',
              findings: '',
              hint: '',
              referenceInterval: '1.8-7.1',
              unit: 'mmol/L'
            },{
              id:"",
              num: 21,
              itemname: '★肌卧测定(Cr)',
              findings: '',
              hint: '',
              referenceInterval: '59-104',
              unit: 'umol/L'
            },{
              id:"",
              num: 22,
              itemname: '★尿酸测定(UA)',
              findings: '',
              hint: '',
              referenceInterval: '208-428',
              unit: 'umol/L'
            },{
              id:"",
              num: 23,
              itemname: 'β2微球蛋白测定(2-HG)',
              findings: '',
              hint: '',
              referenceInterval: '0.8--1.8',
              unit: 'mg/L'
            },{
              id:"",
              num: 24,
              itemname: '血清脱神素C定(Cys-C)',
              findings: '',
              hint: '',
              referenceInterval: '0.54-1.25',
              unit: 'mg/L'
            },{
              id:"",
              num: 25,
              itemname: '补体C1a(C1a)',
              findings: '',
              hint: '',
              referenceInterval: '159-233',
              unit: 'mg/L'
            },{
              id:"",
              num: 26,
              itemname: 'C反应蛋白测定(CRP)',
              findings: '',
              hint: '',
              referenceInterval: '0-1.0',
              unit: 'mg/L'
            },{
              id:"",
              num: 27,
              itemname: '血乳酸(LAC)',
              findings: '',
              hint: '',
              referenceInterval: '1,33-1.78',
              unit: 'mmol/L'
            }];
          }else if (this.id == '9') {
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList = [ {
              id:"",
              num: 1,
              itemname: '胰岛素',
              findings: '',
              hint: 'Insulin',
              referenceInterval: '空腹:2.84-25.08mU/L',
              unit: ''
            },{
              id:"",
              num: 2,
              itemname: '胰岛素',
              findings: '',
              hint: 'Insulin',
              referenceInterval: '餐后一小时',
              unit: ''
            },{
              id:"",
              num: 3,
              itemname: '胰岛素',
              findings: '',
              hint: 'Insulin',
              referenceInterval: '餐后二小时',
              unit: ''
            },{
              id:"",
              num: 4,
              itemname: '胰岛素',
              findings: '',
              hint: 'Insulin',
              referenceInterval: '餐后三小时',
              unit: ''
            },{
              id:"",
              num: 5,
              itemname: 'C-肽[空腹]',
              findings: '',
              hint: 'C-peptid ',
              referenceInterval: '空腹:0.25-4.0ng/ml',
              unit: ''
            },{
              id:"",
              num: 6,
              itemname: 'C-肽',
              findings: '',
              hint: 'C-peptid ',
              referenceInterval: '餐后一小时',
              unit: 'mmol/L'
            },{
              id:"",
              num: 7,
              itemname: 'C-肽',
              findings: '',
              hint: 'C-peptid ',
              referenceInterval: '餐后二小时',
              unit: 'mmol/L'
            },{
              id:"",
              num: 8,
              itemname: 'C-肽',
              findings: '',
              hint: 'C-peptid',
              referenceInterval: '餐后三小时',
              unit: 'mmol/L'
            },{
              id:"",
              num: 9,
              itemname: '胰岛素抗体',
              findings: '',
              hint: 'InsAb',
              referenceInterval: '0-0.2 mIU/L',
              unit: ''
            },{
              id:"",
              num: 10,
              itemname: '抗谷氨酸脱羧酶',
              findings: '',
              hint: 'GAD',
              referenceInterval: '0-0.2 mIU/L',
              unit: ''
            },{
              id:"",
              num: 11,
              itemname: '抗胰岛素细胞抗体',
              findings: '',
              hint: 'ICA',
              referenceInterval: '0.00-0.21mlU/L',
              unit: ''
            }];
          }else if (this.id == '10') {
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList = [{
              id:"",
              num: 1,
              itemname: '糖化血红蛋白',
              findings: '',
              hint: '',
              referenceInterval: '3.5-9.5',
              unit: '%'
            }];
          }else if (this.id == '11') {
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList = [
              {
                id:"",
                num: 1,
                itemname: '葡萄糖测定（GLU）',
                findings: '',
                hint: '',
                referenceInterval: '3.9-6.1',
                unit: 'mmol/L'
              }, {
                id:"",
                num: 2,
                itemname: '餐后1h葡萄糖测定（GLU）',
                findings: '',
                hint: '',
                referenceInterval: '',
                unit: 'mmol/L'
              },  {
                id:"",
                num: 3,
                itemname: '餐后2h葡萄糖测定（GLU）',
                findings: '',
                hint: '',
                referenceInterval: '',
                unit: 'mmol/L'
              },  {
                id:"",
                num: 4,
                itemname: '餐后3h葡萄糖测定（GLU）',
                findings: '',
                hint: '',
                referenceInterval: '',
                unit: 'mmol/L'
              }];
          }else if (this.id == '12') {
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList = [ {
              id:"",
              num: 1,
              itemname: '总胆固醇',
              findings: '',
              hint: '',
              referenceInterval: '2.85-5.7',
              unit: 'mmol/L'
            }, {
              id:"",
              num: 2,
              itemname: '甘油三酯',
              findings: '',
              hint: '',
              referenceInterval: '0.58-1.7',
              unit: 'mmol/L'
            }, {
              id:"",
              num: 3,
              itemname: '高密度脂蛋白胆固醇',
              findings: '',
              hint: '',
              referenceInterval: '0.95-1.55',
              unit: 'mmol/L'
            }, {
              id:"",
              num: 4,
              itemname: '低密度脂蛋白胆固醇',
              findings: '',
              hint: '',
              referenceInterval: '2.07-3.12',
              unit: 'mmol/L'
            }];
          }else if (this.id == '13') {
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList = [{
              id:"",
              num: 1,
              itemname: '凝血酶原时间',
              findings: '',
              hint: '',
              referenceInterval: '9-15',
              unit: 'sec'
            },{
              id:"",
              num: 2,
              itemname: '凝血酶原活动度',
              findings: '',
              hint: '',
              referenceInterval: '70-130',
              unit: '%'
            },{
              id:"",
              num: 3,
              itemname: '凝血酶原国际化标准比值',
              findings: '',
              hint: '',
              referenceInterval: '0.8-1.5',
              unit: ''
            },{
              id:"",
              num: 4,
              itemname: '活化部分凝血酶原时间',
              findings: '',
              hint: '',
              referenceInterval: '14-43',
              unit: 'sec'
            },{
              id:"",
              num: 5,
              itemname: '活化部分凝血酶原时间比值',
              findings: '',
              hint: '',
              referenceInterval: '0.8-1.5',
              unit: ''
            },{
              id:"",
              num: 6,
              itemname: '纤维蛋白原',
              findings: '',
              hint: '',
              referenceInterval: '2-4',
              unit: 'g/L'
            },{
              id:"",
              num: 7,
              itemname: '凝血酶时间',
              findings: '',
              hint: '',
              referenceInterval: '14-21',
              unit: 'sec'
            }];
          }else if (this.id == '14') {
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList = [{
              id:"",
              num: 1,
              itemname: '抗核抗体',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 2,
              itemname: '抗dsDNA抗体',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 3,
              itemname: '抗组蛋白抗体',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 4,
              itemname: '抗核小体抗体',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 5,
              itemname: '抗Jo-1抗体',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 6,
              itemname: '抗nRNP抗体',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 7,
              itemname: '抗Ro52抗体',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 8,
              itemname: '抗rRNP抗体',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 9,
              itemname: '抗SCL-70抗体',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 10,
              itemname: '抗SM抗体',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 11,
              itemname: '抗SSA抗体',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 12,
              itemname: '抗SSB抗体',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 13,
              itemname: '抗CENP-B抗体',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            }];
          }else if (this.id == '15') {
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList = [{
              id:"",
              num: 1,
              itemname: '类风湿因子',
              findings: '',
              hint: '',
              referenceInterval: '0-20',
              unit: 'KIU/L'
            },{
              id:"",
              num: 2,
              itemname: '抗链球菌溶血素“O”',
              findings: '',
              hint: '',
              referenceInterval: '0-200',
              unit: 'KIU/L'
            },{
              id:"",
              num: 3,
              itemname: '抗环瓜氨酸肽',
              findings: '',
              hint: '',
              referenceInterval: '0-30',
              unit: 'U/ml'
            }];
          }else if (this.id == '16') {
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList = [{
              id:"",
              num: 1,
              itemname: '乙肝表面抗原',
              findings: '',
              hint: '',
              referenceInterval: '0-0.5',
              unit: 'ng/ml'
            },{
              id:"",
              num: 2,
              itemname: '乙肝表面抗体',
              findings: '',
              hint: '',
              referenceInterval: '0-10',
              unit: 'mIU/ml'
            },{
              id:"",
              num: 3,
              itemname: '乙肝e抗原',
              findings: '',
              hint: '',
              referenceInterval: '0-0.5',
              unit: 'PEIU/ml'
            },{
              id:"",
              num: 4,
              itemname: '乙肝e抗体',
              findings: '',
              hint: '',
              referenceInterval: '0-0.25',
              unit: 'PEIU/ml'
            },{
              id:"",
              num: 5,
              itemname: '乙肝核心抗体',
              findings: '',
              hint: '',
              referenceInterval: '0--0.9',
              unit: 'PEIU/ml'
            }];
          }else if (this.id == '17') {
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList = [{
              id:"",
              num: 1,
              itemname: '★乙型肝炎病毒前S1抗原',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 5,
              itemname: '梅毒螺旋体特异抗体测定',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 5,
              itemname: '人兔疫缺陷病毒抗体測定',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 5,
              itemname: '丙型肝炎抗体测定',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            },{
              id:"",
              num: 5,
              itemname: '甲型肝炎抗体测定',
              findings: '',
              hint: '',
              referenceInterval: '阴性（—）',
              unit: ''
            }];
          }else if (this.id == '18') {
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList = [{
              id:"",
              num: 1,
              itemname: '红细胞沉降率',
              findings: '',
              hint: '',
              referenceInterval: '0-15',
              unit: 'mm/h'
            }];
          }else{
            this.ruleForm.laboratoryType = this.id;
            this.ruleForm.buLaboratorySubList=[
              {
                id:'', //主键
                num:'',//顺序
                laboratoryId:'', //化验单id
                itemname:'', //项目名称
                findings:'', //检查结果
                hint:'', //提示
                referenceInterval:'', //参考区间
                unit:'', //单位
                creater:'',//创建人
                createTime:'',//创建时间
                modifier:'',//修改人
                modifyTime:'',//修改时间
              }
            ]
          }
          this.okButton = true ;
          this.chooseButton = true ;
        } else {
          this.$message({
            message: '请选择化验单类型',
            type: 'warning'
          })
          return;
        }
      },
      //化验单内容保存
      saveCheckList(){
        this.dialogTableVisible=false;
        //填充化验单列表信息
        console.log(this.ruleForm);
        addbulaboratoryList(this.ruleForm).then(data => {
          //填充化验单列表信息
          getbulaboratoryList(this.page,this.input,this.id).then(response => {
            this.tableData = response.data.data.records;
            this.page.size=response.data.data.size;
            this.page.current=response.data.data.current;
            this.page.total=response.data.data.total;
            this.input='';
          })
        })
      },
      //鼠标离开事件
      cellMouseleaveEvent ({ row, rowIndex, column, columnIndex }, event) {
        var referenceInterval = row.referenceInterval;
        var findings = row.findings;
        var hint = row.hint;
        if(referenceInterval!=null&&referenceInterval!=''&&!referenceInterval.indexOf("-") != -1){
          if(findings != ''){
            //设置提示
            var n = referenceInterval.indexOf("-");
            var f = referenceInterval.substr(0,n);
            var l = referenceInterval.substr(n+1,referenceInterval.length);
            console.log("nfl:"+n);
            console.log("nfl:"+f);
            console.log("nfl:"+l);
            if(f < findings && l> findings){
              row.hint = '正常';
            }else{
              row.hint = '异常';
            }
          }
        }
      },
      /**********************************************患者页面***********************************************************************/
      //查询患者信息
      getdossierList(){
        if(this.input != null && this.input !=''){
          this.page.current=1;
        }
        dossierList(this.page,this.input).then(response => {
          this.badisiorList=response.data.data.records;
          this.page.size=response.data.data.size;
          this.page.current=response.data.data.current;
          this.page.total=response.data.data.total;
        })
        this.input='';
      },
      //选择患者信息:弹框
      setBadisiorList(){
        this.popup = true;
        dossierList(this.page,this.input).then(response => {
          this.badisiorList=response.data.data.records;
        })
      },
      cellClickEvent2 ({ row, rowIndex, column, columnIndex }, event) {
        this.ruleForm.dossierId = row.id;
        this.ruleForm.sysUser.id = row.sysUser.id;
        this.ruleForm.sysUser.name = row.sysUser.name;
        this.ruleForm.sysUser.sex = row.sysUser.sex;
        this.popup=false;
      },
      //性别处理
      medicareList_({ cellValue, row, column }) {
        console.log("medicareList_:"+cellValue);
        if(cellValue == '1'){
          return '城镇职工基本医疗'
        }
        if(cellValue == '2'){
          return '城镇居民基本医疗'
        }
        if(cellValue == '3'){
          return '新型农村合作医疗'
        }
        if(cellValue == '4'){
          return '贫困救助'
        }
        if(cellValue == '5'){
          return '商业医疗保险'
        }
        if(cellValue == '6'){
          return '全公费'
        }
        if(cellValue == '7'){
          return '全自费'
        }
        if(cellValue== '8'){
          return '其他社会保险'
        }
        if(cellValue == '9'){
          return '其他'
        }
      },
      dossierType_ ({ cellValue, row, column }) {
        console.log("dossierType_:"+cellValue);
        if(cellValue ==1){
          return '红'
        }
        if(cellValue ==2){
          return '黄'
        }else{
          return '蓝'
        }
      },
      sexFormatterType_({ cellValue, row, column }){
        console.log("cellValue:"+cellValue);
        if(cellValue == 1){
          return '男';
        }else if(cellValue == 0){
          return '女';
        }
      }
    },
  };
</script>
