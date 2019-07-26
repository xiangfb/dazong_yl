<template>
  <div class="p-20">
      <div class="p-b-30 fs20">
        新增车辆
      </div>
    <div>
      <el-form ref="form" :model="form" label-width="160px">
        <el-row :span="24">
          <el-col :span="common">
            <el-form-item label="车辆号码">
              <el-input v-model="form.plateNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="车辆类型">
              <el-input v-model="form.carType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="车辆年审时间">
              <el-date-picker
                v-model="form.annualReviewDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="车牌类型">
              <el-input v-model="form.plateType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="车长(单位/米)">
              <el-input v-model="form.vehicleLength"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="轴数类型">
              <el-input v-model="form.axleType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="核定吨位(单位/吨)">
              <el-input v-model="form.capacityTonnage"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="运营资质">
              <el-radio-group v-model="form.qualifications">
                <el-radio label="有资质"></el-radio>
                <el-radio label="无资质"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="车主">
              <el-input v-model="form.carOwner"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="是否自卸">
              <el-radio-group v-model="form.uninstall">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="联系方式">
              <el-input v-model="form.carOwnerMobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="承运商方">
              <el-input v-model="form.carrierCompanyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="主车道路运营许可证">
              <el-input v-model="form.mainVehicleRoadTransportLicense"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="是否挂车">
              <el-radio-group v-model="form.hasTrailer">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="证件有效期">
              <el-input v-model="form.mainVehicleRoadTransportLicenseValidityPeriod"></el-input>
            </el-form-item>
          </el-col>
        <div v-show="form.hasTrailer === '是'">
          <el-col :span="common">
            <el-form-item label="挂车车牌号">
              <el-input v-model="form.trailerPlateNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="挂车行驶证">
              <el-input v-model="form.trailerDrivingLicense"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="道路运输许可证">
              <el-input v-model="form.trailerRoadTransportLicense"></el-input>
            </el-form-item>
           </el-col>
          <el-col :span="common">
            <el-form-item label="证件有效期">
              <el-input v-model="form.trailerRoadTransportLicenseValidityPeriod"></el-input>
            </el-form-item>
          </el-col>
        </div>
          <el-col :span="common">
            <el-form-item label="是否危险品">
              <el-radio-group v-model="form.isDangerousChemicals">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        <div v-show="form.isDangerousChemicals === '是'">
          <el-col :span="common">
            <el-form-item label="道路危险品运营许可证">
              <el-input v-model="form.dangerousChemicalsRoadTransportLicense"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="道路运输许可证">
              <el-input v-model="form.roadTransportLicense"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="证件有效期">
              <el-input v-model="form.roadTransportLicenseValidityPeriod"></el-input>
            </el-form-item>
           </el-col>
        </div>
          <el-col :span="common">
            <el-form-item label="主车照片">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="主车行驶证">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="common">
            <el-form-item label="主车道路运营许可证">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="formBtns">
        <el-button type="primary" size="medium" @click="modify">完成</el-button>
        <el-button size="medium" @click="close">关闭</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        plateNumber: 'A603HJ',
        carType: '集装箱',
        annualReviewDate: '2011-10-10',
        plateType: '普通',
        vehicleLength: '2.2',
        axleType: '12',
        name: '111',
        capacityTonnage: '20',
        qualifications: '有资质',
        uninstall: '',
        carOwner: '车主',
        carOwnerMobile: '13754961245',
        carrierCompanyName: '本厂',
        hasTrailer: '否',
        mainVehicleDrivingLicense: '1212112',
        mainVehicleRoadTransportLicense: '12212',
        mainVehicleRoadTransportLicenseValidityPeriod: '2018-12-12',
        trailerPlateNumber: '122312',
        trailerDrivingLicense: '121212',
        trailerRoadTransportLicense: '1212212',
        trailerRoadTransportLicenseValidityPeriod: '121221',
        isDangerousChemicals: '否',
        dangerousChemicalsRoadTransportLicense: '1234564',
        roadTransportLicense: 'lkdfjad',
        roadTransportLicenseValidityPeriod: '1234578'
      },
      dialogImageUrl: '',
      dialogVisible: false,
      value1: '',
      span: 12
    }
  },
  props: [
    'common'
  ],
  created () {
    // console.log(this.common)
  },
  methods: {
    modify () {
      this.$message('完成')
    },
    close () {
      history.go(-1)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>
<style scoped>
.all{
  overflow: hidden;
  height: 100%;
}
.header{
  display: flex;
  width: 100%;
}
</style>
