import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_SERVICE_DETAIL } from 'constant/index'
import { ServiceDetail } from 'interfaces/account/service/detail'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

const receiveDetailInfo = createAction<any>(FETCH_SERVICE_DETAIL)

export const fetchDetail = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/service/detail'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<ServiceDetail>(url, { params: query, headers })
    return data && dispatch(receiveDetailInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
