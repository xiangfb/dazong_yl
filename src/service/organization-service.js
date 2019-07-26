import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class OrganizationService {
  organization () {
    return Ajax.get({
      url: apiUrl.tree.organization
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.organization.formData,
      data: params
    })
  }
}
export default new OrganizationService()
