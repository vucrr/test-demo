import { PayReturns, ReturnPlanReturns } from '../../../interfaces/account/service/returnPlan'
import { ErrorReturn } from '../../../interfaces/error'
import { RouterRequest } from '../../../interfaces/router'
import model from '../../../models/service'
import { BFA_Returns } from '../../../utils/tools'

export async function getContractPlanList(req: RouterRequest): Promise<ErrorReturn | ReturnPlanReturns> {
  const res = await model.getContractPlanList<ReturnPlanReturns>(req)
  return BFA_Returns(res)
}

export async function pay(req: RouterRequest) {
  const res = await model.pay<PayReturns>(req)
  return BFA_Returns(res)
}
