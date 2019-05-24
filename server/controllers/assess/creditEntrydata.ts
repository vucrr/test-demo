import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import assessModel from '../../models/assess'
import { BFA_Returns } from '../../utils/tools'

export async function receiveCreditEntryData(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await assessModel.receiveCreditEntryData(req)
  return BFA_Returns(res)
}
