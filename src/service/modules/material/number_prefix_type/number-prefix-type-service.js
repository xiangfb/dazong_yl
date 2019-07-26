import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class NumberPrefixTypeService {
  optimusPrime (params) {
    return Ajax.get({
      url: apiUrl.mouldResource.optimusPrime,
      data: {
        params: params
      }
    })
  }
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.numberPrefixType.list,
      data: params
    })
  }
  create (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.numberPrefixType.create,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.numberPrefixType.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.numberPrefixType.update,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.numberPrefixType.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.numberPrefixType.disable,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.numberPrefixType.delete.format(id)
    })
  }
}
export default new NumberPrefixTypeService()
