import { getHeaders2 } from 'actions/actionHelper'
import { GET_HOME_INFO, GET_HOME_USER_TAG } from 'constant/index'
import { HomeDataReturns, UserTagReturns } from 'interfaces/home'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

export const fetchInfo = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/v2c/home'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<HomeDataReturns>(url, { params: query, headers })
    return data && dispatch(createAction<HomeDataReturns>(GET_HOME_INFO)(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const fetchUserTag = () => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/home/getUserTag'
  const headers = getHeaders2()
  try {
    const { data } = await axios.get<UserTagReturns>(url, { headers })
    return data && dispatch(createAction<UserTagReturns>(GET_HOME_USER_TAG)(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}
