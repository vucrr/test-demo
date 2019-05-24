import { getHeaders2 } from 'actions/actionHelper'
import Cookies from 'js-cookie'
import { Dispatch } from 'redux'
import { axios, tools } from 'utils'

export const verifySMSAndValidateUser = (phone: string, smsCode: string, type: string) => async (_: Dispatch) => {
  const openId = Cookies.get('open_id') || ''
  const openType = Cookies.get('open_type') || ''
  const url = 'node-api/account/bind_phone/validate_user'
  const body = {
    phone,
    type,
    sms_code: smsCode,
    open_id: openId,
    open_type: openType,
  }
  const headers = getHeaders2()
  try {
    const { data } = await axios.post(url, body, { headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
