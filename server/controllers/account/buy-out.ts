import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import model from '../../models/buy-out'
import { BFA_Returns } from '../../utils/tools'

// 轻松用买断逻辑
export async function getInfo(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.getInfo(req)
  return BFA_Returns(res)
}

export async function getResultInfo(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.getResultInfo(req)
  return BFA_Returns(res)
}

export async function payBuyOut(req: RouterRequest): Promise<any | ErrorReturn> {
  req.body = {
    trade_no: req.body.trade_no,
    quit_url: encodeURIComponent(req.headers.origin + '/myaccount/buy-out/result?order_no=' + req.body.trade_no),
    return_url: encodeURIComponent(req.headers.origin + '/myaccount/buy-out/result?order_no=' + req.body.trade_no),
  }

  const res = await model.payBuyOut(req)
  return BFA_Returns(res)
}

// 享换机买断逻辑
export async function getXhjInfo(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.getXhjInfo(req)
  return BFA_Returns(res)
}

export async function getXhjResultInfo(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.getXhjResultInfo(req)
  return BFA_Returns(res)
}

export async function payXhjBuyOut(req: RouterRequest): Promise<any | ErrorReturn> {
  req.body = {
    trade_no: req.body.trade_no,
    // quit_url: encodeURIComponent(req.headers.origin + '/myaccount/service/buy-out/result?order_no=' + req.body.trade_no),
    return_url: encodeURIComponent(
      req.headers.origin + '/myaccount/service/buy-out/result?order_no=' + req.body.trade_no,
    ),
  }
  const res = await model.payXhjBuyOut(req)
  return BFA_Returns(res)
}
