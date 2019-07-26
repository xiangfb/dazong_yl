import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class VendorOrganizationService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.vendorOrganization.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vendorOrganization.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vendorOrganization.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.vendorOrganization.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vendorOrganization.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vendorOrganization.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.vendorOrganization.detail.format(id)
    })
  }
  update (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vendorOrganization.update,
      data: params
    })
  }
}
export default new VendorOrganizationService()
