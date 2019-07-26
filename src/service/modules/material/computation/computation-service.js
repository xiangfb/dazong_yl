import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class ComputationService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.cmputation.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.cmputation.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.cmputation.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.cmputation.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.cmputation.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.cmputation.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.cmputation.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.cmputation.update,
      data: params
    })
  }
}
export default new ComputationService()
