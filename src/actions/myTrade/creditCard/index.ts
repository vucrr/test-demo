import { getHeaders2 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import {
  FETCH_CREDIT_COOKIE,
  FETCH_CREDIT_CREATE_CUP,
  FETCH_CREDIT_CREATE_QUERY,
  FETCH_CREDIT_PAY_INFO,
  FETCH_CREDIT_SMS,
} from 'constant/index'
import { UnionPayFormReturn } from 'interfaces/unionPay'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'
import { delayHandle } from 'utils/tools'
import { createStrategyPay } from '../order/pay'

// 获取用户姓名和身份证
export const fetchCreditForm = ({ req }: { req: any }) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/unionPay/form'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<UnionPayFormReturn>(url, { headers })
    return data && dispatch(createAction<any>(FETCH_CREDIT_PAY_INFO)(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 发送短信

export const fetchCreditSms = ({ query, req }: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/creditCard/sms'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.post(url, { ...query }, { headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
    } else {
      return data && dispatch(createAction<any>(FETCH_CREDIT_SMS)(data)).payload
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
// 数据暂存
export const saveCreditCookie = (res: any) => async (dispatch: Dispatch<Action>) => {
  return res && dispatch(createAction<any>(FETCH_CREDIT_COOKIE)(res)).payload
}

// 冻结查询接口
let queryTimes = 0
export const fetchCreditQuery = ({ req, query }: any) => async (dispatch: Dispatch<any>) => {
  const url = 'node-api/trade/creditCard/query'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.post<any>(url, { ...query }, { headers })
    // 0000办理成功 | 1000办理中 | 9999数据有误
    if (data.res_code === '1000' && queryTimes < 5) {
      queryTimes += 1
      await delayHandle(2)
      return dispatch(fetchCreditQuery({ query }))
    } else {
      dispatch(
        createStrategyPay({
          trade_no: query.trade_no,
          pay_no: query.pay_no,
          type: query.type,
          pis_code: query.pis_code,
        }),
      )
      return data && dispatch(createAction<any>(FETCH_CREDIT_CREATE_QUERY)(data)).payload
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 创建冻结订单接口
export const fetchCreditCup = ({ query, req }: any) => async (dispatch: Dispatch<any>) => {
  const url = 'node-api/trade/creditCard'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.post(url, { ...query }, { headers })
    // 办理成功 | 办理中 | 数据有误 | 订单已关闭 | 订单不满足担保方式
    if (data.res_code === '0000' || data.res_code === '9999') {
      dispatch(
        createStrategyPay({
          trade_no: query.trade_no,
          pay_no: query.pay_no,
          type: query.type,
          pis_code: query.pis_code,
        }),
      )
      return data && dispatch(createAction<any>(FETCH_CREDIT_CREATE_CUP)(data)).payload
    } else if (data.res_code === '1000') {
      return dispatch(
        fetchCreditQuery({
          query: {
            bill_no: data.bill_no,
            trade_no: query.trade_no,
            pay_no: query.pay_no,
            type: query.type,
            pis_code: query.pis_code,
          },
        }),
      )
    } else {
      return data && dispatch(createAction<any>(FETCH_CREDIT_CREATE_CUP)(data)).payload
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
