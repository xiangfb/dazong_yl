import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class SaRegistryService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.save,
      data: params
    })
  }
  updateWeighsByNotice (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.updateWeighsByNotice,
      data: params
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.delete,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.saRegistry.detail.format(id)
    })
  }
  update (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.update,
      data: params
    })
  }
  upload (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.upload,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.obsolete,
      data: params
    })
  }
  recover (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.recover,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.saRegistry.copy.format(id)
    })
  }
  supplementCard (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.supplementCard,
      data: params
    })
  }
  checkCard (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.checkCard,
      data: params
    })
  }
  readCard (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.readCard,
      data: params
    })
  }
  letin (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.letin,
      data: params
    })
  }
  letout (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.letout,
      data: params
    })
  }
  upControlPoint (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.upControlPoint,
      data: params
    })
  }
  downControlPoint (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.upControlPoint,
      data: params
    })
  }
  picture (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.saRegistry.picture.format(id)
    })
  }
  againMatch (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.saRegistry.againMatch.format(id)
    })
  }
  getSub (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.saRegistry.getSub.format(id)
    })
  }
  noSafeUpdate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saRegistry.noSafeUpdate,
      data: params
    })
  }
}
export default new SaRegistryService()
