export interface AgreementRequest {
  trade_no: string
  user_code: string
  year: string
  month: string
  day: string
  trade_info: TradeInfo
  user_info: UserInfo
  sku_info: SkuInfo
}

interface SkuInfo {
  sku_name: string
  sku_new: string
  sku_channel: string
}

interface TradeInfo {
  lease_term: number
  term_rent_price: number
  service_total_price: number
  depreciation_price: string
  other_service_price: string
  residual_value_price: number
  ap_service_price: number
  deposit_pay_type: string
  deposit_total_price: number
}

interface UserInfo {
  user_name: string
  user_id_card: string
  user_phone: string
}
