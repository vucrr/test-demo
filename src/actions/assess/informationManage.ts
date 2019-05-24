import { getHeaders2 } from 'actions/actionHelper'
import { RECEIVE_INFORMATION_DATA } from 'constant/index'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

export const receiveInformationData = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/assess/informationManage'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<{ msg: string; data: any; errorMsg: string }>(url, {
      params: { ...query, timeSpan: new Date().getTime() },
      headers,
    })
    if (data.msg || data.errorMsg) {
      return
    }
    dispatch(createAction(RECEIVE_INFORMATION_DATA)(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}
