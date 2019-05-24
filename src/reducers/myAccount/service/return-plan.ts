import { FETCH_SERVICE_RETURN_PLAN } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initial = {
  isPlanInfo: false,
  current: {},
  historyList: [],
}

const serviceReturnPlan = handleActions(
  {
    [FETCH_SERVICE_RETURN_PLAN](state, { payload }) {
      return state
        .set('isPlanInfo', payload.is_plan_info)
        .set('current', fromJS(payload.current_plan_list))
        .set('historyList', fromJS(payload.history_plan_list))
    },
  },
  fromJS(initial),
)

export default serviceReturnPlan
