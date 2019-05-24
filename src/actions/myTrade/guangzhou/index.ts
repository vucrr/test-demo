import { getHeaders2 } from 'actions/actionHelper'
import {
  FETCH_CANTON_STORE_CITY,
  FETCH_CANTON_STORE_DETAIL,
  FETCH_CANTON_STORE_SELECT,
  LOAD_FETCH_CANTON_STORE_SELECT,
  SELECT_CANTON_STORE_ITEM,
} from 'constant/index'
import { CantonCity, CantonDetail, CantonSelect } from 'interfaces/guangzhou'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

const contonStoreSelectInfo = createAction<any>(FETCH_CANTON_STORE_SELECT)
const loadContonStoreSelectInfo = createAction<any>(LOAD_FETCH_CANTON_STORE_SELECT)
const contonStoreCityInfo = createAction<any>(FETCH_CANTON_STORE_CITY)
const contonStoreDetailInfo = createAction<any>(FETCH_CANTON_STORE_DETAIL)

export const clickStoreItem = createAction<string>(SELECT_CANTON_STORE_ITEM)

export const repairQualitySelectActions = ({ query, req }: ClientRequest, isLoadMore?: boolean) => async (
  dispatch: Dispatch<Action>,
) => {
  const url = 'node-api/trade/guangzhou/select'
  const headers = getHeaders2(req)
  try {
    const pageIndex = isLoadMore ? query.page_index : 0
    const { data } = await axios.get<CantonSelect>(url, { params: { page_index: pageIndex, ...query }, headers })
    const datas = {
      ...data,
      page_index: pageIndex,
    }
    if (isLoadMore) {
      return datas && dispatch(loadContonStoreSelectInfo(datas)).payload
    }
    return datas && dispatch(contonStoreSelectInfo(datas)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const repairQualityCityActions = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/guangzhou/city'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<CantonCity>(url, { params: query, headers })
    return data && dispatch(contonStoreCityInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const repairQualityDetailActions = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/guangzhou/detail'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<CantonDetail>(url, { params: query, headers })
    return data && dispatch(contonStoreDetailInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
