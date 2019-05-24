export interface ReturnFlowReturns {
  return_price: number
  user_credit_deductible: number
  frozen_to_payprice: number
  actual_return_price: number
  return_service_price: number
  unfreeze_price: number
  current_price: number
  before_price: number
  due_fee: number
  is_returnflow: number
  unpaid_plan_amount: number
}

export interface ReturnCostReturns {
  actual_return_price: number
  return_service_price: number
  current_price: number
  before_price: number
  due_fee: number
  return_price: number
  unpaid_plan_amount: number
  content: string
}

export interface ReturnSuccessReturns {
  status: boolean
  is_credit: boolean
}

export interface SaveReturnflowPayReturns {
  total_fee: number
  frozen_deposit: number
  paid_rent_fee: number
  buyout_fee: number
  overdue_fee: number
  overdue_days: number
  frozen_to_payprice: number
  user_credit_deductible: number
  buyout_total_price: number
  return_price: number
  actual_return_price: number
  return_service_price: number
  unfreeze_price: number
  current_price: number
  before_price: number
  main_trade_no: string
  pay_code: string
  pay_trade_no: string
  pay_no: string
  alipay_params: string
}
