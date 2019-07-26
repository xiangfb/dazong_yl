import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class FdSaSettlementService {
  poundList (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdSaSettlement.poundList,
      data: params
    })
  }
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdSaSettlement.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdSaSettlement.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.fdSaSettlement.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdSaSettlement.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdSaSettlement.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.fdSaSettlement.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.fdSaSettlement.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdSaSettlement.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdSaSettlement.obsolete,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.fdSaSettlement.copy.format(id)
    })
  }
  getId () {
    return Ajax.get({
      url: apiUrl.mouldResource.fdSaSettlement.getId
    })
  }
  confirmPounds (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdSaSettlement.confirmPounds,
      data: params
    })
  }
}
export default new FdSaSettlementService()
