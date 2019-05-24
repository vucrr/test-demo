import { getHeaders2 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import { FETCH_SERVICE_CANCEL_INFO, FETCH_SERVICE_CANCEL_RESULT } from 'constant/index'
import { ServiceCancelQuery } from 'containers/MyAccount/Service/Cancel/Index'
import { CancelSuccessQuery } from 'containers/MyAccount/Service/Cancel/Success'
import { CancelResultReturns, CancelReturns } from 'interfaces/account/service/cancel'
import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

export const fetchInfo = ({ contract_no, type }: ServiceCancelQuery, req: any) => async (
  dispatch: Dispatch<Action>,
) => {
  const url = 'node-api/account/service/cancel/info'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<CancelReturns>(url, { params: { contract_no, type }, headers })
    if (data) {
      dispatch(createAction<{ info: CancelReturns }>(FETCH_SERVICE_CANCEL_INFO)({ info: data }))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

interface SubmitCancelProps {
  contract_no: string
  reason_id: string
  reason_dec: string
  type?: string
}

export const submitCancel = ({ type, ...body }: SubmitCancelProps) => async (_: Dispatch) => {
  const url = 'node-api/account/service/cancel/submit'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post(url, body, { headers })
    if (data && data.errorMsg) {
      Toast.info(data.errorMsg)
    } else if (data) {
      await Router.replace(
        `/myaccount/service/cancel/success?trade_no=${data.trade_no}&old_trade_no=${data.old_trade_no}&type=${type}`,
      )
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const fetchResultInfo = ({ trade_no, old_trade_no, type }: CancelSuccessQuery, req: any) => async (
  dispatch: Dispatch<Action>,
) => {
  const url = 'node-api/account/service/cancel/result'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get(url, { params: { trade_no, old_trade_no, type }, headers })
    if (data) {
      dispatch(createAction<{ result: CancelResultReturns }>(FETCH_SERVICE_CANCEL_RESULT)({ result: data }))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
