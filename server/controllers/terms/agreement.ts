import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import { AgreementRequest } from '../../interfaces/terms'
import terms from '../../models/terms'
import { BFA_Returns } from '../../utils/tools'

export async function getAgreement(req: RouterRequest): Promise<ErrorReturn | AgreementRequest> {
  const res = await terms.getAgreement<AgreementRequest>(req)
  return BFA_Returns(res)
}

export async function getElecontract(req: RouterRequest): Promise<ErrorReturn | AgreementRequest> {
  const res = await terms.getElecontract<AgreementRequest>(req)
  return BFA_Returns(res)
}
