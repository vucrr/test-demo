import { CouponInfo } from '../../interfaces/activitys/couponInfo'
import { ExchangeCouponReturns } from '../../interfaces/activitys/exchangeCoupon'
import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import activitysResource from '../../models/activitys'
import { BFA_Returns } from '../../utils/tools'

export async function exchangeCoupon(req: RouterRequest): Promise<ErrorReturn | ExchangeCouponReturns> {
  const res = await activitysResource.exchangeCoupon<ExchangeCouponReturns>(req)
  return BFA_Returns(res)
}

export async function getCouponInfo(req: RouterRequest): Promise<ErrorReturn | CouponInfo> {
  const res = await activitysResource.getCouponInfo<CouponInfo>(req)
  return BFA_Returns(res)
}
