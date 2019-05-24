import { ErrorReturn } from '../../interfaces/error'
import { FootPrintReturns } from '../../interfaces/footprint'
import { RouterRequest } from '../../interfaces/router'
import accountModel from '../../models/account'
import { errorHandler } from '../../utils/tools'

export async function receiveFootprint(req: RouterRequest): Promise<void | ErrorReturn | FootPrintReturns> {
  const res = await accountModel.receiveFootprint<{ foot_print_info: FootPrintReturns }>(req)
  if (res && res.status === 0) {
    return res.data.foot_print_info
  }
  return errorHandler(res)
}

export async function receiveFootprintList(req: RouterRequest): Promise<void | any> {
  const res = await accountModel.receiveFootprintList(req)
  if (res && res.status === 0) {
    return res.data
  }
  return errorHandler(res)
}
