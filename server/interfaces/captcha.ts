// Deprecated
export interface CAPTCHAReturns {
  mobile: string
  code: string
  message: string
  sms_rs: SMSRs
  expired: number
}

// Deprecated
interface SMSRs {
  is_send: boolean
  is_can_send: boolean
  is_failed: boolean
  is_need_verify: boolean
  verify_img: string
  sms_ident_no: string
  is_verify: boolean
}
