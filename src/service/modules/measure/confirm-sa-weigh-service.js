import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class ConfirmSaWeighService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.confirmSaWeigh.list,
      data: params
    })
  }
  submit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.confirmSaWeigh.submit,
      data: params
    })
  }
}
export default new ConfirmSaWeighService()
