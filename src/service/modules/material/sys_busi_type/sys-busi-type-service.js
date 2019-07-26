import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class SysBusiTypeService {
  optimusPrime (params) {
    return Ajax.get({
      url: apiUrl.mouldResource.optimusPrime,
      data: {
        params: params
      }
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.sysBusiType.syn,
      data: params
    })
  }
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.sysBusiType.list,
      data: params
    })
  }
  create (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.sysBusiType.create,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.sysBusiType.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.sysBusiType.update,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.sysBusiType.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.sysBusiType.disable,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.sysBusiType.delete.format(id)
    })
  }
}
export default new SysBusiTypeService()
