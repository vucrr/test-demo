import * as constants from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialTrade = {
  flow: {},
  index: {},
  success: {},
}

const tradeIndex = handleActions(
  {
    [constants.CHECK_FLOW](state, { payload }: any) {
      return state.set('flow', fromJS(payload))
    },
    [constants.GET_TRADE_INDEX](state, { payload }: any) {
      return state.set('index', fromJS(payload))
    },
    [constants.GET_TRADE_SUCCESS](state, { payload }: any) {
      return state.set('success', fromJS(payload))
    },
  },
  fromJS(initialTrade),
)

export default tradeIndex
