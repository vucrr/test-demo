import { RepairCategory, RepairFormReturns } from '../../../interfaces/repair'
import { RouterRequest } from '../../../interfaces/router'
import Repair from '../../../models/repair'
import { BFA_Returns } from '../../../utils/tools'

export async function getCategory(req: RouterRequest) {
  const res = await Repair.getCategory<RepairCategory>(req)
  return BFA_Returns(res)
}

export async function getForm(req: RouterRequest) {
  const res = await Repair.getForm<RepairFormReturns>(req)
  return BFA_Returns(res)
}

export async function createForm(req: RouterRequest) {
  const res = await Repair.createForm<{ msg: string }>(req)
  return BFA_Returns(res)
}
