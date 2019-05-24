import { FETCH_ORDER_REPLACE_REMOTE, FETCH_ORDER_REPLACE_STATUS, FETCH_TRADE_ORDER_CONFIRM_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initial = {
  info: {},
}

const orderConfirm = handleActions(
  {
    [FETCH_TRADE_ORDER_CONFIRM_INFO](state, { payload }) {
      return state.set('info', fromJS(payload.info))
    },
    [FETCH_ORDER_REPLACE_STATUS](state, { payload }) {
      return state.set('exchange', fromJS(payload))
    },
    [FETCH_ORDER_REPLACE_REMOTE](state, { payload }) {
      return state.set('remote', fromJS(payload))
    },
  },
  fromJS(initial),
)

export default orderConfirm
