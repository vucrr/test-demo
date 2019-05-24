export interface RecordListReturns {
  contract_no: string
  total_count: number
  trade_list: TradeList[]
}

export interface TradeList {
  sku_info: SkuInfo
  old_sku_info: SkuInfo
  replacement_type: number
  trade_no: string
  old_trade_no: string
  replacement_no: string
}

export interface SkuInfo {
  sku_name?: string
  sku_img_url?: string
}

export interface RecordDetailReturns {
  trade_info: Info[]
  rent_info: RentInfo
  first_per_reduce_info: FirstPerReduceInfo
  coupon_info: CouponInfo[]
  vas_price_info: any[]
  advance_rent_info: null
  logistics_info: Info[]
  repay_info: RepayInfo
  text_tips: string
}

export interface CouponInfo {
  coupon_icon: string
  coupon_title: string
  coupon_price: string
}

export interface FirstPerReduceInfo {
  is_show_first_text: boolean
  first_price_text: string
  first_price_count_text: string
  first_price_count: string
  first_price_guarantee: number
  is_show_per_text: boolean
  per_price_text: string
  per_price_count_text: string
  per_price_count: string
  per_price_guarantee: number
}

export interface Info {
  title: string
  content: string
}

export interface RentInfo {
  is_relet: boolean
  first_rent_price: string
  first_rent_line_price: string
  term_rent_price: string
  term_rent_line_price: string
  lease_term: string
  after_rent_price: string
  show_model: number
  is_show_first_line: boolean
  is_show_term_line: boolean
  ap_service_price: string
  term_ap_service_price: string
  is_show_premium: boolean
  premium_price: string
  service_name: string
  premium_name: string
}

export interface RepayInfo {
  title: string
  logo: string
  content: string
}
