<template>
  <div style="width: 95%; height: 100%;margin: 0 auto;">
    <template>
      <div style="width: 100%;margin-top: 5px;margin-bottom: 5px;">
        <el-button type="primary" @click="dialogFormVisible = true" style="height: 40px;">
          添加
        </el-button>
        <el-button type="danger" @click="delButton" style="height: 40px;">
          删除
        </el-button >
<!--        <el-button type="primary">-->
<!--          高级查询-->
<!--        </el-button>-->
        <el-button type="primary" @click="getDeptList" style="height: 40px;">
          数据权限
        </el-button>

        <el-button style="float: right;height: 38px;margin: 0;" type="primary" icon="el-icon-search" @click="findUser1"></el-button>
        <el-input v-model="input" placeholder="姓名/手机号" style="width: 300px !important;height: 40px !important; float: right;">
          <!--<el-button slot="append" icon="el-icon-search" @click="findUser1" style="width: 40px;"></el-button>-->
        </el-input>
      </div>
    </template>
  <el-table
    ref="multipleTable"
    stripe
    height= 520px
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="sysUser.userId"
      label="id"
      width="20"
      v-if="id1=false">
    </el-table-column>
    <el-table-column
      prop="sysUser.name"
      label="姓名"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sysUser.sex"
      label="性别"
      align="center"
      :formatter="formatter1"
      width="60">
    </el-table-column>
    <el-table-column
      prop="sysUser.phone"
      label="手机号"
      align="center"
      width="140">
    </el-table-column>
    <el-table-column
      prop="sysUser.address"
      label="地址"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="创建时间"
      prop="sysUser.createTime"
      width="200"
      align="center">
      <template slot-scope="scope">{{ scope.row.sysUser.createTime }}</template>
    </el-table-column>
    <el-table-column
      label="操作"
      align="center">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" icon="el-icon-info" size="small">详情</el-button>
        <el-button type="primary" icon="el-icon-edit" size="small" @click="handleEditClick(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
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


    <!--删除对话框-->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>确定要删除所选人员吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="ensureButton">确 定</el-button>
  </span>
    </el-dialog>


    <!--添加对话框-->
    <el-dialog title="添加医生" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <div style="margin: 0;padding: 0;width: 50%;height: 400px;float: left;">
              <div style="width: 100%;height: 400px;">
                <span>姓名:&nbsp;&nbsp;&nbsp;&nbsp;</span><el-input v-model="form.name" style="width: 120px !important; height: 38px;"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>性别:&nbsp;&nbsp;</span>&nbsp;&nbsp;
                <el-radio-group v-model="form.sex" >
                  <el-radio-button :label="1" >男</el-radio-button>
                  <el-radio-button :label="0">女</el-radio-button>
                </el-radio-group>
                <div style="width: 378px;margin: 8px 0;"></div>
                <span>出生日期:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-date-picker
                  v-model="form.birthplace"
                  type="date"
                    value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="  width: 280px !important;padding: 0;">
                </el-date-picker>
                <div style="width: 378px;margin: 8px 0;"></div>
                <span>家庭住址:&nbsp;&nbsp;</span><br>
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="form.address"
                  placeholder="请输入内容"
                  style="width: 365px">
                </el-input>
                <div style="width: 378px;margin: 8px 0;"></div>
                <!--<span>籍贯:&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
                <el-input
                  v-model="form.sysUser.phone"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  style="width: 365px">
                </el-input>-->
                <div style="width: 378px;margin: 8px 0;"></div>
                <span>身份证号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><el-input v-model="form.idcard" style="width: 280px !important;" @blur="validateIdCard"/>
                <div style="width: 378px;margin: 8px 0;"></div>
                <span>手机号码:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><el-input  v-model="form.phone" style="width: 280px !important;" @blur="isMobiles" @focus="Mobiles"/>
                <div v-if="ok3"><span style="color: red;">请输入正确的手机号</span></div>
                <div v-if="ok4"><span style="color: red;">该手机号已被注册！</span></div>
                <div style="width: 378px;margin: 8px 0;"></div>
                <span>登录密码:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-input
                  v-model="form.password"
                  type="password"
                  style="width: 280px !important;" @blur="pass1" @focus="pass3"/>
                <div v-if="ok"><span style="color: red">密码必须在6到20位之间！</span></div>
                <div style="width: 378px;margin: 8px 0;"></div>
                <span>确认密码:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-input
                  v-model="form.confirm"
                  type="password"
                  style="width: 280px !important;" @blur="pass2" @focus="pass4"/>
                <div v-if="ok2"><span style="color: red">两次密码不一致，请从新输入！</span></div>
              </div>
            </div>
            <div style="float: right;width: 378px;height: 396px;border: 1px solid red;">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-tab-pane>
          <el-tab-pane label="更多个人信息">
            <div>
              <span>职称:&nbsp;&nbsp;</span>
              <el-input style="width: 200px !important;" v-model="form.titles"/>
              <div style="width: 378px;margin: 8px 0;"></div>
              <span>研究方向:</span><br>
              <el-input
                type="textarea"
                :rows="2"
                v-model="form.researchDirection"
                placeholder="请输入内容"
                style="width: 245px">
              </el-input>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div style="margin: 0 auto;width: 100%;">
          <el-button @click="addDoctor" style="margin-left: 40%">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--详情对话框-->
    <el-dialog
      title="个人详情"
      :visible.sync="dialogxqVisible"
      center>
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <div style="margin: 0;padding: 0;width: 50%;height: 400px;float: left;">
            <div style="width: 100%;height: 400px;">
              <span>姓名:&nbsp;&nbsp;&nbsp;&nbsp;</span><el-input v-model="form.sysUser.name" style="width: 120px !important;" size="mini" readonly/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>性别:&nbsp;&nbsp;</span>&nbsp;&nbsp;
              <el-radio-group v-model="form.sysUser.sex" disabled>
                <el-radio-button label="男"></el-radio-button>
                <el-radio-button label="女"></el-radio-button>
              </el-radio-group>
              <div style="width: 378px;margin: 8px 0;"></div>
              <span>出生日期:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-date-picker
                v-model="form.sysUser.birthplace"
                type="date"
                readonly
                placeholder="选择日期"
                style="  width: 280px !important;padding: 0;">
              </el-date-picker>
              <div style="width: 378px;margin: 8px 0;"></div>
              <span>家庭住址:&nbsp;&nbsp;</span><br>
              <el-input
                type="textarea"
                :rows="2"
                readonly
                v-model="form.sysUser.address"
                placeholder="请输入内容"
                style="width: 365px">
              </el-input>
              <div style="width: 378px;margin: 8px 0;"></div>
             <!-- <span>籍贯:&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                style="width: 365px">
              </el-input>-->
              <div style="width: 378px;margin: 8px 0;"></div>
              <span>身份证号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><el-input v-model="form.sysUser.idcard"  style="width: 280px !important;" readonly/>
              <div style="width: 378px;margin: 8px 0;"></div>
              <span>手机号码:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><el-input v-model="form.sysUser.phone"  style="width: 280px !important;" readonly/>
            </div>
          </div>
          <div style="float: right;width: 378px;height: 396px;border: 1px solid red;">
            <img :src="form.imgUrl" style="width: 365px;height: 396px;">
          </div>
        </el-tab-pane>
        <el-tab-pane label="更多个人信息">
          <div>
            <span>职称:&nbsp;&nbsp;</span>
            <el-input style="width: 200px !important;" v-model="form.titles" readonly/>
            <div style="width: 378px;margin: 8px 0;"></div>
            <span>研究方向:</span><br>
            <el-input
              type="textarea"
              :rows="2"
              readonly
              v-model="form.researchDirection"
              placeholder="请输入内容"
              style="width: 245px">
            </el-input>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div style="margin: 0 auto;width: 100%;height: 42px;">
        <el-button type="primary" @click="closexq" style="margin-left: 45%;margin-top: 5px;">关 闭</el-button>
      </div>
    </el-dialog>

    <!--编辑对话框-->
    <el-dialog
      title="编辑个人详情"
      :visible.sync="dialogeditVisible"
      center>
      <el-form ref="form" :model="form" label-width="80px">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <div style="margin: 0;padding: 0;width: 50%;height: 400px;float: left;">
            <div style="width: 100%;height: 400px;">
              <span>姓名:&nbsp;&nbsp;&nbsp;&nbsp;</span><el-input v-model="form.sysUser.name" style="width: 120px !important;"  size="mini"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>性别:&nbsp;&nbsp;</span>&nbsp;&nbsp;
              <el-radio-group v-model="form.sysUser.sex" >
                <el-radio-button label="男" ></el-radio-button>
                <el-radio-button label="女"></el-radio-button>
              </el-radio-group>
              <div style="width: 378px;margin: 8px 0;"></div>
              <span>出生日期:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-date-picker
                v-model="form.sysUser.birthplace"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                style="  width: 280px !important;padding: 0;">
              </el-date-picker>
              <div style="width: 378px;margin: 8px 0;"></div>
              <span>家庭住址:&nbsp;&nbsp;</span><br>
              <el-input
                type="textarea"
                :rows="2"
                v-model="form.sysUser.address"
                placeholder="请输入内容"
                style="width: 365px">
              </el-input>
              <div style="width: 378px;margin: 8px 0;"></div>
              <!--<span>籍贯:&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                style="width: 365px">
              </el-input>-->
              <div style="width: 378px;margin: 8px 0;"></div>
              <span>身份证号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><el-input v-model="form.sysUser.idcard" style="width: 280px !important;"/>
              <div style="width: 378px;margin: 8px 0;"></div>
              <span>手机号码:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><el-input  v-model="form.sysUser.phone" style="width: 280px !important;" readonly/>
            </div>
          </div>
          <div style="float: right;width: 378px;height: 396px;border: 1px solid red;">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-tab-pane>
        <el-tab-pane label="更多个人信息">
          <div>
            <span>职称:&nbsp;&nbsp;</span>
            <el-input style="width: 200px !important;" v-model="form.titles"/>
            <div style="width: 378px;margin: 8px 0;"></div>
            <span>研究方向:</span><br>
            <el-input
              type="textarea"
              :rows="2"
              v-model="form.researchDirection"
              placeholder="请输入内容"
              style="width: 245px">
            </el-input>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div style="margin: 0 auto;width: 100%;">
        <el-button type="primary" @click="editButton" style="margin-left: 40%;margin-top: 5px;">保 存</el-button>
        <el-button type="primary" @click="dialogeditVisible = false" style="margin-top: 5px;">关 闭</el-button>
      </div>
      </el-form>
    </el-dialog>

    <!--数据权限对话框-->
    <el-dialog
      title="数据权限"
      :visible.sync="dataDialogVisible"
      width="30%"
      center>
      <span>请选择需要配置的数据权限</span>
      <div>
        <el-checkbox-group v-model="checkboxGroup1">
          <el-checkbox-button v-for="city in cities" :label="city.deptId" :key="city.name">{{city.name}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dataDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dataDialogSure">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
    import {addDoctor,fechList,validateMobile,ensureDel,getDept,dataPermissions,edit} from "@/api/admin/doctor"
    import { mapGetters } from 'vuex'
    import {cardid,isMobile} from '@/util/validate'
    export default {
        name: "docter",
      data() {
        return {
          ok: false,
          ok2: false,
          ok3: false,
          ok4: false,
          input:'',
          cities: [],
          checkboxGroup1:[],
          dialogVisible: false,
          dataDialogVisible: false,  //数据权限
          dialogxqVisible: false,    //详情
          dialogeditVisible: false,  //编辑
          centerDialogVisible: false, //删除
          dialogFormVisible: false,   //添加
          formLabelWidth: '120px',
          imageUrl:'',
          form: {
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
            password:'',
            confirm:'',
            createTime:'',
            sysUser: {
                address: "",
                age: '',
                avatar: '',
                birthplace: '',
                createTime: '',
                delFlag: '',
                deptId: '',
                height: '',
                idcard: '',
                lockFlag: '',
                name: '',
                password: '',
                phone: '',
                qqOpenid: '',
                sex: '',
                updateTime: '',
                userId: '',
                username: '',
                weight: '',
                wxOpenid: '',
            }
          },
          tableData: [],
          multipleSelection: [],
         page:{
           current: 1,
           size: 10,
           total: 0
         }
        }
      },
      created() {
        this.theList()
      },
      mounted: function() { },
      computed: {
        ...mapGetters(['permissions'])
      },
      methods: {
        validateIdCard(){
          const flag= cardid(this.form.idcard);
         if(flag[0]){
           this.$message({
             message:flag[1],
             type:'error'
           })
         }
        },
        findUser1(){
          this.theList();
        },
          editButton(){
            this.form.idcard=this.form.sysUser.idcard;
            this.form.birthplace=this.form.sysUser.birthplace;
            this.form.name=this.form.sysUser.name;
            this.form.address=this.form.sysUser.address;
            this.form.userId=this.form.sysUser.userId;
            if(this.form.sysUser.sex == '男'){
              this.form.sex =1
            }else{
              this.form.sex =0
            }
            edit(this.form).then(res =>{
              if(res.data.data =="success"){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.dialogeditVisible = false;
                this.theList();
              }
            })
          },
          getDeptList(){
            if(this.multipleSelection.length>0){
              getDept().then(resp =>{
                   this.cities= resp.data.data
                }
              )
              this.dataDialogVisible = true
            }else{
              this.$message({
                message: '请选择人员',
                type: 'warning'
              })
            }
          },
          Mobiles(){
            this.ok3=false;
            this.ok4=false;
            this.form.phone=''
          },
          isMobiles(){
            if(!isMobile(this.form.phone)){
             this.ok3=true;
            }else{
              validateMobile(this.form.phone).then(resp => {
                if(!resp.data.data){
                  this.ok4 = true;
                }
              })
            }
          },
          theList(){
            if(this.input != null && this.input !=''){
              this.page.current=1;
            }
            fechList(this.page,this.input).then(response => {
              this.tableData=response.data.data.records;
              this.page.size=response.data.data.size;
              this.page.current=response.data.data.current;
              this.page.total=response.data.data.total;

            })
          },
          submitForm(){
            if( this.form.phone === null || this.form.phone === '' || this.ok3 ===true ||this.ok4 === true){
              this.$message({
                message:'请输入手机号',
                type:'error'
              })
            }else if( this.ok === false && this.ok2 === false){
              addDoctor(this.form).then(response =>{
                if(response.data.data== 'success'){
                  this.$message({
                    showClose: true,
                    message: '添加成功',
                    type: 'success'
                  })
                }
                this.dialogFormVisible = false;
                this.theList();
                this.clearForm();
              })
            }else{
              this.$message({
                message:'请输入正确的密码',
                type:'error'
              })
            }
          },
        dataDialogSure(){
            console.log(this.checkboxGroup1)
          console.log(this.multipleSelection)
          if(this.multipleSelection.length>0 && this.checkboxGroup1.length>0){
            var params = new URLSearchParams();
            params.append("ids",this.multipleSelection);
            params.append("deptIds",this.checkboxGroup1)
            dataPermissions(params).then(resp =>{
              if(resp.data.data=='success'){
                this.$message({
                  message: '已添加成功',
                  type: 'success'
                })
                this.dataDialogVisible=false;
                this.theList()
              }

            })

          }else{
            this.$message({
              message:'请选择部门',
              type: 'warning'
            })
          }

        },
        pass1(){
          const len=this.form.password.length;
          if(len<6 || len>20){
            this.ok=true;
          }
        },
        pass3(){
          this.form.password='';
          this.form.confirm='';
          this.ok=false;
          this.ok2=false;
        },
        pass2(){
          const len=this.form.password.length;
          const len2=this.form.confirm.length;
          if(this.form.password == this.form.confirm){
            if(len != len2){
              this.ok2=true;
            }
          }else{
            this.ok2=true;
          }
        },
        pass4(){
          this.form.confirm='';
          this.ok2=false;
        },
        addDoctor(){

          this.dialogFormVisible = false
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          this.form.imgUrl=this.imageUrl;
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        handleEditClick(row){
            this.form=row;
          if(this.form.sysUser.sex == 1){
            this.form.sysUser.sex='男'
          }else if(this.form.sysUser.sex == 0){
            this.form.sysUser.sex='女'
          }
          this.dialogeditVisible=true
        },
        handleClick(row){
          this.form=row;
          if(this.form.sysUser.sex == 1){
            this.form.sysUser.sex='男'
          }else if(this.form.sysUser.sex == 0){
            this.form.sysUser.sex='女'
          }
          this.dialogxqVisible=true
        },
        closexq(){
          this.dialogxqVisible = false
        },
        handleSizeChange(val) {
          this.page.size=val;
          this.theList();
        },
        handleCurrentChange(val) {
          this.page.current=val;
          this.theList();
        },
        handleSelectionChange(val) {
            this.multipleSelection=[]
            for(var i=0;i<val.length;i++){
              this.multipleSelection.push(val[i].sysUser.userId);
            }
        },
        /*删除按钮*/
        delButton(){
          const val=this.multipleSelection.length;
          if(val>0){
            this.centerDialogVisible = true
          }else{
            this.$message({
              showClose: true,
              message: '请先选择要删除的人员！',
              type: 'warning'
            })
          }

        },
        ensureButton(){
          var params = new URLSearchParams();
          params.append("ids",this.multipleSelection)
          ensureDel(params).then(res =>{
              if(res.data.msg=='success'){
                this.$message({
                  message: '已删除相关人员',
                  type: 'success'
                })
                this.theList();
              }
          })
          this.centerDialogVisible = false
        },
        handle(row, column, event){
           if(event){
            this.$refs.multipleTable.toggleRowSelection(row);
           }
        },
        clearForm(){
          this.form.phone='';
          this.form.confirm='';
          this.form.password='';
          this.form.researchDirection='';
          this.form.titles='';
          this.form.address='';
          this.form.name='';
          this.form.sex='';
          this.form.birthplace='';
          this.form.createTime='';
          this.form.userId='';
          this.form.idcard ='';
          this.form.imgUrl = '';
          this.form.sysUser.address='';
          this.form.sysUser.name='';
          this.form.sysUser.sex='';
          this.form.sysUser.birthplace='';
          this.form.sysUser.createTime='';
          this.form.sysUser.userId='';
          this.form.sysUser.idcard ='';
          this.form.sysUser.phone='';
          this.form.sysUser.confirm='';
          this.form.sysUser.password='';

        },
        formatter1(row, column, cellValue){
          if(cellValue == 1 || cellValue== '男'){
            return  '男';
          }else if(cellValue == 0 || cellValue== '女'){
            return '女'
          }else{
            return ''
          }
        }
      }
    }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 90px;
    color: #8c939d;
    width: 100%;
    height: 100%;
    line-height: 100%;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
  .el-icon-plus{
    width: 100%;
    height: 100px;
  }
</style>
