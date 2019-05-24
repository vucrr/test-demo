export interface ReplaceContract {
  copywriting: Copywriting
  next_button: string
  replacement_button: string
  trade_title: string
  page_title: string
  trade_info: TradeInfo[]
}

interface Copywriting {
  title: string
  icon: Icon[]
  url: string
  url_title: string
  web_title: string
}

interface Icon {
  img: string
  title: string
}

interface TradeInfo {
  trade_no: string
  sku_small_img: string
  alias: string
  use_time: string
  use_text: string
  early_return_money: string
  early_return_text: string
  early_return_text_tips: string
  early_return_tips: EarlyReturnTips
}

interface EarlyReturnTips {
  title: string
  head_text: string
  body_text: string
  body_money: string
  body_tips: string
}

export interface GetReturnInfo {
  page_title: string
  button_title: string
  title: string
  title2: string
  trade_type: number
  trade_info: ReturnTradeInfo
}

interface ReturnTradeInfo {
  trade_no: string
  sku_small_img: string
  alias: string
  use_time: string
  use_text: string
  early_return_money: number
  early_return_text: string
  early_return_tips: ReturnEarlyReturnTips
  end_time: string
  end_time_text: string
  end_time_tips: EndTimeTips
  return_title: string
  return_type: ReturnType
}

interface ReturnEarlyReturnTips {}

interface EndTimeTips {
  title: string
  button_title: string
}

interface ReturnType {
  store: Mail
  mail: Mail
}

interface Mail {
  title: string
  is_show: boolean
  return_standard: Return
  return_notice: Return
  address?: Address
}

interface Address {
  title: string
  tips: string
  consignee: string
  contact_information: string
  address: string
}

interface Return {
  title: string
  tips: string
  icon: string
  url: string
}

export interface GetStore {
  id: number
  store_id: number
  store_name: string
  description: string
  address: string
  longitude: string
  latitude: string
  city_id: number
  region_id: number
  phone: string
  img: string
  is_active: number
  dt_created: string
  dt_updated: string
}

export interface SaveCreate {
  replacment_trade_no: string
  replacment_no: string
  pis_code: string
  operation_type: number
}
