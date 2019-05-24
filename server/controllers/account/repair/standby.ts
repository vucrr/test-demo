import { ErrorReturn } from '../../../interfaces/error'
import { StandbyDetail, StandbyRecord } from '../../../interfaces/repair'
import { RouterRequest } from '../../../interfaces/router'
import RepairResource from '../../../models/repair'
import { BFA_Returns } from '../../../utils/tools'

export async function getStandbyQualityDetail(req: RouterRequest): Promise<ErrorReturn | StandbyDetail> {
  const res = await RepairResource.getStandbyQualityDetail<StandbyDetail>(req)
  return BFA_Returns(res)
}

export async function getStandbyQualityRecord(req: RouterRequest): Promise<ErrorReturn | StandbyRecord> {
  const res = await RepairResource.getStandbyQualityRecord<StandbyRecord>(req)
  return BFA_Returns(res)
}
