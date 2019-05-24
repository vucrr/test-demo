import { getHeaders } from 'actions/actionHelper'
import { FETCH_APPDOWNLOAD_LIST } from 'constant/index'
import { DataReturns } from 'interfaces/appdownload'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

export const receiveInfo = createAction<DataReturns>(FETCH_APPDOWNLOAD_LIST)

export const appdownloadActions = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/site/appdownload'
  const headers = getHeaders(req)
  try {
    const { data } = await axios.get<DataReturns>(url, { params: query, headers })
    return data && dispatch(receiveInfo(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}
