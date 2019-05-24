import { ServiceDetail } from '../../../interfaces/account/service/detail'
import { ErrorReturn } from '../../../interfaces/error'
import { RouterRequest } from '../../../interfaces/router'
import model from '../../../models/service'
import { BFA_Returns } from '../../../utils/tools'

export async function getServiceDetail(req: RouterRequest): Promise<ServiceDetail | ErrorReturn> {
  const res = await model.getServiceDetail<ServiceDetail>(req)
  return BFA_Returns(res)
}
