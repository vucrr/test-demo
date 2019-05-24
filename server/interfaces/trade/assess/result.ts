export interface ResultReturns {
  appraise_type: number
  prepaid_price: string
  appraise_title: string
  prepaid_desc: string
  prepaid_tips: string
  prepaid_text: string
  agreement_info: AgreementInfo
  appraise_remark: string
  rent_info: RentInfo[]
  fund_id: number
  authorize_info: AuthorizeInfo
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
  name: string
  icon: string
  ept_title: string
  amount_title: string
}

interface StepBar {
  step_title: string
  is_show: number
}
interface RentInfo {
  name: string
  amount: string
}

interface StepList {
  step_no: string
  step_title: string
  step_info: string
  step_status: number
  withhold_first?: string
  info?: Info
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
