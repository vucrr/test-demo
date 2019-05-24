import { ServiceTerms } from '../../interfaces/account/termslist'
import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import terms from '../../models/terms'
import { BFA_Returns, errorHandler } from '../../utils/tools'

export async function getServiceAgreement(req: RouterRequest): Promise<ErrorReturn | ServiceTerms> {
  const res = await terms.getServiceAgreement<ServiceTerms>(req)
  if (res.status === 101) {
    return res.data
  }
  return errorHandler(res)
}

export async function getLBFAgreement(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await terms.getLBFAgreement<any>(req)

  return BFA_Returns(res)
}
