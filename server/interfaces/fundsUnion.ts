export interface OTPReturns {
  OTPBillNo?: string
  respCode: string
  respMsg?: string
}

export interface BindCardReturns {
  billNo?: string
  respCode: string
  respMsg?: string
}

export interface AuthorizeResultReturns {
  authorize_info: AuthorizeInfo
  agreement_info: AgreementInfo
  appraise_remark: string
  fund_id: number
  agreement_btn: string
  authorize_text: string
  step_doc: string
  step_list: StepList[]
}

export interface AgreementInfo {
  agreement_msg: string
  agreement_name: string
  agreement_url: string
}

export interface AuthorizeInfo {
  title: string
  name: string
  icon: string
  amount: number
  tips: string
}

interface StepList {
  step_no: number
  step_title: string
  step_info: string
  step_status: number
  withhold_first?: string
  info?: {
    title: string
    context: string
    list: {
      name: string
      icon: string
    }[]
  }
}

export interface FundingResultReturns {
  trade_no: string
  pay_no: string
  handle_code: string
  handle_type: string
  handle_string: string
  loading_status: number
}
