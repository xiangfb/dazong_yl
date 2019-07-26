
const step = { 'code': 'R0000', 'data': { 'code': 'cs001', 'id': 1, 'template': { 'countFields': [{ 'source': 'field12', 'sourceName': '字段12', 'field': 'avg(field12)', 'fieldName': '平均(字段12)', 'method': 'avg' }, { 'source': 'field1', 'sourceName': '字段1', 'field': 'min(field1+field22)', 'fieldName': '最小值(字段12)', 'method': 'min' }], 'groupFields': [{ 'source': 'field12', 'sourceName': '字段12', 'field': 'max(field12)', 'fieldName': '最大(字段12)', 'method': 'max' }, { 'source': 'field1', 'sourceName': '字段1', 'field': 'field1', 'fieldName': '字段1', 'method': '' }], 'orderFields': [{ 'field': 'field1', 'fieldName': '字段1', 'order': 'asc' }, { 'field': 'field22', 'fieldName': '字段22', 'order': 'desc' }] }, 'templateType': 'kljk', 'title': '测试模版22' }, 'msg': 'success' }

const temList = { 'code': 'R0000', 'data': [{ 'code': 'cs001', 'id': 1, 'template': { 'countFields': [{ 'source': 'field12', 'sourceName': '字段12', 'field': 'avg(field12)', 'fieldName': '平均(字段12)', 'method': 'avg' }, { 'source': 'field1', 'sourceName': '字段1', 'field': 'min(field1+field22)', 'fieldName': '最小值(字段12)', 'method': 'min' }], 'groupFields': [{ 'source': 'field12', 'sourceName': '字段12', 'field': 'max(field12)', 'fieldName': '最大(字段12)', 'method': 'max' }, { 'source': 'field1', 'sourceName': '字段1', 'field': 'field1', 'fieldName': '字段1', 'method': '' }], 'orderFields': [{ 'field': 'field1', 'fieldName': '字段1', 'order': 'asc' }, { 'field': 'field22', 'fieldName': '字段22', 'order': 'desc' }] }, 'templateType': 'kljk', 'title': '测试模版22' }], 'msg': 'success' }
const options = [ {
  value: 'sum',
  label: '求和'
}, {
  value: 'avg',
  label: '平均值'
}, {
  value: 'min',
  label: '最小值'
}, {
  value: 'max',
  label: '最大值'
}]

const operator = [ {
  value: '+',
  label: '+'
}, {
  value: '-',
  label: '-'
}, {
  value: '*',
  label: '*'
}, {
  value: '/',
  label: '/'
}]

// 小计设置
const small = {
  'code': 'R0000',
  'msg': 'success',
  'data': {
    'title': '小计',
    'leftResult': [
      {
        'id': 10,
        'level': 0,
        'title': '小计',
        'field': 're_gross_adjust',
        'fieldName': '毛重',
        'templateId': 7,
        'userId': null
      },
      {
        'id': 11,
        'level': 0,
        'title': '小计',
        'field': 're_tare_adjust',
        'fieldName': '皮重',
        'templateId': 7,
        'userId': null
      },
      {
        'id': 12,
        'level': 0,
        'title': '小计',
        'field': 're_suttle_adjust',
        'fieldName': '净重',
        'templateId': 7,
        'userId': null
      },
      {
        'id': 13,
        'level': 0,
        'title': '小计',
        'field': 'inv_code',
        'fieldName': '编号',
        'templateId': 7,
        'userId': null
      }
    ],
    'rightResult': [
      {
        'id': 14,
        'level': 0,
        'title': '小计',
        'field': 'inv_code',
        'fieldName': '编号',
        'templateId': 7,
        'userId': null
      },
      {
        'id': 15,
        'level': 0,
        'title': '小计',
        'field': 'inv_code',
        'fieldName': '编号',
        'templateId': 7,
        'userId': null
      }
    ],
    'levels': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  'success': true
}
// 页面设置(修改)
const format = { 'code': 'R0000',
  'data':
    [{ 'code': 1, 'field': 'field1', 'fieldName': '列1', 'width': 100, 'method': 'avg', 'fieldType': 'string', 'show': true, 'order': true, 'col': '', 'twa': '加权因子' },
      { 'code': 2, 'field': 'field1', 'fieldName': '列1', 'width': 100, 'method': 'avg', 'fieldType': 'string', 'show': false, 'order': false, 'col': '', 'twa': '' },
      { 'code': 6, 'field': 'field1', 'fieldName': '列1', 'width': 100, 'method': 'avg', 'fieldType': 'string', 'show': false, 'order': false, 'col': '', 'twa': '' },
      { 'code': 7, 'field': 'field1', 'fieldName': '列1', 'width': 100, 'method': 'avg', 'fieldType': 'string', 'show': false, 'order': false, 'col': '', 'twa': '' },
      { 'code': 3,
        'field': 'field1',
        'fieldName': '列1',
        'width': 100,
        'method': 'avg',
        'fieldType': 'string',
        'show': true,
        'order': true,
        'col': '',
        'twa': '' },
      { 'code': 4, 'field': 'field1', 'fieldName': '列1', 'width': 100, 'method': 'avg', 'fieldType': 'string', 'show': false, 'order': false, 'col': '' }],
  'msg': 'success' }
// 导航数据
const subtotal = { 'code': 'R0000', 'data': { 'all': [{ 'field': 'field1', 'fieldName': '列1' }, { 'field': 'field2', 'fieldName': '列2' }], 'select': [{ 'field': 'field1', 'fieldName': '列1' }] }, 'msg': 'success' }

// 穿梭框数据重构
const restArr = function (self, result, checkArr, leftResult, rightResult) {
  let arr = []
  // 重构数据体
  self[result] = leftResult.concat(rightResult.map(item => { item.check = true; return item }))
  self[result].map((item, key) => {
    item.key = key
    if (item.check === true) {
      arr.push(key)
    }
  })
  // 右侧的数据
  self[checkArr] = arr
}
export { step, options, subtotal, operator, small, restArr, format, temList }
