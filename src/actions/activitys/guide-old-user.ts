import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_ACTIVITYS_GUIDE_OLD_USER } from 'constant/index'
import { GuideOldUserData } from 'interfaces/activitys/guide-old-user'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

const receiveInfo = createAction<GuideOldUserData>(FETCH_ACTIVITYS_GUIDE_OLD_USER)

export const fetchInfo = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/activitys/guideOldUser'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<GuideOldUserData>(url, { params: query, headers })
    data && dispatch(receiveInfo(data))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
