import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class AlContractService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alContract.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alContract.save,
      data: params
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alContract.delete,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alContract.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alContract.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.alContract.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.alContract.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alContract.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alContract.obsolete,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.alContract.copy.format(id)
    })
  }
  pdelList (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alContract.pdelList,
      data: params
    })
  }
  plist (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alContract.plist,
      data: params
    })
  }
  insert (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alContract.insert,
      data: params
    })
  }
}
export default new AlContractService()
