import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class TreeService {
  trees () {
    return Ajax.get({
      url: apiUrl.tree.trees
    })
  }
  organization () {
    return Ajax.get({
      url: apiUrl.tree.organization
    })
  }
}
export default new TreeService()
