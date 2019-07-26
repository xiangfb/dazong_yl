import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class DayPlanService {
  create (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.dayPlan.create,
      data: params
    })
  }
}
export default new DayPlanService()
