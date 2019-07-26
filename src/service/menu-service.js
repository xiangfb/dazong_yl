import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class MenuService {
  tree (params) {
    return Ajax.get({
      url: apiUrl.menu.tree,
      data: {
        data: params
      }
    })
  }
  getObj (id) {
    return Ajax.get({
      url: apiUrl.menu.getObj.format(id)
    })
  }
}
export default new MenuService()
