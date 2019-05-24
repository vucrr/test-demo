interface PlanList {
  sku_info: SkuInfo
  trade_plan_list: TradePlanList[]
  returnflow_list: List[]
  buyout_list: List[]
}

interface List {
  repayment_amount: number
  repayment_time: string
  repayment_status_desc: string
}

interface SkuInfo {
  sku_name: string
  sku_img_url: string
}

interface TradePlanList {
  period_desc: string
  repayment_amount: string
  repayment_time: string
  repayment_status_desc: string
  repayment_type_desc: string
  operation_type: number
  color_type: number
  button_name: string
}

export interface ReturnPlanReturns {
  history_plan_list: PlanList[]
  current_plan_list: PlanList
}

export interface PayReturns {
  handleStep: string
  handleType: string
  handleString: string
  pay_no: string
  pay_msg: string
  pay_type: number
  pay_status: string
}
