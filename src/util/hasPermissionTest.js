import { getStore } from './store'
let hasPermissionTest = function (url) {
  const Urlpermission = getStore({ name: 'Urlpermission' })
  if (Urlpermission) {
    return Urlpermission[url] || []
  } else {
    return []
  }
}
export default hasPermissionTest
