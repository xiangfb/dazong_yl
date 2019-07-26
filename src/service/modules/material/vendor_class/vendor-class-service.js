import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class VendorClassService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.vendorClass.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vendorClass.formData,
      data: params
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.vendorClass.syn,
      data: params
    })
  }
  add (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.vendorClass.add.format(id)
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.vendorClass.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.put({
      url: apiUrl.mouldResource.vendorClass.delete.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.vendorClass.update,
      data: params
    })
  }
}
export default new VendorClassService()
