import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class MmAlWeighService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmAlWeigh.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmAlWeigh.save,
      data: params
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.mmAlWeigh.syn,
      data: params
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmAlWeigh.delete,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmAlWeigh.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmAlWeigh.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmAlWeigh.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.mmAlWeigh.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmAlWeigh.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmAlWeigh.obsolete,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmAlWeigh.copy.format(id)
    })
  }
  down (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmAlWeigh.down.format(id)
    })
  }
  reversedown (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmAlWeigh.reversedown.format(id)
    })
  }
}
export default new MmAlWeighService()
