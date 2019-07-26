import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class QueueMatchService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.queueMatch.list,
      data: params
    })
  }
  create (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.queueMatch.create,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.queueMatch.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.queueMatch.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.queueMatch.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.queueMatch.detail.format(id)
    })
  }
  toCreate (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.queueMatch.toCreate
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.queueMatch.update,
      data: params
    })
  }
}
export default new QueueMatchService()
