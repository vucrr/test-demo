import { getHeaders, getHeaders2 } from 'actions/actionHelper'
import { FETCH_CENTER_INFO, GET_USER_INFO } from 'constant/index'
import { MyCenterReturns } from 'interfaces/account/center'
import { CenterReturns } from 'interfaces/center'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

export const receiveInfo = createAction<CenterReturns>(GET_USER_INFO)

export const centerActions = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/center'
  const headers = getHeaders(req)
  try {
    const { data } = await axios.get<CenterReturns>(url, { params: query, headers })
    return data && dispatch(receiveInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const fetchInfo = ({ req }: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/center/info'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<MyCenterReturns>(url, { headers })
    if (data) {
      dispatch(createAction<MyCenterReturns>(FETCH_CENTER_INFO)(data))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
