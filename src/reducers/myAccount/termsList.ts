import { FETCH_CREDIT_LBF_AGREEMENT, FETCH_SERVICE_TERMS_LIST } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialReturn: any = {
  list: [],
}

const serviceTermsList = handleActions(
  {
    [FETCH_SERVICE_TERMS_LIST](state, { payload }) {
      const res: any = payload
      return state.set('list', fromJS(res))
    },
    [FETCH_CREDIT_LBF_AGREEMENT](state, { payload }) {
      const res: any = payload
      return state.set('lbfterm', fromJS(res))
    },
  },
  fromJS(initialReturn),
)

export default serviceTermsList
