import jsonurl from 'apiUrl'
import Ajax from '_router/ajax'
class UserService {
  login (params) {
    return Ajax.post({
      url: jsonurl.user.login,
      data: params
    })
  }
  getPermision (params) {
    return Ajax.get({
      url: jsonurl.frontend.getPermision,
      data: { data: params }
    })
  }
  createRole (params) {
    return Ajax.post({
      url: jsonurl.role.create,
      data: params
    })
  }
  all () {
    return Ajax.get({
      url: jsonurl.frontend.all
    })
  }
  forgetpwd (id) {
    return Ajax.put({
      url: jsonurl.user.forgetpwd.format(id)
    })
  }
  editpwd (params) {
    return Ajax.put({
      url: jsonurl.user.editpwd,
      data: params
    })
  }
}
export default new UserService()
