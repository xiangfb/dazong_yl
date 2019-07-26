import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class AdminService {
  fetchMenuTree (params) {
    return Ajax.get({
      url: apiUrl.admin.fetchMenu,
      data: {
        params: params
      }
    })
  }
  fetchMenu (params) { // 获取菜单导航[已做]
    return Ajax.get({
      url: apiUrl.menu.menuList,
      data: {
        params: params
      }
    })
  }
  menuButList (params) { // 获取菜单按钮列表[已做]
    return Ajax.get({
      url: apiUrl.menu.menuButList,
      data: {
        params: params
      }
    })
  }
  menuManageList (params) { // 菜单管理-列表[已做]
    return Ajax.get({
      url: apiUrl.menu.menuManageList,
      data: {
        params: params
      }
    })
  }
  getMenuById (id) { // 获取菜单详情[已做]
    return Ajax.get({
      url: apiUrl.menu.menuDetail.format(id)
    })
  }
  createMenu (params) { // 菜单新增
    return Ajax.post({
      url: apiUrl.menu.createMenu,
      data: params
    })
  }
  formatAllotDetail (params) { // 获取当前菜单资源[已做]
    return Ajax.get({
      url: apiUrl.menu.formatAllotDetail,
      data: {
        params: params
      }
    })
  }
  getMouldList (params) { // 获取模板列表[已做]
    return Ajax.post({
      url: apiUrl.menu.formatSelect,
      data: params
    })
  }
  createFormatAllot (params) { // 菜单管理-添加绑定模板
    return Ajax.post({
      url: apiUrl.menu.createFormatAllot,
      data: params
    })
  }
  sysInfoList (params) { // 获取系统资源[已做]
    return Ajax.get({
      url: apiUrl.menu.sysInfoList,
      data: {
        params: params
      }
    })
  }
  addMenu (params) {
    return Ajax.post({
      url: apiUrl.admin.addMenu,
      data: params
    })
  }
  deleteMenu (id) {
    return Ajax.delete({
      url: apiUrl.menu.deleteMenu.format(id)
    })
  }
  updateMenuById (params) { // 获取菜单详情[已做]
    return Ajax.put({
      url: apiUrl.menu.updateMenuById,
      data: params
    })
  }
  getPermissionListById (id) {
    return Ajax.get({
      url: apiUrl.admin.getPermissionListById.format(id)
    })
  }
  getRoleList (params) {
    return Ajax.get({
      url: apiUrl.admin.roleList,
      data: {
        params: params
      }
    })
  }
  getBackEndTree (params) {
    return Ajax.get({
      url: apiUrl.admin.getBackEndTree,
      data: {
        params: params
      }
    })
  }
  updateRoleTreeById (params) {
    return Ajax.put({
      url: apiUrl.admin.updateRoleTreeById,
      data: params
    },
    {
      params: params
    })
  }
  getRoleTreeById (id) {
    return Ajax.get({
      url: apiUrl.admin.getRoleTreeById.format(id)
    })
  }
}
export default new AdminService()
