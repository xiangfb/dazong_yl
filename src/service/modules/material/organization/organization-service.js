import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class OrganizationService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.organization.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.organization.formData,
      data: params
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.organization.syn,
      data: params
    })
  }
  add (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.organization.add.format(id)
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.organization.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.organization.delete.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.organization.update,
      data: params
    })
  }
}
export default new OrganizationService()
