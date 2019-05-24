import { ErrorReturn } from '../../interfaces/error'
import { CheckReturns } from '../../interfaces/hunanMobile'
import { RouterRequest } from '../../interfaces/router'
import tradeModel from '../../models/trade'
import { BFA_Returns, errorHandler } from '../../utils/tools'

export async function checkWhiteList(req: RouterRequest): Promise<ErrorReturn | CheckReturns> {
  const res = await tradeModel.checkWhiteList<CheckReturns>(req)
  return BFA_Returns(res)
}

export async function getRecommendPhone(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await tradeModel.getRecommendPhone<any>(req)
  if (res.data && res.status === 101) {
    return res.data.phone
  }
  return errorHandler(res)
}

export async function lockPhone(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await tradeModel.lockPhone<any>(req)
  return res
}

export async function searchPhone(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await tradeModel.searchPhone<any>(req)
  if (res.status === 101 && res.data) {
    return res.data.phone
  }
  return errorHandler(res)
}
