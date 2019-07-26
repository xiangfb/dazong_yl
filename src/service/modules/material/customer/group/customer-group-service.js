import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class CustomerGroupService {
  organizationTrees () {
    return Ajax.get({
      url: apiUrl.mouldResource.customerGroup.organizationTrees
    })
  }
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.customerGroup.trees
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.customerGroup.syn,
      data: params
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.customerGroup.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.customerGroup.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.customerGroup.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.customerGroup.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.customerGroup.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.customerGroup.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.customerGroup.update,
      data: params
    })
  }
  allocate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.customerGroup.allocate,
      data: params
    })
  }
  cancelAllocate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.customerGroup.cancelAllocate,
      data: params
    })
  }
  cancelAll (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.customerGroup.cancelAll,
      data: params
    })
  }
  findAllocate (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.customerGroup.findAllocate.format(id)
    })
  }
}
export default new CustomerGroupService()
