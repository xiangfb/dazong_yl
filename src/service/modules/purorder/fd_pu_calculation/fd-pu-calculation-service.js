import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class FdPuCalculationService {
  poundList (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuCalculation.poundList,
      data: params
    })
  }
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuCalculation.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuCalculation.save,
      data: params
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuCalculation.delete,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuCalculation.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuCalculation.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.fdPuCalculation.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.fdPuCalculation.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuCalculation.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuCalculation.obsolete,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.fdPuCalculation.copy.format(id)
    })
  }
  getId () {
    return Ajax.get({
      url: apiUrl.mouldResource.fdPuCalculation.getId
    })
  }
  confirmPounds (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuCalculation.confirmPounds,
      data: params
    })
  }
  getSubPounds (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdPuCalculation.getSubPounds,
      data: params
    })
  }
}
export default new FdPuCalculationService()
