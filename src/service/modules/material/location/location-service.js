import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class LocationService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.location.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.location.formData,
      data: params
    })
  }
  add (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.location.add.format(id)
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.location.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.put({
      url: apiUrl.mouldResource.location.delete.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.location.update,
      data: params
    })
  }
}
export default new LocationService()
