import { CancelResultReturns, CancelReturns } from '../../../interfaces/account/service/cancel'
import { ErrorReturn } from '../../../interfaces/error'
import { RouterRequest } from '../../../interfaces/router'
import model from '../../../models/service'
import { BFA_Returns } from '../../../utils/tools'

export async function getInfo(req: RouterRequest): Promise<ErrorReturn | CancelReturns> {
  const res = await model.getCancelDetail<CancelReturns>(req)
  return BFA_Returns(res)
}

export async function submit(req: RouterRequest): Promise<void | ErrorReturn | any> {
  const res = await model.cancelContract(req)
  return BFA_Returns(res)
}

export async function getResultInfo(req: RouterRequest): Promise<ErrorReturn | CancelResultReturns> {
  const res = await model.getCancelResult<CancelResultReturns>(req)
  return BFA_Returns(res)
}
