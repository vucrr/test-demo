import { getHeaders2 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import { TrackEventRiskFlowStep } from 'configs/trackEventLabels'
import {
  FETCH_AUTHORIZE_RESULT,
  FETCH_OPT_BILL_NO,
  FETCH_UNION_PAY_INFO,
  FETCH_UNION_PAY_LIST,
  SAVE_FORM_FILEDS,
} from 'constant/index'
import { ErrorReturn } from 'interfaces/error'
import { FundingResultReturns } from 'interfaces/fundsUnion'
import { ConfirmReturns } from 'interfaces/trade/creditcard/cofirm'
import { UnionPayFormReturn, UnionPayListReturn } from 'interfaces/unionPay'
import Router from 'next/router'
import qs from 'querystring'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { isApp } from 'utils/app'
import { axios, tools } from 'utils/index'
import { trackClickEvent } from 'utils/piwik'
import { delayHandle } from 'utils/tools'
import { CreateStrategyPayParams } from '../order/pay'

// 获取银行卡列表
export const fetchCardList = ({ req }: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/unionPay/list'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<UnionPayListReturn>(url, { headers })
    if (data) {
      dispatch(createAction<{ list: UnionPayListReturn }>(FETCH_UNION_PAY_LIST)({ list: data }))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const getBillNo = createAction<{ billNo: string }>(FETCH_OPT_BILL_NO)

// 获取用户姓名和身份证
export const fetchForm = ({ req }: { req: any }) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/unionPay/form'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<UnionPayFormReturn>(url, { headers })
    return data && dispatch(createAction<{ form: UnionPayFormReturn }>(FETCH_UNION_PAY_INFO)({ form: data })).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 获取发短信的 OTP
export const fetchOTP = ({ payNo, idCard, userName, tel, cardNo }: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/fundsUnion/bindOTP'
  const headers = getHeaders2()
  try {
    const { data } = await axios.get<any>(url, { params: { payNo, idCard, userName, tel, cardNo }, headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg, 2)
      return
    }
    return data.OTPBillNo && dispatch(getBillNo(data.OTPBillNo)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 再次发短信的 OTP
export const fetchOTPRePeat = (OTPBillNo: string) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/fundsUnion/bindOTPRepeat'
  const headers = getHeaders2()
  try {
    const { data } = await axios.get<any>(url, { params: { OTPBillNo }, headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg, 2)
      return
    }
    return data.OTPBillNo && dispatch(getBillNo(data.OTPBillNo))
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const saveFormFields = createAction<{ form: UnionPayFormReturn }>(SAVE_FORM_FILEDS)

// 绑卡
export const bindCard = ({ OTPBillNo, verifyCode }: { OTPBillNo: string; verifyCode: string }) => async (
  dispatch: Dispatch<Action>,
  getState: Function,
) => {
  const url = 'node-api/trade/fundsUnion/bindCard'
  const headers = getHeaders2()
  try {
    const { data } = await axios.get<any>(url, { params: { OTPBillNo, verifyCode }, headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg, 2)
      return
    }
    Toast.info('验证通过', 2)
    const form = getState()
      .getIn(['account', 'unionPay', 'form'])
      .toJS()
    dispatch(
      saveFormFields({
        form: {
          ...form,
          cardNo: '',
          tel: '',
          hasSubmit: true,
        },
      }),
    )
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 授权确认
export const fetchAuthorizeResult = (tradeNo: string, req: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/fundsUnion/getAuthorizeResult'
  // const url = '/mock/mytrade/fundsUnion/confirm'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get(url, { params: { trade_no: tradeNo }, headers })
    if (data) {
      dispatch(createAction<ConfirmReturns>(FETCH_AUTHORIZE_RESULT)(data))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 唤起APP处理app的策略支付
function redirectApp(params: CreateStrategyPayParams) {
  const { type, check_flow, ...appParams } = params
  location.href = `enjoychanging://https://xhj.aihuishou.com/strategyPay/riskControlFlow?${qs.stringify(appParams)}`
}

let queryTimes = 0
// 获取资方申请结果
export const fetchFundingResult = (params: CreateStrategyPayParams) => async (dispatch: Dispatch<any>) => {
  // const url = 'node-api/trade/fundsUnion/getFundingResult'
  const url = 'node-api/trade/order/pay/createStrategyPay'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post<FundingResultReturns & ErrorReturn>(url, params, { headers })
    if (data && data.errorMsg) {
      return data
    }
    if (data && data.loading_status === 1) {
      if (['redirect', 'load_redirect'].includes(data.handle_type)) {
        const { check_flow, return_url, ...query } = params
        if (
          ['XhjRiskResultTrait', 'XhjRiskResultPageTrait', 'XhjChangPhoneResultTrait'].includes(data.handle_code) ||
          // 接挖财，如果code 等于 XhjRiskResultV2Trait 且没有 handle_string的时候，去评估结果页
          // code 等于 XhjRiskResultV2Trait 且有 handle_string 的时候跳handle_string
          (data.handle_code === 'XhjRiskResultV2Trait' && !data.handle_string)
        ) {
          // 添加经过风控路径的完结事件发送，用于风控统计
          if (query.type === 'XhjRiskStepTrait') {
            trackClickEvent(TrackEventRiskFlowStep.RiskEvaluatedEnd)
          }
          if (isApp()) {
            redirectApp(params)
          } else {
            // 去评估结果页
            await Router.replace(`/mytrade/assess/result?${qs.stringify(query)}`)
          }
        } else if (data.handle_code === 'AuthAffirmPageTrait') {
          if (isApp()) {
            redirectApp(params)
          } else {
            // 去授权结果
            await Router.push(`/mytrade/funds-union/confirm?${qs.stringify(query)}`)
          }
        } else {
          if (data.handle_string === '') {
            tools.ErrorLog('策略支付接口返回出错，跳转链接不能为空！')
          } else {
            await Router.replace(data.handle_string)
            // 兼容链接跳转
            await delayHandle(2)
            location.href = data.handle_string
          }
        }
      }
    } else if (queryTimes < 5) {
      queryTimes += 1
      await delayHandle(2)
      return dispatch(fetchFundingResult(params))
    } else {
      return { status: 400, errorMsg: '资料认证失败，请重新尝试！' }
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
