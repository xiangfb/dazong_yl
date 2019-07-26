import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class PuContractService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puContract.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puContract.save,
      data: params
    })
  }
  csave (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puContract.csave,
      data: params
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puContract.delete,
      data: params
    })
  }
  deletes (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puContract.deletes,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puContract.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puContract.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.puContract.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.puContract.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puContract.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puContract.obsolete,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.puContract.copy.format(id)
    })
  }
  plist (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puContract.plist,
      data: params
    })
  }
  pdelList (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puContract.pdelList,
      data: params
    })
  }
  clist (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puContract.clist,
      data: params
    })
  }
  insert (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puContract.insert,
      data: params
    })
  }
  cdelList (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puContract.cdelList,
      data: params
    })
  }
}
export default new PuContractService()
