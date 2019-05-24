import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_TRADE_ASSESS_RESULT_INFO } from 'constant/index'
import { Action, Dispatch } from 'redux'
// import { ResultReturns } from 'interfaces/trade/assess/result'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'
import { CreateStrategyPayParams } from '../order/pay'

export const fetchInfo = ({ trade_no }: CreateStrategyPayParams, req: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/assess/result'
  // const url = '/mock/mytrade/assess/result'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get(url, { params: { trade_no }, headers })
    if (data) {
      dispatch(createAction<any>(FETCH_TRADE_ASSESS_RESULT_INFO)(data))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
