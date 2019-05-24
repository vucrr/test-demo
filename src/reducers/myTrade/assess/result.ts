import { FETCH_TRADE_ASSESS_RESULT_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const assessResult = handleActions(
  {
    [FETCH_TRADE_ASSESS_RESULT_INFO](_, { payload }) {
      return fromJS(payload)
    },
  },
  fromJS({}),
)

export default assessResult
