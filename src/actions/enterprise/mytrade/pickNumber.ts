import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_ENTERPRISE_PICK_NUMBER, SELECT_NEW_PHONE_NUMBER } from 'constant/index'
import { PickNumber, SearchPhone } from 'interfaces/enterprise/mytrade/pickNumber'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

const receiveInfo = createAction<PickNumber>(FETCH_ENTERPRISE_PICK_NUMBER)

export const getPickNumber = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/enterprise/mytrade/pickNumber'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<PickNumber>(url, { params: query, headers })
    return data && dispatch(receiveInfo(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const searchPhone = ({ query, req }: ClientRequest) => async () => {
  const url = 'node-api/enterprise/mytrade/pickNumber/searchPhone'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<SearchPhone>(url, { params: query, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const lockPhone = ({ query, req }: ClientRequest) => async () => {
  const url = 'node-api/enterprise/mytrade/pickNumber/lockPhone'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<any>(url, { params: query, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const unlockPhone = ({ query, req }: ClientRequest) => async () => {
  const url = 'node-api/enterprise/mytrade/pickNumber/unlockPhone'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<any>(url, { params: query, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const selectNewPhone = createAction<any>(SELECT_NEW_PHONE_NUMBER)
