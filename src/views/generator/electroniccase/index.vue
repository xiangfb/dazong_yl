<template>
  <div style="width: 98%; height: 100%;margin: 0 auto;">
  <!--外层容器-->
<!--  <el-container>-->
    <!--顶栏容器-->
<!--    <el-header direction="vertical">-->
      <div style="width: 100%;line-height: 60px;">
        <!--添加病历按钮-->
        <el-button style="float:left;margin-top: 8px;" type="primary"  @click="addDossierFrom" size="smail">添加病历</el-button>
        <!--搜索框-->
        <el-button  style="float:right;margin-top: 8px;"  type="primary" @click="theList" icon="el-icon-search"></el-button>
        <!--搜索按钮-->
        <el-input style="width: 200px !important;float:right"  v-model="input" placeholder="患者名称/手机号"></el-input>
      </div>
<!--    </el-header>-->

    <!--主要区域容器-->
<!--    <el-main>-->
      <!--病历列表表头-->
      <template>
        <el-table :data="dossierList" style="width: 100%"  height="550px" :row-class-name="tableRowClassName">
          <el-table-column width="120" v-if="a=false" prop="id" align="center" label="id"></el-table-column>
          <el-table-column width="100" prop="sysUser.name" align="center" label="患者名称"></el-table-column>
          <el-table-column width="50" prop="sysUser.sex" align="center" label="性别" :formatter="sexFormatter"></el-table-column>
          <el-table-column width="50" prop="sysUser.age" align="center" label="年龄"></el-table-column>
          <el-table-column width="150" prop="diseaseType" align="center" label="病型"></el-table-column>
          <el-table-column width="150" prop="sysUser.phone" align="center" label="手机号"></el-table-column>
          <el-table-column width="100" prop="creater" align="center" label="主治医生"></el-table-column>
          <el-table-column width="150" prop="medicareType" align="center" label="医保类别" :formatter="medicareList"></el-table-column>
          <el-table-column width="150" prop="createDate" align="center" label="创建时间" ></el-table-column>
          <el-table-column width="120" prop="dossierType" align="center" label="档案等级" :formatter="DossierType"></el-table-column>
          <el-table-column width="110" prop="dossierStatus" align="center" label="档案状态"></el-table-column>
          <el-table-column width="300" align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small"  @click="queryDossier(scope.row)">就诊情况</el-button>
              <el-button type="primary" size="small"  @click="queryDossierFrom(scope.row)">详情</el-button>
              <el-button type="primary" size="small"  @click="setdDossierStatus(scope.row)">废弃</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!--病历列表分页信息-->
<!--      <template>-->
        <div class="block" style="float:right">
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
<!--      </template>-->
<!--    </el-main>-->

    <!--添加病历页面-->
    <el-dialog title="添加病历信息" :visible.sync="dialogVisible" width="30%" :append-to-body="true" :before-close="handleClose">
      <!--table页签-->
      <template>
        <!--患者基本信息页面-->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="患者基本信息" name="firstVisitFirst">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="姓名:" size="mini"><el-input v-model="form.sysUser.name"></el-input></el-form-item>
              <el-form-item label="年龄:" size="mini"><el-input v-model="form.sysUser.age"></el-input></el-form-item>
              <el-form-item label="性别:" size="mini">
                <el-radio-group v-model="form.sysUser.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="手机号:" size="mini"><el-input v-model="form.sysUser.phone" @blur="isMobiles" @focus="Mobiles"></el-input></el-form-item>
              <div v-if="ok3"><span style="color: red;">请输入正确的手机号</span></div>
              <div v-if="ok4"><span style="color: red;">该手机号已被注册！</span></div>
              <el-form-item label="身份证号:" size="mini"><el-input v-model="form.sysUser.idcard"></el-input></el-form-item>
              <el-form-item label="住址:" size="mini"><el-input type="textarea" v-model="form.sysUser.address"></el-input></el-form-item>
            </el-form>
          </el-tab-pane>
          <!--患者更多信息页面-->
          <el-tab-pane label="患者更多信息" name="second">
            <el-form ref="form" :model="form" label-width="80px" >
              <el-form-item label="创建时间:" size="mini">
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.createDate"
                    style="width: 80%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="就诊医院:" size="mini">
                <el-select v-model="form.hospitalType" placeholder="请选择就诊医院">
                  <el-option
                   v-for="item in hospitaltype"
                   :label="item.name"
                   :value="item.deptId"
                   :key="item.deptId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="医保类别:" size="mini">
                <el-select v-model="form.medicareType" placeholder="请选择医保类别">
                  <el-option
                   v-for="item in medicare"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="病型:" size="mini"><el-input v-model="form.diseaseType"></el-input></el-form-item>
              <el-form-item label="档案等级:" size="mini">
                <el-select v-model="form.dossierType" placeholder="请选择档案等级">
                  <el-option label="红" value="1"></el-option>
                  <el-option label="黄" value="2"></el-option>
                  <el-option label="蓝" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button v-show="addDossierBut" type="primary" @click="addDossier">立即创建</el-button>
                <el-button @click="dialogVisible = false">关闭</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-dialog>

    <!--就诊情况页面-->
    <el-dialog title="就诊情况" :visible.sync="dialogVisible2" width="50%" :before-close="handleClose">
      <template>
        <!--患者基本信息-->
        <el-form ref="dossierForm1" :model="dossierForm1" label-width="80px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名"><el-input :disabled="true" v-model="dossierForm1.sysUser.name"></el-input></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">
                <el-input v-model="dossierForm1.sysUser.sex" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄"><el-input :disabled="true" v-model="dossierForm1.sysUser.age"></el-input></el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="住址"><el-input :disabled="true" v-model="dossierForm1.sysUser.address"></el-input></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="主治医生">
                <el-input :disabled="true" v-model="dossierForm1.creater"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="8">
              <el-form-item label="医保类型">
                <el-select :disabled="true" v-model="dossierForm1.medicareType" placeholder="请选择医保类型">
                  <el-option
                    v-for="item in medicare"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
             <el-form-item label="手机号"><el-input :disabled="true" v-model="dossierForm1.sysUser.phone"></el-input></el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--初诊按钮-->
        <el-button type="primary" style="width: 100%" @click="queryPopup('',dossierForm1.id,'firstVisit')">初诊</el-button> <br/>
        <!--添加报告按钮-->
        <el-tag type="info"  style="width: 80%;float:left">报告列表</el-tag>
        <el-button type="success" icon="el-icon-edit" style="width: 20%;float:right" @click="queryPopup('',dossierForm1.id,'addSubsequentVisit')" size="mini">添加报告</el-button> <br/>
        <!--报告列表-->
        <el-table :data="subsequentList" style="width: 100%;" size="mini">
          <el-table-column type="index" label="序号" align="center" width="80" ></el-table-column>
          <el-table-column prop="createDate" label="报告日期" align="center" width="180"></el-table-column>
          <el-table-column prop="clinicalSituation" label="患者情况" align="center" width="200"></el-table-column>
          <el-table-column label="操作" align="center" width="170">
            <template slot-scope="scope">
              <el-button @click="queryPopup(scope.row.id,dossierForm1.id,'subsequentVisit')" type="primary" icon="el-icon-info" size="small">报告详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--添加交班按钮-->
        <el-tag type="info"  style="width: 60%;float:left">交班列表</el-tag>
        <el-button type="primary" icon="el-icon-download" style="width: 19%;float:right" @click="download1(dossierForm1.id)" size="mini">导出列表</el-button>
        <el-button type="success" icon="el-icon-edit" style="width: 19%;float:right" @click="queryPopup('',dossierForm1.id,'addHandover')" size="mini">交班报告</el-button><br/>
        <!--交班列表-->
        <el-table :data="handoverList" style="width: 100%;" size="mini">
          <el-table-column type="index" label="序号" align="center" width="80" ></el-table-column>
          <el-table-column prop="date" label="交班日期" align="center" width="180"></el-table-column>
          <el-table-column prop="name" label="交班人" align="center" width="200"></el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <el-button @click="queryPopup(scope.row.id,dossierForm1.id,'handover')" type="primary" icon="el-icon-info" size="small">详情</el-button>
              <el-button size="small" @click="download2(scope.row.id,dossierForm1.id)" type="primary" icon="el-icon-download">导出</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--添加会诊按钮-->
        <el-tag type="info"  style="width: 80%;float:left">会诊列表</el-tag>
        <el-button type="success" icon="el-icon-edit" style="width: 20%;float:right" @click="queryPopup('',dossierForm1.id,'addConsultation')" size="mini">添加会诊</el-button> <br/>
        <!--会诊列表-->
        <el-table :data="consultationList" style="width: 100%;" size="mini">
          <el-table-column type="index" label="序号" align="center" width="80" ></el-table-column>
          <el-table-column prop="date" label="会诊日期" align="center" width="380"></el-table-column>
          <el-table-column label="操作" align="center" width="170">
            <template slot-scope="scope">
              <el-button @click="queryPopup(scope.row.id,dossierForm1.id,'consultation')" type="primary" icon="el-icon-info" size="small">会诊详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--出院按钮-->
        <el-button type="primary" style="width: 100%" @click="queryPopup('',dossierForm1.id,'leaveHospital')">出院</el-button><br/>
        <!--添加回访按钮-->
        <el-tag type="info"  style="width: 80%;float:left">回访列表</el-tag>
        <el-button type="success" icon="el-icon-edit" style="width: 20%;float:right" @click="queryPopup('',dossierForm1.id,'addVisit')" size="mini">添加回访</el-button> <br/>
        <!--回访列表-->
        <el-table :data="visitList" style="width: 100%;" size="mini">
          <el-table-column type="index" label="序号" align="center" width="80" ></el-table-column>
          <el-table-column prop="date" label="回访日期" align="center" width="180"></el-table-column>
          <el-table-column prop="people" label="回访人" align="center" width="200"></el-table-column>
          <el-table-column label="操作" align="center" width="170">
            <template slot-scope="scope">
              <el-button @click="queryPopup(scope.row.id,dossierForm1.id,'visit')" type="primary" icon="el-icon-info" size="small">回访详情</el-button>
            </template>
          </el-table-column>
        </el-table>


        <!--弹出页面-->
        <el-dialog title="电子病历" :visible.sync="popup" :modal-append-to-body="false" width="65%" :append-to-body="true">
          <!--table页签-->
          <template>
            <el-tabs v-model="activeName" :tab-position="tabPosition"  @tab-click="handleClick" ref="tabs">
              <!--初诊单页面-->
              <el-tab-pane label="初诊单" name="firstVisitFirst" style="height: 550px;overflow-y:auto;overflow-x:hidden;">
                <el-form ref="firstVisitForm" :model="firstVisitForm" label-width="150px">
                  <el-input v-model="firstVisitForm.id" hidden></el-input>
                  <el-input v-model="firstVisitForm.dossierId=dossierForm1.id" hidden></el-input>
                  <el-form-item label="疾病名称:" size="mini"><el-input v-model="firstVisitForm.diseaseName"></el-input></el-form-item>
                  <el-form-item label="第一次发病到现在的时间:" size="mini">
                    <el-col :span="15">
                      <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="firstVisitForm.firstDiseaseDate" style="width: 100%;" ></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="初发部位:" size="mini"><el-input v-model="firstVisitForm.firstPart"></el-input></el-form-item>
                  <el-form-item label="疾病发展快慢:" size="mini"><el-input v-model="firstVisitForm.diseaseSpeed" placeholder="7日之内进展迅速叫快,否则为慢"></el-input></el-form-item>
                    <el-form-item label="有无全身爆发过:" size="mini"><el-input v-model="firstVisitForm.outburst" placeholder="指从头到脚突然爆炸性发作,注意爆炸"></el-input></el-form-item>
                  <el-form-item label="治疗史:" size="mini"><el-input type="textarea" v-model="firstVisitForm.cureHistory"></el-input></el-form-item>
                  <el-form-item label="其他疾病史:" size="mini"><el-input type="textarea" v-model="firstVisitForm.otherMedical"></el-input></el-form-item>
                  <el-form-item label="自认为何种原因导致疾病:" size="mini"><el-input type="textarea" v-model="firstVisitForm.yourselfIll"></el-input></el-form-item>
                  <el-form-item label="有无了解过广汗法:" size="mini"><el-input type="textarea" v-model="firstVisitForm.learnGhf"></el-input></el-form-item>
                  <el-form-item label="学习广汗法的时间长度:" size="mini"><el-input type="textarea" v-model="firstVisitForm.studyGhf"></el-input></el-form-item>
                  <el-form-item label="出汗情况:" size="mini"><el-input type="textarea" v-model="firstVisitForm.sweat" placeholder="哪儿出,哪儿不出"></el-input></el-form-item>
                  <el-form-item label="有没有发烧过最高烧到多少度采取了何种措施:" size="mini"><el-input type="textarea"  v-model="firstVisitForm.feverSPS"></el-input></el-form-item>
                  <el-form-item label="最后一次发烧时间:" size="mini">
                    <el-col :span="11">
                      <el-date-picker type="date" placeholder="选择日期" v-model="firstVisitForm.lastFeverDate" style="width: 80%;" ></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="3年内发烧次数:" size="mini"><el-input v-model="firstVisitForm.feverNum"></el-input></el-form-item>
                  <el-form-item label="患病过程:" size="mini"><el-input type="textarea" v-model="firstVisitForm.diseaseProcess"></el-input></el-form-item>
                  <el-form-item label="本表填写时间:" size="mini" >
                    <el-col :span="11">
                      <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="firstVisitForm.createDate" style="width: 80%;" ></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="预约门诊时间:" size="mini">
                    <el-col :span="11">
                      <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="firstVisitForm.outpatientDate" style="width: 80%;" ></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="预约住院时间:" size="mini">
                    <el-col :span="11">
                      <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="firstVisitForm.hospitalizationDate" style="width: 80%;" ></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <!--图片墙-->
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit('firstVisit')">保存</el-button>
                    <el-button @click="popup = false">关闭</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <!--报告单页面-->
              <el-tab-pane label="报告单" name="subsequentVisitFirst" style="height: 550px;overflow-y:auto;overflow-x:hidden;">
                <el-form ref="subsequentVisitForm" :model="subsequentVisitForm" label-width="150px">
                  <el-input v-model="subsequentVisitForm.id" hidden></el-input>
                  <el-input v-model="subsequentVisitForm.dossierId=dossierForm1.id" hidden></el-input>
                  <el-form-item label="报告时间:" size="mini">
                    <el-col :span="15">
                      <el-date-picker type="date" placeholder="选择日期" v-model="subsequentVisitForm.createDate" style="width: 100%;" ></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="患者情况:" size="mini"><el-input type="textarea" v-model="subsequentVisitForm.clinicalSituation"></el-input></el-form-item>
                  <el-form-item label="患者病情:" size="mini"><el-input type="textarea" v-model="subsequentVisitForm.clinicalIllness"></el-input></el-form-item>
                  <el-form-item label="风险:" size="mini"><el-input type="text" v-model="subsequentVisitForm.risk"></el-input></el-form-item>
                  <el-form-item label="化验结果:" size="mini"><el-input type="text" v-model="subsequentVisitForm.laboratoryReport"></el-input></el-form-item>
                  <el-form-item label="体温:" size="mini"><el-input type="text" v-model="subsequentVisitForm.heat"></el-input></el-form-item>
                  <el-form-item label="昨日治疗:" size="mini"><el-input type="textarea" v-model="subsequentVisitForm.ayerCure"></el-input></el-form-item>
                  <el-form-item label="昨日服药量:" size="mini"><el-input type="text" v-model="subsequentVisitForm.ayerMedicine"></el-input></el-form-item>
                  <el-form-item label="今日用药:" size="mini"><el-input type="text" v-model="subsequentVisitForm.todayMedicine"></el-input></el-form-item>
                  <el-form-item label="其他:" size="mini"><el-input type="textarea" v-model="subsequentVisitForm.other"></el-input></el-form-item>
                  <!--图片墙-->
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit('subsequentVisit')">保存</el-button>
                    <el-button @click="popup = false">关闭</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <!--出院单页面-->
              <el-tab-pane label="出院单" name="leaveHospitalFirst" style="height: 550px;overflow-y:auto;overflow-x:hidden;">
                <el-form ref="leaveHospitalForm" :model="leaveHospitalForm" label-width="150px">
                  <el-input v-model="leaveHospitalForm.id" hidden></el-input>
                  <el-input v-model="leaveHospitalForm.dossierId=dossierForm1.id" hidden></el-input>
                  <el-form-item label="出院患者:" size="mini"><el-input v-model="leaveHospitalForm.sickName"></el-input></el-form-item>
                  <el-form-item label="出院时间:" size="mini">
                    <el-col :span="15">
                      <el-date-picker type="date" placeholder="选择日期" v-model="leaveHospitalForm.leaveDate" style="width: 100%;" ></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="住院方案:" size="mini"><el-input type="textarea" v-model="leaveHospitalForm.scheme"></el-input></el-form-item>
                  <el-form-item label="住院变化:" size="mini"><el-input type="textarea" v-model="leaveHospitalForm.hospitalChange"></el-input></el-form-item>
                  <el-form-item label="出院带药:" size="mini"><el-input type="textarea" v-model="leaveHospitalForm.takeMedicine"></el-input></el-form-item>
                  <el-form-item label="出院检查:" size="mini"><el-input type="textarea" v-model="leaveHospitalForm.examine"></el-input></el-form-item>
                  <el-form-item label="出院后观察:" size="mini"><el-input type="textarea" v-model="leaveHospitalForm.observe"></el-input></el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit('leaveHospital')">保存</el-button>
                    <el-button @click="popup = false">关闭</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>

              <!--交班单页面-->
              <el-tab-pane label="交班单" name="handoverFirst" style="height: 550px;overflow-y:auto;overflow-x:hidden;">

                <el-form ref="handoverForm" :model="handoverForm" label-width="150px">
                  <div style="width: 300px;">
                    <el-form-item label="往期交班:" size="mini">
                      <el-select  placeholder="请选择" v-model="jiaobanid" @change="jiaoban" style="width: 150px !important;">
                        <el-option
                          v-for="item in handoverList"
                          :key="item.id"
                          :label="item.date"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <el-input v-model="handoverForm.id" hidden></el-input>
                  <el-input v-model="handoverForm.dossierId=dossierForm1.id" hidden></el-input>
                  <el-form-item label="交班人:" size="mini"><el-input v-model="handoverForm.name=userInfo.name"></el-input></el-form-item>
                  <el-form-item label="交班时间:" size="mini">
                    <el-col :span="15">
                      <el-date-picker type="date" placeholder="选择日期" v-model="handoverForm.date =new Date()" style="width: 100%;" ></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="主要目标:" size="mini"><el-input type="textarea" v-model="handoverForm.hospitalTarget"></el-input></el-form-item>
                  <el-form-item label="天数:" size="mini"><el-input type="textarea" v-model="handoverForm.days"></el-input></el-form-item>
                  <el-form-item label="阴阳:" size="mini"><el-input type="textarea" v-model="handoverForm.anionCation"></el-input></el-form-item>
                  <el-form-item label="化验结果:" size="mini"><el-input type="textarea" v-model="handoverForm.laboratoryReport"></el-input></el-form-item>
                  <el-form-item label="上次主症:" size="mini"><el-input type="textarea" v-model="handoverForm.oldSymptom"></el-input></el-form-item>
                  <el-form-item label="上次药方:" size="mini"><el-input type="textarea" v-model="handoverForm.oldPrescription"></el-input></el-form-item>
                  <el-form-item label="分析上次:" size="mini"><el-input type="textarea" v-model="handoverForm.analysisLast"></el-input></el-form-item>
                  <el-form-item label="本次方案:" size="mini"><el-input type="textarea" v-model="handoverForm.thisScheme"></el-input></el-form-item>
                  <el-form-item label="真气从之治疗:" size="mini"><el-input type="textarea" v-model="handoverForm.airCure"></el-input></el-form-item>
                  <el-form-item label="其他:" size="mini"><el-input type="textarea" v-model="handoverForm.other"></el-input></el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit('handover')">保存</el-button>
                    <el-button @click="popup = false">关闭</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>

              <!--会诊单页面-->
              <el-tab-pane label="会诊单" name="consultationFirst" style="height: 550px;overflow-y:auto;overflow-x:hidden;">
                <el-form ref="consultationForm" :model="consultationForm" label-width="150px">
                  <el-input v-model="consultationForm.id" hidden></el-input>
                  <el-input v-model="consultationForm.dossierId=dossierForm1.id" hidden></el-input>
                  <el-form-item label="会诊时间:" size="mini">
                    <el-col :span="15">
                      <el-date-picker type="date" placeholder="选择日期" v-model="consultationForm.date" style="width: 100%;" ></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="主症:" size="mini"><el-input type="text" v-model="consultationForm.symptom"></el-input></el-form-item>
                  <el-form-item label="目标:" size="mini"><el-input type="text" v-model="consultationForm.target"></el-input></el-form-item>
                  <el-form-item label="方案:" size="mini"><el-input type="textarea" v-model="consultationForm.scheme"></el-input></el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit('consultation')">保存</el-button>
                    <el-button @click="popup = false">关闭</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>

              <!--回访单页面-->
              <el-tab-pane label="回访单" name="visitFirst" style="height: 550px;overflow-y:auto;overflow-x:hidden;">
                <el-form ref="visitForm" :model="visitForm" label-width="150px">
                  <el-input v-model="visitForm.id" hidden></el-input>
                  <el-input v-model="visitForm.dossierId=dossierForm1.id" hidden></el-input>
                  <el-form-item label="回访时间:" size="mini">
                    <el-col :span="15">
                      <el-date-picker type="date" placeholder="选择日期" v-model="visitForm.date" style="width: 100%;" ></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="回访人:" size="mini"><el-input type="text" v-model="visitForm.people"></el-input></el-form-item>
                  <el-form-item label="回访内容:" size="mini"><el-input type="textarea" v-model="visitForm.content"></el-input></el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit('visit')">保存</el-button>
                    <el-button @click="popup = false">关闭</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>

              <!--医生诊断列表页面-->
              <el-tab-pane label="医生诊断列表" name="second" style="height: 550px;overflow-y:auto;overflow-x:hidden;">
                <el-button type="success" icon="el-icon-edit" style="width: 20%;float:right"  @click="addDiagnoseVisibleFrom()" size="mini">添加诊断</el-button> <br/>
                <el-table :data="diagnoseList" border style="width: 100%">
                  <el-table-column prop="doctor" label="诊断医生" width="150"></el-table-column>
                  <el-table-column prop="date" label="诊断日期" width="140"></el-table-column>
                  <el-table-column prop="details" label="诊断内容" width="600"></el-table-column>
                </el-table>
              </el-tab-pane>

              <!--化验单列表页面-->
              <el-tab-pane label="化验单" name="third" style="height: 550px;overflow-y:auto;overflow-x:hidden;">
                  <el-table :data="laboratoryList" style="width: 100%;height: 100%;overflow-y:auto;overflow-x:hidden;" >
                    <el-table-column width="100" prop="laboratoryType" label="化验单类型" ></el-table-column>
                    <el-table-column width="100" prop="diagnoseType" label="诊断类型"></el-table-column>
                    <el-table-column width="100" prop="isUnusual" label="是否异常"></el-table-column>
                    <el-table-column width="100" prop="inspectTime" label="送检时间"></el-table-column>
                    <el-table-column width="125" prop="reportTime" label="报告时间"></el-table-column>
                    <el-table-column width="100" prop="inspectName" label="检验人员"></el-table-column>
                    <el-table-column width="100" prop="assessor" label="审核人员"></el-table-column>
                    <el-table-column width="200" prop="a" label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button @click="getCheckListView(scope.row)" type="primary" icon="el-icon-info" size="small">详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
              </el-tab-pane>
            </el-tabs>

            <!--添加诊断列表页面-->
            <el-dialog title="添加诊断" :visible.sync="addDiagnoseVisible" :modal-append-to-body="false" width="40%" :append-to-body="true">
              <el-form ref="diagnoseVisitForm" :model="diagnoseVisitForm" label-width="100px">
                <el-input v-model="diagnoseVisitForm.id" hidden></el-input>
                <el-input v-model="diagnoseVisitForm.dossierId = dossierForm1.id" hidden ></el-input>
                <el-form-item label="诊断医生:" size="mini"><el-input v-model="diagnoseVisitForm.doctor = userInfo.name" ></el-input></el-form-item>
                <el-form-item label="报告时间:" size="mini">
                  <el-col :span="15">
                    <el-date-picker type="date" placeholder="诊断时间:" v-model="diagnoseVisitForm.date = new Date()" style="width: 100%;" ></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="诊断内容:" size="mini"><el-input type="textarea" v-model="diagnoseVisitForm.details" rows="5"></el-input></el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="addDiagnoseVisit">保存</el-button>
                  <el-button @click="addDiagnoseVisible = false">关闭</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <!--化验单详情 -->
            <el-dialog title="化验单项目" :visible.sync="queryDialogTableVisibleForm" width="80%" :append-to-body="true">
              <el-form ref="dialogTableVisibleForm" :model="dialogTableVisibleForm"    style="text-align:center;">
                <el-input style="display:none;"  id="dialogTableVisibleForm_sysUser_id"  v-model="ruleForm.dossierId"></el-input>
                <el-input style="display:none;" id="dialogTableVisibleForm_id"  v-model="ruleForm.id"></el-input>
                <!-- 页眉 -->
                <h3>广汗法专科中医院化验单</h3>
                <hr />
                <table style="width: 100%;">
                  <tr>
                    <td class="titname">姓  名:</td>
                    <td id="username" class="titcontent" style="width: 250px;">
                      <el-input id="usernameinput" :disabled="true" style="width: 58%"  v-model="dialogTableVisibleForm.sysUser.name"></el-input>
                    </td>
                    <td class="titname">性  别:</td>
                    <td id="sex" class="titcontent">
                      <el-radio-group v-model="dialogTableVisibleForm.sysUser.sex" :disabled="true">
                        <el-radio  :label="1">男</el-radio>
                        <el-radio  :label="0">女</el-radio>
                      </el-radio-group>
                    </td>
                    <td class="titname">科  室:</td><td id="division" class="titcontent">
                    <el-input v-model="dialogTableVisibleForm.division"></el-input>
                  </td>
                    <td class="titname">病床号:</td><td id= "bed" class="titcontent">
                    <el-input v-model="dialogTableVisibleForm.bed"></el-input>
                  </td>
                  </tr>
                  <tr>
                    <td class="titname">样    本:</td><td id= "sample" class="titcontent">
                    <el-input v-model="dialogTableVisibleForm.sample"></el-input>
                  </td>
                    <td class="titname">是否异常:</td><td id= "sample_status" class="titcontent">
                    <el-radio-group v-model="dialogTableVisibleForm.isUnusual">
                      <el-radio  :label="1">正常</el-radio>
                      <el-radio  :label="2">异常</el-radio>
                    </el-radio-group>
                  </td>
                    <td class="titname">样 本 号:</td><td id= "sample_num" class="titcontent">
                    <el-input v-model="dialogTableVisibleForm.sampleNum"></el-input>
                  </td>
                    <td class="titname">采样时间:</td><td id= "sample_time" class="titcontent">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择日期"
                      v-model="dialogTableVisibleForm.sampleTime"
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

                  :data.sync="dialogTableVisibleForm.buLaboratorySubList"
                  :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}">
                  <vxe-table-column  type="index" label="序号" width="60"></vxe-table-column>
                  <vxe-table-column  prop="itemname" label="项目名称" ></vxe-table-column>
                  <vxe-table-column  prop="findings" label="检查结果"  ></vxe-table-column>
                  <vxe-table-column  prop="hint" label="提示" ></vxe-table-column>
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
                      v-model="dialogTableVisibleForm.inspectTime"
                      style="width: 80%;"
                      value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                  </td>
                    <td class="titname">报告时间：</td><td id="report_time" class="titcontent">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择日期"
                      v-model="dialogTableVisibleForm.reportTime"
                      style="width: 80%;"
                      value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                  </td>
                    <td class="titname">检验员：</td><td id="inspect_name" class="titcontent">
                    <el-input v-model="dialogTableVisibleForm.inspectName"></el-input>
                  </td>
                    <td class="titname">审核人员：</td><td id="assessor" class="titcontent">
                    <el-input v-model="dialogTableVisibleForm.assessor"></el-input>
                  </td>
                  </tr>
                </table>
                <hr />
                <!-- 按钮 -->
                <el-form-item>
                  <el-button @click="queryDialogTableVisibleForm = false">取 消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>

          </template>
        </el-dialog>

      </template>
    </el-dialog>

<!--  </el-container>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Vue from 'vue'
  import VXETable from 'vxe-table'
  import 'vxe-table/lib/index.css'
  import {cardid,isMobile} from '@/util/validate'
  import {validateMobile} from "@/api/admin/doctor"
  Vue.use(VXETable)
    import {downloadList,hospitaltype,theMedicare, addDossier,saveFirstVisit,setdDossierStatus,queryDossierFrom,queryDossier,addDiagnoseVisit,saveLeaveHospital,saveSubsequentVisit,dossierList,
      querySubsequentVisitList,querySubsequentVisitForm,queryFirstvisitVisible,queryDiagnoseList,queryHandoverList,queryConsultationList,queryVisitList,
      queryLaboratoryList,queryBuLaboratoryFrom,queryLeaveHospital,queryHandoverForm,queryConsultationForm,queryVisitForm,saveHandover,saveConsultation,saveVisit } from '@/api/generator/electroniccase'
    export default {
      //页面初次加载方法
      created() {
        this.theList();
        this.theMedicare()
        this.hospitaltype1()
      },
      computed: {
        ...mapGetters(['permissions','userInfo'])
      },
      methods: {
        download1(id){
          window.location.href='/admin/dossier/export?id=' + id;
        },
        download2(id1,id2){
          window.location.href='/admin/dossier/export2?id1=' + id1+'&id2='+id2;
        },
        jiaoban(){
         this.handoverForm={
              hospitalTarget: '',
              days: '',
              anionCation: '',
              laboratoryReport: '',
              oldSymptom: '',
              oldPrescription: '',
              analysisLast: '',
              thisScheme: '',
              airCure: '',
              other: ''
          }
          for(var i=0; i<this.handoverList.length;i++){
            if(this.jiaobanid === this.handoverList[i].id){
              this.handoverForm.airCure=this.handoverList[i].airCure;
              this.handoverForm.days=this.handoverList[i].days;
              this.handoverForm.hospitalTarget=this.handoverList[i].hospitalTarget;
              this.handoverForm.anionCation=this.handoverList[i].anionCation;
              this.handoverForm.laboratoryReport=this.handoverList[i].laboratoryReport;
              this.handoverForm.oldSymptom=this.handoverList[i].oldSymptom;
              this.handoverForm.oldPrescription=this.handoverList[i].oldPrescription;
              this.handoverForm.analysisLast=this.handoverList[i].analysisLast;
              this.handoverForm.thisScheme=this.handoverList[i].thisScheme;
              this.handoverForm.other=this.handoverList[i].other;
            }
          }
          this.jiaobanid=''

        },
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
              if(f < findings && l> findings){
                row.hint = '正常';
              }else{
                row.hint = '异常';
              }
            }
          }
        },
        medicareList(row){
          if(row.medicareType == '1'){
            return '城镇职工基本医疗'
          }
          if(row.medicareType == '2'){
            return '城镇居民基本医疗'
          }
          if(row.medicareType == '3'){
            return '新型农村合作医疗'
          }
          if(row.medicareType == '4'){
            return '贫困救助'
          }
          if(row.medicareType == '5'){
            return '商业医疗保险'
          }
          if(row.medicareType == '6'){
            return '全公费'
          }
          if(row.medicareType == '7'){
            return '全自费'
          }
          if(row.medicareType == '8'){
            return '其他社会保险'
          }
          if(row.medicareType == '9'){
            return '其他'
          }
        },
        DossierType(row){
          const type=row.dossierType;
          if(type ==1){
            return '红'
          }else if(type ==2){
            return '黄'
          }else{
            return '蓝'
          }
        },
        sexFormatter(row){
          if(row.sysUser.sex==1){
            return '男';
          }else if(row.sysUser.sex == 0){
            return '女';
          }
        },
        handleClose(done) {
          // this.$confirm('确认关闭？')
          //   .then(_ => {
              done();
            // })
            // .catch(_ => {});
        },
        handleSizeChange(val) {
          this.page.size=val;
          this.theList();
        },
        handleCurrentChange(val) {
          this.page.current=val;
          this.theList();
        },
        //页面初次加载方法
        theList(){
          if(this.input != null && this.input !=''){
            this.page.current=1;
          }
          dossierList(this.page,this.input).then(response => {
            this.dossierList=response.data.data.records;
            this.page.size=response.data.data.size;
            this.page.current=response.data.data.current;
            this.page.total=response.data.data.total;
          })
          this.input='';
        },
        //列表颜色控制
        tableRowClassName({row, rowIndex}) {
          if (row.dossierType == 1) {
           return 'red-row';
          } else
          if (row.dossierType == 2) {
            return 'yellow-row';
          }else
          if (row.dossierType == 3) {
            return 'blue-row';
          }
          return '';
        },
        //选项卡切换控制
        handleClick(tab, event) {
         // console.log(tab, event);
        },
        //添加病历
        addDossierFrom(){
          this.dialogVisible=true;
          this.activeName='firstVisitFirst',
          this.form={sysUser: {
              username:'',
              age:'',
              sex:'',
              address:'',
              phone:'',
              idcard: '',
              address: '',
            },
            createDate: '',
            hospitalType: '',
            medicareType: '',
            diseaseType: '',
            dossierType: ''};
          this.addDossierBut=true
        },
        //弹出框保存方法
        onSubmit(type) {
          //保存初诊
          if(type=="firstVisit"){
            saveFirstVisit(this.firstVisitForm).then(res => {
            })
          }
          //保存报告
          if(type=="subsequentVisit"){
            saveSubsequentVisit(this.subsequentVisitForm).then(res => {
                this.popup=false;
            })
          }
          //保存出院单
          if(type=="leaveHospital"){
            saveLeaveHospital(this.leaveHospitalForm).then(res => {
              this.popup=false;
            })
          }
          //保存交班单
          if(type=="handover"){
            saveHandover(this.handoverForm).then(res => {
              this.popup=false;
              queryHandoverList(this.handoverForm.dossierId)
            })
          }
          //保存会诊单
          if(type=="consultation"){
            saveConsultation(this.consultationForm).then(res => {
              this.popup=false;
            })
          }
          //保存回访单
          if(type=="visit"){
            saveVisit(this.visitForm).then(res => {
              this.popup=false;
            })
          }

        },
        //添加患者更多信息保存按钮
        addDossier() {
          addDossier(this.form).then(data => {
            this.dialogVisible=false;
            this.theList();
          })

        },
        //查询病历详情表单
        queryDossierFrom(row){
          this.form={};
          this.activeName='firstVisitFirst',
          queryDossierFrom(row.id).then(data => {
            this.dialogVisible=true;
            this.form=data.data.data;
            this.addDossierBut = false
          })
        },
        //废弃病历
        setdDossierStatus(row){
          this.$confirm('确认要废除该病例吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            setdDossierStatus(row.id).then(data => {
              this.theList();
            })
            this.$message({
              type: 'success',
              message: '已经废弃该病例!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });


        },

        //添加医生诊断
        addDiagnoseVisibleFrom(){
          this.addDiagnoseVisible=true;
          this.diagnoseVisitForm={ }
        },
        //保存医生诊断
        addDiagnoseVisit(){
          addDiagnoseVisit(this.diagnoseVisitForm).then(data => {
            this.addDiagnoseVisible=false;
            this.queryPopup("",this.diagnoseVisitForm.dossierId,"1");
          })
        },

        //查询就诊情况
        queryDossier( row) {
          this.dossierForm1={};
          this.subsequentList=[];
          //基本信息查询
          queryDossier(row.id).then(data => {
            this.dialogVisible2=true;
             this.dossierForm1=data.data.data;
             if(this.dossierForm1.sysUser.sex == '1'){
               this.dossierForm1.sysUser.sex ='男'
             }else{
               this.dossierForm1.sysUser.sex ='女'
             }
          }),
          //报告列表查询
          querySubsequentVisitList(row.id).then(data => {
            this.subsequentList=data.data.data;
          }),
          //交班列表查询
          queryHandoverList(row.id).then(data => {
            this.handoverList=data.data.data;
          })
          //会诊列表查询
          queryConsultationList(row.id).then(data => {
            this.consultationList=data.data.data;
          })
          //回访列表查询
          queryVisitList(row.id).then(data => {
            this.visitList=data.data.data;
          })
        },

        //弹出页面
        queryPopup(id,dossierid,type) {

          this.popup=true;

          if(type=="firstVisit"){
            this.firstVisitForm={};
            //初诊单
            queryFirstvisitVisible(dossierid).then(data => {
              this.activeName='firstVisitFirst';
              this.$refs.tabs.$children[0].$refs.tabs[0].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[1].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[2].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[3].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[4].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[5].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[6].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[7].style.display = 'block';
              if(data.data.data!==null && data.data.data!==""){
                this.firstVisitForm=data.data.data;
              }
            })
          };
          if(type=="addSubsequentVisit"){
            this.subsequentVisitForm={};
            //添加报告页面状态
            querySubsequentVisitForm(id).then(data => {
              this.activeName='subsequentVisitFirst';
              this.$refs.tabs.$children[0].$refs.tabs[0].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[1].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[2].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[3].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[4].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[5].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[6].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[7].style.display = 'block';
              if(data.data.data!==null && data.data.data!==""){
                this.subsequentVisitForm=data.data.data;
              }
            })
            this.subsequentVisitForm={};
          };
          if(type=="subsequentVisit"){
            //报告单
            querySubsequentVisitForm(id).then(data => {
              this.activeName='subsequentVisitFirst';
              this.$refs.tabs.$children[0].$refs.tabs[0].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[1].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[2].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[3].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[4].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[5].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[6].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[7].style.display = 'block';
              if(data.data.data!==null && data.data.data!==""){
                this.subsequentVisitForm=data.data.data;
              }
            })
          };
          if(type=="leaveHospital"){
            //出院单
            queryLeaveHospital(id).then(data => {
              this.activeName='leaveHospitalFirst';
              this.$refs.tabs.$children[0].$refs.tabs[0].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[1].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[2].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[3].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[4].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[5].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[6].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[7].style.display = 'block';
              if(data.data.data!==null && data.data.data!==""){
                this.subsequentVisitForm=data.data.data;
              }

            })
          };
          if(type=="addHandover") {
            //添加交班页面状态
            queryHandoverForm(id).then(data => {
              this.activeName='handoverFirst';
              this.$refs.tabs.$children[0].$refs.tabs[0].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[1].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[2].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[3].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[4].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[5].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[6].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[7].style.display = 'block';
              if(data.data.data!==null && data.data.data!==""){
                this.handoverForm=data.data.data;
              }

            })
            this.handoverForm = {};
          }
          if(type=="handover"){
            //交班单
            queryHandoverForm(id).then(data => {
              this.activeName='handoverFirst';
              this.$refs.tabs.$children[0].$refs.tabs[0].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[1].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[2].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[3].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[4].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[5].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[6].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[7].style.display = 'block';
              if(data.data.data!==null && data.data.data!==""){
                this.handoverForm=data.data.data;
              }

            })
          };
          if(type=="addConsultation") {

            //添加会诊页面状态
            queryConsultationForm(id).then(data => {
              this.activeName='consultationFirst';
              this.$refs.tabs.$children[0].$refs.tabs[0].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[1].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[2].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[3].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[4].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[5].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[6].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[7].style.display = 'block';
              if(data.data.data!==null && data.data.data!==""){
                this.consultationForm=data.data.data;
              }
            })
            this.consultationForm = {};
          }
          if(type=="consultation"){
            //会诊单
            queryConsultationForm(id).then(data => {
              this.activeName='consultationFirst';
              this.$refs.tabs.$children[0].$refs.tabs[0].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[1].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[2].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[3].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[4].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[5].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[6].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[7].style.display = 'block';
              if(data.data.data!==null && data.data.data!==""){
                this.consultationForm=data.data.data;
              }

            })
          };
          if(type=="addVisit") {
            //添加回访单页面状态
            queryVisitForm(id).then(data => {
              this.activeName='visitFirst';
              this.$refs.tabs.$children[0].$refs.tabs[0].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[1].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[2].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[3].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[4].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[5].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[6].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[7].style.display = 'block';

              if(data.data.data!==null && data.data.data!==""){
                this.visitForm=data.data.data;
              }
            })
            this.visitForm = {};
          }
          if(type=="visit"){
            //回访单
            queryVisitForm(id).then(data => {
              this.activeName='visitFirst';
              this.$refs.tabs.$children[0].$refs.tabs[0].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[1].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[2].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[3].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[4].style.display = 'none';
              this.$refs.tabs.$children[0].$refs.tabs[5].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[6].style.display = 'block';
              this.$refs.tabs.$children[0].$refs.tabs[7].style.display = 'block';

              if(data.data.data!==null && data.data.data!==""){
                this.visitForm=data.data.data;
              }
            })
          };

          //医生诊断列表
          queryDiagnoseList(dossierid).then(data => {
            this.diagnoseList=[];
            if(data.data.data!==null && data.data.data!==""){
              this.diagnoseList=data.data.data;
            }
          })
          //化验单列表
          queryLaboratoryList(dossierid).then(data => {
            if(data.data.data!==null && data.data.data!==""){
              this.laboratoryList=data.data.data;
            }
          })
        },

        //图片墙
        handleRemove(file, fileList) {
         // console.log(file, fileList);
        },
        //图片墙
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        //医保类别
        theMedicare(){
          theMedicare().then(resp =>{
            this.medicare=resp.data.data;
          })
        },
        hospitaltype1(){
          hospitaltype().then(resp => {
            this.hospitaltype=resp.data.data;
          })
        },
        Mobiles(){
          this.ok3=false;
          this.ok4=false;
          this.form.sysUser.phone=''
        },
        isMobiles(){
          if(!isMobile(this.form.sysUser.phone)){
            this.ok3=true;
          }else{
            validateMobile(this.form.sysUser.phone).then(resp => {
              if(!resp.data.data){
                this.ok4 = true;
              }
            })
          }
        },
        //化验单详情
        getCheckListView(row) {
          //根据化验单类型查询化验单项目列表
          queryBuLaboratoryFrom(row.id).then(response => {
            this.dialogTableVisibleForm = response.data.data;
            this.queryDialogTableVisibleForm=true;
          })
        },
      },

      data() {
        return {
          ok3:false,
          ok4:false,
          jiaobanid:'',//交班ID
          hospitaltype:[],//就诊医院
          medicare:[],//医保类别
          tabPosition:'left',
          //病历添加按钮
          addDossierBut: false,
          //就诊详情页面状态
          dialogVisible2: false,
          //初诊页面状态
          popup:false,
          // //添加诊断页面状态
          addDiagnoseVisible:false,
          //化验单页面
          dialogTableVisibleForm:false,
          queryDialogTableVisibleForm:false,
          //图片墙
          dialogImageUrl: '',
          dialogVisible: false,
          //添加病历默认第一个选项卡
          activeName: 'firstVisitFirst',
          //病历列表表单数据
          dossierList: [],
          //添加病历患者基本信息表单数据
          form: {
            sysUser: {
              name:'',
              age:'',
              sex:'1',
              address:'',
              phone:'',
              idcard: '',
              address: '',
            },
            createDate: '',
            hospitalType: '',
            medicareType: '',
            diseaseType: '',
            dossierType: ''
          },

          //就诊详情基本信息
          dossierForm1: {
            creater:'',
            createDate1: '',
            hospitalType: '',
            medicareType: '',
            diseaseType: '',
            dossierType: '',
            sysUser: {
              name:'',
              age:'',
              sex:'',
              address:'',
              phone:'',
            }
          },
          //报告列表信息数据
          subsequentList: [],
          //交班列表信息数据
          handoverList: [],
          //会诊列表信息数据
          consultationList: [],
          //回访列表信息数据
          visitList: [],
          ruleForm:{},
          //初诊单数据
          firstVisitForm: {
            id: '',
            dossierId: '',
            diseaseName: '',
            firstDiseaseDate: '',
            firstPart: '',
            diseaseSpeed: '',
            outburst: '',
            cureHistory: '',
            otherMedical: '',
            yourselfIll: '',
            learnGhf: '',
            studyGhf: '',
            sweat: '',
            feverSPS: '',
            lastFeverDate: '',
            feverNum: '',
            diseaseProcess: '',
            createDate: '',
            outpatientDate: '',
            hospitalizationDate: ''
          },
          //报告单数据
          subsequentVisitForm: {
            id: '',
            dossierId: '',
            createDate: '',
            clinicalSituation: '',
            clinicalIllness: '',
            risk: '',
            laboratoryReport: '',
            heat: '',
            ayerCure: '',
            ayerMedicine: '',
            todayMedicine: '',
            other: ''
          },
          //出院单数据
          leaveHospitalForm: {
            id: '',
            dossierId: '',
            sickName: '',
            leaveDate: '',
            scheme: '',
            hospitalChange: '',
            takeMedicine: '',
            examine: '',
            observe: ''
          },
          //交班单数据
          handoverForm: {
            id: '',
            dossierId: '',
            name: '',
            date: '',
            hospitalTarget: '',
            days: '',
            anionCation: '',
            laboratoryReport: '',
            oldSymptom: '',
            oldPrescription: '',
            analysisLast: '',
            thisScheme: '',
            airCure: '',
            other: ''
          },
          //会诊单数据
          consultationForm: {
            id: '',
            dossierId: '',
            date: '',
            symptom: '',
            target: '',
            scheme: '',
            creater: ''
          },
          //回访单数据
          visitForm: {
            id: '',
            dossierId: '',
            date: '',
            people: '',
            content: ''
          },
          //医生诊断列表
          diagnoseList: [],
          //化验单列表
          laboratoryList: [],
          //添加医生诊断表单
          diagnoseVisitForm:{
            dossier_id:'',
            doctor:'',
            date:'',
            details:''
          },
          //分页信息
          page:{
            current: 1,
            size: 10,
            total: 0
          },
          input:'',
          //化验单详情
          dialogTableVisibleForm: {
            id: '',
            dossierId: '',//档案主键id
            userId: '',
            idcard: '',
            birthplace: '',
            sex: '',
            imgUrl: '',
            name: '',
            address: '',
            phone: '',
            titles: '',
            researchDirection: '',
            sample_status: '',
            diagnoseType: '',//诊断类型
            isUnusual: '',//是否异常
            division: '', //科室
            bed: '',//病床号
            sampleStatus: '',//样本状态
            sample: '', //样本
            sampleNum: '',//样本号
            sampleTime: '', //采样时间
            password: '',
            confirm: '',
            createTime: '',
            baDossier: {
              id: "",
              createDate: "",
              diseaseType: "",
              dossierType: "",
              dossierStatus: ""
            },
            sysUser: {
              id: '', //主键
              name: '',
              sex: '',
              laboratoryType: '',//化验单类型
              inspectTime: '',//送检时间
              reportTime: '', //报告时间
              inspectName: '',//检验人员
              assessor: '', //审核人员
              creater: '',//创建人
              createTime: '', //创建时间
              modifier: '',//修改人
              modifyTime: '', //修改时间
            }
          }
        }
      }
    }


</script>

<style>
  .el-table .blue-row {
    background: #87CEFA;
  }
  .el-table .yellow-row {
    background:	#EEE8AA;
  }
  .el-table .red-row {
    background: #FFA07A;
  }
</style>
