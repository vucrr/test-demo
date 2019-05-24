import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import model from '../../models/trade'
import { BFA_Returns } from '../../utils/tools'

export async function getAppraiseResult(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.getAppraiseResult(req)
  return BFA_Returns(res)
}

export async function gpsFlow(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.gpsFlow(req)
  return BFA_Returns(res)
}

export async function tongdunStatistics(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.tongdunStatistics(req)
  return BFA_Returns(res)
}

export async function emergencyContact(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.emergencyContact(req)
  return BFA_Returns(res)
}

export async function finishCreditEntrydata(req: RouterRequest): Promise<any | ErrorReturn> {
  const res = await model.finishCreditEntrydata(req)
  return BFA_Returns(res)
}
