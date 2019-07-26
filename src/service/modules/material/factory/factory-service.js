import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class FactoryService {
  getList (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.factory.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.factory.save,
      data: params
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.factory.syn,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.factory.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.factory.update,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.factory.delete.format(id)
    })
  }
  enabled (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.factory.enable,
      data: params
    })
  }
  unenable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.factory.unenable,
      data: params
    })
  }
}
export default new FactoryService()
