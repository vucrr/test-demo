import { FETCH_BUY_OUT_INFO, FETCH_BUY_OUT_RESULT_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialBuyOut = {
  index: {},
  result: {},
}

const buyout = handleActions(
  {
    [FETCH_BUY_OUT_INFO](state, { payload }: any) {
      return state.set('index', fromJS(payload.info))
    },
    [FETCH_BUY_OUT_RESULT_INFO](state, { payload }) {
      return state.set('result', fromJS(payload.info))
    },
  },
  fromJS(initialBuyOut),
)

export default buyout
