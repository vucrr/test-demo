import { getHeaders2 } from 'actions/actionHelper'
import {
  CLEAR_RETURN_PHONE_CHOSEN_STORE,
  CLEAR_RETURN_PHONE_STORE_LIST,
  FETCH_RETURN_PHONE_CITY,
  FETCH_RETURN_PHONE_CITY_REGION,
  FETCH_RETURN_PHONE_DETAIL,
  FETCH_RETURN_PHONE_PRICE,
  FETCH_RETURN_PHONE_STORE,
  SELECT_RETURN_PHONE_STORE,
} from 'constant/index'
import { PriceReturns } from 'interfaces/returnPhone'
import { Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

const receivePrices = createAction<PriceReturns>(FETCH_RETURN_PHONE_PRICE)

export const fetchPrices = (tradeNo: string, req: any) => async (dispatch: Dispatch) => {
  const url = 'node-api/account/return_phone/price'
  const headers = getHeaders2(req)
  const params = { trade_no: tradeNo }
  try {
    const { data } = await axios.get(url, { params, headers })
    data && dispatch(receivePrices(data))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const getCaptchaImage = (phone: string) => async (_: Dispatch) => {
  const url = 'node-api/captcha/image'
  const params = { phone, type: 'returnPhone' }
  const headers = getHeaders2()
  try {
    const { data } = await axios.get(url, { params, headers })
    return 'data:image/png;base64,' + data.image_code
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const verifyImageAndSendSMS = (phone: string, imageStr: string) => async (_: Dispatch) => {
  const url = 'node-api/captcha/sms'
  const params = {
    phone,
    type: 'returnPhone',
    image_code: imageStr,
  }
  const headers = getHeaders2()
  try {
    const { data } = await axios.get(url, { params, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

interface ApplyQuery {
  trade_no: string
  return_type: 1 | 2
  user_phone: string
  sms_type: 'returnPhone'
  sms_code: string
  ahs_store_id: number
  express_number: string
}

export const applyReturnPhone = (body: ApplyQuery) => async (_: Dispatch) => {
  const url = 'node-api/account/return_phone/apply'
  const headers = getHeaders2()
  try {
    const { data } = await axios.get(url, { params: body, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

const getAhsCities = createAction<any>(FETCH_RETURN_PHONE_CITY)

export const listCities = (req: any) => async (dispatch: Dispatch) => {
  const url = 'node-api/account/return_phone/city'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get(url, { headers })
    data && dispatch(getAhsCities(data))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

const getAhsCityRegion = createAction<any>(FETCH_RETURN_PHONE_CITY_REGION)

export const listCityRegions = (cityId: string, req: any) => async (dispatch: Dispatch) => {
  const url = 'node-api/account/return_phone/region'
  const headers = getHeaders2(req)
  const query = { ahs_city_id: cityId }
  try {
    const { data } = await axios.get(url, { headers, params: query })
    data && dispatch(getAhsCityRegion(data))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

const getAhsStore = createAction<any>(FETCH_RETURN_PHONE_STORE)

export const listStore = (cityId: string, regionId: string, selectedId: string, req?: any) => async (
  dispatch: Dispatch,
) => {
  const url = 'node-api/account/return_phone/store'
  const headers = getHeaders2(req)
  const query = { ahs_city_id: cityId, ahs_region_id: regionId }
  try {
    const { data } = await axios.get(url, { headers, params: query })
    data && dispatch(getAhsStore({ data, selectedId }))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const clearStoreList = createAction(CLEAR_RETURN_PHONE_STORE_LIST)

export const selectStore = createAction<string>(SELECT_RETURN_PHONE_STORE)

export const getStore = (storeId: string, req: any) => async (_: Dispatch) => {
  const url = 'node-api/account/return_phone/store_detail'
  const headers = getHeaders2(req)
  const params = { ahs_store_id: storeId }
  try {
    const { data } = await axios.get(url, { headers, params })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

const fetchDetail = createAction<any>(FETCH_RETURN_PHONE_DETAIL)

export const getDetail = (tradeNo: string, req: any) => async (dispatch: Dispatch) => {
  const url = 'node-api/account/return_phone/detail'
  const headers = getHeaders2(req)
  const params = { trade_no: tradeNo }
  try {
    const { data } = await axios.get(url, { headers, params })
    data && dispatch(fetchDetail(data))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const cancelApply = (tradeNo: string) => async (_: Dispatch) => {
  const url = 'node-api/account/return_phone/cancel'
  const headers = getHeaders2()
  const params = { trade_no: tradeNo }
  try {
    const { data } = await axios.get(url, { headers, params })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const clearChosenStore = createAction(CLEAR_RETURN_PHONE_CHOSEN_STORE)
