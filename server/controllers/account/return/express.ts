import { ErrorReturn } from '../../../interfaces/error'
import { RouterRequest } from '../../../interfaces/router'
import returnResource from '../../../models/return'
import { BFA_Returns } from '../../../utils/tools'

export async function cancelReturn(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await returnResource.cancelReturn<any>(req)
  return BFA_Returns(res)
}
// 申请页详情
export async function getReturnDetail(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await returnResource.getReturnDetail<any>(req)
  return BFA_Returns(res)
}
// 普通还机生成换机单
export async function createExpressReturnBill(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await returnResource.createExpressReturnBill<any>(req)
  return BFA_Returns(res)
}
// 换机申请还机
export async function commitApplyReturn(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await returnResource.commitApplyReturn<any>(req)
  return BFA_Returns(res)
}

export async function getApplyResult(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await returnResource.getApplyResult<any>(req)
  return BFA_Returns(res)
}
// 地址是否可以申请取件
export async function isAddressAvailable(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await returnResource.isAddressAvailable<any>(req)
  return BFA_Returns(res)
}
// 取件时间列表
export async function getSchedule(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await returnResource.getSchedule<any>(req)
  return BFA_Returns(res)
}
// 取件单修改
export async function changePickUp(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await returnResource.changePickUp<any>(req)
  return BFA_Returns(res)
}
// 物流详情
export async function getLogistics(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await returnResource.getLogistics<any>(req)
  return BFA_Returns(res)
}
