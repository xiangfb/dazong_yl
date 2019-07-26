import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class CustomerOrganizationService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.customerOrganization.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.customerOrganization.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.customerOrganization.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.customerOrganization.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.customerOrganization.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.customerOrganization.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.customerOrganization.detail.format(id)
    })
  }
  update (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.customerOrganization.update,
      data: params
    })
  }
}
export default new CustomerOrganizationService()
