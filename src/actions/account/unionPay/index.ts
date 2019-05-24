import { getHeaders2 } from 'actions/actionHelper'
import { Modal, Toast } from 'antd-mobile'
import {
  FETCH_UNION_PAY_CHECK_BANK_LIST,
  FETCH_UNION_PAY_DETAIL,
  FETCH_UNION_PAY_INFO,
  FETCH_UNION_PAY_LIST,
  GO_TO_NEXT,
  SAVE_FORM_FILEDS,
  SAVE_SMS_FILEDS,
} from 'constant/index'
import { UnionPayBankListReturn, UnionPayFormReturn, UnionPayListReturn } from 'interfaces/unionPay'
import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

export const fetchList = ({ req }: { req: any }) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/unionPay/list'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<UnionPayListReturn>(url, { headers })
    if (data) {
      dispatch(createAction<{ list: UnionPayListReturn }>(FETCH_UNION_PAY_LIST)({ list: data }))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const fetchDetail = ({ protocolNo, req }: { protocolNo: string; req: any }) => async (
  dispatch: Dispatch<Action>,
) => {
  const url = 'node-api/account/unionPay/detail'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<UnionPayFormReturn>(url, { params: { protocolNo }, headers })
    if (data) {
      dispatch(createAction<{ detail: UnionPayFormReturn }>(FETCH_UNION_PAY_DETAIL)({ detail: data }))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const cancelBind = (modal: UnionPayFormReturn) => async (_: Dispatch<Action>) => {
  const url = 'node-api/account/unionPay/bindCancel'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post<any>(url, { ...modal }, { headers })
    if (data.errorMsg) {
      // Toast.info(data.errorMsg)
      Modal.alert('无法解绑', data.errorMsg, [{ text: '知道了' }], 'android')
    } else {
      Toast.info('解绑成功', 2, () => {
        Router.back()
      })
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const fetchCheckBanklist = () => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/unionPay/checkBanklist'
  const headers = getHeaders2()
  try {
    const { data } = await axios.get<UnionPayBankListReturn>(url, { headers })
    if (data) {
      dispatch(createAction<{ bankList: UnionPayBankListReturn }>(FETCH_UNION_PAY_CHECK_BANK_LIST)({ bankList: data }))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const fetchForm = ({ req }: { req: any }) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/unionPay/form'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<UnionPayFormReturn>(url, { headers })
    return data && dispatch(createAction<{ form: UnionPayFormReturn }>(FETCH_UNION_PAY_INFO)({ form: data })).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const binCheck = ({ cardBin }: { cardBin: string }) => async (_: Dispatch<Action>) => {
  const url = 'node-api/account/unionPay/binCheck'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post<any>(url, { cardBin }, { headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
    } else if (!data.isEffect) {
      Toast.info('您的银行卡不在支持范围内，请绑定支持范围内的银行卡')
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const goToNext = ({ info, redirect }: { info: UnionPayFormReturn; redirect?: string }) => async (
  dispatch: Dispatch<Action>,
) => {
  const url = 'node-api/account/unionPay/bindApply'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post<any>(url, { ...info }, { headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg || '四要素验证失败')
    } else {
      dispatch(
        createAction<{ form: UnionPayFormReturn }>(GO_TO_NEXT)({
          form: { ...info, tradeNo: data.tradeNo, bankName: data.bankName },
        }),
      )
      await Router.replace({
        pathname: '/account/unionPay/form',
        query: {
          step: '2',
          redirect,
        },
      })
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const sendSms = ({ tradeNo }: { tradeNo: string }) => async (_: Dispatch<Action>) => {
  const url = 'node-api/account/unionPay/bindSms'
  const headers = getHeaders2()
  try {
    await axios.post<any>(url, { tradeNo }, { headers })
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const saveFormFileds = createAction<{ form: UnionPayFormReturn }>(SAVE_FORM_FILEDS)

export const onSubmit = ({
  tradeNo,
  verifyCode,
  redirect,
}: {
  tradeNo: string
  verifyCode: string
  redirect?: string
}) => async (dispatch: Dispatch<Action>, getState: Function) => {
  const url = 'node-api/account/unionPay/bindConfirm'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post<any>(url, { tradeNo, verifyCode }, { headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
    } else {
      Toast.info('已成功绑定银行卡', 2, () => {
        const form = getState()
          .getIn(['account', 'unionPay', 'form'])
          .toJS()
        dispatch(
          saveFormFileds({
            form: {
              ...form,
              bankCardNo: '',
              tel: '',
              hasSubmit: true,
            },
          }),
        )
        if (redirect) {
          window.location.href = decodeURIComponent(redirect)
        } else {
          Router.back()
        }
      })
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const saveSmsFileds = createAction<{ verifyCode: string }>(SAVE_SMS_FILEDS)
