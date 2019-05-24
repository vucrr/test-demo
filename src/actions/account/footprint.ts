import { getHeaders } from 'actions/actionHelper'
import { GET_ACCOUNT_FOOTPRINTLIST_INFO, GET_ACCOUNT_FOOTPRINT_INFO } from 'constant/index'
import { FootPrintReturns } from 'interfaces/footprint'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

const getFootPrintInfo = createAction<FootPrintReturns>(GET_ACCOUNT_FOOTPRINT_INFO)
const getFootPrintListInfo = createAction<any>(GET_ACCOUNT_FOOTPRINTLIST_INFO)

export const fetchFootPrint = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/footprint'
  const headers = getHeaders(req)
  try {
    const { data } = await axios.get<FootPrintReturns>(url, { params: query, headers })
    return data && dispatch(getFootPrintInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const fetchFootPrintList = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/footprint/list'
  const headers = getHeaders(req)
  try {
    const { data } = await axios.get<any>(url, { params: query, headers })
    return data && dispatch(getFootPrintListInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
