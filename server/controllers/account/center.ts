import { MyCenterReturns } from '../../interfaces/account/center'
import { CenterReturns, CenterReturnsAll } from '../../interfaces/center'
import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import accountModel from '../../models/account'
import { authHandler, checkLogin, errorHandler, renderCenterProduct, renderProduct } from '../../utils/tools'

export async function getCenter(req: RouterRequest): Promise<ErrorReturn | CenterReturns> {
  if (checkLogin(req)) {
    const res = await accountModel.getCenter<CenterReturnsAll>(req)
    if (res && res.status === 0) {
      const { userInfo, tradeCount, mpActivityInfo } = res.data
      const {
        phone,
        user_balance,
        coupon_list_count,
        rent_list_count,
        pending_list_count,
        show_credit_entry,
      } = userInfo
      const { unpay_count } = tradeCount
      return {
        userInfo: { phone, user_balance, coupon_list_count, show_credit_entry },
        tradeCount: { rent_list_count, pending_list_count, unpay_count },
        mpActivityInfo: mpActivityInfo.map(item => {
          return item.map(renderCenterProduct)
        }),
      }
    } else if (res && res.status === 2) {
      return errorHandler({
        status: 301,
        msg: '支付宝新用户，未绑定手机号',
      })
    }
    return errorHandler(res)
  }
  // 调试日志，后期可移除
  console.log(
    `[checkLogin2]:${req.headers['user-agent']} && ${req.headers.cookie} && ${JSON.stringify(req.cookies || '')}`,
  )
  return authHandler()
}

export async function getInfo(req: RouterRequest): Promise<MyCenterReturns | ErrorReturn> {
  const res = await accountModel.getNewCenter<any>(req)
  if (res && res.code === 200) {
    res.data.recommend.list = res.data.recommend.list.map((item: any) => item.map(renderProduct))
    return res.data
  }
  return errorHandler(res)
}
