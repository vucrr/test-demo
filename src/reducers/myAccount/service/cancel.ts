import { FETCH_SERVICE_CANCEL_INFO, FETCH_SERVICE_CANCEL_RESULT } from 'constant/index'
import { fromJS } from 'immutable'
import { CancelResultReturns, CancelReturns } from 'interfaces/account/service/cancel'
import { handleActions } from 'redux-actions'

interface InitialProps {
  info: CancelReturns | {}
  result: any
}

const initial: InitialProps = {
  info: {},
  result: {},
}

const category = handleActions(
  {
    [FETCH_SERVICE_CANCEL_INFO](state, { payload }) {
      const { info }: { info: CancelReturns } = payload
      return state.set('info', fromJS(info))
    },
    [FETCH_SERVICE_CANCEL_RESULT](state, { payload }) {
      const { result }: { result: CancelResultReturns } = payload
      return state.set('result', fromJS(result))
    },
  },
  fromJS(initial),
)

export default category
