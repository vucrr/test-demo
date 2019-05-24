export interface AddressAvailableReturn {
  is_valid: boolean
  error_reason: string
}

export interface TimeScheduleReturn {
  date: string
  time: Time[]
}

export interface Time {
  start_time: string
  display_str: string
}

export interface LogisticReturn {
  express_number: string
  express_route: ExpressRoute[]
  product_info: ProductInfo
}

export interface ExpressRoute {
  happened_time: string
  happened_address: string
  desc: string
  tag: number
  time: string
  date: string
  isReceived: number
  isSigned: number
}

export interface ProductInfo {
  sku_img: string
  sku_name: string
  sku_model: string
  product_name: string
  sku_specifications: string
  total_rent_price: string
  credit_amount: string
}

export interface CancelReturn {
  handle_result: string
}

export interface CreateBillReturn {
  sub_trade_no: string
}

export interface EList {
  code: number
  name: string
  is_select: boolean
}

export interface IgnoredInfo {
  ignored_num: number
}

export interface PickupInfo {
  province: string
  city: string
  county: string
  address: string
}

export interface PriceList {
  name: string
  amount: string
}

export interface SkuInfo {
  sku_img: string
  sku_name: string
}

export interface TipsInfo {
  title: string
  content: string
  service_type: number
  tip_type: number
  link_url: string
}

export interface ExpressDetailReturn {
  return_route_list?: EList[]
  express_type_list?: EList[]
  pickup_info?: PickupInfo
  trade_no?: string
  sub_trade_no?: string
  logistics_no?: string
  return_type?: number
  return_status?: number
  user_phone: string
  return_end_date: string
  return_end_day: number
  return_end_hour: number
  trade_type: number
  guarantee_mode: string
  total_installments_number: number
  trade_end_date: string
  sku_info: SkuInfo
  price_info: PriceInfo
  price_list: PriceList[]
  tips_info: TipsInfo
  deliverInfo?: DeliverInfo
  express_type?: number
}

export interface DeliverInfo {
  name: string
  phone: string
  province: string
  city: string
  county: string
  address: string
  ordered_time: string
  status: number
  deliver_phone: string
  deliver_name: string
  statusTxt: string
  statusPic: string
  statusMsg: string
  showCancelBtn: number
  showChangeBtn: number
  showRouteBtn: number
  showCallBtn: number
}

export interface PriceInfo {
  actual_return_price: string
}

export interface StoreDetailReturn {
  return_route_list?: EList[]
  express_type_list?: EList[]
  pickup_info: PickupInfo
  user_phone: string
  return_end_date: string
  return_end_day: number
  return_end_hour: number
  trade_type: number
  guarantee_mode: string
  total_installments_number: number
  trade_end_date: string
  store_info?: StoreInfo
  sku_info: SkuInfo
  ignored_info: IgnoredInfo
  price_info: PriceInfo
  price_list: PriceList[]
  tips_info: TipsInfo
}

export interface StoreInfo {
  city_id: string
  region_id: string
  store_id: string
  store_name: string
  address: string
}
