import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class RegistryErrorService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.registryError.list,
      data: params
    })
  }
  delete (params) {
    return Ajax.delete({
      url: apiUrl.mouldResource.registryError.delete,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.registryError.detail.format(id)
    })
  }
  completion (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.registryError.completion,
      data: params
    })
  }
}
export default new RegistryErrorService()
