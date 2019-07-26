import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class LineService {
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
      url: apiUrl.mouldResource.line.list,
      data: params
    })
  }
  create (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.line.create,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.line.detail.format(id)
    })
  }
  update (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.line.update,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.line.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.line.disable,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.line.delete.format(id)
    })
  }
}
export default new LineService()
