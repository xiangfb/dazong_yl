import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class MmSaWeighService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmSaWeigh.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmSaWeigh.save,
      data: params
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.mmSaWeigh.syn,
      data: params
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmSaWeigh.delete,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmSaWeigh.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmSaWeigh.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmSaWeigh.detail.format(id)
    })
  }
  update (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmSaWeigh.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmSaWeigh.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmSaWeigh.obsolete,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmSaWeigh.copy.format(id)
    })
  }
  down (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmSaWeigh.down.format(id)
    })
  }
  reversedown (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmSaWeigh.reversedown.format(id)
    })
  }
  returnGoods (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmSaWeigh.returnGoods,
      data: params
    })
  }
}
export default new MmSaWeighService()
