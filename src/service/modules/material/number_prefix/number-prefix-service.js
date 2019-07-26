import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class NumberPrefixService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.numberPrefix.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.numberPrefix.list,
      data: params
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.numberPrefix.syn,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.numberPrefix.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.numberPrefix.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.numberPrefix.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.numberPrefix.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.numberPrefix.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.numberPrefix.update,
      data: params
    })
  }
}
export default new NumberPrefixService()
