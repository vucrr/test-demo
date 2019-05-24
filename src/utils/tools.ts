import axios from 'axios'
import { baseURL } from 'utils/config'
import cookies from './cookies'

export function renderBgImage(url: string) {
  return {
    background: `url('${url}') no-repeat center center`,
    backgroundSize: 'cover',
  }
}

export function scrollToAnchor(anchorName: string, animated = true) {
  if (anchorName) {
    const anchorElement = document.querySelector(anchorName)
    if (anchorElement) {
      animated ? anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' }) : anchorElement.scrollIntoView()
    }
  }
}

export function convertIndexToDigital(index: number): string {
  let pos = (index + 1).toString()
  if (pos.length < 2) pos = '0' + pos
  return pos
}

export function ErrorLog(message: any) {
  // tslint:disable-next-line
  typeof window !== 'undefined' && console.error(message)
  // Error | string
  axios({
    method: 'post',
    url: `${baseURL}node-api/common/dingtalk/send`,
    data: {
      // tslint:disable-next-line
      isClient: typeof window !== 'undefined',
      content: message.stack ? message.stack : message,
    },
  })
}

export function noop() {} // tslint:disable-line:no-empty

export function mockPending(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

// 微信渠道没有channelID，此处暂时特殊处理
export function isWeixinNoCid(req: any) {
  if (req.query && req.query.utm_source) {
    return (
      req.query.utm_source === 'weixin' &&
      req.query.utm_medium === 'weixin_menu' &&
      req.query.utm_campaign === 'firstpage'
    )
  }
  return (
    req.cookies.utm_source === 'weixin' &&
    req.cookies.utm_medium === 'weixin_menu' &&
    req.cookies.utm_campaign === 'firstpage'
  )
}

export function renderUtmParams(headers2: any) {
  const sourcesKeys: any = {}
  if (headers2.utmSource) {
    sourcesKeys.utm_source = headers2.utmSource
  }
  if (headers2.utmMedium) {
    sourcesKeys.utm_medium = headers2.utmMedium
  }
  if (headers2.utmCampaign) {
    sourcesKeys.utm_campaign = headers2.utmCampaign
  }
  const sourcesKey1 = Object.keys(sourcesKeys)
    .map(key => `${key}=${sourcesKeys[key]}`)
    .join('&')
  return sourcesKey1.length ? `&${sourcesKey1}` : ''
}

const easings: { [index: string]: (t: number) => number } = {
  linear(t: number) {
    return t
  },
  easeInQuad(t: number) {
    return t * t
  },
  easeOutQuad(t: number) {
    return t * (2 - t)
  },
  easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  },
  easeInCubic(t: number) {
    return t * t * t
  },
  easeOutCubic(t: number) {
    return --t * t * t + 1
  },
  easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  },
  easeInQuart(t: number) {
    return t * t * t * t
  },
  easeOutQuart(t: number) {
    return 1 - --t * t * t * t
  },
  easeInOutQuart(t: number) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
  },
  easeInQuint(t: number) {
    return t * t * t * t * t
  },
  easeOutQuint(t: number) {
    return 1 + --t * t * t * t * t
  },
  easeInOutQuint(t: number) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
  },
}

export function scrollWithAnimation(
  destination: number | HTMLElement,
  duration = 300,
  easing = 'easeInQuad',
  callback?: Function,
) {
  const start = window.pageYOffset
  const startTime = 'now' in window.performance ? performance.now() : Date.now()

  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  )
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight

  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop
  const destinationOffsetToScroll = Math.round(
    documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset,
  )

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll)
    if (callback) callback()
    return
  } else {
    ;(function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime()
      const time = Math.min(1, (now - startTime) / duration)
      const timeFunc = easings[easing](time)
      window.scroll(0, Math.ceil(timeFunc * (destinationOffsetToScroll - start) + start))

      if (window.pageYOffset === destinationOffsetToScroll) {
        if (callback) callback()
        return
      }
      requestAnimationFrame(scroll)
    })()
  }
}

export const padLeft = (n: number) => (n < 10 ? `0${n}` : n)

export function zipBase64(original: string, quality = 0.7): Promise<string> {
  return new Promise(resolve => {
    const img = new Image()
    img.src = original
    img.onload = function() {
      const canvas = document.createElement('CANVAS') as HTMLCanvasElement
      const context = canvas.getContext('2d')
      const width = img.width
      const height = img.height
      const rate = (width < height ? width / height : height / width) / 1.5
      canvas.width = width * rate
      canvas.height = height * rate
      context!.translate((width * rate) / 2, (height * rate) / 2)
      context!.drawImage(img, (-width * rate) / 2, (-height * rate) / 2, width * rate, height * rate)
      const result = canvas.toDataURL('image/jpeg', quality)
      resolve(result)
    }
  })
}

export function formatPhone(phone: string) {
  return phone && phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

export function formatBankCard(phone: string) {
  return phone && phone.replace(/(\d{4})\d{8}(\d{4})/, '$1********$2')
}

export function getDomain(hostname: string): string {
  if (hostname === 'm.xianghuanji.com') {
    return '.xianghuanji.com'
  }
  return hostname
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

export const renderLink = ({ item }: { item: any }) => {
  const links: { [index: string]: string | object } = {
    product_info: { pathname: '/product/detail', query: { id_activity: item.get('product_id') } },
    product_category: `/product/category?tag=${item.get('tag_id')}`,
    activity: item.get('skip_url'),
    expire_user: '/test', // 到期用户
    no_jump: 'javascript:void(0);',
  }
  return links[item.get('type')]
}

export const cleanUserInfo = () => {
  ErrorLog(`合并账号已被清理：user_id_v2：${cookies.get('user_id_v2')} userToken: ${cookies.get('userToken')}`)
  const domain = getDomain(location.hostname)
  cookies.remove('user_id_v2')
  cookies.remove('userToken')
  cookies.remove('user_id_v2', { domain })
  cookies.remove('userToken', { domain })
  location.href = `/next-api/account/login?redirect=${encodeURIComponent('/')}`
}
