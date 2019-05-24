import { getHeaders2 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import Alert from 'components/Alert'
import {
  CHECK_ENTERPRISE_APPLY_EMAIL,
  FETCH_ENTERPRISE_APPLY_GUIDE,
  FETCH_ENTERPRISE_APPLY_RESULT,
} from 'constant/index'
import { GuideReturns, ResultStatusReturns, VerifyEmailReturns } from 'interfaces/enterprise/apply'
import { ErrorReturn } from 'interfaces/error'
import { ClientRequest } from 'interfaces/router'
import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

export const fetchGuideInfo = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/enterprise/apply/guide'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<GuideReturns>(url, { params: query, headers })
    data && dispatch(createAction<GuideReturns>(FETCH_ENTERPRISE_APPLY_GUIDE)(data))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
  return null
}

export const fetchResultStatus = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/enterprise/apply/result-status'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<ResultStatusReturns>(url, { params: query, headers })
    data && dispatch(createAction<ResultStatusReturns>(FETCH_ENTERPRISE_APPLY_RESULT)(data))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
  return null
}

export const verifyEmail = ({ email }: { email: string }) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/enterprise/apply/verify-email'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post<ErrorReturn & VerifyEmailReturns>(url, { email }, { headers })
    if (data && data.errorMsg) {
      Toast.info(data.errorMsg)
    } else {
      if (data.partner_enterprise === 0) {
        Alert(
          null,
          '您的企业暂时无法享受下单福利，您可喊上HR联系客服申请企业权益，或直接下单哦',
          [
            {
              text: '联系客服',
              onPress: () => {
                window.location.href = 'tel://400-6700-188'
              },
            },
            {
              text: '去下单',
              onPress: () => {
                Router.push('/product/category').catch()
              },
            },
          ],
          'android',
          true,
        )
      }

      dispatch(createAction<VerifyEmailReturns>(CHECK_ENTERPRISE_APPLY_EMAIL)(data))
      return data.partner_enterprise === 1
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

interface FormValues {
  email: string
  verify_code: string
  employee_no: any
  idcard: any
  employee_card: any
}

export const submitBind = ({
  email,
  verify_code,
  idcard = '',
  employee_card = '',
  employee_no = '',
}: FormValues) => async () => {
  const url = 'node-api/enterprise/apply/bind-enterprise'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post<ErrorReturn & {}>(
      url,
      { email, verify_code, idcard, employee_card, employee_no },
      { headers },
    )
    if (data && data.errorMsg) {
      Toast.info(data.errorMsg)
    } else {
      await Router.push('/enterprise/apply/result')
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
