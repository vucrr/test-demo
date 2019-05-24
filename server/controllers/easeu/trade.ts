import querystring from 'querystring'
// import { TradeInfo } from '../../interfaces/easeu'
import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import model from '../../models/easeu'
import config from '../../utils/config'
import { BFA_Returns, errorHandler } from '../../utils/tools'

export enum Step {
  Risk = 'M101001', // 风控评估，直接页面跳转
  HuabeiSign = 'M102001', // 签约代扣，API，跳支付宝页面
  CreditSign = 'M102002', // 签约代扣，API，跳支付宝页面
  createPayQsy = 'N104001', // 花呗订单支付，API，跳支付宝页面
  CreditPay = 'N104002', // 信用卡订单支付，跳转到填写信用卡的页面
}

export async function checkFlow(req: RouterRequest): Promise<void | ErrorReturn | any> {
  if (!req.headers.usertoken || req.headers.channelid !== '41') {
    return errorHandler({
      status: 500,
      msg: '用户信息不合法',
    })
  }
  const flowCode = req.query.flow_code
  const res = await model.checkFlow<any>(req)
  if (res && res.status === 101) {
    // 整个flow流已经走完
    if (res.data.pass === 1) {
      return {
        url: '/easeu/trade/success/' + flowCode,
      }
    }

    const current = res.data.current_node_code
    const rawData = res.data.current_node_need

    if (current === Step.Risk) {
      let pathname = ''
      let query = {}
      // 风控实名
      if (rawData.risk_flow_type === 1) {
        pathname = 'credit/flow'
        query = {
          id_card: rawData.id_card,
          channel: rawData.channel,
          alipay_user_id: rawData.alipay_user_id,
          source: 'qsy',
          callback_url: config.easeuHost + 'easeu/trade/index/' + flowCode,
        }
      }
      // 风控流程
      if (rawData.risk_flow_type === 2) {
        pathname = 'credit/flowstepeuse'
        query = {
          main_flow: rawData.main_flow,
          id_card: rawData.id_card,
          channel: rawData.channel,
          alipay_user_id: rawData.alilpay_user_id,
          callback_url: encodeURIComponent(config.easeuHost + 'easeu/trade/index/' + flowCode),
          channel_id: rawData.channel_id,
          user_data: rawData.user_data,
          identity_phone: rawData.identity_phone,
          login_phone: rawData.login_phone,
        }
      }
      return {
        url: config.riskControlHost + pathname + '?' + querystring.stringify(query),
      }
    }

    const data = res.data
    return {
      statusCode: data.status,
      flowCode: data.flow_code,
      scenario: data.scenario,
      currentCode: data.current_node_code,
      currentNeed: data.current_node_need,
      pass: data.pass,
    }
  }
  return errorHandler(res)
}

export async function getTrade(req: any): Promise<any> {
  const res = await model.getTrade(req)
  return BFA_Returns(res)
}

export async function riskHandle(req: any): Promise<ErrorReturn | any> {
  const res = await model.riskHandle(req)
  return BFA_Returns(res)
}

export async function userSign(req: any): Promise<ErrorReturn | any> {
  req.body = {
    withhold_return_url: encodeURIComponent(config.easeuHost + 'easeu/trade/index/' + req.body.flowCode),
    withhold_notify_url: encodeURIComponent(config.easeuHost + 'payf/notify'),
    type: 'ALIPAYAPP',
    withhold_type: 2,
  }
  const res = await model.userSign<string>(req)
  if (res && res.status === 101) {
    return { url: decodeURIComponent(res.data) }
  }
  return errorHandler(res)
}

export async function createPayQsy(req: any): Promise<ErrorReturn | any> {
  req.body = {
    flow_code: req.body.flowCode,
    page_notify_url: config.easeuHost + 'trade/notify',
    page_redirect_url: config.easeuHost + 'easeu/trade/success/' + req.body.flowCode,
    notify_url: config.easeuHost + 'pay/handleNotify',
    redirect_url: config.easeuHost + 'pay/handleSuccess',
  }
  const res = await model.createPayQsy(req)
  return BFA_Returns(res)
}

export async function getTradeSuccess(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await model.getTrade(req)
  return BFA_Returns(res)
}
