import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class ReportClassService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.reportClass.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.reportClass.formData,
      data: params
    })
  }
  add (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.reportClass.add.format(id)
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.reportClass.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.put({
      url: apiUrl.mouldResource.reportClass.delete.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.reportClass.update,
      data: params
    })
  }
}
export default new ReportClassService()
