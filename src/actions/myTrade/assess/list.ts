import { getHeaders2 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import { FETCH_TRADE_ASSESS_LIST_INFO } from 'constant/index'
import { Query } from 'containers/MyTrade/Assess/List'
import { ErrorReturn } from 'interfaces/error'
import { FinishCreditEntryReturns, GetCreditEntrydata } from 'interfaces/mytrade/assess/list'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { isIOS } from 'utils/app'
import { axios, tools } from 'utils/index'
import { createStrategyPay } from '../order/pay'

const receiveInfo = createAction<GetCreditEntrydata>(FETCH_TRADE_ASSESS_LIST_INFO)

export const getCreditEntrydata = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/creditevaluation'
  // const url = 'mock/mytrade/assess/list'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<GetCreditEntrydata>(url, { params: query, headers })
    data && dispatch(receiveInfo(data))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export interface SendGPSFlowParams {
  longitude: number
  latitude: number
}

export const sendGPSFlow = (params: SendGPSFlowParams) => async (_: Dispatch<Action>) => {
  const url = 'node-api/trade/assess/gpsFlow'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post<any>(
      url,
      {
        longitude: params.longitude,
        latitude: params.latitude,
        is_agree: 1,
        os: isIOS() ? 'ios' : 'android',
      },
      { headers },
    )
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
    } else {
      window.location.reload()
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export interface SendtongdunParam {
  blackBox: string
  platform: number
}

export const sendTongDun = (params: SendtongdunParam) => async (_: Dispatch<Action>) => {
  const url = 'node-api/trade/assess/tongDunData'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post<any>(url, params, { headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const SendEmergencyContact = (params: any) => async (_: Dispatch<Action>) => {
  const url = 'node-api/trade/assess/emergencyContact'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post<any>(
      url,
      {
        address: params.address,
      },
      { headers },
    )
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const finishCreditEntrydata = (params: Query) => async (dispatch: any) => {
  const url = 'node-api/trade/assess/finishCreditEntrydata'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post<FinishCreditEntryReturns & ErrorReturn>(url, params, { headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
    } else if (data.is_finish) {
      await dispatch(createStrategyPay(params))
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
