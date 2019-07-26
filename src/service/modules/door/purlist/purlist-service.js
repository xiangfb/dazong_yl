import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class PurlistService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.purlist.list,
      data: params
    })
  }
  update (id) {
    return Ajax.post({
      url: apiUrl.mouldResource.purlist.update.format(id)
    })
  }
  getOneUpdate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.purlist.getOneUpdate,
      data: params
    })
  }
}
export default new PurlistService()
