import { Response } from 'express'
import LRUCache from 'lru-cache'
import { QueryStringMapObject, Server } from 'next'
import { CacheObject, Utm } from './interfaces/cache'

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  // maxAge: 1000 * 60 * 60 * 24, // 1 day
  maxAge: 1000 * 60 * 1, // 1 min
})

function getCacheKey(req: CacheObject): string {
  if (req.query.utm_source) {
    return `${req.url}`
  }
  if (req.cookies.utm_source) {
    const paramsKey1 = Object.keys(req.params)
      .map(key => req.params[key])
      .join('/')
    const paramsKey = paramsKey1 ? `/${paramsKey1}` : ''

    const querysKey1 = Object.keys(req.query)
      .map(key => `${key}=${req.query[key]}`)
      .join('&')
    const querysKey = querysKey1 ? `?${querysKey1}` : ''

    const sourcesKeys: Utm = {}
    if (req.cookies.utm_source) {
      sourcesKeys.utm_source = req.cookies.utm_source
    }
    if (req.cookies.utm_medium) {
      sourcesKeys.utm_medium = req.cookies.utm_medium
    }
    if (req.cookies.utm_campaign) {
      sourcesKeys.utm_campaign = req.cookies.utm_campaign
    }
    const sourcesKey1 = Object.keys(sourcesKeys)
      .map(key => `${key}=${sourcesKeys[key]}`)
      .join('&')
    const sourcesKey = !querysKey ? `?${sourcesKey1}` : `&${sourcesKey1}`

    return `${req.path}${paramsKey}${querysKey}${sourcesKey}`
  }
  return `${req.url}`
}

export default function(app: Server, dev: boolean) {
  return {
    ssrCache,
    renderAndCache: async function(
      req: CacheObject,
      res: Response,
      pagePath: string,
      queryParams: QueryStringMapObject,
    ) {
      const key = getCacheKey(req)
      // If we have a page in the cache, let's serve it
      if (ssrCache.has(key)) {
        res.setHeader('x-cache', 'HIT')
        res.send(ssrCache.get(key))
        return
      }
      try {
        // If not let's render the page into HTML
        const html = await app.renderToHTML(req, res, pagePath, queryParams)
        // Something is wrong with the request, let's skip the cache
        if (res.statusCode !== 200) {
          res.send(html)
          return
        }
        // Let's cache this page with production
        if (!dev) {
          ssrCache.set(key, html)
          res.setHeader('x-cache', 'MISS')
        }
        res.send(html)
      } catch (err) {
        // tslint:disable-next-line:no-floating-promises
        app.renderError(err, req, res, pagePath, queryParams)
      }
    },
  }
}
