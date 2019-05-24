import { getHeaders2 } from 'actions/actionHelper'
import { EXCHANGE_PRIVILEGE, FETCH_PRIVILEGE_LIST, FETCH_USER_PRIVILEGE_LIST } from 'constant/index'
import { PrivilegeListReturns, UserPrivilegeItem, UserPrivilegeReturns } from 'interfaces/privilege'
import { QueryStringMapObject } from 'next'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

export const fetchPrivilegeList = (query: QueryStringMapObject, req: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/privilege/list'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<PrivilegeListReturns>(url, { params: query, headers })
    return data && dispatch(createAction<PrivilegeListReturns>(FETCH_PRIVILEGE_LIST)(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const fetchUserPrivilegeList = (query: QueryStringMapObject, req: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/privilege'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<UserPrivilegeReturns>(url, { params: query, headers })
    return data && dispatch(createAction<UserPrivilegeReturns>(FETCH_USER_PRIVILEGE_LIST)(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

interface ExchangePayload {
  data: UserPrivilegeItem
  index: number
}

export const exchangeWithId = (index: number) => (id: string) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/privilege/code'
  const headers = getHeaders2()
  try {
    const { data } = await axios.get<{ msg: string; data: any }>(url, {
      params: { user_priv_id: id },
      headers,
    })
    if (data.msg) return data.msg
    dispatch(createAction<ExchangePayload>(EXCHANGE_PRIVILEGE)({ data: data.data, index }))
  } catch (err) {
    tools.ErrorLog(err)
  }
}
