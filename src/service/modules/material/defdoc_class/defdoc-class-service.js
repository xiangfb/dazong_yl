import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class DefdocClassService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.defdocClass.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.defdocClass.formData,
      data: params
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.defdocClass.syn,
      data: params
    })
  }
  add (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.defdocClass.add.format(id)
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.defdocClass.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.put({
      url: apiUrl.mouldResource.defdocClass.delete.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.defdocClass.update,
      data: params
    })
  }
}
export default new DefdocClassService()
