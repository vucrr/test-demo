import { ErrorReturn } from '../../../interfaces/error'
// import { DetailReturns } from '../../../interfaces/repair'
import { RouterRequest } from '../../../interfaces/router'
import ReceiptResource from '../../../models/receipt'
import { BFA_Returns } from '../../../utils/tools'

export async function getInvoiceApply(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await ReceiptResource.getInvoiceApply<any>(req)
  return BFA_Returns(res)
}
