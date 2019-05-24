import { getHeaders2 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import {
  FETCH_EXCHANGE_RETURN_INFO,
  FETCH_EXCHANGE_STORE_INFO,
  SAVE_EXCHANGE_RETURN_INFO,
  SAVE_EXCHANGE_TAB_SHOW,
} from 'constant/index'
import { GetReturnInfo, GetStore, SaveCreate } from 'interfaces/exchange'
import cookies from 'js-cookie'
import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'
import { createStrategyPay } from '../order/pay'
// import { ClientRequest } from 'interfaces/router'

export const fetchReplaceReturn = ({ query, req }: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/exchange/getReturn'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.post(url, { ...query }, { headers })
    if (data) {
      dispatch(createAction<GetReturnInfo>(FETCH_EXCHANGE_RETURN_INFO)(data))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
export const saveTab = ({ query }: any) => async (dispatch: Dispatch<Action>) => {
  const tab = query.tab
  return tab && dispatch(createAction(SAVE_EXCHANGE_TAB_SHOW)(tab)).payload
}
export const FetchStore = ({ query }: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/exchange/store'
  const headers = getHeaders2()
  try {
    const res = await axios.get<GetStore>(url, { params: query, headers })
    return res && dispatch(createAction(FETCH_EXCHANGE_STORE_INFO)(res)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const saveReplaceReturn = ({ query }: any) => async (dispatch: Dispatch<any>) => {
  const url = 'node-api/trade/exchange/saveReturn'
  const headers = getHeaders2()
  try {
    const phoneNumber = cookies.get('phone_number')
    const vasParams = phoneNumber ? { vas_params: JSON.stringify({ phone_number: JSON.parse(phoneNumber) }) } : null
    const { data } = await axios.post(url, { ...query, ...vasParams }, { headers })
    if (data) {
      if (data.errorMsg) {
        Toast.info(data.errorMsg)
      } else if (data.replacment_trade_no) {
        // 选号去除
        cookies.remove('phone_number')
        // operation_type 1、调策略支付接口 , 2、去担保方式页面，， 3、调策略支付接口直接完成
        if (data.operation_type === 2) {
          const url = `/mytrade/order/pay?trade_no=${data.replacment_trade_no}`
          await Router.push(url)
        } else {
          dispatch(
            createStrategyPay({
              trade_no: data.replacment_trade_no,
              pis_code: data.pis_code,
            }),
          )
        }
      }
      dispatch(createAction<SaveCreate>(SAVE_EXCHANGE_RETURN_INFO)(data))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
