export interface ServiceDetail {
  contract_info: ContractInfo
  deposit_info: DepositInfo
  contract_detail: ContractDetail[]
  button_list: ButtonList
  return_machine_list: ReturnMachineList
  replacement_list: ReplacementList
  sku_info: SkuInfo
  contract_other_list: ContractOtherList[]
  tips_info: TipsInfo
}

interface ContractDetail {
  title: string
  content: string
  tag: number
}

interface ButtonList {
  button_name: string
  button_type: number
  button_link: string
  button_major: number
  child_button_list: ChildButtonList
}

interface ChildButtonList {
  button_type: number
  button_name: string
}

export interface ContractInfo {
  contract_status?: number
  contract_status_name: string
  contract_status_desc: string
  contract_status_icon: string
  guide_explain: string
  trade_no: string
  contract_no: string
  returnflow_trade_no?: string
  returnflow_sub_trade_no?: string
  returnflow_type?: string
  is_ali_small?: boolean
  pay_no?: string
  pis_code?: string
}

interface ContractOtherList {
  item_name: string
  item_link: string
  item_count: number
  item_status: string
  item_type: number
}

interface DepositInfo {
  total_frozen_amount: number
  remark: string
  detail_info: DetailInfo[]
}

interface DetailInfo {
  item_name: string
  item_amount: number
}

interface ReplacementList {
  title: string
  count: string
  list: ReplacementItem[]
}

interface ReplacementItem {
  replacement_time: string
  new_sku_img: string
  new_sku_name: string
  old_sku_img: string
  old_sku_name: string
  replacement_type: number
}

interface ReturnMachineList {
  return_type: number
  return_type_name: string
  return_store_name: string
  return_store_id: number
  return_user_name: string
  return_user_phone: string
  return_address: string
}

interface SkuInfo {
  sku_img: string
  sku_name: string
}

interface TipsInfo {
  tip_title: string
  tip_link: string
  tip_type: number
  tip_content: string
}
