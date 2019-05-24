export interface ConfirmReturns {
  authorize_info: AuthorizeInfo
  agreement_info: AgreementInfo
  appraise_remark: string
  fund_id: number
  agreement_btn: string
  authorize_text: string
  step_doc: string
  step_list: StepList[]
  step_bar: StepBar[]
}

interface AgreementInfo {
  agreement_msg: string
  agreement_name: string
  agreement_url: string
  agreement_title: string
}

interface AuthorizeInfo {
  title: string
  name: string
  icon: string
  ept_title: string
  amount_title: string
  amount: number
  tips: string
}

interface StepList {
  step_no: string
  step_title: string
  step_info: string
  step_status: number
  withhold_first?: string
  info?: Info
}
interface StepBar {
  step_title: string
  is_show: number
}
interface Info {
  title: string
  context: string
  list: List[]
}

interface List {
  name: string
  icon: string
}
