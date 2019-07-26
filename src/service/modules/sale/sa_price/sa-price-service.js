import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class SaPriceService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saPrice.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saPrice.save,
      data: params
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saPrice.delete,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.saPrice.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.saPrice.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saPrice.audit,
      data: params
    })
  }
}
export default new SaPriceService()
