import { getDetails } from '@/api/admin/user'

var validateUsername = (rule, value, callback) => {
  getDetails(value).then(response => {
    if (window.boxType === 'edit') callback()
    let result = response.data.data
    if (result !== null) {
      callback(new Error('用户名已经存在'))
    } else {
      callback()
    }
  })
}
export const tableOption = {
  border: false,
  index: false,
  indexLabel: '序号',
  stripe: true,
  height:500,
  menuAlign: 'center',
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  column: [{
    fixed: true,
    label: 'id',
    prop: 'userId',
    span: 24,
    hide: true,
    editDisabled: true,
    addVisdiplay: false
  },{
      fixed: true,
      label: '姓名',
      prop: 'name',
      span: 24,
      editDisabled: true,
      addVisdiplay: true
    },{
    fixed: true,
    label: '用户名',
    prop: 'username',
    editDisabled: true,
    solt: true,
    search: true,
    span: 24,
    rules: [{
      required: true,
      message: '请输入用户名'
    },
    {
      min: 3,
      max: 20,
      message: '长度在 3 到 20 个字符',
      trigger: 'blur'
    },
    { validator: validateUsername, trigger: 'blur' }
    ]
  }, {
    label: '密码',
    prop: 'password',
    type: 'password',
    value: '',
    hide: true,
    span: 24,
    rules: [{
      min: 6,
      max: 20,
      message: '长度在 6 到 20 个字符',
      trigger: 'blur'
    }]
  }, {
    label: '所属部门',
    prop: 'deptId',
    formsolt: true,
    solt: true,
    span: 24,
    hide: true,
    rules: [{
      required: true,
      message: '请选择部门',
      trigger: 'blur'
    }]
  }, {
    label: '手机号',
    prop: 'phone',
    type: 'phone',
    value: '',
    span: 24,
    rules: [{
      min: 6,
      max: 20,
      message: '长度在 11 个字符',
      trigger: 'blur'
    }]
  }, {
    label: '角色',
    prop: 'role',
    formsolt: true,
    solt: true,
    overHidden: true,
    span: 24,
    rules: [{
      required: true,
      message: '请选择角色',
      trigger: 'blur'
    }]
  }, {
    label: '部门',
    prop: 'deptName',
    overHidden: true,
    addVisdiplay: false,
    editVisdiplay: false,
    span: 24,
  }, {
    label: '状态',
    prop: 'lockFlag',
    type: 'select',
    solt: true,
    span: 24,
    rules: [{
      required: true,
      message: '请选择状态',
      trigger: 'blur'
    }],
    dicData: [{
      label: '有效',
      value: '0'
    }, {
      label: '锁定',
      value: '9'
    }]
  }, {
    width: 120,
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    format: 'yyyy-MM-dd',
    editDisabled: true,
    addVisdiplay: false,
    span: 24
  }]
}
