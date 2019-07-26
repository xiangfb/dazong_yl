import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class ComputationGroupService {
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
      url: apiUrl.mouldResource.computationGroup.list,
      data: params
    })
  }
  create (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.computationGroup.create,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.computationGroup.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.computationGroup.update,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.computationGroup.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.computationGroup.disable,
      data: params
    })
  }
  delete (id) {
    return Ajax.put({
      url: apiUrl.mouldResource.computationGroup.delete.format(id)
    })
  }
}
export default new ComputationGroupService()
