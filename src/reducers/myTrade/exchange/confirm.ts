import { FETCH_ORDER_REPLACE_CHECK_CONDITION } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initial = {}

const confirmReturn = handleActions(
  {
    [FETCH_ORDER_REPLACE_CHECK_CONDITION](state, { payload }) {
      return state.set('confirm', fromJS(payload))
    },
  },
  fromJS(initial),
)

export default confirmReturn
