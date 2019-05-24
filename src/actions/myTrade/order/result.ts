import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_TRADE_ORDER_RESULT_INFO } from 'constant/index'
import { Query } from 'containers/MyTrade/Order/Result'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

export const fetchInfo = ({ trade_no }: Query, req: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/order/result/info'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get(url, { params: { trade_no }, headers })
    if (data) {
      dispatch(createAction<any>(FETCH_TRADE_ORDER_RESULT_INFO)({ info: data }))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
