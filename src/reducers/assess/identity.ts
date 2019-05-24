import { CHANGE_IDENTITY_STATUS } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialData = {
  identityStatus: 'initial',
}

const identity = handleActions(
  {
    [CHANGE_IDENTITY_STATUS](state, { payload }) {
      return state.set('identityStatus', payload)
    },
  },
  fromJS(initialData),
)

export default identity
