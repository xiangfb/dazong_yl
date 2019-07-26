import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class GroupOrgService {
  getGropList (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.getGropList,
      data: params
    })
  }
  getOrgList (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.organization.formData,
      data: params
    })
  }
}
export default new GroupOrgService()
