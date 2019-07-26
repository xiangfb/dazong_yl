import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class VehicleAxlesService {
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
      url: apiUrl.mouldResource.vehicleAxles.list,
      data: params
    })
  }
  create (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vehicleAxles.create,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.vehicleAxles.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.vehicleAxles.update,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vehicleAxles.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vehicleAxles.disable,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.vehicleAxles.delete.format(id)
    })
  }
}
export default new VehicleAxlesService()
