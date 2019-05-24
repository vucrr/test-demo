import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import { ExtraInfoReturn } from '../../interfaces/trade'
import TradeResource from '../../models/trade'
import { BFA_Returns } from '../../utils/tools'

export async function extraInfo(req: RouterRequest): Promise<ErrorReturn | ExtraInfoReturn> {
  const res = await TradeResource.extraInfo<ExtraInfoReturn>(req)
  return BFA_Returns(res)
}
