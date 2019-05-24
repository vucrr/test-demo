import {
  FETCH_EXCHANGE_RETURN_INFO,
  FETCH_EXCHANGE_STORE_INFO,
  SAVE_EXCHANGE_RETURN_INFO,
  SAVE_EXCHANGE_TAB_SHOW,
} from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initial = {
  return: {},
  ceateTrade: {},
  store: {},
  tab: 0,
}

const exchangeReturn = handleActions(
  {
    [FETCH_EXCHANGE_RETURN_INFO](state, { payload }) {
      return state.set('return', fromJS(payload))
    },
    [SAVE_EXCHANGE_RETURN_INFO](state, { payload }) {
      return state.set('ceateTrade', fromJS(payload))
    },
    [FETCH_EXCHANGE_STORE_INFO](state, { payload }) {
      return state.set('store', fromJS(payload))
    },
    [SAVE_EXCHANGE_TAB_SHOW](state, { payload }) {
      return state.set('tab', fromJS(payload))
    },
  },
  fromJS(initial),
)

export default exchangeReturn
