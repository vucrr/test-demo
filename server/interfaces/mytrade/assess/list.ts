export interface GetCreditEntrydata {
  credit_title: string
  credit_desc: string
  credit_icon: string
  credit_tips: string
  submit_text: string
  submit_status: number
  agreement_info: AgreementInfo[]
  step_list: StepList[]
  step_bar: StepBar[]
}

export interface AgreementInfo {
  agreement_msg: string
  agreement_name: string
  agreement_url: string
}

export interface StepList {
  step_title: string
  step_info: string
  step_icon: string
  step_status: number
  setp_code: string
  setp_url: string
}

export interface StepBar {
  step_title: string
  is_show: string
}

export interface FinishCreditEntryReturns {
  data_no: string
  is_finish: number
}
