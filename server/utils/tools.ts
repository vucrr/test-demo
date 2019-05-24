import axios from 'axios'
import { HTTPInfra } from 'interfaces/model'
import { DES3ECBDecrypt } from '../../server/utils/crypto'
import { ErrorReturn } from '../interfaces/error'
import { RouterRequest } from '../interfaces/router'
import { isProd } from './config'

interface Product {
  id: number
  title: string
  price: string
  // tag: string
  assurance: string
  image: string
  baseFee: string
}

export function renderProduct(oldProduct: Product) {
  return {
    id: oldProduct.id || '',
    title: oldProduct.title || '',
    price: oldProduct.price || '',
    // tag: oldProduct.tag || '',
    // assurance: oldProduct.assurance || '',
    imgUrl: oldProduct.image || '',
    noBadge: true,
    baseFee: oldProduct.baseFee || '',
  }
}

export function renderCenterProduct(oldProduct: any) {
  return {
    id: oldProduct.id_activity || '',
    title: oldProduct.title || '',
    price: oldProduct.perMonthPrice || '',
    imgUrl: oldProduct.activity_img || '',
    noBadge: true,
  }
}

// order/return steps
export function renderSteps(old: any, index: number) {
  const tips = [old.tips.substring(0, old.tips.indexOf('\n')), old.tips.substring(old.tips.indexOf('\n') + 1)]
  return {
    remark: old.title,
    content: old.tips.indexOf('\n') === -1 ? [old.tips] : tips,
    status: index === 0 ? 1 : 5,
  }
}

export function ErrorLog(message: Error | string, isClient = false) {
  console.error(message)
  isProd &&
    !isClient &&
    axios({
      method: 'post',
      url:
        'https://oapi.dingtalk.com/robot/send?access_token=ed88e1fa1793798f95cf7df824ca66a548399a9c772d2375fdd6f163fec78fd4',
      data: {
        msgtype: 'text',
        text: {
          content: message,
        },
        at: {
          atMobiles: ['13023105710'],
          isAtAll: false,
        },
      },
    })
}

export function dictSort(obj: any): object {
  const dict = {} as any
  for (const key of Object.keys(obj).sort()) {
    dict[key] = obj[key]
  }
  return dict
}

export function noop() {} // tslint:disable-line:no-empty

export function checkLogin(req: RouterRequest) {
  const userId = (req.cookies && req.cookies.user_id_v2) || (req.headers && (req.headers.useridv2 as string))
  if (!userId || !isBase64(userId)) return false
  try {
    const text = DES3ECBDecrypt({ key: '', toDecrypt: userId })
    const num = parseInt(text, 10)
    return num > 0
  } catch (err) {
    return false
  }
}

export function isBase64(text: string): boolean {
  return Buffer.from(text, 'base64').toString('base64') === text
}

interface ErrRes {
  status: number
  code?: number
  msg?: string
  reason?: string
}

export function errorHandler(res: ErrRes): ErrorReturn {
  return {
    status: (res && res.status) || 500,
    code: (res && res.code) || 500,
    errorMsg: (res && (res.msg || res.reason)) || '网络请求错误',
  }
}

export function authHandler(): ErrorReturn {
  return {
    status: 401,
    errorMsg: '登录认证失败',
  }
}

export function BFA_Returns(res: HTTPInfra<any>) {
  if (!res) throw new Error('node api no res')
  if ([1, 200].includes(res.code as number) || res.status === 101) return res.data
  return errorHandler(res)
}

export function getDomain(hostname: string): string {
  if (hostname === 'm.xianghuanji.com') {
    return '.xianghuanji.com'
  }
  return hostname
}

export function getPlatform(userAgent: string) {
  if (/AlipayClient/.test(userAgent)) {
    return 'alipay'
  } else if (/MicroMessenger/.test(userAgent)) {
    return 'wechat'
  } else if (/enjoyChanging/.test(userAgent) && /platform\/iOS/.test(userAgent)) {
    return 'xhj_ios_app'
  } else if (/Android;enjoyChanging_native/.test(userAgent)) {
    return 'xhj_android_app'
  }
  return 'h5_browser'
}

export function getUA(ua: any, channelId: number) {
  return {
    isAlipay: /AlipayClient/.test(ua),
    isWechat: /MicroMessenger/.test(ua),
    isApp: /enjoyChanging/.test(ua) || channelId === 19 || channelId === 22,
    isAndroidApp: /Android;enjoyChanging_native/.test(ua) || channelId === 22,
    isIOSApp: channelId === 19, // /enjoyChanging/.test(ua) && /platform\/iOS/.test(ua),
    isAhsApp: /aihuishou_official_/.test(ua),
    isNuomiApp: /Nuomi/.test(ua),
    isIOS: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1,
  }
}

export const delayHandle = (tick: number) => {
  return new Promise<void>(resolve => {
    if (tick > 0) {
      setTimeout(() => resolve(), tick * 1000)
    } else {
      resolve()
    }
  })
}
