import { FETCH_AUTHORIZE_RESULT } from 'constant/index'
import { fromJS } from 'immutable'
import { AuthorizeResultReturns } from 'interfaces/fundsUnion'
import { Action, handleActions } from 'redux-actions'

const initial = {}

const confirmInfo = handleActions(
  {
    [FETCH_AUTHORIZE_RESULT](_, { payload }: Action<AuthorizeResultReturns>) {
      return fromJS(payload)
    },
  },
  fromJS(initial),
)

export default confirmInfo
