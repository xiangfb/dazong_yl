import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'

class SystemServe {
  getList (params, type) {
    return Ajax.post({
      url: apiUrl.sys[type].list,
      data: params
    })
  }
  create (params, type) {
    return Ajax.post({
      url: apiUrl.sys[type].create,
      data: params
    })
  }
  delete (params, type) {
    return Ajax.delete({
      url: apiUrl.sys[type].delete,
      data: { data: params }
    })
  }
  delete_ (id, type) {
    return Ajax.delete({
      url: apiUrl.sys[type].delete.format(id)
    })
  }
  update (params, type) {
    return Ajax.put({
      url: apiUrl.sys[type].update,
      data: params
    })
  }
  resource () {
    return Ajax.get({
      url: apiUrl.sys.menu.resource
    })
  }
  manageList (id) {
    return Ajax.get({
      url: apiUrl.sys.menu.manageList.format(id)
    })
  }
  roleUser (id, params) {
    return Ajax.post({
      url: apiUrl.sys.menu.roleUser.format(id),
      data: params
    })
  }
  userList (id, params) {
    return Ajax.post({
      url: apiUrl.sys.roles.userList.format(id),
      data: params
    })
  }
  addMenu (params) {
    return Ajax.put({
      url: apiUrl.sys.menu.addMenu,
      data: params
    })
  }
  addUsers (params) {
    return Ajax.put({
      url: apiUrl.sys.roles.addUsers,
      data: params
    })
  }
  deleteUsers (params) {
    return Ajax.delete({
      url: apiUrl.sys.roles.deleteUsers,
      data: { data: params }
    })
  }
  orgList (id, params, name, name1) {
    return Ajax.post({
      url: apiUrl.sys[name][name1].orgList.format(id),
      data: params
    })
  }
  orgListC (id, params, name, name1) {
    return Ajax.post({
      url: apiUrl.sys[name][name1].orgListC.format(id),
      data: params
    })
  }
  addOrgs (params, name, name1) {
    return Ajax.put({
      url: apiUrl.sys[name][name1].addOrgs,
      data: params
    })
  }
  deleteOrgs (params, name, name1) {
    console.log('数据中', params)
    return Ajax.delete({
      url: apiUrl.sys[name][name1].deleteOrgs,
      data: { data: params }
    })
  }
  userRoleList (id, params) {
    return Ajax.post({
      url: apiUrl.sys.roles.userRoleList.format(id),
      data: params
    })
  }
  chooseRoleList (id, params) {
    return Ajax.post({
      url: apiUrl.sys.roles.chooseRoleList.format(id),
      data: params
    })
  }
  addRoles (params) {
    return Ajax.put({
      url: apiUrl.sys.roles.addRoles,
      data: params
    })
  }
  deleteRoles (params) {
    return Ajax.delete({
      url: apiUrl.sys.roles.deleteRoles,
      data: { data: params }
    })
  }
  // 系统参数配置
  define () {
    return Ajax.get({
      url: apiUrl.sys.sysParams.define
    })
  }
  setParams (params) {
    return Ajax.put({
      url: apiUrl.sys.sysParams.set,
      data: params
    })
  }
  startStack (params) {
    return Ajax.put({
      url: apiUrl.sys.task.start,
      data: params
    })
  }

  stopStack (id) {
    return Ajax.get({
      url: apiUrl.sys.task.stop.format(id)
    })
  }
}

export default new SystemServe()
