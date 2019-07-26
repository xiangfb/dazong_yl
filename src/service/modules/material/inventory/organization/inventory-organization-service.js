import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class InventoryOrganizationService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.inventoryOrganization.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.inventoryOrganization.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.inventoryOrganization.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.inventoryOrganization.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.inventoryOrganization.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.inventoryOrganization.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.inventoryOrganization.detail.format(id)
    })
  }
  update (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.inventoryOrganization.update,
      data: params
    })
  }
}
export default new InventoryOrganizationService()
