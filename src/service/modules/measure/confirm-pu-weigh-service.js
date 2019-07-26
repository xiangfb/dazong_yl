import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class ConfirmPuWeighService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.confirmPuWeigh.list,
      data: params
    })
  }
  submit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.confirmPuWeigh.submit,
      data: params
    })
  }
}
export default new ConfirmPuWeighService()
