import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  getInvoice: {
    method: Resource.GET,
    template: 'contract/invoice/apply/detail',
  },
  getInvoiceCancel: {
    method: Resource.GET,
    template: 'contract/invoice/apply/cancel',
  },
  getInvoiceDetail: {
    method: Resource.GET,
    template: 'contract/invoice/record/list',
  },
  getInvoiceApply: {
    method: Resource.GET,
    template: 'contract/invoice/apply',
  },
  getInvoiceEmail: {
    method: Resource.GET,
    template: 'contract/invoice/send_email',
  },
}

type ReceiptResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as ReceiptResource
