import request from '@/router/axios'

const url = 'http://47.104.104.82:9999'

/* 添加医生 */
export function addDoctor (obj) {
  return request({
    url: url + '/admin/doctor/add',
    method: 'post',
    params: obj
  })
}

/* 分页查询 */
export function fechList (obj, obj2) {
  return request({
    url: url + '/admin/doctor/fechList?input=' + obj2,
    method: 'post',
    data: obj
  })
}

/* 校验手机号码是否唯一 */
export function validateMobile (obj) {
  return request({
    url: url + '/admin/doctor/validateMobile?phone=' + obj,
    method: 'post'
  })
}

/* 确定删除所选人员 */
export function ensureDel (obj) {
  return request({
    url: url + '/admin/doctor/ensureDel',
    method: 'post',
    params: obj
  })
}

/* 获取部门 */
export function getDept () {
  return request({
    url: url + '/admin/doctor/getDept',
    method: 'post'
  })
}

/* 设置数据权限 */
export function dataPermissions (obj) {
  return request({
    url: url + '/admin/doctor/dataPermissions',
    method: 'post',
    params: obj
  })
}

/* 编辑人员信息 */
export function edit (obj) {
  return request({
    url: url + '/admin/doctor/edit',
    method: 'post',
    params: obj
  })
}
