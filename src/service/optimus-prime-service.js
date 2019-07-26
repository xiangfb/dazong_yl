import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class OptimusPrimeService {
  optimusPrime (params) {
    return Ajax.get({
      url: apiUrl.mouldResource.optimusPrime,
      data: {
        params: params
      }
    })
  }
  computationGroupCreate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.computationGroupCreate,
      data: params
    })
  }
  getMaterialList (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.getMaterialList,
      data: params
    })
  }
}
export default new OptimusPrimeService()
