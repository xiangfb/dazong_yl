// 封装ajax方法
// import $jsonurl from 'apiUrl'
import Ajax from './axios'
// import Qs from 'qs'
// let defaultConfig = {
// }

// ajax get 方法
const get = function (options, config) {
  return Ajax.get(options.url, options.data)
}

// ajax post
const post = function (options, config) {
  return Ajax.post(options.url, options.data, config)
}

const put = function (options, config) {
  return Ajax.put(options.url, options.data, config)
}

const _delete = function (options, config) {
  return Ajax.delete(options.url, options.data, config)
}

export default { get, put, post, delete: _delete }
