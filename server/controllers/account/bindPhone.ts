import { RouterRequest } from '../../interfaces/router'
import accountModel from '../../models/account'
import { BFA_Returns } from '../../utils/tools'

interface OperateType {
  operate_type: 'bind_success' | 'same_account' | 'not_support_account_merge' | 'mes_code_outtime' | 'mes_code_error'
  user_id: string
  user_token: string
}

export async function bindPhone(req: RouterRequest) {
  const res = await accountModel.bindPhone<OperateType>(req)
  return BFA_Returns(res)
}

export async function validateUser(req: RouterRequest) {
  let promise
  const openType = req.query.open_type
  if (['weixin', 'huanbei'].includes(openType)) {
    promise = accountModel.verifyAndBindPhone1<OperateType>(req)
  } else {
    // 这里可能没有 open_id 和 open_type 情况是在个人中心 change-phone 进入 bind/change-phone 页面
    promise = accountModel.verifyAndBindPhone2<OperateType>(req)
  }
  const res = await promise
  return BFA_Returns(res)
}

export async function getAlipayBindInfo(req: RouterRequest) {
  const res = await accountModel.getAlipayBindInfo<any>(req)
  return BFA_Returns(res)
}
