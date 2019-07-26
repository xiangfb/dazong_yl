import request from '@/router/axios'

const url = 'http://47.104.104.82:9999'

export function fetchList (query) {
  return request({
    url: url + '/admin/user/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: url + '/admin/user',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: url + '/admin/user/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: url + '/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: url + '/admin/user',
    method: 'put',
    data: obj
  })
}

export function getDetails (obj) {
  return request({
    url: url + '/admin/user/details/' + obj,
    method: 'get'
  })
}
