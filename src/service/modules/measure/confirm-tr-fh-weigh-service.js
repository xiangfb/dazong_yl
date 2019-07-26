import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class ConfirmTrFhWeighService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.confirmTrFhWeigh.list,
      data: params
    })
  }
  submit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.confirmTrFhWeigh.submit,
      data: params
    })
  }
}
export default new ConfirmTrFhWeighService()
