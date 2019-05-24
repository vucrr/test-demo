export interface ReceiptData {
  invoice_type: string
  invoice_title: string
  taxer_no: string
  email: string
  status: string
  open_num: string
  open_type: string
  invoice_type_zh: string
  status_zh: string
  open_type_zh: string
  permission: number
}

export interface ReceiptDetail {
  count: number
  current_page: number
  page_size: number
  list: [ReceiptList]
}

interface ReceiptList {
  id: string
  invoice_title: string // 发票抬头
  invoice_sku: string // sku
  invoice_vol: string // 发票期数
  invoice_amount: string // 发票金额
  invoice_file: string // 发票文件
  is_email: string
  status: string
  dt_created: string
  dt_updated: string
}
