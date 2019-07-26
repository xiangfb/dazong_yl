import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class InventoryClassService {
  trees () {
    return Ajax.get({
      url: apiUrl.mouldResource.inventoryClass.trees
    })
  }
  formData (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.inventoryClass.formData,
      data: params
    })
  }
  syn (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.inventoryClass.syn,
      data: params
    })
  }
  add (id) {
    return Ajax.get({
      url: apiUrl.mouldResource.inventoryClass.add.format(id)
    })
  }
  save (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.inventoryClass.save,
      data: params
    })
  }
  delete (id) {
    return Ajax.put({
      url: apiUrl.mouldResource.inventoryClass.delete.format(id)
    })
  }
  update (params) {
    return Ajax.put({
      url: apiUrl.mouldResource.inventoryClass.update,
      data: params
    })
  }
}
export default new InventoryClassService()
