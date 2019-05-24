import { getHeaders2 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import { FETCH_ORDER_REPLACE_CHECK_CONDITION } from 'constant/index'
import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

// 确认换机订单页面 检查下单前置条件
export const getCheckTradeCondition = ({ query }: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/exchange/checkTradeCondition'
  const headers = getHeaders2()
  try {
    const { data } = await axios.get<any>(url, { headers })
    if (data) {
      if (data.check_result) {
        Toast.info(data.tips.tip_msg)
      } else {
        await Router.push('/mytrade/exchange/return?old_trade_no=' + query.old_trade_no)
      }
      dispatch(createAction<any>(FETCH_ORDER_REPLACE_CHECK_CONDITION)(data))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
