import { getHeaders3 } from 'actions/actionHelper'
import * as constants from 'constant/index'
// import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

const receiveSendSms = createAction<any>(constants.SEND_SMS_CODE)

export const sendSms = ({ phone }: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/easeu/credit-card/sendSms'
  try {
    const headers = getHeaders3()
    const { data } = await axios.post(url, { phone }, { headers })
    dispatch(receiveSendSms(data))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// const receivePayCredit = createAction<any>(constants.POST_PAY_CREDIT)

export const payCredit = (body: any) => async (_: Dispatch<Action>) => {
  const url = 'node-api/easeu/credit-card/payCredit'
  try {
    const headers = getHeaders3()
    const { data } = await axios.post(url, body, { headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
