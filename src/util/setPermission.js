import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
function setPermision (path, data) {
  let params = {
    name: data.name,
    path: path,
    permission: data.permission
  }
  return new Promise((resolve, reject) => {
    Ajax.post({
      url: apiUrl.frontend.setPermision,
      data: params
    }).then(res => {
      console.log(res)
      if (res.code === 0) {
        resolve()
      }
    }).catch(err => {
      reject(err)
    })
  })
}
export default setPermision
