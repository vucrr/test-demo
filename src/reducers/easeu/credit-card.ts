import * as constants from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialCreditCard = {
  smsInfo: {},
}

const creditCard = handleActions(
  {
    [constants.SEND_SMS_CODE](state, { payload }: any) {
      return state.set('smsInfo', fromJS(payload))
    },
  },
  fromJS(initialCreditCard),
)

export default creditCard
