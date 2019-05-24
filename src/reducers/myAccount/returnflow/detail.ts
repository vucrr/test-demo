import { GET_DETAIL_INFO, GET_ORDER_DETAIL_INFO, GET_RESULTS_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { ReturnCostReturns, ReturnFlowReturns, ReturnSuccessReturns } from 'interfaces/returnflow'
import { handleActions } from 'redux-actions'

const initialReturn: any = {
  return: {},
  results: {},
  cost: {},
}

const orderDetailReturn = handleActions(
  {
    [GET_DETAIL_INFO](state, { payload }) {
      const res: ReturnCostReturns = payload
      return state.set('cost', fromJS(res))
    },
    [GET_ORDER_DETAIL_INFO](state, { payload }) {
      const res: ReturnFlowReturns = payload
      return state.set('return', fromJS(res))
    },
    [GET_RESULTS_INFO](state, { payload }) {
      const res: ReturnSuccessReturns = payload
      return state.set('results', fromJS(res))
    },
  },
  fromJS(initialReturn),
)

export default orderDetailReturn
