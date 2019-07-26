import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class AlRegistryService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.save,
      data: params
    })
  }
  againMatch (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.alRegistry.againMatch.format(id)
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.delete,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.alRegistry.detail.format(id)
    })
  }
  update (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.update,
      data: params
    })
  }
  noSafeupdate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.noSafeupdate,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.obsolete,
      data: params
    })
  }
  recover (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.recover,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.alRegistry.copy.format(id)
    })
  }
  supplementCard (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.supplementCard,
      data: params
    })
  }
  checkCard (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.checkCard,
      data: params
    })
  }
  readCard (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.readCard,
      data: params
    })
  }
  letin (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.letin,
      data: params
    })
  }
  letout (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.letout,
      data: params
    })
  }
  upControlPoint (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.upControlPoint,
      data: params
    })
  }
  downControlPoint (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.alRegistry.upControlPoint,
      data: params
    })
  }
  picture (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.alRegistry.picture.format(id)
    })
  }
  getSub (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.alRegistry.getSub.format(id)
    })
  }
}
export default new AlRegistryService()
