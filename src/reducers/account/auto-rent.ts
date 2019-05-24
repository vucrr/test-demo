import { FETCH_INFO, OPEN_AUTO_RENT, SET_RENT_BUTTON_DISABLED } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialAutoRent = {
  info: {},
  btnDisabled: false,
}

const autoRent = handleActions(
  {
    [FETCH_INFO](state, { payload }: any) {
      return state.set('info', fromJS(payload.info))
    },
    [OPEN_AUTO_RENT](state, { payload }) {
      return state.setIn(['info', 'is_auto_rent'], payload.is_auto_rent)
    },
    [SET_RENT_BUTTON_DISABLED](state, { payload }) {
      return state.set('btnDisabled', fromJS(payload.disabled))
    },
  },
  fromJS(initialAutoRent),
)

export default autoRent
