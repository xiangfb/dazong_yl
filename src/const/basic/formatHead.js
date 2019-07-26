
import $json from '@/const/basic/temporary'
export default {
  // 主子表数据
  child: [
    {
      fieldExplain: '字段名称',
      fieldName: 'fieldName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '数据库字段名称',
      fieldName: 'fieldDbName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '字段含义',
      fieldName: 'fieldExplain',
      formSubmitType: 'ONE_TXT',
      columnWidth: '',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '字段类型',
      fieldName: 'fieldType',
      formSubmitType: 'SELECT',
      columnWidth: '',
      options: $json.fieldType,
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '下拉资源选择',
      fieldName: 'fieldEnumId',
      formSubmitType: 'SELECT',
      options: $json.formSubmitType,
      columnWidth: '120',
      iupdate: true,
      ishow: true
    }

  ],
  enum: [
    {
      fieldExplain: '实际值',
      fieldName: 'realValue',
      formSubmitType: 'ONE_TXT',
      columnWidth: '',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '显示值',
      fieldName: 'showValue',
      formSubmitType: 'ONE_TXT',
      columnWidth: '',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '排序',
      fieldName: 'seq',
      formSubmitType: 'ONE_TXT',
      columnWidth: '',
      iupdate: true,
      ishow: true
    }
  ],
  form: [ // 表格头部（表单属性配置）
    {
      fieldExplain: '所属表',
      fieldName: 'tableCode',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true,
      sort: true,
      sortBy: 'tableCode'
    },
    {
      fieldExplain: '字段名称',
      fieldName: 'fieldName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true
    },
    {
      fieldExplain: '字段说明',
      fieldName: 'fieldExplain',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否隐藏',
      fieldName: 'ihidden',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '允许编辑',
      fieldName: 'iupdate',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '控件类型',
      fieldName: 'formSubmitType',
      formSubmitType: 'SELECT',
      options: $json.formSubmitType,
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否必填',
      fieldName: 'irequired',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '验证方式',
      fieldName: 'cgValidateId',
      formSubmitType: 'SELECT',
      options: [],
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '默认值',
      fieldName: 'defaultValue',
      formSubmitType: 'SPECIAL_CONTRIL',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '提示信息',
      fieldName: 'tipsMessage',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '下拉资源选择',
      fieldName: 'cgCustomEnumId',
      formSubmitType: 'SELECT',
      options: $json.formSubmitType,
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '弹窗模板选择',
      fieldName: 'cgFormatResId',
      formSubmitType: 'ONE_TXT_POPUP',
      options: $json.formSubmitType,
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '计算方式',
      fieldName: 'calculate',
      formSubmitType: 'CALCULATE',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '列宽',
      fieldName: 'columnWidth',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '表名字',
      fieldName: 'tableName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true
    },
    {
      fieldExplain: 'DB字段',
      fieldName: 'fieldDbName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true
    },
    {
      fieldExplain: '字段类型',
      fieldName: 'fieldType',
      formSubmitType: 'SELECT',
      columnWidth: '120',
      ishow: true,
      iupdate: true,
      options: $json.fieldType
    }
  ],
  addFormatSub: [ // 表格头部（化验单档案属性配置）
    {
      fieldExplain: '所属表',
      fieldName: 'tableCode',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true,
      sort: true,
      sortBy: 'tableCode'
    },
    {
      fieldExplain: '字段名称',
      fieldName: 'fieldName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true
    },
    {
      fieldExplain: '字段说明',
      fieldName: 'fieldExplain',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '控件类型',
      fieldName: 'formSubmitType',
      formSubmitType: 'SELECT',
      options: $json.formSubmitType,
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否必填',
      fieldName: 'irequired',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '验证方式',
      fieldName: 'cgValidateId',
      formSubmitType: 'SELECT',
      options: [],
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '默认值',
      fieldName: 'defaultValue',
      formSubmitType: 'SPECIAL_CONTRIL',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '提示信息',
      fieldName: 'tipsMessage',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '下拉资源选择',
      fieldName: 'cgCustomEnumId',
      formSubmitType: 'SELECT',
      options: $json.formSubmitType,
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '弹窗模板选择',
      fieldName: 'cgFormatResId',
      formSubmitType: 'ONE_TXT_POPUP',
      options: $json.formSubmitType,
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '允许编辑',
      fieldName: 'iupdate',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '允许补录',
      fieldName: 'isupplement',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否隐藏',
      fieldName: 'ihidden',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '列宽',
      fieldName: 'columnWidth',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否允许查询(快速查询)',
      fieldName: 'iallowQuery',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否允许高级查询',
      fieldName: 'iallowAdvanceQuery',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否默认排序',
      fieldName: 'idefinedSort',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否排序',
      fieldName: 'isortField',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '表名字',
      fieldName: 'tableName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true
    },
    {
      fieldExplain: 'DB字段',
      fieldName: 'fieldDbName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true
    },
    {
      fieldExplain: '字段类型',
      fieldName: 'fieldType',
      formSubmitType: 'SELECT',
      columnWidth: '120',
      ishow: true,
      iupdate: true,
      options: $json.fieldType
    }
  ],
  list: [ // 表格头部（列表）
    {
      fieldExplain: '所属表',
      fieldName: 'tableCode',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true,
      sort: true,
      sortBy: 'tableCode'
    },
    {
      fieldExplain: '字段名称',
      fieldName: 'fieldName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true
    },
    {
      fieldExplain: '字段说明',
      fieldName: 'fieldExplain',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否隐藏',
      fieldName: 'ihidden',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否允许查询(快速查询)',
      fieldName: 'iallowQuery',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否允许高级查询',
      fieldName: 'iallowAdvanceQuery',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '控件类型',
      fieldName: 'formSubmitType',
      formSubmitType: 'SELECT',
      options: $json.formSubmitType,
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否默认排序',
      fieldName: 'idefinedSort',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否排序',
      fieldName: 'isortField',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否分组',
      fieldName: 'igroup',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '弹窗模板选择',
      fieldName: 'cgFormatResId',
      formSubmitType: 'ONE_TXT_POPUP',
      options: $json.formSubmitType,
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '计算方式',
      fieldName: 'calculate',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '列宽',
      fieldName: 'columnWidth',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '表名字',
      fieldName: 'tableName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true
    },
    {
      fieldExplain: 'DB字段',
      fieldName: 'fieldDbName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true
    },
    {
      fieldExplain: '字段类型',
      fieldName: 'fieldType',
      formSubmitType: 'SELECT',
      options: $json.fieldType,
      columnWidth: '120',
      iupdate: true,
      ishow: true
    }
  ],
  dialog: [ // 表格头部（弹窗）
    {
      fieldExplain: '所属表',
      fieldName: 'tableCode',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true,
      sort: true,
      sortBy: 'tableCode'
    },
    {
      fieldExplain: '字段名称',
      fieldName: 'fieldName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true
    },
    {
      fieldExplain: '字段说明',
      fieldName: 'fieldExplain',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否隐藏',
      fieldName: 'ihidden',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '允许编辑',
      fieldName: 'iupdate',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否快速查询',
      fieldName: 'iallowQuery',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否默认排序',
      fieldName: 'idefinedSort',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否排序',
      fieldName: 'isortField',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '列宽',
      fieldName: 'columnWidth',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '表名字',
      fieldName: 'tableName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true
    },
    {
      fieldExplain: 'DB字段',
      fieldName: 'fieldDbName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true
    },
    {
      fieldExplain: '字段类型',
      fieldName: 'fieldType',
      formSubmitType: 'SELECT',
      columnWidth: '120',
      ishow: true,
      iupdate: true,
      options: $json.fieldType
    }
  ],
  factor: [ // 表格头部(弹窗查询)
    {
      fieldExplain: '所属表',
      fieldName: 'customTable',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true,
      sort: true,
      sortBy: 'customTable'
    },
    {
      fieldExplain: '字段名称',
      fieldName: 'fieldName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true
    },
    {
      fieldExplain: '字段说明',
      fieldName: 'fieldExplain',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '是否隐藏',
      fieldName: 'ihidden',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '允许编辑',
      fieldName: 'iupdate',
      formSubmitType: 'MULTIPLE_SELECTION',
      columnWidth: '90',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '控件类型',
      fieldName: 'formSubmitType',
      formSubmitType: 'SELECT',
      options: $json.formSubmitType,
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '判断标识',
      fieldName: 'op',
      formSubmitType: 'SELECT',
      columnWidth: '120',
      ishow: true,
      iupdate: true,
      options: $json.op
    },
    {
      fieldExplain: '提示信息',
      fieldName: 'tipsMessage',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    {
      fieldExplain: '默认值',
      fieldName: 'defaultValue',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: true,
      ishow: true
    },
    // {
    //   fieldExplain: '表名字',
    //   fieldName: 'tableName',
    //   formSubmitType: 'ONE_TXT',
    //   columnWidth: '120',
    //   iupdate: false,
    //   ishow: true
    // },
    {
      fieldExplain: 'DB字段',
      fieldName: 'fieldDbName',
      formSubmitType: 'ONE_TXT',
      columnWidth: '120',
      iupdate: false,
      ishow: true
    },
    {
      fieldExplain: '字段类型',
      fieldName: 'fieldType',
      formSubmitType: 'SELECT',
      columnWidth: '120',
      ishow: true,
      iupdate: true,
      options: $json.fieldType
    }
  ]
}
