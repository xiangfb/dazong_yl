import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class SaNoticeService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saNotice.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saNotice.save,
      data: params
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.saNotice.syn,
      data: params
    })
  }
  delete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saNotice.delete,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saNotice.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saNotice.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.saNotice.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.saNotice.update,
      data: params
    })
  }
  audit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saNotice.audit,
      data: params
    })
  }
  obsolete (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.saNotice.obsolete,
      data: params
    })
  }
  copy (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.saNotice.copy.format(id)
    })
  }
}
export default new SaNoticeService()
