import { getHeaders2 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import { TrackEventTradeDev } from 'configs/trackEventLabels'
import {
  FETCH_ORDER_REPLACE_CHECK_CONDITION,
  FETCH_ORDER_REPLACE_REMOTE,
  FETCH_ORDER_REPLACE_STATUS,
  FETCH_TRADE_ORDER_CONFIRM_INFO,
} from 'constant/index'
import { Query } from 'containers/MyTrade/Order/Confirm'
import cookies from 'js-cookie'
import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'
import { trackClickEvent } from 'utils/piwik'
import { cleanUserInfo } from 'utils/tools'

export const fetchInfo = ({
  contract_product_id,
  vas_id,
  store_code,
  trade_type,
  old_trade_no,
  req,
}: Query & { store_code?: string; req: any }) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/order/confirm/info'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get(url, {
      params: { contract_product_id, vas_id, store_code, trade_type, old_trade_no },
      headers,
    })
    if (data) {
      dispatch(createAction<any>(FETCH_TRADE_ORDER_CONFIRM_INFO)({ info: data }))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
export const fetchExchange = (body: any, req: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/order/confirm/replace'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.post(url, body, { headers })
    if (data) {
      dispatch(createAction<any>(FETCH_ORDER_REPLACE_STATUS)(data))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
// 偏远地区
export const getConfirmRemote = () => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/order/confirm/remote'
  const headers = getHeaders2()
  try {
    const { data } = await axios.get<any>(url, { headers })
    if (data) {
      dispatch(createAction<any>(FETCH_ORDER_REPLACE_REMOTE)(data))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
// 确认换机订单页面 检查下单前置条件
export const getCheckTradeCondition = () => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/order/confirm/checkTradeCondition'
  const headers = getHeaders2()
  try {
    const { data } = await axios.get<any>(url, { headers })
    if (data) {
      dispatch(createAction<any>(FETCH_ORDER_REPLACE_CHECK_CONDITION)(data))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
export const ceateTrade = (query: Query) => async (_: Dispatch<Action>, getState: Function) => {
  const url = 'node-api/trade/order/confirm/ceateTrade'
  const headers = getHeaders2()
  try {
    trackClickEvent({ category: TrackEventTradeDev.Submission.Name, label: TrackEventTradeDev.Submission.Item })
    const info = getState().getIn(['myTrade', 'order', 'confirm', 'info'])
    const coopNo = info
      .get('coupon_info')
      .map((item: any) => item.get('coupon_no'))
      .join(',')
    const storeCode = cookies.get('store_code')
    const phoneNumber = cookies.get('phone_number')
    const vasParams = phoneNumber ? { vas_params: JSON.stringify({ phone_number: JSON.parse(phoneNumber) }) } : null
    const params = {
      ...query,
      coop_no: coopNo,
      // 发货方式（1、系统发货 2、第三方线下发货 3、第三方线上发货）
      delivery_type: storeCode ? 2 : 1,
      store_code: storeCode,
      ...vasParams,
    }
    const { data } = await axios.post(url, params, { headers })
    if (data && data.errorMsg) {
      Toast.info(data.errorMsg, 3, () => {
        // 清理用户登录信息的cookies， 解决账号合并引起的订单bug
        if (data.code === 501) {
          cleanUserInfo()
        }
      })
    } else if (data && data.trade_no) {
      cookies.remove('phone_number')
      trackClickEvent({
        category: TrackEventTradeDev.SubmissionSuccess.Name,
        label: TrackEventTradeDev.SubmissionSuccess.Item,
      })
      await Router.push(`/mytrade/order/pay?trade_no=${data.trade_no}`)
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
