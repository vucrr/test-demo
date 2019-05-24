import { fromJS } from 'immutable'
import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { ENV } from 'utils/config'
import cookies from 'utils/cookies'
import { isWeixinNoCid } from 'utils/tools'
import { md5 } from '../../server/utils/crypto'
import Resource from '../../server/utils/resource'
import { checkLogin, getPlatform, getUA } from '../../server/utils/tools'
import rootReducer from '../reducers'
import { preloadedServerApp } from '../reducers/server-app'

const EASEU_TEST_HOST = 'test8.easeua.t.xianghuanji.com'

const homes: {
  [index: number]: string
} = {
  29: '/?utm_source=cmblife',
}

const products: {
  [index: number]: string
} = {
  23: '/product/samsung/category',
  25: '/product/samsung/category',
  28: '/product/samsung/category',
  27: '/product/aihuishou/category',
}

const myCenters: {
  [index: number]: string
} = {
  9: '/myaccount/center',
  10: '/myaccount/center',
  23: '/account/samsung/center',
  25: '/account/samsung/center',
  28: '/account/samsung/center',
}

const brandMap: {
  [index: number]: string
} = {
  40: '和租机',
  47: '享换机',
}

export function getUtm(channelId: number, req?: any) {
  return {
    brand: brandMap[channelId] || '享换机',
    hideOwnBrand: Object.keys(brandMap)
      .map(v => parseInt(v, 10))
      .includes(channelId),
    channelId,
    isAnlaiye: channelId === 4,
    isHuabei: channelId === 9,
    isZhima: channelId === 10,
    isAhs: channelId === 16,
    isFlytea: channelId === 17,
    isSamsung: channelId === 23,
    isSamsungWx: channelId === 25,
    isSamsungzs: channelId === 28,
    isCmblife: channelId === 29,
    isChangyou: channelId === 35,
    isSichuanYiDong: channelId === 40,
    isQsy: channelId === 41,
    isWacai: channelId === 42,
    isWeixinNoCid: req ? isWeixinNoCid(req) : false, // 微信渠道没有channelID，此处暂时特殊处理
    isDxsh: channelId === 44,
    // isNewTrade: [9, 10, 16, 23, 24, 27, 28, 30, 35, 38, 42, 43, 44, 45, 47].includes(channelId), // 是否跳转到新下单流程
    isNewTrade: [9, 10, 49].includes(channelId), // 是否跳转到新下单流程
    isHnyd: channelId === 47,
    isOpenAlipay: [16, 35, 45, 47].includes(channelId), // 是否允许浏览器唤醒支付宝支付，跳转到老下单流程
    isOpenAlipayNew: [49].includes(channelId), // 是否允许浏览器唤醒支付宝支付,并跳转到新下单流程
  }
}

export function getBbfHeaders(cookies: string, userAgent: string) {
  return {
    cookie: cookies || '',
    'user-agent': userAgent || '',
  }
}

export function getBfaHeaders() {
  return {
    userToken: decodeURIComponent(cookies.get('userToken') || ''),
    userIdV2: decodeURIComponent(cookies.get('user_id_v2') || ''),
    channelId: +(cookies.get('channelId') || '0'),
    platform: getPlatform(navigator.userAgent),
    utmSource: cookies.get('utm_source') || '',
    utmMedium: cookies.get('utm_medium') || '',
    utmCampaign: cookies.get('utm_campaign') || '',
  }
}

export function getQsyHeaders(req?: any) {
  // 轻松用用户
  if (req) {
    const hostMd5 = ENV === 'dev' ? md5(EASEU_TEST_HOST) : md5(req.headers.host)
    const easeuUserId = req.cookies[`user_id_${hostMd5}`]
    return {
      platform: 'alipay',
      userToken: easeuUserId || '',
      channelId: req.cookies[`channel_id_${hostMd5}`] || '',
    }
  }
  const hostMd5 = ENV === 'dev' ? md5(EASEU_TEST_HOST) : md5(location.host)
  const easeuUserId = cookies.get(`user_id_${hostMd5}`) || ''
  return {
    platform: 'alipay',
    userToken: easeuUserId || '',
    channelId: cookies.get(`channel_id_${hostMd5}`) || '',
  }
}

export function getTabBar(channelId: number) {
  return {
    home: {
      hide: [23, 25, 27, 28].includes(channelId),
      link: homes[channelId] || '/',
    },
    product: {
      hide: [47].includes(channelId),
      link: products[channelId] || '/product/category',
    },
    myCenter: {
      hide: false,
      link: myCenters[channelId] || '/account/center',
    },
  }
}

export function getAuth(userId = '') {
  return {
    isLogin: !!userId,
    userId,
  }
}

function createMiddlewares() {
  // { isServer }
  const middlewares = [thunkMiddleware]
  // tslint:disable-next-line
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    const { createLogger } = require('redux-logger') // tslint:disable-line
    middlewares.push(
      createLogger({
        level: 'info',
        collapsed: true,
        stateTransformer: (state: any) => state.toJS(),
      }),
    )
  }

  return middlewares
}

export default (initialState = { serverApp: preloadedServerApp.toJS() }, context: any) => {
  const { isServer, req } = context
  const middlewares = createMiddlewares()

  if (isServer) {
    const ua = req.useragent.source

    const channelId = +req.cookies.channelId || 0

    initialState.serverApp = {
      ua: getUA(ua, channelId),
      utm: getUtm(channelId, req),
      headers: getBbfHeaders(req.headers.cookie, req.headers['user-agent']),
      headers2: Resource.buildHeaders(req),
      headers3: getQsyHeaders(req),
      auth: {
        isLogin: checkLogin(req),
        userId: req.cookies.user_id_v2 || '',
      },
      tabBar: getTabBar(channelId),
    }
  } else {
    const channelId = +(cookies.get('channelId') || '0')

    initialState.serverApp = {
      ...initialState.serverApp,
      headers: getBbfHeaders(document.cookie, navigator.userAgent),
      headers2: getBfaHeaders(),
      headers3: getQsyHeaders(),
      auth: getAuth(cookies.get('user_id_v2')),
      tabBar: getTabBar(channelId),
    }
  }

  return createStore(
    rootReducer,
    fromJS(initialState),
    compose(
      applyMiddleware(...middlewares),
      ENV !== 'prod' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ // tslint:disable-line
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f: any) => f,
    ),
  )
}
