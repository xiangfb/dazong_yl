import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class ConfirmTrShWeighService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.confirmTrShWeigh.list,
      data: params
    })
  }
  submit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.confirmTrShWeigh.submit,
      data: params
    })
  }
}
export default new ConfirmTrShWeighService()
