import { ErrorReturn } from '../../../interfaces/error'
import {
  ReturnCostReturns,
  ReturnFlowReturns,
  ReturnSuccessReturns,
  SaveReturnflowPayReturns,
} from '../../../interfaces/returnflow'
import { RouterRequest } from '../../../interfaces/router'
import accountResource from '../../../models/account'
import { BFA_Returns, errorHandler } from '../../../utils/tools'

export async function getCost(req: RouterRequest): Promise<ErrorReturn | ReturnCostReturns> {
  const res = await accountResource.getCost<ReturnCostReturns>(req)
  return BFA_Returns(res)
}

export async function getOrderDetail(req: RouterRequest): Promise<ErrorReturn | ReturnFlowReturns> {
  const res = await accountResource.getOrderDetail<ReturnFlowReturns>(req)
  return BFA_Returns(res)
}

export async function getResults(req: RouterRequest): Promise<ErrorReturn | ReturnSuccessReturns> {
  const res = await accountResource.getResults<ReturnSuccessReturns>(req)
  return BFA_Returns(res)
}

export async function getSavePayInfo(req: RouterRequest): Promise<ErrorReturn | string> {
  const res = await accountResource.getSavePayInfo<SaveReturnflowPayReturns>(req)
  if (res.status === 101) {
    const { alipay_params } = res.data
    return alipay_params
  }
  return errorHandler(res)
}
