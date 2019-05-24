import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import { UserDataBody, UserDataReturns } from '../../interfaces/trade'
import tradeResource from '../../models/trade'
import { BFA_Returns, errorHandler } from '../../utils/tools'

export async function saveUser(req: RouterRequest): Promise<ErrorReturn | boolean> {
  const res = await tradeResource.saveUser<boolean>(req)
  return BFA_Returns(res)
}

export async function getUser(req: RouterRequest): Promise<ErrorReturn | UserDataReturns> {
  const res = await tradeResource.getUser<UserDataBody>(req)
  if (res.status === 101) {
    return { ...res.data, editable: !res.data.user_name }
  }
  return errorHandler(res)
}
