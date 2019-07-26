import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class DefdocService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.defdoc.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.defdoc.list,
      data: params
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.defdoc.syn,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.defdoc.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.defdoc.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.defdoc.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.defdoc.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.defdoc.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.defdoc.update,
      data: params
    })
  }
}
export default new DefdocService()
