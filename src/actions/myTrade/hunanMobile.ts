import { getHeaders2 } from 'actions/actionHelper'
import { SELECT_NEW_PHONE_NUMBER } from 'constant/index'
import { RecommendPhone } from 'interfaces/hunanMobile'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

export const checkWhiteList = ({ req }: { req: any }) => async (_: Dispatch<Action>) => {
  const url = 'node-api/trade/hunanMobile/checkWhiteList'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get(url, { headers })

    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const getRecommendPhone = (query: any, req?: any) => async (_: Dispatch<Action>) => {
  const url = 'node-api/trade/hunanMobile/getRecommendPhone'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<RecommendPhone>(url, { params: query, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const lockPhone = (query: any) => async (_: Dispatch<Action>) => {
  const url = 'node-api/trade/hunanMobile/lockPhone'
  const headers = getHeaders2()
  try {
    const { data } = await axios.get<any>(url, { params: query, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const searchPhone = (query: any) => async (_: Dispatch<Action>) => {
  const url = 'node-api/trade/hunanMobile/searchPhone'
  const headers = getHeaders2()
  try {
    const { data } = await axios.get<any>(url, { params: query, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const selectNewPhone = createAction<any>(SELECT_NEW_PHONE_NUMBER)
