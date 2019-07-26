import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class CustomerClassService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.customerClass.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.customerClass.formData,
      data: params
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.customerClass.syn,
      data: params
    })
  }
  add (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.customerClass.add.format(id)
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.customerClass.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.put({
      url: apiUrl.mouldResource.customerClass.delete.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.customerClass.update,
      data: params
    })
  }
}
export default new CustomerClassService()
