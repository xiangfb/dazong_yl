import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class VendorService {
  organizationTrees () {
    return Ajax.get({
      url: apiUrl.mouldResource.vendor.organizationTrees
    })
  }
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.vendor.trees
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.vendor.syn,
      data: params
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vendor.list,
      data: params
    })
  }
  add (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.vendor.add.format(id)
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vendor.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.vendor.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vendor.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vendor.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.vendor.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.vendor.update,
      data: params
    })
  }
  allocate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vendor.allocate,
      data: params
    })
  }
  cancelAllocate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vendor.cancelAllocate,
      data: params
    })
  }
  cancelAll (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vendor.cancelAll,
      data: params
    })
  }
  findAllocate (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.vendor.findAllocate.format(id)
    })
  }
}
export default new VendorService()
