import { FETCH_BUY_OUT_INFO, FETCH_BUY_OUT_RESULT_INFO, SET_RENT_BUTTON_DISABLED } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux-immutable'

const initialBuyOut = {
  info: {},
  btnDisabled: false,
}

const index = handleActions(
  {
    [FETCH_BUY_OUT_INFO](state, { payload }: any) {
      return state.set('info', fromJS(payload.info))
    },
    [SET_RENT_BUTTON_DISABLED](state, { payload }) {
      return state.set('btnDisabled', fromJS(payload.disabled))
    },
  },
  fromJS(initialBuyOut),
)

const result = handleActions(
  {
    [FETCH_BUY_OUT_RESULT_INFO](state, { payload }: any) {
      return state.merge(fromJS(payload.info))
    },
  },
  fromJS({}),
)

export default combineReducers({
  index,
  result,
})
