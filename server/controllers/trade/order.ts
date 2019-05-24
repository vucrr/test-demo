import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import model from '../../models/trade'
import { isDev, isProd } from '../../utils/config'
import { BFA_Returns, errorHandler, renderSteps } from '../../utils/tools'

export async function getConfirmInfo(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.getPlaceOrderDetail(req)
  return BFA_Returns(res)
}
// 偏远地区
export async function getConfirmRemote(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.getConfirmRemote(req)
  return BFA_Returns(res)
}

export async function getConfirmReplace(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.getConfirmReplace(req)
  return BFA_Returns(res)
}

export async function ceateTrade(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.ceateTrade(req)
  return BFA_Returns(res)
}

export async function getPayDetail(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.getPayDetail(req)
  return BFA_Returns(res)
}

export async function createStrategyPay(req: RouterRequest): Promise<any | ErrorReturn> {
  if (!isProd && !isDev) {
    console.log('createStrategyPay-req', req.body)
  }
  const res = await model.createStrategyPay(req)
  if (!isProd && !isDev) {
    console.log('createStrategyPay-res', res)
  }
  return BFA_Returns(res)
}

export async function getPayResult(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.getPayResult(req)
  if (res && res.code === 200) {
    let { replacement_info }: any = res.data
    const { pay_result }: any = res.data
    if (pay_result === 6) {
      const copyWrite = replacement_info.copy_write.map((item: any, index: any) => renderSteps(item, index))
      replacement_info = { ...replacement_info, copy_write: copyWrite }
    }
    return { ...res.data, replacement_info }
  }
  return errorHandler(res)
}
