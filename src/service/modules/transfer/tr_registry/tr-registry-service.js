import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class TrRegistryService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.save,
      data: params
    })
  }
  againMatch (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.trRegistry.againMatch.format(id)
    })
  }
  updateWeighsByNotice (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.updateWeighsByNotice,
      data: params
    })
  }
  upload (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.upload,
      data: params
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.delete,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.trRegistry.detail.format(id)
    })
  }
  update (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.obsolete,
      data: params
    })
  }
  recover (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.recover,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.trRegistry.copy.format(id)
    })
  }
  supplementCard (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.supplementCard,
      data: params
    })
  }
  checkCard (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.checkCard,
      data: params
    })
  }
  readCard (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.readCard,
      data: params
    })
  }
  letin (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.letin,
      data: params
    })
  }
  letout (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.letout,
      data: params
    })
  }
  upControlPoint (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.upControlPoint,
      data: params
    })
  }
  downControlPoint (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.upControlPoint,
      data: params
    })
  }
  picture (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.trRegistry.picture.format(id)
    })
  }
  getSub (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.trRegistry.getSub.format(id)
    })
  }
  noSafeUpdate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.trRegistry.noSafeUpdate,
      data: params
    })
  }
}
export default new TrRegistryService()
