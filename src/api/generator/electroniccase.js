import request from '@/router/axios'

export function addDossier (form) {
  return request({
    url: '/admin/dossier/addDossier',
    method: 'post',
    data: form
  })
}
// 查询就诊情况
export function queryDossier (id) {
  return request({
    url: '/admin/dossier/queryDossier?id=' + id,
    method: 'post'
  })
}
// 查询病历列表
export function dossierList (obj, obj2) {
  return request({
    url: '/admin/dossier/dossierList?input=' + obj2,
    method: 'post',
    data: obj
  })
}
// 废弃病历
export function setdDossierStatus (id) {
  return request({
    url: '/admin/dossier/setdDossierStatus?id=' + id,
    method: 'post'
  })
}
// 查询病历详情
export function queryDossierFrom (id) {
  return request({
    url: '/admin/dossier/queryDossierFrom?id=' + id,
    method: 'post'
  })
}
// 查询复诊列表
export function querySubsequentVisitList (id) {
  return request({
    url: '/admin/dossier/querySubsequentVisitList?id=' + id,
    method: 'post'
  })
}

// 查询初诊单
export function queryFirstvisitVisible (id) {
  return request({
    url: '/admin/dossier/queryFirstvisitVisible?id=' + id,
    method: 'post'
  })
}

// 查询医生诊断列表
export function queryDiagnoseList (id) {
  return request({
    url: '/admin/dossier/queryDiagnoseList?id=' + id,
    method: 'post'
  })
}

// 查询化验单列表
export function queryLaboratoryList (id) {
  return request({
    url: '/admin/dossier/queryLaboratoryList?id=' + id,
    method: 'post'
  })
}

// 查询交班单列表
export function queryHandoverList (id) {
  return request({
    url: '/admin/dossier/queryHandoverList?id=' + id,
    method: 'post'
  })
}

// 查询交班表单
export function queryHandoverForm (id) {
  return request({
    url: '/admin/dossier/queryHandoverForm?id=' + id,
    method: 'post'
  })
}

// 查询会诊单列表
export function queryConsultationList (id) {
  return request({
    url: '/admin/dossier/queryConsultationList?id=' + id,
    method: 'post'
  })
}

// 查询会诊表单
export function queryConsultationForm (id) {
  return request({
    url: '/admin/dossier/queryConsultationForm?id=' + id,
    method: 'post'
  })
}

// 查询回访单列表
export function queryVisitList (id) {
  return request({
    url: '/admin/dossier/queryVisitList?id=' + id,
    method: 'post'
  })
}

// 查询回访表单
export function queryVisitForm (id) {
  return request({
    url: '/admin/dossier/queryVisitForm?id=' + id,
    method: 'post'
  })
}

// 查询报告表单
export function querySubsequentVisitForm (id) {
  return request({
    url: '/admin/dossier/querySubsequentVisitForm?id=' + id,
    method: 'post'
  })
}

// 查询出院表单
export function queryLeaveHospital (id) {
  return request({
    url: '/admin/dossier/queryLeaveHospital?id=' + id,
    method: 'post'
  })
}

// 保存初诊单
export function saveFirstVisit (row) {
  return request({
    url: '/admin/dossier/saveFirstVisit',
    method: 'post',
    data: row
  })
}

// 保存初诊单
export function addDiagnoseVisit (form) {
  return request({
    url: '/admin/dossier/addDiagnoseVisit',
    method: 'post',
    data: form
  })
}

// 保存初诊单
export function saveSubsequentVisit (form) {
  return request({
    url: '/admin/dossier/saveSubsequentVisit',
    method: 'post',
    data: form
  })
}

// 保存出院单
export function saveLeaveHospital (form) {
  return request({
    url: '/admin/dossier/saveLeaveHospital',
    method: 'post',
    data: form
  })
}

// 保存交班单
export function saveHandover (form) {
  return request({
    url: '/admin/dossier/saveHandover',
    method: 'post',
    data: form
  })
}

// 保存会诊单
export function saveConsultation (form) {
  return request({
    url: '/admin/dossier/saveConsultation',
    method: 'post',
    data: form
  })
}

// 保存回访单
export function saveVisit (form) {
  return request({
    url: '/admin/dossier/saveVisit',
    method: 'post',
    data: form
  })
}

// 医保类别
export function theMedicare () {
  return request({
    url: '/admin/dossier/theMedicare',
    method: 'get'
  })
}

export function hospitaltype () {
  return request({
    url: '/admin/dossier/hospitaltype',
    method: 'get'
  })
}

/* 查询化验单信息：化验单主表、化验单项目子表 */
export function queryBuLaboratoryFrom (id) {
  return request({
    url: '/admin/bulaboratory/queryBuLaboratoryFrom?id=' + id,
    method: 'post'
  })
}
/**
   * 导出列表
   */
export function downloadList (id) {

}
