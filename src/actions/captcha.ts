import { getHeaders2 } from 'actions/actionHelper'
import { SMS_TYPES } from 'constant/common'
import { Dispatch } from 'redux'
import axios from 'utils/axiosClient'
import * as tools from 'utils/tools'

export const getCaptchaImage = (phone: string, type = SMS_TYPES.BindPhone) => async (_: Dispatch) => {
  const url = 'node-api/captcha/image'
  const params = { phone, type }
  const headers = getHeaders2()
  try {
    const { data } = await axios.get(url, { params, headers })
    return data.image_code
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const verifySMS = (phone: string, smsCode: string, type = SMS_TYPES.BindPhone) => async (_: Dispatch) => {
  const url = 'node-api/captcha/sms'
  const body = { phone, type, sms_code: smsCode }
  const headers = getHeaders2()
  try {
    const { data } = await axios.post(url, body, { headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const verifyImageAndSendSMS = (phone: string, imageStr: string, type = SMS_TYPES.BindPhone) => async (
  _: Dispatch,
) => {
  const url = 'node-api/captcha/sms'
  const params = { phone, type, image_code: imageStr }
  const headers = getHeaders2()
  try {
    const { data } = await axios.get(url, { params, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
