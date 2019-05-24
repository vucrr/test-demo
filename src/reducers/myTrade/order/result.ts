import { FETCH_TRADE_ORDER_RESULT_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const orderResult = handleActions(
  {
    [FETCH_TRADE_ORDER_RESULT_INFO](_, { payload }) {
      return fromJS(payload.info)
    },
  },
  fromJS({}),
)

export default orderResult
