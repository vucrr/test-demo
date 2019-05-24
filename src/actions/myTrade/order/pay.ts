import { getHeaders2 } from 'actions/actionHelper'
import { Modal, Toast } from 'antd-mobile'
import { TrackEventRiskFlowStep, TrackEventTradeDev } from 'configs/trackEventLabels'
import { FETCH_TRADE_ORDER_PAY_INFO } from 'constant/index'
import { Query } from 'containers/MyTrade/Order/Pay'
import Router from 'next/router'
import qs from 'querystring'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'
import { AlipayTradePay, AlipayTradePayCode } from 'utils/JSBridge'
import { isApp } from 'utils/app'
import cookies from 'utils/cookies'
import { trackClickEvent } from 'utils/piwik'
import { delayHandle } from 'utils/tools'

export const fetchInfo = ({ trade_no, pis_code, onChange, req }: Query & { onChange?: any; req: any }) => async (
  dispatch: Dispatch<Action>,
) => {
  const url = 'node-api/trade/order/pay/info'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get(url, { params: { trade_no, pis_code }, headers })
    if (data) {
      // 切换担保方式报错处理
      if (onChange && data.errorMsg) {
        Toast.info(data.errorMsg)
        return
      }
      dispatch(createAction<any>(FETCH_TRADE_ORDER_PAY_INFO)({ info: data }))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export interface CreateStrategyPayParams {
  trade_no: string
  pis_code?: string
  pay_no?: string
  type?: string
  zhima_unique_no?: string
  check_flow?: string
  return_url?: string
}

function redirectApp(params: CreateStrategyPayParams) {
  // 唤起APP处理app的策略支付 type 信用卡
  const { check_flow, return_url, ...appParams } = params
  location.href = `enjoychanging://https://xhj.aihuishou.com/strategyPay/riskControlFlow?${qs.stringify(appParams)}`
}

const showHuaBeiAlert = () => {
  trackClickEvent({ category: TrackEventTradeDev.Frame.Name, label: TrackEventTradeDev.Frame.Item })
  // 一元租活动特殊处理，后期可移除
  if (cookies.get('channelId') === '49') {
    Modal.alert(
      '',
      '您当前的花呗额度不足，换个机型试试吧！',
      [
        {
          text: '查看其它机型',
          onPress: () => {
            location.href =
              'https://m.xianghuanji.com/legoactivity/index?page_id=41&utm_source=one_price_rent&utm_medium=sms&utm_campaign=yiyuan'
          },
        },
      ],
      'android',
    )
    return
  }
  Modal.alert(
    '花呗额度不足？',
    '您可以信用评估获得额度，额度可抵押金',
    [
      {
        text: '更换担保方式',
        onPress: () => {
          trackClickEvent({
            category: TrackEventTradeDev.GuaranteeMode.Name,
            label: TrackEventTradeDev.GuaranteeMode.Item,
          })
        },
      },
    ],
    'android',
  )
}

export const createStrategyPay = (params: CreateStrategyPayParams) => async (dispatch: any) => {
  // https://www.showdoc.cc/tradeApi?page_id=1104156748297844
  const url = 'node-api/trade/order/pay/createStrategyPay'
  const headers = getHeaders2()
  try {
    if (isApp()) {
      redirectApp(params)
      return
    }
    const { data } = await axios.post(url, params, { headers })
    if (data) {
      if (data.errorMsg) {
        Toast.info(data.errorMsg)
      } else {
        // 策略支付接口，增加出参handle_delay_time(单位s)，延时请求去等待后端处理
        await delayHandle(data.handle_delay_time)
        if (['redirect', 'load_redirect'].includes(data.handle_type)) {
          const { check_flow, return_url, ...query } = params
          if (
            ['XhjRiskResultTrait', 'XhjRiskResultPageTrait', 'XhjChangPhoneResultTrait'].includes(data.handle_code) ||
            // 接挖财，如果code 等于 XhjRiskResultV2Trait 且没有 handle_string的时候，去评估结果页
            // code 等于 XhjRiskResultV2Trait 且有 handle_string 的时候跳handle_string
            (data.handle_code === 'XhjRiskResultV2Trait' && !data.handle_string)
          ) {
            // 添加经过风控路径的完结事件发送，用于风控统计
            if (params.type === 'XhjRiskStepTrait') {
              trackClickEvent(TrackEventRiskFlowStep.RiskEvaluatedEnd)
            }
            if (isApp()) {
              redirectApp(params)
            } else {
              // 去评估结果页
              await Router.replace(`/mytrade/assess/result?${qs.stringify(query)}`)
            }
          } else if (data.handle_code === 'StepSuccess') {
            // 流程结束，处理成功
            if (isApp()) {
              redirectApp(params)
            } else {
              await Router.push(`/mytrade/order/result?trade_no=${params.trade_no}`)
            }
          } else if (data.handle_code === 'AuthAffirmPageTrait') {
            if (isApp()) {
              redirectApp(params)
            } else {
              // 去授权结果
              await Router.push(`/mytrade/funds-union/confirm?${qs.stringify(query)}`)
            }
          } else if (data.handle_code === 'WithHoldPageTrait') {
            // 去租金代扣方式
            await Router.push(`/mytrade/withholding/select-type?${qs.stringify(query)}`)
          } else {
            if (data.handle_string === '') {
              tools.ErrorLog('策略支付接口返回出错，跳转链接不能为空！')
            } else {
              location.href = data.handle_string
            }
          }
        } else if (data.handle_type === 'js_bridge') {
          // 唤起支付宝收银台
          const { code } = await AlipayTradePay({ orderStr: data.handle_string })
          if (code === AlipayTradePayCode.success) {
            // 支付成功后需要继续调用createStrategyPay
            await dispatch(createStrategyPay(params))
            // 支付失败时，花呗预授权支付方式需要弹框提醒花呗额度不足
          } else if (params.pis_code === 'pis52') {
            showHuaBeiAlert()
          }
        }
      }
    }
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
