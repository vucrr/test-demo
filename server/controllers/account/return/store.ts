import { ErrorReturn } from '../../../interfaces/error'
import { RouterRequest } from '../../../interfaces/router'
import returnResource from '../../../models/return'
import { BFA_Returns } from '../../../utils/tools'

export async function fetchStoreReturnDetail(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await returnResource.getStoreReturnDetail<any>(req)
  return BFA_Returns(res)
}

export async function applyReturn(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await returnResource.applyReturnByStore<any>(req)
  return BFA_Returns(res)
}

export async function fetchApplyResultByStore(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await returnResource.getApplyResultByStore<any>(req)
  return BFA_Returns(res)
}

export async function cancelApplyByStore(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await returnResource.cancelApplyByStore<any>(req)
  return BFA_Returns(res)
}
