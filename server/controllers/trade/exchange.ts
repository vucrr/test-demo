import { ErrorReturn } from '../../interfaces/error'
import { GetReturnInfo, GetStore, ReplaceContract, SaveCreate } from '../../interfaces/exchange'
import { RouterRequest } from '../../interfaces/router'
import tradeResource from '../../models/trade'
import { BFA_Returns } from '../../utils/tools'

export async function getReplaceStatus(req: RouterRequest): Promise<ErrorReturn | ReplaceContract> {
  const res = await tradeResource.getReplaceStatus<ReplaceContract>(req)
  return BFA_Returns(res)
}

export async function getReturnInfo(req: RouterRequest): Promise<ErrorReturn | GetReturnInfo> {
  const res = await tradeResource.getReturnInfo<GetReturnInfo>(req)
  return BFA_Returns(res)
}

export async function saveReturnInfo(req: RouterRequest): Promise<ErrorReturn | SaveCreate> {
  const res = await tradeResource.saveReturnInfo<SaveCreate>(req)
  return BFA_Returns(res)
}

export async function getStoreInfo(req: RouterRequest): Promise<ErrorReturn | GetStore> {
  const res = await tradeResource.getStoreInfo<GetStore>(req)
  return BFA_Returns(res)
}

export async function getCheckTradeCondition(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await tradeResource.getCheckTradeCondition<any>(req)
  return BFA_Returns(res)
}
