export interface FlowControl {
  status: string
  flow_code: string
  scenario: string
  current_node_code: string
  pass: number
}

export interface TradeInfo {
  sku_info: SkuInfo
  trade_info: TradeInfoClass
}

interface SkuInfo {
  sku_img: string
  sku_name: string
}

interface TradeInfoClass {
  trade_no: string
  flow_code: string
  status: null
  pis_code: string
  total_contract_charge: number
  total_accredit_charge: number
  contract_charge: number
  assurance_charge: number
  service_price: number
  choose_installments_num: string
  installments_sum: string
  guarantee_charge: number
  first_month_amount: number
  per_month_amount: number
  days_perinstallments: number
  assurance_reduce_charge: number
}
