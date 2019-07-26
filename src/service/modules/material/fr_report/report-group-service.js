import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class ReportGroupService {
  organizationTrees () {
    return Ajax.get({
      url: apiUrl.mouldResource.reportGroup.organizationTrees
    })
  }
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.reportGroup.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.reportGroup.list,
      data: params
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.reportGroup.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.reportGroup.delete.format(id)
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.reportGroup.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.reportGroup.disable,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.reportGroup.detail.format(id)
    })
  }
  defaulted (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.reportGroup.defaulted.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.reportGroup.update,
      data: params
    })
  }
  allocate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.reportGroup.allocate,
      data: params
    })
  }
  cancelAllocate (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.reportGroup.cancelAllocate,
      data: params
    })
  }
  cancelAll (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.reportGroup.cancelAll,
      data: params
    })
  }
  findAllocate (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.reportGroup.findAllocate.format(id)
    })
  }
  downFile (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.reportGroup.downFile.format(id)
    })
  }
}
export default new ReportGroupService()
