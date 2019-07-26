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
import apiUrl from 'apiUrl'

export const loginByUsername = (params) => { // 根据用户名登录[已做]
  return request({
    url: apiUrl.user.login,
    headers: {
      isToken: false,
      // 'TENANT_ID': '1',
      'Authorization': 'Basic ZHp3bDpkendsY3NlY3JldA=='
    },
    method: 'post',
    params: params
  })
}

export const refreshToken = (refreshToken) => { // 刷新令牌[已做]
  const grantType = 'refresh_token'
  return request({
    url: apiUrl.user.login,
    headers: {
      'isToken': false,
      'Authorization': 'Basic ZHp3bDpkendsY3NlY3JldA=='
    },
    method: 'post',
    params: { refresh_token: refreshToken, grant_type: grantType }
  })
}

export const getUserInfo = () => { // 获取用户信息[已做]
  return request({
    url: apiUrl.user.userInfo,
    method: 'get'
  })
}

export const logout = () => { // 退出登录[已做]
  return request({
    url: apiUrl.user.logout,
    method: 'get'
  })
}
