import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class CustomType {
  tabsEnumList () {
    return Ajax.get({
      url: apiUrl.mouldResource.tabsEnumList
    })
  }
  param (params) { // 获取弹窗入参列表
    return Ajax.get({
      url: apiUrl.mouldResource.params.param,
      data: {
        params: params
      }
    })
  }
  listParam (params) { // 获取弹窗入参列表
    return Ajax.get({
      url: apiUrl.mouldResource.params.listParam,
      data: {
        params: params
      }
    })
  }
  resource (params) { // 获取弹窗出参列表
    return Ajax.get({
      url: apiUrl.mouldResource.params.resource,
      data: {
        params: params
      }
    })
  }
  subs (id) { // 表单字段下拉 表单模板的id / 结果字段下拉 弹窗模板的id
    return Ajax.get({
      url: apiUrl.mouldResource.params.subs.format(id)
    })
  }
  getSubsByCode (code) { // 表单字段下拉 表单模板的id / 结果字段下拉 弹窗模板的id
    return Ajax.get({
      url: apiUrl.source.format.getSubsByCode.format(code)
    })
  }
  search (id) { // 查询字段下拉
    return Ajax.get({
      url: apiUrl.mouldResource.params.search.format(id)
    })
  }
  subCreate (params) { // 保存
    return Ajax.post({
      url: apiUrl.mouldResource.params.create,
      data: params
    })
  }
  listSubCreate (params) { // 保存
    return Ajax.post({
      url: apiUrl.mouldResource.params.listCreate,
      data: params
    })
  }
  searchList (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.searchList.format(id)
    })
  }
  resourceList (params, type) {
    return Ajax.post({
      url: apiUrl.source[type].resourceList,
      data: params
    })
  }
  listResourceList (params) {
    return Ajax.post({
      url: apiUrl.source.format.listResourceList,
      data: params
    })
  }
  list (params, type) {
    return Ajax.post({
      url: apiUrl.source[type].list,
      data: params
    })
  }
  create (params, type) {
    return Ajax.post({
      url: apiUrl.source[type].create,
      data: params
    })
  }
  copy (params, type) {
    return Ajax.post({
      url: apiUrl.source[type].copy,
      data: params
    })
  }
  update (params, type) {
    return Ajax.put({
      url: apiUrl.source[type].update,
      data: params
    })
  }
  delete (params, type) {
    return Ajax.delete({
      url: apiUrl.source[type].delete,
      data: {
        data: params
      }
    })
  }
  select (params, type) {
    return Ajax.get({
      url: apiUrl.source[type].select,
      data: {
        data: params
      }
    })
  }
  view (params, type, id) {
    return Ajax.get({
      url: apiUrl.source[type].view.format(id),
      data: {
        data: params
      }
    })
  }
  // 通过业务类型id获取业务表列表
  getCustomTables (params, type) {
    return Ajax.get({
      url: apiUrl.source[type].getCustomTables,
      data: {
        params: params
      }
    })
  }
  // 通过业务类型code获取业务表列表
  getCustomTablesByCode (params, type) {
    return Ajax.get({
      url: apiUrl.source[type].getCustomTablesByCode,
      data: {
        params: params
      }
    })
  }
  // 通过业务类型code获取业务模板
  getFormatByCode (params, type) {
    return Ajax.get({
      url: apiUrl.source[type].getFormatByCode,
      data: {
        params: params
      }
    })
  }
  // 通过模板id和业务表id获取表单的配置列表
  getFormSubsByFormatAndTable (params, type) {
    return Ajax.get({
      url: apiUrl.source[type].getFormSubsByFormatAndTable,
      data: {
        params: params
      }
    })
  }
  // 弹窗资源出入参
  factor (params) {
    return Ajax.get({
      url: apiUrl.source.cgDialogFormatSub.factor,
      data: {
        params: params
      }
    })
  }
  // 新增弹窗资源入参
  addFactor (params) {
    return Ajax.post({
      url: apiUrl.source.cgDialogFormatSub.addFactor,
      data: params
    })
  }
  // 通过模板id和业务表id获取表单的配置列表
  getListSubsByFormatAndTable (params, type) {
    return Ajax.get({
      url: apiUrl.source[type].getCustomTables,
      data: {
        params: params
      }
    })
  }
  // 保存表单模板的属性配置数据
  saveListData (params, type) {
    return Ajax.post({
      url: apiUrl.source[type].saveListData,
      data: params
    })
  }
  // 初始化列表数据
  init (params, type) {
    return Ajax.post({
      url: apiUrl.source[type].init,
      data: params
    })
  }
}
export default new CustomType()
