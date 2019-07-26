let $json = {
  methods: [ // 请求方式
    {
      label: 'GET',
      value: '1'
    },
    {
      label: 'POST',
      value: '2'
    },
    {
      label: 'PUT',
      value: '3'
    },
    {
      label: 'DELETE',
      value: '4'
    }
  ],
  fieldType: [ // 字段类型
    {
      label: '数字',
      value: 'NUMBER'
    },
    {
      label: '字符',
      value: 'CHAR'
    },
    {
      label: '时间',
      value: 'DATE'
    },
    {
      label: '文本',
      value: 'TXT'
    },
    {
      label: 'JSON',
      value: 'JSON'
    },
    {
      label: '布尔',
      value: 'BOOLEAN'
    },
    {
      label: '枚举',
      value: 'ENUM'
    }
  ],
  op: [
    {
      value: 'eq',
      label: '等于'
    },
    {
      value: 'ne',
      label: '不等于'
    },
    {
      value: 'gt',
      label: '大于'
    },
    {
      value: 'ge',
      label: '大于等于'
    },
    {
      value: 'lt',
      label: '小于'
    },
    {
      value: 'le',
      label: '小于等于'
    },
    {
      value: 'like',
      label: '模糊匹配'
    },
    {
      value: 'in',
      label: '包含'
    },
    {
      value: 'gl',
      label: '大于小于'
    }
  ],
  formSubmitType: [ // 表单提交类型枚举
    {
      label: '单行输入框',
      value: 'ONE_TXT'
    },
    {
      label: '多选输入框',
      value: 'MORE_TXT'
    },
    {
      label: '带输入建议的输入框',
      value: 'AUTO_COMPLETE'
    },
    {
      label: '下拉菜单',
      value: 'SELECT'
    },
    {
      label: '单选按钮',
      value: 'BOOLEAN'
    },
    {
      label: '单选框',
      value: 'SINGLE_ELECTION'
    },
    {
      label: '复选框',
      value: 'MULTIPLE_SELECTION'
    },
    {
      label: '日期选择框',
      value: 'DATA_BOX_TIM'
    },
    {
      label: '时间选择框',
      value: 'TIME_BOX_TIM'
    },
    // {
    //   label: '日期范围选择框',
    //   value: 'DATA_RANGE_BOX'
    // },
    {
      label: '单选资源弹窗选择控件',
      value: 'RESOURCE_CONTROLS'
    },
    {
      label: '多选资源弹窗选择控件',
      value: 'RESOURCE_CONTROLS_MORE'
    },
    {
      label: '自动查询弹窗',
      value: 'SEARCH_AUTOMATIC'
    }
  ],
  formatStyle: { // 模板类型
    'LIST': {
      'keyLabel': {
        'FORMAT_LIST_BASE': '常规列表',
        'FORMAT_TREE_LIST': '树形+列表'
      },
      'labelKey': {
        '常规列表': 'FORMAT_LIST_BASE',
        '树形+列表': 'FORMAT_TREE_LIST'
      }
    },
    'FROM': {
      'keyLabel': {
        'FORMAT_FOUR_COLUMN_FROM': '四列表单',
        'FORMAT_EIGHT_COLUMN_FROM': '八列表单',
        'FORMAT_MASTER_CHILD_FROM': '主子表-表单',
        'FORMAT_TAB_FROM': '选项卡切换表单',
        'FORMAT_EDIT_FROM': '可编辑TABLE表单',
        'FORMAT_TREE_FROM': '树形+表单'
      },
      'labelKey': {
        '四列表单': 'FORMAT_FOUR_COLUMN_FROM',
        '八列表单': 'FORMAT_EIGHT_COLUMN_FROM',
        '主子表-表单': 'FORMAT_MASTER_CHILD_FROM',
        '选项卡切换表单': 'FORMAT_TAB_FROM',
        '可编辑TABLE表单': 'FORMAT_EDIT_FROM',
        '树形+表单': 'FORMAT_TREE_FROM'
      }
    },
    'DATALIST': {
      'keyLabel': {
        'FORMAT_RESOURCE_QUERY_DATALIST': '弹窗选择（查询+数据列表）',
        'FORMAT_RESOURCE_TREE': '弹窗选择（树形）',
        'FORMAT_RESOURCE_TREE_QUERY_DATALIST': '弹窗选择（树形+查询+数据列表）',
        'SEARCH_AUTOMATIC': '弹窗选择（自动查询）'
      },
      'labelKey': {
        '弹窗选择（查询+数据列表）': 'FORMAT_RESOURCE_QUERY_DATALIST',
        '弹窗选择（树形）': 'FORMAT_RESOURCE_TREE',
        '弹窗选择（树形+查询+数据列表）': 'FORMAT_RESOURCE_TREE_QUERY_DATALIST',
        '弹窗选择（自动查询）': 'SEARCH_AUTOMATIC'
      }
    }
  },
  formatType: {
    'FORM': '表单',
    'LIST': '列表',
    'SEARCH': '查询',
    'RESOURCE': '弹窗'
  }
}
export default $json
