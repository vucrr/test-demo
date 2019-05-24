export interface UserDataBody {
  trade_no: string
  user_name: string
  user_idcard: string
  user_phone: string
  idcard_human_img: string
  idcard_emblem_img: string
  idcard_bare_img: string
  service_providers: number
}

export interface UserDataReturns extends UserDataBody {
  dt_created?: string
  editable?: boolean
}

interface City {
  id: number
  city_id: number
  city_name: string
  parent_id: number
  is_city: number
  order: number
  isHotcity: number
  firstLetter: string
  validPickupTypes: string
  dt_created: string
  is_active: number
}

export interface CityList {
  hot_citys: City[]
  all_citys: City[]
}

export interface ChangeForm {
  isSuccess: boolean
  delivery_info: DeliveryInfo
}

interface DeliveryInfo {
  user_address: string
  user_name: string
  user_phone: string
}

export interface AddressForm {
  userDeliveryInfo: UserDeliveryInfo
  userStoreInfo: UserStoreInfo
}

interface UserDeliveryInfo {
  id_user: number
  contact: string
  phone: string
  id_region: string
  address: string
  detail_address: string
  house_number: string
  province: string
  city: string
  area: string
  longitude: string
  lat: string
  is_active: number
  orgPhone: string
  delivery_type: number
}

interface UserStoreInfo {
  city_id: number
  store_name: string
  store_code: string
  store_address: string
  store_contact: string
  system_code: string
  type: number
  operating_state: number
  is_active: number
  dt_created: string
  dt_updated: string
  city_name: string
  delivery_address: string
}

export interface ExtraInfoReturn {
  is_need: string
  step_list: StepList[]
}

export interface StepList {
  step_title: string
  step_info: string
  step_icon: string
  step_status: number
  step_url: string
  step_code: string
}
