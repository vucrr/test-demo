import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import model from '../../models/autoRent'
import config from '../../utils/config'
import { BFA_Returns, errorHandler } from '../../utils/tools'

export async function getInfo(req: RouterRequest): Promise<any> {
  const res = await model.getInfo(req)
  return BFA_Returns(res)
}

export async function openAutoRent(req: RouterRequest): Promise<void | ErrorReturn | any> {
  const res = await model.openAutoRent(req)
  return BFA_Returns(res)
}

export async function userSign(req: RouterRequest): Promise<void | ErrorReturn | any> {
  req.body = {
    withhold_return_url: encodeURIComponent(
      req.headers.origin + '/myaccount/auto-rent?trade_no=' + req.body.trade_no + '&userSign=1',
    ),
    withhold_notify_url: encodeURIComponent(req.headers.origin + '/payf/notify'),
    // withhold_notify_url: encodeURIComponent('http://test7.easeua.t.xianghuanji.com/' + '/payf/notify'),
    type: 'ALIPAYAPP',
    withhold_type: 2,
  }
  const res = await model.userSign<string>(req)
  if (res && res.status === 101) {
    return { url: decodeURIComponent(res.data) }
  }
  return errorHandler(res)
}

export async function checkAndUserSign(req: RouterRequest): Promise<void | ErrorReturn | any> {
  const res = await model.checkSign(req)
  if (res && res.status === 101) {
    // 如果已经签了代扣了，直接前端冻结
    if (req.body.only_check || res.data) {
      return {
        hasSign: res.data,
      }
    } else {
      req.body = {
        withhold_return_url: encodeURIComponent(
          req.headers.origin + '/myaccount/auto-rent?trade_no=' + req.body.trade_no + '&userSign=1',
        ),
        withhold_notify_url: encodeURIComponent(req.headers.origin + '/payf/notify'),
        // withhold_notify_url: encodeURIComponent('http://test7.easeua.t.xianghuanji.com/' + '/payf/notify'),
        type: 'ALIPAYAPP',
        withhold_type: 2,
      }
      const res2 = await model.userSign<string>(req)
      if (res2 && res2.status === 101) {
        return { url: decodeURIComponent(res2.data) }
      }
      return errorHandler(res2)
    }
  }
  return errorHandler(res)
}

export async function frozenAutoRent(req: RouterRequest): Promise<void | ErrorReturn | any> {
  req.body = {
    trade_no: req.body.trade_no,
    platform: 'alipay',
    page_redirect_url: encodeURIComponent(req.headers.origin + '/myaccount/auto-rent?trade_no=' + req.body.trade_no),
    page_notify_url: encodeURIComponent(config.host + '/assurancenotify/auto_rent_notify'),
    pay_service_notify_url: encodeURIComponent(config.host + '/payservice/notify'),
    pay_service_return_url: encodeURIComponent(config.host + '/payservice/success'),
  }
  const res = await model.frozenAutoRent(req)
  return BFA_Returns(res)
}
