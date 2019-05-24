import { json, urlencoded } from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import userAgent from 'express-useragent'
import helmet from 'helmet'
import morgan from 'morgan'
import next from 'next'
import { join, resolve } from 'path'
import routes from '../src/routes'
import { handleOrderConfirm, handleUmeng } from './middlewares/router'
import renderCache from './renderCache'
import routers, { cacheRouters } from './routers'
import forward from './services/forward'
import './utils/redis'
import { ErrorLog } from './utils/tools'

const TEST = process.env.TEST || '0'
const port = parseInt(`3${TEST.padStart(3, '0')}`, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handler = routes.getRequestHandler(app)

// const whitelist = [/\.xianghuanji\.com$/, 'http://m.xhj.aihuishou.com']
// const corsOptions = dev ? cors() : cors({ origin: whitelist })

app
  .prepare()
  .then(() => {
    const server = express()
    if (!dev) {
      // server.use(cors({ origin: whitelist }))
      // server.options('*', cors({ origin: whitelist }))
      server.use(
        morgan('combined', {
          skip(req: Request) {
            const words = [
              '_next',
              'static',
              'runtime',
              'chunks',
              'css',
              'js',
              'images',
              'development',
              'webpack',
              'pages',
            ]
            const re = new RegExp(words.map(w => `(/${w}/)`).join('|'), 'gi')
            return re.test(req.url)
          },
        }),
      )
    } else {
      const mock = require('./services/mock').default
      server.use('/mock', mock)
    }
    server.use(cors())
    server.options('*', cors())
    server.use(cookieParser())
    server.use(helmet())
    server.use(userAgent.express())
    server.use(json({ limit: '50mb' }))
    server.use(urlencoded({ limit: '50mb', extended: true }))

    if (process.env.NODE_ENV === 'production') {
      server.use(compression())
    }

    server.use(
      '/static',
      express.static(join(__dirname, dev ? '../' : '../../../', 'static'), {
        maxAge: '365d',
      }),
    )
    server.use(
      '/_next/static',
      express.static(join(__dirname, dev ? '../build/' : '../../', 'static'), {
        maxAge: '365d',
      }),
    )

    // server.use('/', renderCache(app, dev))
    server.use('/', renderCache(app))
    server.use('/node-api', routers(app, dev))
    server.use('/node-api/v2c', cacheRouters())
    server.use('/node-forward', forward)
    server.use(function(err: any, _: Request, __: Response, next: NextFunction) {
      ErrorLog(err)
      next(err)
    })

    // example
    // https://m.xianghuanji.com/xxxxxxx?trackid={trackid}&cid={cid}&keywordid={keywordid}&creative={creative}
    // redirect to
    // https://at.umeng.com/{trackid}?cid={cid}&keywordid={keywordid}&creative={creative}
    server.get('/terms/umeng', handleUmeng())
    // 兼容畅由
    server.get('/mytrade/order/confirm', handleOrderConfirm())
    server.get('*', (req, res) => {
      if (req.url === '/service-worker.js') {
        return app.serveStatic(req, res, resolve('./static/service-worker.js'))
      }
      return handler(req, res)
    })
    server.listen(port, (err: Error) => {
      if (err) {
        throw err
      }
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(err => {
    ErrorLog(`app.prepare error: ${err}`)
    // app.renderError(err)
  })

process.on('unhandledRejection', (reason, p) => {
  ErrorLog(`Unhandled Rejection at: ${p}, reason: ${reason}`)
  // application specific logging, throwing an error, or other logic here
  // process.exit(1)
})
