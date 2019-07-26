import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class FdAlCalculationService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdAlCalculation.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdAlCalculation.save,
      data: params
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdAlCalculation.delete,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdAlCalculation.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdAlCalculation.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.fdAlCalculation.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.fdAlCalculation.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdAlCalculation.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.fdAlCalculation.obsolete,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.fdAlCalculation.copy.format(id)
    })
  }
}
export default new FdAlCalculationService()
