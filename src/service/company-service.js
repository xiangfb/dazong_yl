import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class CompanyService {
  getCount () {
    return Ajax.get({
      url: apiUrl.company.getCount
    })
  }
  getVehicleTable () {
    return Ajax.get({
      url: apiUrl.company.getVehicleTable
    })
  }
  currentOrgs (params) {
    return Ajax.post({
      url: apiUrl.company.currentOrgs,
      data: params
    })
  }
  switchOrg (id) {
    return Ajax.post({
      url: apiUrl.company.switchOrg.format(id)
    })
  }
}
export default new CompanyService()
