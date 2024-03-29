import request from '@/router/axios'

const scope = 'server'
const url = 'http://47.104.104.82:9999'
export const loginByUsername = (username, password, code, randomStr) => {
  const grant_type = 'password'

  return request({
    url: url + '/auth/oauth/token',
    headers: {
      isToken: false,
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: { username, password, randomStr, code, grant_type, scope }
  })
}

export const refreshToken = (refresh_token) => {
  const grant_type = 'refresh_token'
  return request({
    url: url + '/auth/oauth/token',
    headers: {
      'isToken': false,
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: { refresh_token, grant_type, scope }
  })
}

export const getUserInfo = () => {
  return request({
    url: url + '/admin/user/info',
    method: 'get'
  })
}

export const logout = () => {
  return request({
    url: url + '/auth/token/logout',
    method: 'delete'
  })
}
