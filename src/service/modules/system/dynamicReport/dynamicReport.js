import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class DynamicReport {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.dynamicReport.list,
      data: params
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.dynamicReport.save,
      data: params
    })
  }
}
export default new DynamicReport()
