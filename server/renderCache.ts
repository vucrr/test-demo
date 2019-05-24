import { Request, Response, Router } from 'express'
import { Server } from 'next'
// import { stringify } from 'querystring'
// import cache from './cache'

import { getChannelId } from './controllers/common'
import { getDomain } from './utils/tools'
// import { ErrorLog } from './utils/tools'

const router = Router()

async function setUtmCookies(req: Request, res: Response) {
  const query = req.query
  // 排除 /node-api 接口请求的数据影响
  if (query.utm_source && !req.url.startsWith('/node-api')) {
    const domain = getDomain(req.hostname)
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    res.cookie('utm_source', query.utm_source, { expires, domain })
    if (query.utm_medium) {
      res.cookie('utm_medium', query.utm_medium, { expires, domain })
    }
    if (query.utm_campaign) {
      res.cookie('utm_campaign', query.utm_campaign, { expires, domain })
    }
    const data = await getChannelId(req)
    if (data && data.channel_id) {
      // 解决当首次加载页面，还没有写入cookie时，刚写入的cookie此处不能读取bug
      req.cookies.channelId = data.channel_id
      res.cookie('channelId', data.channel_id, { expires, domain })
    }
    // else {
    //   ErrorLog(`catch error in setUtmCookies, query is: ${stringify(query)}`)
    // }
  }
}

export default function(app: Server) {
  router.get('*', async (req, res, next) => {
    await setUtmCookies(req, res)
    next()
  })
  router.get('/', async (req, res) => {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(req.useragent!.source)) {
      // tslint:disable-next-line:no-floating-promises
      const html = await app.renderToHTML(req, res, '/', req.query)
      res.send(html)
    } else {
      res.redirect('http://www.xhj.aihuishou.com/')
    }
  })
  return router
}

// export default function(app: Server, dev: boolean) {
//   const { renderAndCache } = cache(app, dev)
//   router.get('*', async (req, res, next) => {
//     await setUtmCookies(req, res)
//     next()
//   })
//   router.get('/', (req, res) => {
//     if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(req.useragent!.source)) {
//       // tslint:disable-next-line:no-floating-promises
//       renderAndCache(req, res, '/', req.query)
//     } else {
//       res.redirect('http://www.xhj.aihuishou.com/')
//     }
//   })
//   router.get('/product/category', (req, res) => {
//     // tslint:disable-next-line:no-floating-promises
//     renderAndCache(req, res, '/product/category', req.query)
//   })
//   router.get('/product/index', (req, res) => {
//     // tslint:disable-next-line:no-floating-promises
//     renderAndCache(req, res, '/product/detail', req.query)
//   })
//   router.get('/product/detail', (req, res) => {
//     // tslint:disable-next-line:no-floating-promises
//     renderAndCache(req, res, '/product/detail', req.query)
//   })
//   return router
// }
