import { GET_ACCOUNT_FOOTPRINT_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { FootPrintReturns } from 'interfaces/footprint'
import { handleActions } from 'redux-actions'

const initialFootprint: FootPrintReturns = {
  name: '',
  user_id: '',
  source: '',
  identi_card: '',
  credit_level: '',
  honour_count: 0,
  breach_count: 0,
  honour: {
    return_pay: 0,
    return_machine: 0,
    buyout: 0,
  },
  breach: {
    return_pay: 0,
    return_machine: 0,
    buyout: 0,
  },
}

const footprint = handleActions(
  {
    [GET_ACCOUNT_FOOTPRINT_INFO](state, { payload }) {
      const {
        name,
        user_id,
        source,
        identi_card,
        credit_level,
        honour_count,
        breach_count,
        honour,
        breach,
      }: FootPrintReturns = payload
      return state
        .set('name', fromJS(name))
        .set('user_id', fromJS(user_id))
        .set('source', fromJS(source))
        .set('identi_card', fromJS(identi_card))
        .set('credit_level', fromJS(credit_level))
        .set('honour_count', fromJS(honour_count))
        .set('breach_count', fromJS(breach_count))
        .set('honour', fromJS(honour))
        .set('breach', fromJS(breach))
    },
  },
  fromJS(initialFootprint),
)

export default footprint
