import { getHeaders } from 'actions/actionHelper'
import { GET_PRODUCT_INTRODUCE_INFO } from 'constant/index'
import { ReceiveInfoReturns } from 'interfaces/category'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

const receiveInfo = createAction<ReceiveInfoReturns>(GET_PRODUCT_INTRODUCE_INFO)

export const fetchInfo = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/product/introduce/info'
  const headers = getHeaders(req)
  try {
    const { data } = await axios.get<ReceiveInfoReturns>(url, { params: query, headers })
    data && dispatch(receiveInfo(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}
