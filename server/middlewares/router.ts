import { NextFunction, Request, Response } from 'express'
import omit from 'lodash.omit'
import querystring from 'querystring'
import url from 'url'
import config from '../utils/config'
import { rasPublicKeyVerify } from '../utils/crypto'
import { delCache } from '../utils/redis'
import { getDomain } from '../utils/tools'

export function handleUmeng() {
  return function(req: Request, res: Response) {
    const { trackid, ...query } = req.query
    res.redirect(url.format({ pathname: 'https://at.umeng.com/' + trackid, query }))
  }
}

export function handleOrderConfirm() {
  return async function(req: Request, res: Response, next: NextFunction) {
    const userId = req.query.user_id
    const userToken = req.query.user_token
    const token = req.query.token
    const timespan = req.query.timespan
    if (userId && userToken && token && timespan) {
      // 验签 + 静默登录
      const verified = rasPublicKeyVerify({
        origin: timespan,
        signature: decodeURIComponent(token),
        publicKeyPath: config.rsaKey.public,
      })
      if (verified) {
        const preHost = req.hostname === 'localhost' ? req.hostname : req.hostname.substr(0, req.hostname.indexOf('.'))
        const key = timespan + config.redis.version + (config.redis.isDebug ? `-${preHost}` : '')
        await delCache(key)
        const domain = getDomain(req.hostname)
        const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        res.cookie('user_id_v2', userId, { expires, domain })
        res.cookie('userToken', userToken, { expires, domain })
      }
      const shrunk = omit(req.query, ['user_id', 'userToken', 'token', 'timespan'])
      const redirect = '/mytrade/order/confirm?' + querystring.stringify(shrunk)
      res.redirect(redirect)
    }
    next()
  }
}
