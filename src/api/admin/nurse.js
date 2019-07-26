import request from '@/router/axios'

/* 添加医生 */
export function addnurse (obj) {
  return request({
    url: '/admin/nurse/add',
    method: 'post',
    params: obj
  })
}

/* 分页查询 */
export function fechList (obj) {
  return request({
    url: '/admin/nurse/fechList',
    method: 'post',
    data: obj
  })
}

/* 校验手机号码是否唯一 */
export function validateMobile (obj) {
  return request({
    url: '/admin/nurse/validateMobile?phone=' + obj,
    method: 'post'
  })
}

/* 确定删除所选人员 */
export function ensureDel (obj) {
  return request({
    url: '/admin/nurse/ensureDel',
    method: 'post',
    params: obj
  })
}

/* 获取部门 */
export function getDept () {
  return request({
    url: '/admin/nurse/getDept',
    method: 'post'
  })
}

/* 设置数据权限 */
export function dataPermissions (obj) {
  return request({
    url: '/admin/nurse/dataPermissions',
    method: 'post',
    params: obj
  })
}

/* 编辑人员信息 */
export function edit (obj) {
  return request({
    url: '/admin/nurse/edit',
    method: 'post',
    params: obj
  })
}

/* 查找 */
export function findUser (input, page) {
  return request({
    url: '/admin/nurse/findUser?input=' + input,
    method: 'post',
    params: page
  })
}
