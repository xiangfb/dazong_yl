/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */

import request from '@/router/axios'

const url = 'http://47.104.104.82:9999'

export function fetchDeptTree (query) {
  return request({
    url: url + '/admin/dept/user-tree',
    method: 'get',
    params: query
  })
}

export function fetchTree (query) {
  return request({
    url: url + '/admin/dept/tree',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: url + '/admin/dept',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: url + '/admin/dept/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: url + '/admin/dept/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: url + '/admin/dept',
    method: 'put',
    data: obj
  })
}
