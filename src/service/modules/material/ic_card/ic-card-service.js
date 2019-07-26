import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class IcCardService {
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
      url: apiUrl.mouldResource.icCard.list,
      data: params
    })
  }
  create (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.icCard.create,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.icCard.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.icCard.update,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.icCard.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.icCard.disable,
      data: params
    })
  }
  loss (id) {
    return Ajax.post({
      url: apiUrl.mouldResource.icCard.loss.format(id)
    })
  }
  reuse (id) {
    return Ajax.post({
      url: apiUrl.mouldResource.icCard.reuse.format(id)
    })
  }
  delete (id) {
    return Ajax.put({
      url: apiUrl.mouldResource.icCard.delete.format(id)
    })
  }
}
export default new IcCardService()
