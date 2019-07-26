import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class ReportService {
  // 获取穿梭框数据
  getTemData (params) {
    return Ajax.get({
      url: apiUrl.report.fields,
      data: {
        params: params
      }
    })
  }
  // 获取模板列表
  getTemList (type) {
    return Ajax.get({
      url: apiUrl.report.temList.format(type)
    })
  }
  temResult (params, id) {
    return Ajax.post({
      url: apiUrl.report.temResult.format(id),
      data: params
    })
  }
  // 查询指定模版信息
  checkTem (id) {
    return Ajax.get({
      url: apiUrl.report.checkTem.format(id)
    })
  }
  // 更新动态模板
  updateTem (params) {
    return Ajax.put({
      url: apiUrl.report.updateTem,
      data: params
    })
  }
  // 添加复杂表头
  addItemHead (params) {
    return Ajax.post({
      url: apiUrl.report.addItemHead,
      data: params
    })
  }
  // 添编辑复杂表头
  editItemHead (params) {
    return Ajax.put({
      url: apiUrl.report.editItemHead,
      data: params
    })
  }
  // 设置当前模板样式
  styleHeadSet (id) {
    return Ajax.put({
      url: apiUrl.report.styleHeadSet.format(id)
    })
  }
  // 更新模板样式信息
  styleHeadCreate (params) {
    return Ajax.post({
      url: apiUrl.report.styleHeadCreate,
      data: params
    })
  }
  // 更新模板样式信息
  styleHeadUpdate (params) {
    return Ajax.put({
      url: apiUrl.report.styleHeadUpdate,
      data: params
    })
  }
  // 添加模板
  addTem (params) {
    return Ajax.post({
      url: apiUrl.report.addTem,
      data: params
    })
  }
  // 删除指定模板
  remTem (id) {
    return Ajax.delete({
      url: apiUrl.report.remTem.format(id)
    })
  }
  // 获取小计样式
  getSubtotal (id) {
    return Ajax.get({
      url: apiUrl.report.getSubtotal.format(id)
    })
  }
  // 小计
  subtotal (params) {
    return Ajax.put({
      url: apiUrl.report.subtotal,
      data: params
    })
  }
  // 报表样式列表
  reportStyleList (id) {
    return Ajax.get({
      url: apiUrl.report.reportStyleList.format(id)
    })
  }
  styleTable (id) {
    return Ajax.get({
      url: apiUrl.report.styleTable.format(id)
    })
  }
  // 查询比较符
  queryCompareChar () {
    return Ajax.get({
      url: apiUrl.report.queryCompareChar
    })
  }
  queryLinkChar () {
    return Ajax.get({
      url: apiUrl.report.queryLinkChar
    })
  }
  // 添加到菜单
  addMenu (id) {
    return Ajax.post({
      url: apiUrl.report.addMenu.format(id)
    })
  }
  // addMenu (params) {
  //   return Ajax.post({
  //     url: apiUrl.admin.addMenu,
  //     data: params
  //   })
  // }
  // getRoleTreeById (id) {
  //   return Ajax.get({
  //     url: apiUrl.admin.getRoleTreeById.format(id)
  //   })
  // }
}
export default new ReportService()
