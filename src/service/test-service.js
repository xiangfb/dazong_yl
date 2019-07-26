import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class Test {
  api (params) {
    return Ajax.get({
      url: apiUrl.api.test,
      data: {
        params: params
      }
    })
  }
}
export default new Test()
