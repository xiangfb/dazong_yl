import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class ConfirmAlShWeighService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.confirmAlShWeigh.list,
      data: params
    })
  }
  submit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.confirmAlShWeigh.submit,
      data: params
    })
  }
}
export default new ConfirmAlShWeighService()
