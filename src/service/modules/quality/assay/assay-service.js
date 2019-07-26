import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class AssayService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.assay.list,
      data: params
    })
  }
  getListByFormatId (params, id) {
    return Ajax.post({
      url: apiUrl.mouldResource.assay.getListByFormatId.format(id),
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.assay.save,
      data: params
    })
  }
  saveGroupAssay (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.assay.saveGroupAssay,
      data: params
    })
  }
  delete (params) {
    return Ajax.delete({
      url: apiUrl.mouldResource.assay.delete,
      data: {
        data: params
      }
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.assay.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.assay.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.assay.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.assay.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.assay.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.assay.obsolete,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.assay.copy.format(id)
    })
  }
}
export default new AssayService()
