export interface PriceReturns {
  trade_info: TradeInfo
  sku_info: SkuInfo
  return_info: ReturnInfo
  return_price: ReturnPrice
}

interface ReturnInfo {
  left_day: number
  left_hour: number
}

interface ReturnPrice {
  unpaid_plan_amount: number
  return_price: number
  actual_return_price: number
  return_service_price: number
  unfreeze_price: number
  due_fee: number
  content: string
  price_list: PriceList[]
}

interface PriceList {
  name: string
  price: number
}

interface SkuInfo {
  sku_name: string
  sku_img: string
}

interface TradeInfo {
  total_installments_number: string
  dt_end_date: string
  status: string
}

export interface ReturnPhoneDetail {
  return_info: ReturnInfo2
  store_info: any[]
  trade_info: TradeInfo2
  left_time: LeftTime
  end_date: string
  sku_info: SkuInfo
  return_price: ReturnPrice2
}

interface LeftTime {
  left_day: number
  left_hour: number
}

interface ReturnInfo2 {
  id: number
  return_type: number
  sub_trade_no: string
  ahs_trade_no: string
  ahs_store_id: number
  user_phone: string
  express_number: string
  ahs_trade_status: number
  self_recycle_status: number
  dt_created: string
  dt_updated: string
  imei: string
  sku_id: number
}

interface ReturnPrice2 {
  unpaid_plan_amount: number
  return_price: number
  user_credit_deductible: number
  frozen_to_payprice: number
  actual_return_price: number
  return_service_price: number
  unfreeze_price: number
  due_fee: number
  content: string
  price_list: PriceList[]
}

interface TradeInfo2 {
  status: number
  total_installments_number: number
  dt_end_date: string
}
