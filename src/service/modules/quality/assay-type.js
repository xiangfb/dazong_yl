import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class CustomType {
  // 通过模板id和业务表id获取表单的配置列表
  getFormSubsByFormatAndTable (params, type) {
    return Ajax.get({
      url: apiUrl.mouldResource[type].getFormSubsByFormatAndTable,
      data: {
        params: params
      }
    })
  }
  // 保存表单模板的属性配置数据
  saveListData (params, type) {
    return Ajax.post({
      url: apiUrl.mouldResource[type].saveListData,
      data: params
    })
  }
  // 保存表单模板的属性配置数据
  getAssayFormatSub (params, type) {
    return Ajax.get({
      url: apiUrl.mouldResource[type].getAssayFormatSub,
      data: {
        params: params
      }
    })
  }
}
export default new CustomType()
