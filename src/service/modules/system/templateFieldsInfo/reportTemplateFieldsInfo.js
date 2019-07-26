import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class ReportTemplateFieldsInfo {
  list (type) {
    return Ajax.get({
      url: apiUrl.mouldResource.templateFieldsInfo.list.format(type)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.templateFieldsInfo.update,
      data: params
    })
  }
}
export default new ReportTemplateFieldsInfo()
