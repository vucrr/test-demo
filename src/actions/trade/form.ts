import { getHeaders2 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import {
  CLEAR_TRADE_INFO_AFTER_SUBMITTED,
  FETCH_CHINA_UNICOM_USER_DATA,
  SAVE_TRADE_INFO_WHEN_UNMOUNT,
} from 'constant/index'
import { ClientRequest } from 'interfaces/router'
import { UserDataBody, UserDataReturns } from 'interfaces/trade'
import { Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

export const receiveUserData = createAction<UserDataReturns>(FETCH_CHINA_UNICOM_USER_DATA)

export const saveInLocal = createAction<UserDataReturns>(SAVE_TRADE_INFO_WHEN_UNMOUNT)

export const clearLocalData = createAction(CLEAR_TRADE_INFO_AFTER_SUBMITTED)

export const fetchUserData = ({ query, req }: ClientRequest) => async (dispatch: Dispatch) => {
  const url = 'node-api/trade/user'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get(url, { params: query, headers: headers })
    data && dispatch(receiveUserData(data))
    return data
  } catch (e) {
    tools.ErrorLog(e)
  }
}

export const saveUserData = (body: UserDataBody) => async (_: Dispatch) => {
  const headers = getHeaders2()
  const url = 'node-api/trade/user'
  try {
    const { data } = await axios.post(url, body, { headers })
    if (data.errorMsg) Toast.info(data.errorMsg)
    else if (typeof data === 'boolean') {
      Toast.info(data ? '提交成功' : '提交失败')
      return data
    } else Toast.info('您已提交，无需再次提交')
    return false
  } catch (e) {
    tools.ErrorLog(e)
    return false
  }
}
