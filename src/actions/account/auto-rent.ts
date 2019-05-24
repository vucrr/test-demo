import { getHeaders3 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import { FETCH_INFO, OPEN_AUTO_RENT, SET_RENT_BUTTON_DISABLED } from 'constant/index'
// import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

export const setDisabled = createAction<{ disabled: boolean }>(SET_RENT_BUTTON_DISABLED)

export const fetchInfo = ({ trade_no, req }: { trade_no: string | string[]; req: any }) => async (
  dispatch: Dispatch<Action>,
) => {
  const url = 'node-api/account/auto-rent/info'
  const headers = getHeaders3(req)
  try {
    const { data } = await axios.get(url, { params: { trade_no }, headers })
    if (data) {
      dispatch(createAction<any>(FETCH_INFO)({ info: data }))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const openAutoRent = ({ trade_no }: { trade_no: string | string[] }) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/auto-rent/openAutoRent'
  try {
    const headers = getHeaders3()
    const { data } = await axios.post(url, { trade_no }, { headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
      dispatch(setDisabled({ disabled: false }))
    } else {
      Toast.info('开启成功')
      dispatch(createAction<{ is_auto_rent: 0 | 1 }>(OPEN_AUTO_RENT)({ is_auto_rent: 1 }))
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 冻结金额
export const frozenAutoRentAndOpen = ({ trade_no }: { trade_no: string | string[] }) => async (
  dispatch: Dispatch<any>,
) => {
  const url = 'node-api/account/auto-rent/frozenAutoRent'
  const headers = getHeaders3()
  try {
    const { data } = await axios.post(url, { trade_no }, { headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
      dispatch(setDisabled({ disabled: false }))
    } else if (data && data.handleType === 'payJs') {
      AlipayJSBridge.call('tradePay', { orderStr: data.handleString }, (data: any) => {
        const resultCode = data.resultCode
        if (resultCode !== '6001') {
          if (resultCode !== '9000') {
            Toast.info('支付失败，请重试')
            dispatch(setDisabled({ disabled: false }))
          } else {
            dispatch(openAutoRent({ trade_no }))
          }
        } else {
          dispatch(setDisabled({ disabled: false }))
        }
      })
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 签代扣
export const userSign = ({ trade_no }: { trade_no: string }) => async (dispatch: Dispatch<any>) => {
  const url = 'node-api/account/auto-rent/userSign'
  const headers = getHeaders3()
  try {
    const { data } = await axios.post(url, { trade_no }, { headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
      dispatch(setDisabled({ disabled: false }))
    } else if (data.url) {
      location.href = data.url
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 检查 && 签代扣
export const checkAnduserSign = ({ trade_no, only_check = false }: { trade_no: string; only_check: boolean }) => async (
  dispatch: Dispatch<any>,
) => {
  const url = 'node-api/account/auto-rent/checkAnduserSign'
  const headers = getHeaders3()
  try {
    const { data } = await axios.post(url, { trade_no, only_check }, { headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
      dispatch(setDisabled({ disabled: false }))
    } else if (data.url) {
      location.href = data.url
    } else if (data) {
      return { hasSign: data.hasSign }
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
