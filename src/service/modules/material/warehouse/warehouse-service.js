import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class WareHouseService {
  getList (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.wareHouse.getWareHouse,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.wareHouse.saveWareHouse,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.wareHouse.detailWareHouse.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.wareHouse.updateWareHouse,
      data: params
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.wareHouse.syn,
      data: params
    })
  }
  delete (id) {
    return Ajax.put({
      url: apiUrl.mouldResource.wareHouse.deleteWareHouse.format(id)
    })
  }
  enabled (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.wareHouse.enableWareHouse,
      data: params
    })
  }
  unenable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.wareHouse.unenableWareHouse,
      data: params
    })
  }
}
export default new WareHouseService()
