import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class GroupService {
  grouptree () {
    return Ajax.get({
      url: apiUrl.mouldResource.group.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.group.formData,
      data: params
    })
  }
  add (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.group.add.format(id)
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.group.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.group.delete.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.group.update,
      data: params
    })
  }
}
export default new GroupService()
