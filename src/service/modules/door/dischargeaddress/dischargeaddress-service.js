import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class DischargeaddressService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.dischargeaddress.list,
      data: params
    })
  }
  create (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.dischargeaddress.create,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.dischargeaddress.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.dischargeaddress.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.dischargeaddress.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.dischargeaddress.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.dischargeaddress.update,
      data: params
    })
  }
}
export default new DischargeaddressService()
