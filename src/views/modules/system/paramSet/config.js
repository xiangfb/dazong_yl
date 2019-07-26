let $json = {
  // 计量多选框
  measureCheck: [
    { fieldName: 'measure_forbid_number_plate_modify', ienabled: false, text: '禁止车号修改' },
    { fieldName: 'measure_forbid_manual_modify_number', ienabled: false, text: '禁止手工取数' },
    { fieldName: 'measure_print_select', ienabled: false, text: '磅单打印选择' },
    { fieldName: 'measure_printer_select', ienabled: false, text: '磅单打印机选择' },
    { fieldName: 'measure_auto_printer', ienabled: false, text: '自动打印磅单' },
    { fieldName: 'measure_gross_weight_overrun_caveat', ienabled: false, text: '毛重超限报警' },
    { fieldName: 'measure_gross_weight_caveat_prompt', ienabled: false, text: '毛重报警提示' },
    { fieldName: 'measure_gross_weight_overrun_hide', ienabled: false, text: '毛重超限隐藏' },
    { fieldName: 'measure_gross_weight_overrun_select_deal', ienabled: false, text: '超限查询处理' },
    { fieldName: 'measure_show', ienabled: false, text: '显示磅单' },
    { fieldName: 'measure_call', ienabled: false, text: '叫号排队' }
  ],
  // 销售多选框
  saleCheck: [
    // { fieldName: 'sale_control', ienabled: false, text: '发货控制' },
    // { fieldName: 'sale_select_invoice_order', ienabled: false, text: '顺序选提单' },
    { fieldName: 'sale_confirm', ienabled: false, text: '发货确认' },
    // { fieldName: 'sale_replenish_control', ienabled: false, text: '补单控制' },
    // { fieldName: 'sale_warehouse_required', ienabled: false, text: '仓库必输' },
    { fieldName: 'sale_confirm_in_door', ienabled: false, text: '发货入厂确认放行' },
    { fieldName: 'sale_confirm_out_door', ienabled: false, text: '发货出厂确认放行' },
    { fieldName: 'sale_check_gross', ienabled: false, text: '销售毛重超限报警' },
    { fieldName: 'sale_mind_add', ienabled: false, text: '自动补单' }
  ],
  // 采购多选框
  purorderCheck: [
    { fieldName: 'purorder_confirm', ienabled: false, text: '收货确认' },
    // { fieldName: 'purorder_deduction_water', ienabled: false, text: '扣水率' },
    // { fieldName: 'purorder_deduction_control', ienabled: false, text: '扣杂率' },
    { fieldName: 'purorder_origin_control', ienabled: false, text: '原发控制' },
    // { fieldName: 'purorder_check_card', ienabled: false, text: '是否验卡' },
    { fieldName: 'purorder_confirm_out_door', ienabled: false, text: '收货出厂确认放行' },
    { fieldName: 'purorder_check_gross', ienabled: false, text: '采购毛重超限报警' },
    { fieldName: 'purorder_mind_add', ienabled: false, text: '自动补单' }
  ],
  // 调拨多选框
  allotCheck: [
    // { fieldName: 'allot_car_control', ienabled: false, text: '调拨车辆控制' },
    // { fieldName: 'allot_tare_checked', ienabled: false, text: '皮重校验' },
    // { fieldName: 'allot_gross_checked', ienabled: false, text: '毛重校验' }
  ],
  // 转库多选框
  transferCheck: [
    // { fieldName: 'allot_car_control', ienabled: false, text: '调拨车辆控制' },
    // { fieldName: 'allot_tare_checked', ienabled: false, text: '皮重校验' },
    // { fieldName: 'allot_gross_checked', ienabled: false, text: '毛重校验' }
  ],
  // 系统多选框
  systemCheck: [
    { fieldName: 'sys_arrange_car_control', ienabled: false, text: '派车单控制' },
    { fieldName: 'sys_arrange_car_produce_sampling', ienabled: false, text: '派车生成采样单' },
    { fieldName: 'sys_pound_produce_sampling', ienabled: false, text: '磅单生成采样单' },
    { fieldName: 'sys_reference_delivery_location', ienabled: false, text: '参照发货地点' },
    { fieldName: 'sys_discharge_mixed_sample', ienabled: false, text: '卸货后混样' },
    { fieldName: 'sys_customer_credit_control', ienabled: false, text: '客户信用控制' },
    { fieldName: 'sys_pick_goods_unit_price_control', ienabled: false, text: '提货单单价控制' },
    { fieldName: 'sys_auto_read_customer', ienabled: false, text: '自动读取客户' },
    { fieldName: 'sys_read_u8_receipt_payment', ienabled: false, text: '读取U8收货款' },
    { fieldName: 'sys_purorder_prepayment_control', ienabled: false, text: '采购预付款控制' },
    { fieldName: 'sys_review_auto_produce_storage', ienabled: false, text: '审核生成出入库' },
    { fieldName: 'sys_auto_produce_storage', ienabled: false, text: '自动生成入库单' },
    { fieldName: 'sys_auto_produce_outbound_order', ienabled: false, text: '自动生成出库单' },
    { fieldName: 'sys_produce_arrival', ienabled: false, text: '生成到货单' },
    { fieldName: 'sys_purorder_huajia_storage', ienabled: false, text: '采购划价后入库' },
    { fieldName: 'sys_expect_initial_data_entry', ienabled: false, text: '期初数录入' },
    { fieldName: 'sys_user_simultaneity_login', ienabled: false, text: '是否允许同时登陆' },
    { fieldName: 'sys_remote_connection', ienabled: false, text: '远程接入应用' },
    { fieldName: 'sys_start_remote_monitoring', ienabled: false, text: '启用远程监控' },
    { fieldName: 'sys_arrage_car_admission_control', ienabled: false, text: '派车单入场控制' },
    { fieldName: 'sys_purorder_unit_price_control', ienabled: false, text: '收货单价控制' },
    { fieldName: 'sys_pass_pound_calculation_transportation_cost', ienabled: false, text: '过磅计算运费' },
    { fieldName: 'sys_allot_scene_confim', ienabled: false, text: '调拨现场确认' },
    { fieldName: 'sys_other_sale_confim', ienabled: false, text: '其他发货确认' },
    { fieldName: 'sys_other_purorder_confim', ienabled: false, text: '其他收货确认' },
    { fieldName: 'sys_fingerprint_verification_mofidy', ienabled: false, text: '指纹验证修改' },
    { fieldName: 'sys_replenish_invoice_control', ienabled: false, text: '补打单据控制' },
    { fieldName: 'sys_forbid_auto_replenish_invoice', ienabled: false, text: '禁用自动补单' },
    { fieldName: 'sys_no_reference_sample_number', ienabled: false, text: '不参照采样单号' },
    { fieldName: 'sys_one_pass_pound', ienabled: false, text: '一次过磅' },
    { fieldName: 'sys_assay_two_encrypt', ienabled: false, text: '化验二次加密' },
    { fieldName: 'sys_assay_one_car_many_sample', ienabled: false, text: '化验一车多样' },
    { fieldName: 'sys_settlement_not_own_check', ienabled: false, text: '结算单不能自审' },
    { fieldName: 'sys_auto_upload_weight', ienabled: true, text: '自动上传磅单' }
  ],
  form: {
    // 计量
    measure_purorder_adjustment_percentage: { fieldName: 'measure_purorder_adjustment_percentage', fieldValue: 0 },
    measure_purorder_adjustment_kilogram: { fieldName: 'measure_purorder_adjustment_kilogram', fieldValue: 0 },
    measure_sale_adjustment_percentage: { fieldName: 'measure_sale_adjustment_percentage', fieldValue: 0 },
    measure_sale_adjustment_kilogram: { fieldName: 'measure_sale_adjustment_kilogram', fieldValue: 0 },
    measure_truck_caveat_type: { fieldName: 'measure_truck_caveat_type', fieldValue: 0 },
    measure_truck_caveat_limit: { fieldName: 'measure_truck_caveat_limit', fieldValue: 0 },
    measure_purorder_pass_pound_tare: { fieldName: 'measure_purorder_pass_pound_tare', fieldValue: 0 },
    measure_purorder_pass_pound_gross_weight: { fieldName: 'measure_purorder_pass_pound_gross_weight', fieldValue: 0 },
    measure_sale_pass_pound_tare: { fieldName: 'measure_sale_pass_pound_tare', fieldValue: 0 },
    measure_sale_pass_pound_gross_weight: { fieldName: 'measure_sale_pass_pound_gross_weight', fieldValue: 0 },
    measure_data_collect_limit: { fieldName: 'measure_data_collect_limit', fieldValue: 0 },
    measure_sale_allowance: { fieldName: 'measure_sale_allowance', fieldValue: 0 },
    data_accuracy_count: { fieldName: 'data_accuracy_count', fieldValue: 0 },
    data_accuracy_unit_price: { fieldName: 'data_accuracy_unit_price', fieldValue: 0 },
    data_accuracy_money: { fieldName: 'data_accuracy_money', fieldValue: 0 },
    data_accuracy_assay_value: { fieldName: 'data_accuracy_assay_value', fieldValue: 0 },
    measure_max_pound_difference: { fieldName: 'measure_max_pound_difference', fieldValue: 0 },
    measure_preassemble_allowance: { fieldName: 'measure_preassemble_allowance', fieldValue: 0 },
    measure_computation: { fieldName: 'measure_computation', fieldValue: 0 },
    // 销售
    sale_print_sale_ticket: { fieldName: 'sale_print_sale_ticket', fieldValue: 0 },
    sale_take_skin_way: { fieldName: 'sale_take_skin_way', fieldValue: 0 },
    sale_empty_car_out_tare_allowance: { fieldName: 'sale_empty_car_out_tare_allowance', fieldValue: 0 },
    sale_overload_gross_type: { fieldName: 'sale_overload_gross_type', fieldValue: 0 },
    sale_overload_gross_erase_num: { fieldName: 'sale_overload_gross_erase_num', fieldValue: 0 },
    sale_suttle_allowance: { fieldName: 'sale_suttle_allowanced', fieldValue: 0 },
    sale_pre_suttle_allowance: { fieldName: 'sale_pre_suttle_allowance', fieldValue: 0 },
    // 采购
    purorder_print_purorder_ticket: { fieldName: 'purorder_print_purorder_ticket', fieldValue: 0 },
    // purorder_purorder_api: { fieldName: 'purorder_purorder_api', fieldValue: 0 },
    purorder_take_skin_way: { fieldName: 'purorder_take_skin_way', fieldValue: 0 },
    purorder_car_out_gross_allowance: { fieldName: 'purorder_car_out_gross_allowance', fieldValue: 0 },
    purorder_overload_gross_type: { fieldName: 'purorder_overload_gross_type', fieldValue: 0 },
    purorder_overload_gross_erase_num: { fieldName: 'purorder_overload_gross_erase_num', fieldValue: 0 },
    purorder_suttle_allowance: { fieldName: 'purorder_suttle_allowanced', fieldValue: 0 },
    purorder_de_suttle_allowance: { fieldName: 'purorder_de_suttle_allowanced', fieldValue: 0 },

    // 调拨
    allot_print_allot_ticket: { fieldName: 'allot_print_allot_ticket', fieldValue: 0 },
    allot_net_weight_allowance: { fieldName: 'allot_net_weight_allowance', fieldValue: 0 },
    // 系统
    sys_license_plate_number_identify_limit: { fieldName: 'sys_license_plate_number_identify_limit', fieldValue: 0 },
    sys_monthly_statement_date: { fieldName: 'sys_monthly_statement_date', fieldValue: 0 },
    sys_monthly_statement_time: { fieldName: 'sys_monthly_statement_time', fieldValue: 0 },
    sys_user_password_validity: { fieldName: 'sys_user_password_validity', fieldValue: 0 },
    sys_password_tactics: { fieldName: 'sys_password_tactics', fieldValue: 0 },
    sys_qr_card_validity: { fieldName: 'sys_qr_card_validity', fieldValue: 0 }
  },
  options1: [{
    value: 'round',
    label: '四舍五入'
  }, {
    value: 'truncation',
    label: '截位'
  }, {
    value: 'carry',
    label: '进位'
  }],
  options2: [{
    value: 'standard_tare',
    label: '标准皮重'
  }, {
    value: 'last_tare',
    label: '上次皮重'
  }, {
    value: 'average_tare',
    label: '平均皮重'
  }],
  options3: [{
    value: 'NUMERIC',
    label: '数字'
  }, {
    value: 'ALPHA_NUMERIC',
    label: '数字+字母'
  }, {
    value: 'ALPHABETIC',
    label: '字母'
  }, {
    value: 'ASCII',
    label: '数字+字母+特殊字符'
  }],
  options4: [{
    value: 'ton',
    label: '吨'
  }, {
    value: 'kilogram',
    label: '公斤'
  }],
  options5: [{
    value: 'system_build',
    label: '系统自带'
  }, {
    value: 'other',
    label: '其他'
  }],
  options6: [{
    value: 'average_kilogram',
    label: '平均kg'
  }, {
    value: 'last_kilogram',
    label: '上次kg'
  }, {
    value: 'check_kilogram',
    label: '核定kg'
  }, {
    value: 'average_percentage',
    label: '平均%'
  }, {
    value: 'last_percentage',
    label: '上次%'
  }, {
    value: 'check_percentage',
    label: '核定%'
  }],
  options7: [{
    value: 'gross_erase',
    label: '超载抹量'
  }, {
    value: 'gross_no',
    label: '超载不处理'
  }],
  options8: [{
    value: '01',
    label: '01'
  }, {
    value: '02',
    label: '02'
  }, {
    value: '03',
    label: '03'
  }, {
    value: '04',
    label: '04'
  }, {
    value: '05',
    label: '05'
  }, {
    value: '06',
    label: '06'
  }, {
    value: '07',
    label: '07'
  }, {
    value: '08',
    label: '08'
  }, {
    value: '09',
    label: '09'
  }, {
    value: '10',
    label: '10'
  }, {
    value: '11',
    label: '11'
  }, {
    value: '12',
    label: '12'
  }, {
    value: '13',
    label: '13'
  }, {
    value: '14',
    label: '14'
  }, {
    value: '15',
    label: '15'
  }, {
    value: '16',
    label: '16'
  }, {
    value: '17',
    label: '17'
  }, {
    value: '18',
    label: '18'
  }, {
    value: '19',
    label: '19'
  }, {
    value: '20',
    label: '20'
  }, {
    value: '21',
    label: '21'
  }, {
    value: '22',
    label: '22'
  }, {
    value: '23',
    label: '23'
  }, {
    value: '24',
    label: '24'
  }, {
    value: '25',
    label: '25'
  }, {
    value: '26',
    label: '26'
  }, {
    value: '27',
    label: '27'
  }, {
    value: '28',
    label: '28'
  }, {
    value: '29',
    label: '29'
  }, {
    value: '30',
    label: '30'
  }, {
    value: '31',
    label: '31'
  }]
}
export default $json
