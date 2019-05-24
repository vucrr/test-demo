import { FETCH_UNION_PAY_LIST } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initial = {
  list: [
    {
      name: '',
      bankName: '',
      bankCardNo: '',
      identi_card: '',
      cardNo: '',
    },
  ],
}

export default handleActions(
  {
    [FETCH_UNION_PAY_LIST](state, { payload }) {
      const { list } = payload
      return state.set('list', fromJS(list))
    },
  },
  fromJS(initial),
)
