import { ReceiptData, ReceiptDetail } from '../../../interfaces/account/receipt'
import { ErrorReturn } from '../../../interfaces/error'
import { RouterRequest } from '../../../interfaces/router'
import ReceiptResource from '../../../models/receipt'
import { BFA_Returns } from '../../../utils/tools'

export async function getInvoice(req: RouterRequest): Promise<ErrorReturn | ReceiptData> {
  const res = await ReceiptResource.getInvoice<ReceiptData>(req)
  return BFA_Returns(res)
}

export async function getInvoiceCancel(req: RouterRequest): Promise<ErrorReturn | any> {
  const res = await ReceiptResource.getInvoiceCancel<any>(req)
  return BFA_Returns(res)
}

export async function getInvoiceDetail(req: RouterRequest): Promise<ErrorReturn | ReceiptDetail> {
  const res = await ReceiptResource.getInvoiceDetail<ReceiptDetail>(req)
  return BFA_Returns(res)
}
