import { ErrorReturn } from '../../interfaces/error'
import { CantonCity, CantonDetail, CantonSelect } from '../../interfaces/guangzhou'
import { RouterRequest } from '../../interfaces/router'
import tradeResource from '../../models/trade'
import { BFA_Returns, errorHandler } from '../../utils/tools'

export async function getStoreCity(req: RouterRequest): Promise<ErrorReturn | CantonCity> {
  const res = await tradeResource.getStoreCity<CantonCity>(req)
  return BFA_Returns(res)
}

export async function getStoreDetail(req: RouterRequest): Promise<ErrorReturn | CantonDetail> {
  const res = await tradeResource.getStoreDetail<CantonDetail>(req)
  return BFA_Returns(res)
}

export async function getStoreSelect(req: RouterRequest): Promise<ErrorReturn | CantonSelect> {
  const res = await tradeResource.getStoreSelect<CantonSelect>(req)
  if (res.status === 101) {
    const result = res.data
    res.data.store_list.map((item: any) => {
      item.selected = false
      return item
    })
    return result
  }
  return errorHandler(res)
}
