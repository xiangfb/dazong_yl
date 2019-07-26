import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class MmPuWeighService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmPuWeigh.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmPuWeigh.save,
      data: params
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.mmPuWeigh.syn,
      data: params
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmPuWeigh.delete,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmPuWeigh.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmPuWeigh.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmPuWeigh.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.mmPuWeigh.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmPuWeigh.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmPuWeigh.obsolete,
      data: params
    })
  }
  updateWeighsByNotice (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmPuWeigh.batchChangeNotice,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmPuWeigh.copy.format(id)
    })
  }
  down (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmPuWeigh.down.format(id)
    })
  }
  reversedown (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.mmPuWeigh.reversedown.format(id)
    })
  }
  outDoorUpdate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmPuWeigh.outDoorUpdate,
      data: params
    })
  }
  returnGoods (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.mmPuWeigh.returnGoods,
      data: params
    })
  }
}
export default new MmPuWeighService()
