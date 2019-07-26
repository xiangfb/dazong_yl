<template>
  <el-scrollbar ref="elscrollbar" :style="{height: `${maxHeight}px`}" class="p-b-n page">
    <div class="table-container pull-chheight">
      <el-button-group>
        <el-button type="primary" :loading="btnLoading" @click="getData">恢复默认</el-button>
        <el-button type="success" :loading="btnLoading" @click="save">保存</el-button>
      </el-button-group>

      <!-- 选项卡 -->
      <el-tabs v-model="activeName" v-loading='btnLoading' style="margin-top:15px" @tab-click="handleClick">
        <el-tab-pane label="计量" name="1">
          <el-row :gutter="20">
            <el-col :span="4" v-for="(item,index) in formData.measureCheck" :key="index">
              <el-checkbox @change="setCheck(item.fieldName,'measureCheck')" v-model="item.ienabled">{{item.text}}</el-checkbox>
            </el-col>
          </el-row>
          <el-row :gutter="30" style="margin-top:10px">
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <div class="select" style="flex:1;margin-top:0">
                  <span style="width:130px;text-align:center;">车皮报警</span>
                  <el-select  @change='getObj("measure_truck_caveat_type")'
                    style
                    v-model="formData.form.measure_truck_caveat_type.fieldValue"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in formData.options6"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <el-input  @change='getObj("measure_truck_caveat_limit")'
                  style="flex:1;"
                  v-model="formData.form.measure_truck_caveat_limit.fieldValue"
                  class="inputW"
                  placeholder
                >
                  <template slot="append">kg</template>
                </el-input>
              </div>
            </el-col>

            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("measure_data_collect_limit")'  v-model="formData.form.measure_data_collect_limit.fieldValue">
                  <template slot="prepend">数据采集下限</template>
                  <template slot="append">%</template>
                </el-input>
              </div>
            </el-col>
            <!-- <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("measure_sale_allowance")'  v-model="formData.form.measure_sale_allowance.fieldValue">
                  <template slot="prepend">发货允差</template>
                  <template slot="append">%</template>
                </el-input>
              </div>
            </el-col> -->
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("data_accuracy_count")'  v-model="formData.form.data_accuracy_count.fieldValue">
                  <template slot="prepend">数量</template>
                </el-input>
                <el-input  @change='getObj("data_accuracy_unit_price")'
                  v-model="formData.form.data_accuracy_unit_price.fieldValue"
                  class="inputW"
                  placeholder
                >
                  <template slot="prepend">单价</template>
                </el-input>
              </div>
            </el-col>
            </el-row>
          <el-row :gutter="30" style="margin-top:10px">
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("data_accuracy_money")'  v-model="formData.form.data_accuracy_money.fieldValue">
                  <template slot="prepend">金额</template>
                </el-input>
                <el-input  @change='getObj("data_accuracy_assay_value")'
                  v-model="formData.form.data_accuracy_assay_value.fieldValue"
                  class="inputW"
                  placeholder
                >
                  <template slot="prepend">化验值</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("measure_max_pound_difference")'  v-model="formData.form.measure_max_pound_difference.fieldValue">
                  <template slot="prepend">最大磅差</template>
                  <template slot="append">kg</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="select">
                <span style="width:150px;text-align:center;">计量单位</span>
                <el-select  @change='getObj("measure_computation")'
                  style="border:0"
                  v-model="formData.form.measure_computation.fieldValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in formData.options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            </el-row>
          <el-row :gutter="30" style="margin-top:10px">
            <el-col :span="8">
              <div class="select">
                <span style="width:150px;text-align:center;">发货过磅毛重</span>
                <el-select  @change='getObj("measure_sale_pass_pound_gross_weight")'
                  style="border:0"
                  v-model="formData.form.measure_sale_pass_pound_gross_weight.fieldValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in formData.options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="select">
                <span style="width:150px;text-align:center;">发货过磅皮重</span>
                <el-select  @change='getObj("measure_sale_pass_pound_tare")'
                  style="border:0"
                  v-model="formData.form.measure_sale_pass_pound_tare.fieldValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in formData.options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            </el-row>
          <el-row :gutter="30" style="margin-top:10px">
            <el-col :span="8">
              <div class="select">
                <span style="width:150px;text-align:center;">收货过磅皮重</span>
                <el-select  @change='getObj("measure_purorder_pass_pound_tare")'
                  style="border:0"
                  v-model="formData.form.measure_purorder_pass_pound_tare.fieldValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in formData.options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="select">
                <span style="width:150px;text-align:center;">收货过磅毛重</span>
                <el-select  @change='getObj("measure_purorder_pass_pound_gross_weight")'
                  style="border:0"
                  v-model="formData.form.measure_purorder_pass_pound_gross_weight.fieldValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in formData.options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="销售" name="2">
          <el-row :gutter="20">
            <el-col :span="4" v-for="(item,index) in formData.saleCheck" :key="index">
              <el-checkbox @change="setCheck(item.fieldName,'saleCheck')" v-model="item.ienabled">{{item.text}}</el-checkbox>
            </el-col>
          </el-row>
          <el-row :gutter="30" style="margin-top:10px">
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("sale_print_sale_ticket")'  v-model="formData.form.sale_print_sale_ticket.fieldValue">
                  <template slot="prepend">打印发货单</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="select">
                <span style="width:150px;text-align:center;">发货取皮方式</span>
                <el-select  @change='getObj("sale_take_skin_way")'
                  style="border:0"
                  v-model="formData.form.sale_take_skin_way.fieldValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in formData.options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("sale_empty_car_out_tare_allowance")'  v-model="formData.form.sale_empty_car_out_tare_allowance.fieldValue">
                  <template slot="prepend">空车出厂皮重允差</template>
                  <template slot="append">T</template>
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="30" style="margin-top:10px">
            <el-col :span="8">
              <div class="select">
                <span style="width:150px;text-align:center;">超载处理方式</span>
                <el-select  @change='getObj("purorder_overload_gross_type")'
                  style="border:0"
                  v-model="formData.form.purorder_overload_gross_type.fieldValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in formData.options7"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("sale_overload_gross_erase_num")'  v-model="formData.form.sale_overload_gross_erase_num.fieldValue">
                  <template slot="prepend">销售毛重超限抹量浮动值</template>
                    <template slot="append">T</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("sale_suttle_allowance")'  v-model="formData.form.sale_suttle_allowance.fieldValue">
                  <template slot="prepend">理论净重允差</template>
                    <template slot="append">T</template>
                </el-input>
              </div>
            </el-col>
        </el-row>
        <el-row :gutter="30" style="margin-top:10px">
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("sale_pre_suttle_allowance")'  v-model="formData.form.sale_pre_suttle_allowance.fieldValue">
                  <template slot="prepend">预装净重允差</template>
                    <template slot="append">T</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("measure_sale_adjustment_percentage")'  v-model="formData.form.measure_sale_adjustment_percentage.fieldValue">
                  <template slot="prepend">发货调整</template>
                  <template slot="append">%</template>
                </el-input>
                <el-input  @change='getObj("measure_sale_adjustment_kilogram")'
                  v-model="formData.form.measure_sale_adjustment_kilogram.fieldValue"
                  class="inputW"
                  placeholder
                >
                  <template slot="append">T</template>
                </el-input>
              </div>
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="采购" name="3">
          <el-row :gutter="20">
            <el-col :span="4" v-for="(item,index) in formData.purorderCheck" :key="index">
              <el-checkbox @change="setCheck(item.fieldName,'purorderCheck')" v-model="item.ienabled">{{item.text}}</el-checkbox>
            </el-col>
          </el-row>
          <el-row :gutter="30" style="margin-top:10px">
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("purorder_print_purorder_ticket")'  v-model="formData.form.purorder_print_purorder_ticket.fieldValue">
                  <template slot="prepend">打印收货单</template>
                </el-input>
              </div>
            </el-col>
            <!-- <el-col :span="8">
              <div class="select">
                <span style="width:150px;text-align:center;">采购接口</span>
                <el-select  @change='getObj("purorder_purorder_api")'
                  style="border:0"
                  v-model="formData.form.purorder_purorder_api.fieldValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in formData.options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col> -->
            <el-col :span="8">
              <div class="select">
                <span style="width:150px;text-align:center;">收货取皮方式</span>
                <el-select  @change='getObj("purorder_take_skin_way")'
                  style="border:0"
                  v-model="formData.form.purorder_take_skin_way.fieldValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in formData.options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("purorder_car_out_gross_allowance")'  v-model="formData.form.purorder_car_out_gross_allowance.fieldValue">
                  <template slot="prepend">重车出厂毛重允差</template>
                  <template slot="append">kg</template>
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="30" style="margin-top:10px">
            <el-col :span="8">
              <div class="select">
                <span style="width:150px;text-align:center;">超载处理方式</span>
                <el-select  @change='getObj("purorder_overload_gross_type")'
                  style="border:0"
                  v-model="formData.form.purorder_overload_gross_type.fieldValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in formData.options7"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("purorder_overload_gross_erase_num")'  v-model="formData.form.purorder_overload_gross_erase_num.fieldValue">
                  <template slot="prepend">采购毛重超限抹量浮动值</template>
                    <template slot="append">T</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("purorder_suttle_allowance")'  v-model="formData.form.purorder_suttle_allowance.fieldValue">
                  <template slot="prepend">理论净重允差</template>
                    <template slot="append">T</template>
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="30" style="margin-top:10px">
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("purorder_de_suttle_allowance")'  v-model="formData.form.purorder_de_suttle_allowance.fieldValue">
                  <template slot="prepend">原发净重允差</template>
                    <template slot="append">T</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("measure_purorder_adjustment_percentage")' v-model="formData.form.measure_purorder_adjustment_percentage.fieldValue">
                  <template slot="prepend">收货调整</template>
                  <template slot="append">%</template>
                </el-input>
                <el-input  @change='getObj("measure_purorder_adjustment_kilogram")'
                  v-model="formData.form.measure_purorder_adjustment_kilogram.fieldValue"
                  class="inputW"
                  placeholder
                >
                  <template slot="append">T</template>
                </el-input>
              </div>
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="调拨" name="4">
          <el-row :gutter="20">
            <el-col :span="4" v-for="(item,index) in formData.allotCheck" :key="index">
              <el-checkbox @change="setCheck(item.fieldName,'allotCheck')"  v-model="item.ienabled">{{item.text}}</el-checkbox>
            </el-col>
          </el-row>
          <el-row :gutter="30" style="margin-top:10px">
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("allot_print_allot_ticket")'  v-model="formData.form.allot_print_allot_ticket.fieldValue">
                  <template slot="prepend">打印调拨单</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("allot_net_weight_allowance")'  v-model="formData.form.allot_net_weight_allowance.fieldValue">
                  <template slot="prepend">净重允差</template>
                  <template slot="append">%</template>
                </el-input>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="转库" name="5">
          <el-row :gutter="20">
            <el-col :span="4" v-for="(item,index) in formData.transferCheck" :key="index">
              <el-checkbox @change="setCheck(item.fieldName,'transferCheck')" v-model="item.ienabled">{{item.text}}</el-checkbox>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="系统" name="6">
          <el-row :gutter="20">
            <el-col :span="4" v-for="(item,index) in formData.systemCheck" :key="index">
              <el-checkbox @change="setCheck(item.fieldName,'systemCheck')" v-model="item.ienabled">{{item.text}}</el-checkbox>
            </el-col>
          </el-row>
          <el-row :gutter="30" style="margin-top:10px">
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("sys_license_plate_number_identify_limit")'
                  v-model="formData.form.sys_license_plate_number_identify_limit.fieldValue"
                >
                  <template slot="prepend">车辆识别位数</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <!-- <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("sys_monthly_statement_date")'  v-model="formData.form.sys_monthly_statement_date.fieldValue">
                  <template slot="prepend">月结日期</template>
                </el-input>
              </div> -->
               <div class="select">
                <span style="width:150px;text-align:center;">月结日期</span>
                <el-select  @change='getObj("sys_monthly_statement_date")'
                  style="border:0"
                  v-model="formData.form.sys_monthly_statement_date.fieldValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in formData.options8"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
                <div class="select">
                  <span style="width:150px;text-align:center;">月结时间</span>
                  <el-time-select  @change='getObj("sys_monthly_statement_time")'
                    v-model="formData.form.sys_monthly_statement_time.fieldValue"
                    :picker-options="{
                          start: '07:30',
                          step: '00:15',
                          end: '23:30'
                        }"
                    placeholder="选择时间"
                  ></el-time-select>
                </div>
            </el-col>
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("sys_user_password_validity")'  v-model="formData.form.sys_user_password_validity.fieldValue">
                  <template slot="prepend">用户密码有效期天数</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="select">
                <span style="width:150px;text-align:center;">密码策略</span>
                <el-select  @change='getObj("sys_password_tactics")'
                  style="border:0"
                  v-model="formData.form.sys_password_tactics.fieldValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in formData.options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="margin-top:10px;display:flex;">
                <el-input  @change='getObj("sys_qr_card_validity")'  v-model="formData.form.sys_qr_card_validity.fieldValue">
                  <template slot="prepend">二维码失效时间(秒)</template>
                </el-input>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-scrollbar>
</template>

<script>
import sysServe from 'service/admin/systemServe'
import $json from './config'
export default {
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    }
  },
  data () {
    return {
      activeName: '1',
      input1: '',
      formData: $json,
      value: '',
      resData: [],
      list: {
        measure: [],
        sale: [],
        purorder: [],
        allot: [],
        system: []
      },
      btnLoading: false // 按钮加载...
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      this.btnLoading = true
      let result = await sysServe.define()
      if (result) {
        console.log('默认数据', result)
        this.resData = result.data
        // allot    调拨
        // measure   计量
        // purorder   采购
        // sale   销售
        // system   系统
        result.data.map(item => {
          switch (item.defineType) {
            case 'measure': // 计量
              this.list.measure.push(item)
              break
            case 'sale': // 销售
              this.list.sale.push(item)
              break
            case 'purorder': // 采购
              this.list.purorder.push(item)
              break
            case 'allot': // 调拨
              this.list.allot.push(item)
              break
            case 'system': // 系统
              this.list.system.push(item)
              break
          }
        })
        await this.setInp()
        await this.getVal('measure')
        await this.getVal('sale')
        await this.getVal('purorder')
        await this.getVal('allot')
        await this.getVal('system')
      }
      this.init()
      this.btnLoading = false
      console.log($json)
      console.log('分类数据', this.list)
    },
    getObj (item) {
      this.formData.form[item].sub = true
      console.log(this.formData.form[item])
    },
    setCheck (item, type) {
      this.formData[type].map(item1 => {
        if (item === item1.fieldName) {
          item1.sub = true
        }
      })
      console.log(this.formData[type])
    },
    setInp () {
      this.resData.map(item => {
        if (this.formData.form[item.fieldName]) {
          this.formData.form[item.fieldName].fieldValue = item.fieldValue
        }
      })
    },
    // 获取提交参数
    getVal (type) {
      this.list[type].map(item => {
        this.formData[`${type}Check`].map(res => {
          if (item.fieldName === res.fieldName) {
            res.ienabled = item.ienabled
          }
        })
      })
    },
    getCheck (type) {
      return this.formData[type].filter(item => item.sub === true)
    },
    getForm () {
      var form = []
      for (let i in this.formData.form) {
        if (this.formData.form[i].sub) {
          form.push(this.formData.form[i])
        }
      }
      return form
    },
    init () {
      let check = ['measureCheck', 'saleCheck', 'purorderCheck', 'allotCheck', 'systemCheck']
      check.map(item => {
        this.formData[item].map(i => {
          i.sub = false
        })
      })
      for (let i in this.formData.form) {
        this.formData.form[i].sub = false
      }
    },
    async save () {
      let m = await this.getCheck('measureCheck')
      let s = await this.getCheck('saleCheck')
      let p = await this.getCheck('purorderCheck')
      let a = await this.getCheck('allotCheck')
      let y = await this.getCheck('systemCheck')
      let f = await this.getForm()
      var checkObj = [m, s, p, a, y, f].reduce((t, i) => { return t.concat(i) })
      if (checkObj.length < 1) {
        this.$notify({
          title: '警告',
          message: '没有任何数据修改',
          type: 'warning'
        })
        return false
      }
      this.btnLoading = true
      console.log(checkObj)
      let result = await sysServe.setParams({ entity: checkObj })
      if (result.success) {
        this.getData()
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success'
        })
      }
      // this.formData.
      // this.btnLoading = false
    },
    handleClick (tab, event) {
      console.log('促发事件')
    }
  }
}
</script>
<style lang="scss" scoped >
.page {
  background: #fff;
  padding: 20px 20px;
}
.check {
  display: flex;
  flex-wrap: wrap;
}
.inputW {
  width: 230px !important;
}
.select {
  margin-top: 10px;
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  color: #909388;
  font-size: 13px;
  justify-content: space-between;
}
</style>
