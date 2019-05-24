import { getHeaders2 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import {
  CHECK_TRADE_DONE,
  GET_NAV_ICONS,
  HIDDEN_TABBAR,
  INIT_TABBAR,
  RAS_PRIVATE_KEY,
  TOGGLE_TABBAR,
} from 'constant/index'
import { CheckTradeDoneReturns, NavIconsReturns } from 'interfaces/common'
import { ErrorReturn } from 'interfaces/error'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { ENV } from 'utils/config'
import { axios, tools } from 'utils/index'

export interface InitTabBarPayload {
  show: boolean
  selectedTab: string
}

interface RasPrivateKeyPayload {
  key: string
  timespan: string
  token: string
}

export const initTabBar = createAction<InitTabBarPayload>(INIT_TABBAR)

export const toggleTabBar = createAction(TOGGLE_TABBAR)

export const hiddenTabBar = createAction(HIDDEN_TABBAR)

const receiveRasPrivateKey = createAction<RasPrivateKeyPayload>(RAS_PRIVATE_KEY)

export const fetchRasPrivateKey = () => async (dispatch: Dispatch<Action>) => {
  try {
    const timespan = new Date().getTime().toString()
    const { data } = await axios.post<any>('node-api/signature', { origin: timespan })
    return data && dispatch(receiveRasPrivateKey({ key: 'openAlipay', timespan, token: data.token }))
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const redirectLogin = async ({ isServer, res, asPath }: any) => {
  // 支付宝芝麻、花呗渠道需静默登录，故跳转至php的中间件
  const loginUrl = `/next-api/account/login?redirect=${encodeURIComponent(asPath)}`
  if (isServer) {
    res.redirect(loginUrl)
    res.end()
  } else {
    await Router.push(loginUrl)
  }
}

const redirectBindPhone = async ({ isServer, res, asPath, phone }: any) => {
  const url = phone
    ? `/myaccount/bind/bind-phone?phone=${phone}&redirect=${encodeURIComponent(asPath)}`
    : `/myaccount/bind/change-phone?redirect=${encodeURIComponent(asPath)}`
  if (isServer) {
    res.redirect(url)
    res.end()
  } else {
    await Router.push(url)
  }
}

const getAlipayBindInfo = async (alipayUserId: string, req: any) => {
  const url = 'node-api/account/bind_phone/alipay_user_bind_info'
  const headers = getHeaders2(req)
  const params = {
    // 这里特殊处理，h5传的参数是 alipay_user_id
    alipay_user_id: alipayUserId,
    type: 2,
  }
  try {
    const { data } = await axios.get(url, { params, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const checkLogin = ({ isServer, res, req, asPath }: any) => async (_: Dispatch<Action>, getState: Function) => {
  if (!getState().getIn(['serverApp', 'auth', 'isLogin'])) {
    // 支付宝芝麻、花呗渠道需静默登录，故跳转至php的中间件
    await redirectLogin({ isServer, res, asPath })
    return false
  }
  // 轻松用 || 非支付宝渠道 不需要验证账号合并问题。直接返回true
  if (
    getState().getIn(['serverApp', 'utm', 'channelId']) === 41 ||
    !getState().getIn(['serverApp', 'ua', 'isAlipay']) ||
    ENV === 'dev'
  ) {
    return true
  }
  // 支付宝渠道验证手机号
  if (isServer && !req) {
    // 兼容没有传 req 的请求 后期可删
    return true
  }
  const alipayUserId = (isServer ? req.cookies.alipay_user_id : Cookies.get('alipay_user_id')) || ''
  if (!alipayUserId) {
    await redirectLogin({ isServer, res, asPath })
    return false
  }
  const isBindAlipay = isServer ? req.cookies['is_alipay_bind'] === '1' : Cookies.get('is_alipay_bind') === '1'
  if (isBindAlipay) {
    return true
  }
  const data = await getAlipayBindInfo(alipayUserId, req)
  if (data && data.res) {
    // 已经绑定
    if (isServer) {
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
      res.cookie('is_alipay_bind', '1', { expires })
    } else {
      Cookies.set('is_alipay_bind', '1', { expires: 1 })
    }
    return true
  }
  // 未绑定
  await redirectBindPhone({ isServer, res, asPath, phone: data && data.phone })
  return false
}

export const redirectTo = async ({ isServer, res, path }: any) => {
  if (isServer) {
    res.redirect(path)
    res.end()
  } else {
    await Router.push(path)
  }
}

const receiveNavIcons = createAction<NavIconsReturns>(GET_NAV_ICONS)

export const fetchNavIcons = () => async (dispatch: Dispatch<Action>) => {
  try {
    const url = 'node-api/v2c/common/getNavIcons'
    const headers = getHeaders2()
    const { data } = await axios.get<NavIconsReturns>(url, { headers })
    return data && dispatch(receiveNavIcons(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const receiveCheckTradeDone = createAction<CheckTradeDoneReturns>(CHECK_TRADE_DONE)

export const checkTradeDone = () => async (dispatch: Dispatch<Action>) => {
  try {
    const url = 'node-api/common/checkTradeDone'
    const headers = getHeaders2()
    const { data } = await axios.get<CheckTradeDoneReturns & ErrorReturn>(url, { headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
    } else {
      data && dispatch(receiveCheckTradeDone(data))
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
