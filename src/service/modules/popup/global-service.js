import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class GlobalService {
  optimusPrimePopup (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.optimusPrimePopup.format(id)
    })
  }
}
export default new GlobalService()
