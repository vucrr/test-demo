import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_WITHHOLDING_SELECTABLE_LIST } from 'constant/index'
import { WithHoldingInfoReturns } from 'interfaces/withholding/list'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

export const listWithholds = (req: any, tradeNo: string) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/withholding/list'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get(url, { headers, params: { trade_no: tradeNo } })
    dispatch(createAction<WithHoldingInfoReturns>(FETCH_WITHHOLDING_SELECTABLE_LIST)(data))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 签代扣
export const sign = ({ type, return_url }: { type: number; return_url: string }) => async (_: Dispatch<Action>) => {
  const url = 'node-api/trade/withholding/sign'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post(url, { type, return_url }, { headers })
    if (data.signUrl) {
      location.href = data.signUrl
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
