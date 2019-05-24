import { Request, Response, Router } from 'express'
import qs from 'querystring'
import { createStrategyPay } from '../../controllers/trade/order'
import config from '../../utils/config'
import Resource from '../../utils/resource'
import { ErrorLog, delayHandle } from '../../utils/tools'

const router = Router()

interface CreateStrategyPayParams {
  trade_no: string
  pis_code?: string
  pay_no?: string
  type?: string
  zhima_unique_no?: string
  check_flow?: string
  return_url?: string
}

function isApp(req: Request) {
  const channelId = +req.cookies.channelId
  const ua = req.useragent!.source
  return /enjoyChanging/.test(ua) || channelId === 19 || channelId === 22
}

function redirectApp(query: CreateStrategyPayParams, res: Response) {
  // 唤起APP处理app的策略支付
  const { type, check_flow, ...appParams } = query
  res.redirect(`enjoychanging://https://xhj.aihuishou.com/strategyPay/riskControlFlow?${qs.stringify(appParams)}`)
  res.end()
}

router.get('/createStrategyPay', async function(req, res) {
  // 构造 headers
  req.headers = Resource.buildHeaders(req, true)
  const params: CreateStrategyPayParams = (req.body = req.query)
  if (!req.body.return_url) {
    req.body.return_url = `${config.host}mytrade/order/pay?trade_no=${req.query.trade_no}&pis_code=${req.query
      .pis_code || ''}`
  }
  const { check_flow, return_url, ...query } = req.query
  const data = await createStrategyPay(req)
  if (data.errorMsg) {
    ErrorLog(data)
    res.send(data)
    res.end()
  } else {
    await delayHandle(data.handle_delay_time)
    if (['redirect', 'load_redirect'].includes(data.handle_type)) {
      if (
        ['XhjRiskResultTrait', 'XhjRiskResultPageTrait', 'XhjChangPhoneResultTrait'].includes(data.handle_code) ||
        // 接挖财，如果code 等于 XhjRiskResultV2Trait 且没有 handle_string的时候，去评估结果页
        // code 等于 XhjRiskResultV2Trait 且有 handle_string 的时候跳handle_string
        (data.handle_code === 'XhjRiskResultV2Trait' && !data.handle_string)
      ) {
        if (isApp(req)) {
          redirectApp(params, res)
        } else {
          // 去评估结果页
          res.redirect(`/mytrade/assess/result?${qs.stringify(query)}`)
        }
      } else if (data.handle_code === 'StepSuccess') {
        // 流程结束，处理成功
        res.redirect(`/mytrade/order/result?trade_no=${params.trade_no}`)
      } else if (data.handle_code === 'AuthAffirmPageTrait') {
        if (isApp(req)) {
          redirectApp(params, res)
        } else {
          // 去授权结果
          res.redirect(`/mytrade/funds-union/confirm?${qs.stringify(query)}`)
        }
      } else {
        res.redirect(data.handle_string)
      }
    } else {
      ErrorLog(`/node-forward/trade/createStrategyPay 返回的handle_type有误：${data.handle_type}`)
    }
  }
})

export default router
