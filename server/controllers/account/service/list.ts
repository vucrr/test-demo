import { BUTTON_TYPE } from '../../../../src/constant/common'
import {
  CheckBuyOutStatus,
  CheckReplaceMent,
  CheckReturnStatus,
  ServiceListReturns,
} from '../../../interfaces/account/service/list'
import { ErrorReturn } from '../../../interfaces/error'
import { RouterRequest } from '../../../interfaces/router'
import model from '../../../models/service'
import { BFA_Returns } from '../../../utils/tools'

export async function getList(req: RouterRequest): Promise<ErrorReturn | ServiceListReturns> {
  const res = await model.getServiceList<ServiceListReturns>(req)
  return BFA_Returns(res)
}

export async function checkBtnStatus(
  req: RouterRequest,
): Promise<ErrorReturn | CheckReturnStatus | CheckReplaceMent | CheckBuyOutStatus> {
  const buttonType = +req.query.button_type
  if (buttonType === BUTTON_TYPE.EXCHANGE_DO) {
    const res = await model.checkReplacement<CheckReplaceMent>(req)
    return BFA_Returns(res)
  } else if (buttonType === BUTTON_TYPE.RETUREN_APPLY) {
    const res = await model.checkReturnStatus<CheckReturnStatus>(req)
    return BFA_Returns(res)
  } else if (buttonType === BUTTON_TYPE.BUY_OUT_APPLY) {
    const res = await model.checkBuyOutStatus<CheckBuyOutStatus>(req)
    return BFA_Returns(res)
  }
  return BFA_Returns({ status: 400, code: 400, msg: '未知的按钮状态', data: {} })
}
