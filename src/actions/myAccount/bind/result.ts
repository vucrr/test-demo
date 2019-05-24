import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_BIND_RESULT_INFO } from 'constant/index'
import { Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

export const fetchResult = (phone: string, req: any) => async (dispatch: Dispatch) => {
  const url = 'node-api/account/bind_wechat/result'
  const query = {
    phone,
    sourceCode: 100,
    action: 'getRedirectUrl',
  }
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get(url, { headers, params: query })
    dispatch(data && createAction(FETCH_BIND_RESULT_INFO)(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}
