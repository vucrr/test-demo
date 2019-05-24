export interface DetailReturns {
  main_data: MainData
  logs: Log[]
}

export interface Log {
  remark: string
  content: string
  dt_created: string
}

export interface MainData {
  id: string
  sn: string
  type: string
  type_desc: string
  status: string
  status_desc: string
  channel: string
  trade_no: string
  user_id: string
  desc: string
  dt_created: string
}

export interface RecordReturn {
  data: { [key: string]: string }[]
  count: string
}

export interface Record2Return {
  data: { [key: string]: string }[]
  count: string
  page: number
}

export interface StandbyRecord {
  data: { [key: string]: string }[]
  count: string
}

export interface Standby2Record {
  data: { [key: string]: string }[]
  count: string
  page: number
}

export interface StandbyDetail {
  sn: string // 备用机唯一标识
  dt_created: string // 创建时间
  sku_name: string // sku名称
  logs: Log[]
}

export interface RepairCategory {
  channel_id: number
  repair_no: string // 维修单号
  has_repair: boolean // 是否有维修单
  has_invoice: boolean
  is_insure: boolean
  is_second: boolean
  insure_type_url: string
  repair_quality_url: string
  mname: string
  link_url: string
  type: number // 维修类型（1：寄回维修；2：官网维修；3：官网维修(带发票)）
}

export interface RepairFormReturns {
  type: string
  is_insure: boolean
  has_repair: boolean
  trade_no: string
  quality_list: string[]
  mname: string
  link_url: string
}
