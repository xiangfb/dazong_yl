import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class InventoryGroupService {
  organizationTrees () {
    return Ajax.get({
      url: apiUrl.mouldResource.inventoryGroup.organizationTrees
    })
  }
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.inventoryGroup.trees
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.inventoryGroup.syn,
      data: params
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.inventoryGroup.list,
      data: params
    })
  }
  create (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.inventoryGroup.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.inventoryGroup.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.inventoryGroup.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.inventoryGroup.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.inventoryGroup.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.inventoryGroup.update,
      data: params
    })
  }
  allocate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.inventoryGroup.allocate,
      data: params
    })
  }
  cancelAllocate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.inventoryGroup.cancelAllocate,
      data: params
    })
  }
  cancelAll (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.inventoryGroup.cancelAll,
      data: params
    })
  }
  findAllocate (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.inventoryGroup.findAllocate.format(id)
    })
  }
}
export default new InventoryGroupService()
