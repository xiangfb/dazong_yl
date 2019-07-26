const storage = localStorage

const set = function (key, value, expires = -1) {
  if (value) {
    expires = expires === -1 ? expires : new Date().getTime() + expires * 1000
    let data = { value, expires }
    storage.setItem(key, JSON.stringify(data))
    return value
  }
}

const get = function (key) {
  let data = storage.getItem(key)
  if (!data || data === 'undefined') {
    return undefined
  }
  data = JSON.parse(data)
  if (data.expires !== -1 && data.expires < new Date().getTime()) {
    storage.removeItem(key)
    return undefined
  }
  return data.value
}

const has = function (key) {
  return !!get(key)
}

const remove = function (key) {
  storage.removeItem(key)
}

export default { get, set, remove, has }
