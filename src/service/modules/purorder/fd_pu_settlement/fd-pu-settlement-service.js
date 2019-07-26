import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class FdPuSettlementService {
  poundList (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuSettlement.poundList,
      data: params
    })
  }
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuSettlement.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuSettlement.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.fdPuSettlement.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuSettlement.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuSettlement.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.fdPuSettlement.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.fdPuSettlement.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuSettlement.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuSettlement.obsolete,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.fdPuSettlement.copy.format(id)
    })
  }
  getId () {
    return Ajax.get({
      url: apiUrl.mouldResource.fdPuSettlement.getId
    })
  }
  confirmPounds (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuSettlement.confirmPounds,
      data: params
    })
  }
}
export default new FdPuSettlementService()
