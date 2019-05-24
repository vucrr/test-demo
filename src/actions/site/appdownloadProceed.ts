import { getHeaders } from 'actions/actionHelper'
import { FETCH_APPDOWNLOAD_PROCEED } from 'constant/index'
import { ProceedReturns } from 'interfaces/appdownload'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

export const receiveInfo = createAction<ProceedReturns>(FETCH_APPDOWNLOAD_PROCEED)

export const appdownloadProceedActions = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/site/appdownloadproceed'
  const headers = getHeaders(req)
  try {
    const { data } = await axios.get<ProceedReturns>(url, { params: query, headers })
    return data && dispatch(receiveInfo(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}
