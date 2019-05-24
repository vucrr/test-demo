import { FETCH_RETURN_APPLY_DETAIL } from 'constant/index'
import { fromJS } from 'immutable'
import { StoreDetailReturn } from 'interfaces/account/return/apply'
import { handleActions } from 'redux-actions'

const initialInfo: any = {
  detail: {},
}

const expressInfoReturn = handleActions(
  {
    [FETCH_RETURN_APPLY_DETAIL](state, { payload }) {
      const res: StoreDetailReturn = payload
      return state.set('detail', fromJS(res))
    },
  },
  fromJS(initialInfo),
)

export default expressInfoReturn
