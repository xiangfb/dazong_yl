import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class ReportOrganizationService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.reportOrganization.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.reportOrganization.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.reportOrganization.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.reportOrganization.delete.format(id)
    })
  }
  defaulted (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.reportOrganization.defaulted.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.reportOrganization.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.reportOrganization.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.reportOrganization.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.reportOrganization.update,
      data: params
    })
  }
  downFile (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.reportOrganization.downFile.format(id)
    })
  }
}
export default new ReportOrganizationService()
