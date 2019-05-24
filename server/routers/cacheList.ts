import { Request, Router } from 'express'
import { Server } from 'next'
import { handler } from '../utils/router'

const router = Router()
import createCache from '../cache'

export default function(app: Server, dev: boolean) {
  const { ssrCache } = createCache(app, dev)
  router.get(
    '/list',
    handler(async () => {
      return {
        list: ssrCache.keys(),
      }
    }),
  )

  router.post(
    '/remove',
    handler(async (key: string) => {
      const existKey = ssrCache.has(key)
      if (existKey) {
        ssrCache.del(key)
      }
      return {
        success: existKey,
      }
    }, (req: Request) => req.body.key),
  )

  router.post(
    '/remove-all',
    handler(async () => {
      ssrCache.reset()
      return {
        success: true,
      }
    }),
  )
  return router
}
