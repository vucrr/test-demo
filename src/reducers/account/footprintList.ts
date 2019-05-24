import { GET_ACCOUNT_FOOTPRINTLIST_INFO } from 'constant/index'
import { fromJS } from 'immutable'
// import { FootPrintListReturns } from 'interfaces/footprint'
import { handleActions } from 'redux-actions'

const initialFootprintList: any = {
  breach_info: '',
}

const footprintList = handleActions(
  {
    [GET_ACCOUNT_FOOTPRINTLIST_INFO](state, { payload }) {
      const breachInfo: any = payload
      return state.set('breach_info', fromJS(breachInfo))
    },
  },
  fromJS(initialFootprintList),
)

export default footprintList
