import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class BatchService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.batch.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.batch.save,
      data: params
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.batch.delete,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.batch.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.batch.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.batch.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.batch.update,
      data: params
    })
  }
}
export default new BatchService()
