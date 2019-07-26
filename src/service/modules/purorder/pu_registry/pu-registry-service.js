import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class PuRegistryService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.save,
      data: params
    })
  }
  againMatch (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.puRegistry.againMatch.format(id)
    })
  }
  updateWeighsByNotice (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.updateWeighsByNotice,
      data: params
    })
  }
  upload (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.upload,
      data: params
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.delete,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.puRegistry.detail.format(id)
    })
  }
  update (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.update,
      data: params
    })
  }
  noSafeUpdate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.noSafeUpdate,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.obsolete,
      data: params
    })
  }
  recover (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.recover,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.puRegistry.copy.format(id)
    })
  }
  supplementCard (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.supplementCard,
      data: params
    })
  }
  checkCard (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.checkCard,
      data: params
    })
  }
  readCard (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.readCard,
      data: params
    })
  }
  letin (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.letin,
      data: params
    })
  }
  letout (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.letout,
      data: params
    })
  }
  upControlPoint (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.upControlPoint,
      data: params
    })
  }
  downControlPoint (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.puRegistry.upControlPoint,
      data: params
    })
  }
  picture (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.puRegistry.picture.format(id)
    })
  }
  getSub (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.puRegistry.getSub.format(id)
    })
  }
}
export default new PuRegistryService()
