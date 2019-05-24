import { getHeaders2 } from 'actions/actionHelper'
import { GET_DETAIL_INFO, GET_ORDER_DETAIL_INFO, GET_RESULTS_INFO } from 'constant/index'
import { ReturnCostReturns, ReturnFlowReturns, ReturnSuccessReturns } from 'interfaces/returnflow'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

const receiveCostInfo = createAction<ReturnCostReturns>(GET_DETAIL_INFO)

export const returnFlowCostActions = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/returnflow/cost'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<ReturnCostReturns>(url, { params: query, headers })
    return data && dispatch(receiveCostInfo(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}

const receiveInfo = createAction<ReturnFlowReturns>(GET_ORDER_DETAIL_INFO)

export const returnFlowOrderActions = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/returnflow'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<ReturnFlowReturns>(url, { params: query, headers })
    return data && dispatch(receiveInfo(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}
const receiveResultsInfo = createAction<ReturnSuccessReturns>(GET_RESULTS_INFO)

export const returnResultsActions = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/returnflow/success'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<ReturnSuccessReturns>(url, { params: query, headers })
    return data && dispatch(receiveResultsInfo(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const payReturnFlow = ({ query }: ClientRequest) => async (_: Dispatch) => {
  const url = 'node-api/account/returnflow/savePayInfo'
  const headers = getHeaders2()
  try {
    const { data } = await axios.get<any>(url, { params: query, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
