import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class MmTrWeighService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmTrWeigh.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmTrWeigh.save,
      data: params
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.mmTrWeigh.syn,
      data: params
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmTrWeigh.delete,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmTrWeigh.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmTrWeigh.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmTrWeigh.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.mmTrWeigh.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmTrWeigh.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmTrWeigh.obsolete,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmTrWeigh.copy.format(id)
    })
  }
  down (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmTrWeigh.down.format(id)
    })
  }
  reversedown (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmTrWeigh.reversedown.format(id)
    })
  }
}
export default new MmTrWeighService()
