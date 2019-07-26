import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class PersonService {
  optimusPrime (params) {
    return Ajax.get({
      url: apiUrl.mouldResource.optimusPrime,
      data: {
        params: params
      }
    })
  }
  list (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.person.list,
      data: params
    })
  }
  create (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.person.create,
      data: params
    })
  }
  detail (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.person.detail.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.person.update,
      data: params
    })
  }
  enable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.person.enable,
      data: params
    })
  }
  disable (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.person.disable,
      data: params
    })
  }
  delete (id) {
    return Ajax.delete({
      url: apiUrl.mouldResource.person.delete.format(id)
    })
  }
}
export default new PersonService()
