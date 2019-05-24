import { FETCH_WITHHOLDING_LIST_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initial = {
  list: {},
}

export default handleActions(
  {
    [FETCH_WITHHOLDING_LIST_INFO](state, { payload }) {
      return state.set('list', fromJS(payload))
    },
  },
  fromJS(initial),
)
