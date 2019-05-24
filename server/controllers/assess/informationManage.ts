import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import assessModel from '../../models/assess'
import { BFA_Returns } from '../../utils/tools'

export async function receiveInformationData(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await assessModel.receiveInformationData(req)
  return BFA_Returns(res)
}
