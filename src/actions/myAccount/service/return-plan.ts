import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_SERVICE_RETURN_PLAN } from 'constant/index'
import { ReturnPlanReturns } from 'interfaces/account/service/returnPlan'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

const receiveDetailInfo = createAction<ReturnPlanReturns>(FETCH_SERVICE_RETURN_PLAN)

export const fetchReturnPlan = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/service/return-plan'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<ReturnPlanReturns>(url, { params: query, headers })
    return data && dispatch(receiveDetailInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const pay = (redirect: string, planId: string, tradeNo: string) => async (_: Dispatch<Action>) => {
  const url = 'node-api/account/service/return-plan/pay'
  const headers = getHeaders2()
  const body = {
    redirect,
    plan_id: planId,
    trade_no: tradeNo,
  }
  try {
    const { data } = await axios.post<any>(url, body, { headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
