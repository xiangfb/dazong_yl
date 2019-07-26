import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class QueueService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.queue.list,
      data: params
    })
  }
  create (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.queue.create,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.queue.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.queue.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.queue.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.queue.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.queue.update,
      data: params
    })
  }
}
export default new QueueService()
