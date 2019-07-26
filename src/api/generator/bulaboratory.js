import request from '@/router/axios'

/* 获取化验单列表 */
export function getbulaboratoryList (obj, obj2, id) {
  return request({
    url: '/admin/bulaboratory/getBuLaboratoryList?input=' + obj2 + '&id=' + id,
    method: 'post',
    data: obj
  })
}

/* 添加化验单信息：化验单主表、化验单项目子表 */
export function addbulaboratoryList (obj) {
  return request({
    url: '/admin/bulaboratory/addBuLaboratory',
    method: 'post',
    data: obj
  })
}

/* 查询化验单信息：化验单主表、化验单项目子表 */
export function queryBuLaboratoryFrom (id) {
  return request({
    url: '/admin/bulaboratory/queryBuLaboratoryFrom?id=' + id,
    method: 'post'
  })
}
