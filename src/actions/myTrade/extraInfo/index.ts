import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_EXTRAINFO_LIST } from 'constant/index'
import { ClientRequest } from 'interfaces/router'
import { ExtraInfoReturn } from 'interfaces/trade'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

const receiveInfo = createAction<ExtraInfoReturn>(FETCH_EXTRAINFO_LIST)

export const fetchInfo = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/extraInfo/list'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<ExtraInfoReturn>(url, { params: query, headers })
    return data && dispatch(receiveInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
