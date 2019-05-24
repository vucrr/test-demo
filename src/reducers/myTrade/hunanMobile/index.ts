import { SELECT_NEW_PHONE_NUMBER } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialData = {
  phone: '',
}

const selectNewPhoneNumber = handleActions(
  {
    [SELECT_NEW_PHONE_NUMBER](state, { payload }) {
      return state.set('phone', payload)
    },
  },
  fromJS(initialData),
)

export default selectNewPhoneNumber
