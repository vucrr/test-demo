import { getHeaders2 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import { FETCH_BUY_OUT_INFO, FETCH_BUY_OUT_RESULT_INFO } from 'constant/index'
import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

export const fetchInfo = ({ trade_no, req }: { trade_no?: string; req: any }) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/buy-out/service/info'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get(url, { params: { trade_no }, headers })
    data && dispatch(createAction<any>(FETCH_BUY_OUT_INFO)({ info: data }))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const submitBuyOut = ({ trade_no }: { trade_no: string }) => async (_: Dispatch<Action>) => {
  const url = 'node-api/account/buy-out/service/pay-buy-out'
  try {
    const headers = getHeaders2()
    const { data } = await axios.post(url, { trade_no }, { headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
    } else {
      if (data.handleType === 'redirect') {
        location.href = data.handleString
      } else {
        await Router.push(`/myaccount/buy-out/service/result?order_no=${trade_no}`)
      }
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const fetchResultInfo = ({ trade_no, req }: { trade_no?: string; req: any }) => async (
  dispatch: Dispatch<Action>,
) => {
  const url = 'node-api/account/buy-out/service/result-info'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get(url, { params: { trade_no }, headers })
    data && dispatch(createAction<any>(FETCH_BUY_OUT_RESULT_INFO)({ info: data }))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
