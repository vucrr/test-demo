import { GuideReturns, ResultStatusReturns, VerifyEmailReturns } from '../../../interfaces/enterprise/apply'
import { RouterRequest } from '../../../interfaces/router'
import enterpriseModel from '../../../models/enterprise'
import { BFA_Returns } from '../../../utils/tools'

export async function privileges(req: RouterRequest): Promise<GuideReturns> {
  const res = await enterpriseModel.privileges<GuideReturns>(req)
  return BFA_Returns(res)
}

export async function resultStatus(req: RouterRequest): Promise<ResultStatusReturns> {
  const res = await enterpriseModel.resultStatus<ResultStatusReturns>(req)
  return BFA_Returns(res)
}

export async function verifyEmail(req: RouterRequest): Promise<VerifyEmailReturns> {
  const res = await enterpriseModel.verifyEmail<VerifyEmailReturns>(req)
  return BFA_Returns(res)
}

export async function submitBind(req: RouterRequest): Promise<{}> {
  const res = await enterpriseModel.submitBind<{}>(req)
  return BFA_Returns(res)
}
