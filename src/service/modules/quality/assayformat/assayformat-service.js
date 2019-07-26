import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class AssayformatService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.assayformat.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.assayformat.save,
      data: params
    })
  }
  delete (params) {
    return Ajax.delete({
      url: apiUrl.mouldResource.assayformat.delete,
      data: {
        data: params
      }
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.assayformat.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.assayformat.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.assayformat.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.assayformat.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.assayformat.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.assayformat.obsolete,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.assayformat.copy.format(id)
    })
  }
}
export default new AssayformatService()
