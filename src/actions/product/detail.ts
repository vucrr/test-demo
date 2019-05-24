import { getHeaders2 } from 'actions/actionHelper'
import { checkLogin } from 'actions/app'
import { Toast } from 'antd-mobile'
import {
  CHANGE_POPUP_MODAL_ID,
  CHANGE_PROPERTY_ITEM,
  CHANGE_PROPERTY_ITEM_DEFAULT_SELECTED,
  CHANGE_VAS_LIST_SELECTED,
  GET_PRODUCT_DETAIL_INFO,
  GET_PRODUCT_PROPERTY,
} from 'constant/index'
import { DetailInfoReturns } from 'interfaces/category'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

export const fetchInfo = ({ product_id, req }: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/v2c/product/detail/info'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<DetailInfoReturns>(url, { params: { product_id }, headers })
    return dispatch(createAction<DetailInfoReturns>(GET_PRODUCT_DETAIL_INFO)(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const fetchProperty = ({ idActivity }: { idActivity: string }) => async (dispatch: Dispatch<Action>) => {
  const headers = getHeaders2()
  try {
    const [{ data: property }, { data: stock }] = await Promise.all([
      axios.get<any>('node-api/v2c/product/detail/property', { params: { product_id: idActivity }, headers }),
      axios.get<any>('node-api/product/detail/stock', { params: { product_id: idActivity }, headers }),
    ])
    return dispatch(createAction<any>(GET_PRODUCT_PROPERTY)({ property: { ...property, ...stock }, idActivity }))
      .payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const changePopupModalId = createAction<{ id: number; tradeParams?: string; curRent?: any }>(
  CHANGE_POPUP_MODAL_ID,
)

export const changePropertyItem = createAction<{ pid: number; id: number; selected: boolean }>(CHANGE_PROPERTY_ITEM)

export const changePropertyItemDefaultSelected = createAction<{ selectedList: string }>(
  CHANGE_PROPERTY_ITEM_DEFAULT_SELECTED,
)

export const changeVasListSelected = createAction<{ index: number }>(CHANGE_VAS_LIST_SELECTED)

export const userOauthRedirect = (tradeUrl: string) => async () => {
  const url = 'node-api/product/detail/userOauth/saveRedirectUrl'
  try {
    const { data } = await axios.post(url, { redirect_url: tradeUrl, utm_source: 'samsungzs' })
    if (data.call_auth_url) {
      location.href = data.call_auth_url
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const noticeForNoStock = (skuId: string, list: string) => async (dispatch: any, getState: Function) => {
  const redirect = window.location.pathname + window.location.search + '&selectedList=' + list
  const isLogin = await dispatch(checkLogin({ isServer: false, res: null, asPath: redirect }))
  if (isLogin) {
    const url = 'node-api/product/detail/no_stock'
    const activityId = getState().getIn(['product', 'detail', 'idActivity'])
    const newQuery = { skuId, activityId }
    try {
      const headers = getHeaders2()
      const { data } = await axios.get(url, { params: newQuery, headers })
      Toast.info(data.errorMsg || '商品到货后您将会收到短信通知')
    } catch (err) {
      tools.ErrorLog(err)
    }
  }
}

export const noticeForReduction = (query: any) => async (dispatch: any) => {
  const redirect = window.location.pathname + window.location.search + '&reduction=true'
  const isLogin = await dispatch(checkLogin({ isServer: false, res: null, asPath: redirect }))
  if (isLogin) {
    const url = 'node-api/product/detail/reduction'
    try {
      const headers = getHeaders2()
      const { data } = await axios.get(url, { params: query, headers })
      Toast.info(data.errorMsg || '租金小于当前租金时您将会收到短信通知')
    } catch (err) {
      tools.ErrorLog(err)
    }
  }
}
