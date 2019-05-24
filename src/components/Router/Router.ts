import NextRouter, { EventChangeOptions } from 'next/router'
import { Url, UrlObject, format } from 'url'
import { isApp } from 'utils/app'

type UrlLike = UrlObject | Url

class Router {
  static async push(url: string | UrlLike, as?: string | UrlLike, options: EventChangeOptions = {}) {
    if (isApp() || (typeof url === 'string' && url.startsWith('http'))) {
      window.location.href = typeof url === 'object' ? format(url) : url
    } else {
      await NextRouter.push(url, as, options)
    }
  }

  static async replace(url: string | UrlLike, as?: string | UrlLike, options: EventChangeOptions = {}) {
    if (isApp() || (typeof url === 'string' && url.startsWith('http'))) {
      window.location.replace(typeof url === 'object' ? format(url) : url)
    } else {
      await NextRouter.replace(url, as, options)
    }
  }

  static back() {
    NextRouter.back()
  }
}

export default Router
