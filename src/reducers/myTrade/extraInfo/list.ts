import { FETCH_EXTRAINFO_LIST } from 'constant/index'
import { fromJS } from 'immutable'
import { ExtraInfoReturn } from 'interfaces/trade'
import { handleActions } from 'redux-actions'

const initialExtraInfo: ExtraInfoReturn = {
  is_need: '',
  step_list: [],
}

const extraInfo = handleActions(
  {
    [FETCH_EXTRAINFO_LIST](state, { payload }) {
      const { is_need, step_list }: ExtraInfoReturn = payload
      return state.set('is_need', fromJS(is_need)).set('step_list', fromJS(step_list))
    },
  },
  fromJS(initialExtraInfo),
)

export default extraInfo
