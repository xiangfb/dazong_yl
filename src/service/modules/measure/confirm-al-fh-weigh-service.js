import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class ConfirmAlFhWeighService {
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.confirmAlFhWeigh.list,
      data: params
    })
  }
  submit (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.confirmAlFhWeigh.submit,
      data: params
    })
  }
}
export default new ConfirmAlFhWeighService()
