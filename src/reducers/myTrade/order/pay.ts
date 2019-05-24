import { FETCH_TRADE_ORDER_PAY_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initial = {}

const orderPay = handleActions(
  {
    [FETCH_TRADE_ORDER_PAY_INFO](_, { payload }) {
      return fromJS(payload.info)
    },
  },
  fromJS(initial),
)

export default orderPay
