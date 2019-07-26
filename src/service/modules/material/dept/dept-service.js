import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class DeptService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.dept.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.dept.formData,
      data: params
    })
  }
  add (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.dept.add.format(id)
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.dept.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.dept.delete.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.dept.update,
      data: params
    })
  }
}
export default new DeptService()
