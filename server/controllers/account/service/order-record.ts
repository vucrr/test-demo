import { RecordDetailReturns, RecordListReturns } from '../../../interfaces/account/service/order-record'
import { ErrorReturn } from '../../../interfaces/error'
import { RouterRequest } from '../../../interfaces/router'
import model from '../../../models/service'
import { BFA_Returns } from '../../../utils/tools'

export async function getRecordList(req: RouterRequest): Promise<ErrorReturn | RecordListReturns> {
  const res = await model.getRecordList<RecordListReturns>(req)
  return BFA_Returns(res)
}

export async function getRecordTradeDetail(req: RouterRequest): Promise<ErrorReturn | RecordDetailReturns> {
  const res = await model.getRecordTradeDetail<RecordDetailReturns>(req)
  return BFA_Returns(res)
}
