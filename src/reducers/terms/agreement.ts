import { FETCH_TERMS_AGREEMENT } from 'constant/index'
import { fromJS } from 'immutable'
import { AgreementRequest } from 'interfaces/terms'
import { handleActions } from 'redux-actions'

const agreementResult = handleActions(
  {
    [FETCH_TERMS_AGREEMENT](state, { payload }) {
      const res: AgreementRequest = payload
      return state.set('agreement', fromJS(res))
    },
  },
  fromJS({}),
)

export default agreementResult
