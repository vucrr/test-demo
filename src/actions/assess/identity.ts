import { getHeaders2 } from 'actions/actionHelper'
import { CHANGE_IDENTITY_STATUS } from 'constant/index'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

export const postIdentity = (body: any) => async (_: Dispatch<Action>) => {
  const url = 'node-api/assess/identity'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post<any>(url, body, { headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const changeIdentityStatus = createAction<string>(CHANGE_IDENTITY_STATUS)
