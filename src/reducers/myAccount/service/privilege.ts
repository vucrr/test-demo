import { FETCH_SERVICE_PRIVILEGE } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initial = {}

const privilege = handleActions(
  {
    [FETCH_SERVICE_PRIVILEGE](state, { payload }) {
      return state.set('list', fromJS(payload))
    },
  },
  fromJS(initial),
)

export default privilege
