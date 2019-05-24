import { FETCH_EXCHANGE_INDEX_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initial = {
  info: [],
  data: {},
}

const entrance = handleActions(
  {
    [FETCH_EXCHANGE_INDEX_INFO](state, { payload }) {
      const { trade_info } = payload
      return state.set('data', fromJS(payload)).set('info', fromJS(trade_info))
    },
  },
  fromJS(initial),
)

export default entrance
