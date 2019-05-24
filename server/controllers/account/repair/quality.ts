import { ErrorReturn } from '../../../interfaces/error'
import { DetailReturns, RecordReturn } from '../../../interfaces/repair'
import { RouterRequest } from '../../../interfaces/router'
import RepairResource from '../../../models/repair'
import { BFA_Returns } from '../../../utils/tools'

export async function getRepairQualityDetail(req: RouterRequest): Promise<ErrorReturn | DetailReturns> {
  const res = await RepairResource.getRepairQualityDetail<DetailReturns>(req)
  return BFA_Returns(res)
}

export async function getRepairQualityRecord(req: RouterRequest): Promise<ErrorReturn | RecordReturn> {
  const res = await RepairResource.getRepairQualityRecord<RecordReturn>(req)
  return BFA_Returns(res)
}
