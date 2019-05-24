import { PickNumber } from '../../../interfaces/enterprise/mytrade/pickNumber'
import { ErrorReturn } from '../../../interfaces/error'
import { RouterRequest } from '../../../interfaces/router'
import enterPriseResource from '../../../models/enterprise'
import { BFA_Returns } from '../../../utils/tools'

export async function getPickNumber(req: RouterRequest): Promise<ErrorReturn | PickNumber> {
  const res = await enterPriseResource.getPickNumber<PickNumber>(req)
  return BFA_Returns(res)
}

export async function searchPhone(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await enterPriseResource.searchPhone<any>(req)
  return BFA_Returns(res)
}

export async function lockPhone(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await enterPriseResource.lockPhone<any>(req)
  return BFA_Returns(res)
}

export async function unlockPhone(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await enterPriseResource.unlockPhone<any>(req)
  return BFA_Returns(res)
}
